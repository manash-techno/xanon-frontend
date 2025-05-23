import { z } from "zod";

const priceOptionArray = ["do_not_match", "fixed_amount_above", "percentage_above", "percentage_below", "match_price"] as const;
const automationNoRulesArray = ["no_order_30", "no_order_60", "no_order_90"] as const;
const automationStockDropArray = ["no_order_20", "no_order_50", "no_order_90"] as const;
const automationStockAgesArray = ["no_order_30", "no_order_60", "no_order_90"] as const;

// ✅ Base schema
const baseSchema = z.object({
  rule_name: z.string({ required_error: "Rule name is required" }).min(2, { message: "Rule name is required" }),
  min_roi: z.number({ required_error: "Minimum ROI is required", invalid_type_error: "Minimum ROI must be a number" }).int().positive().max(100, { message: "Minimum ROI must be less than or equal to 100" }),
  max_roi: z.number({ required_error: "Maximum ROI is required", invalid_type_error: "Maximum ROI must be a number" }).int().positive().max(100, { message: "Maximum ROI must be less than or equal to 100" }),
  abs_min_roi: z.number({ required_error: "Absolute Minimum ROI is required", invalid_type_error: "Absolute Minimum ROI must be a number" }).int().positive().max(100, { message: "Absolute minimum ROI must be less than or equal to 100" }),

  prime_adjustment_type: z.enum(priceOptionArray, { required_error: "Prime type is required" }),
  prime_adjustment_value: z.number({ required_error: "Prime adjustment is required" }),

  non_prime_next_day_adjustment_type: z.enum(priceOptionArray, { required_error: "Non-prime next day adjustment type is required" }),
  non_prime_next_day_adjustment_value: z.number({ required_error: "Non-prime next day adjustment value is required" }),

  non_prime_adjustment_type: z.enum(priceOptionArray, { required_error: "Non-prime adjustment type is required" }),
  non_prime_adjustment_value: z.number({ required_error: "Non-prime adjustment value is required" }),

  automation_condition_order: z.enum(automationNoRulesArray).optional(),
  automation_condition_stock_drop: z.enum(automationStockDropArray).optional(),
  automation_condition_stock_ages: z.enum(automationStockAgesArray).optional(),

  is_min_roi_30_days: z.boolean(),
  min_roi_30_days: z.number({ required_error: "Minimum ROI is required", invalid_type_error: "Minimum ROI must be a number" }).optional(),
  is_min_roi_60_days: z.boolean(),
  min_roi_60_days: z.number({ required_error: "Minimum ROI is required", invalid_type_error: "Minimum ROI must be a number" }).optional(),
});

// ✅ DRY validation helper
const validateAdjustmentValue = (
  typeKey: keyof z.infer<typeof baseSchema>,
  valueKey: keyof z.infer<typeof baseSchema>,
  label: string
) => {
  return (data: any, ctx: z.RefinementCtx) => {
    const type = data[typeKey];
    const value = data[valueKey];

    if (type === "do_not_match" || type === "match_price") {
      if (value !== 0) {
        ctx.addIssue({
          path: [valueKey],
          code: z.ZodIssueCode.custom,
          message: `${label} Field is required`,
        });
      }
    } else {
      if (typeof value !== "number" || value <= 0) {
        ctx.addIssue({
          path: [valueKey],
          code: z.ZodIssueCode.custom,
          message: `${label} Field is required`,
        });
      }
    }
  };
};


const validateConditionalRoi = (
  flagKey: keyof z.infer<typeof baseSchema>,
  valueKey: keyof z.infer<typeof baseSchema>,
  label: string
) => {
  return (data: any, ctx: z.RefinementCtx) => {
    const flag = data[flagKey];
    const value = data[valueKey];

    if (flag === true) {
      if (typeof value !== "number" || !Number.isInteger(value)) {
        ctx.addIssue({
          path: [valueKey],
          code: z.ZodIssueCode.custom,
          message: `${label} is required`,
        });
      }
      if (typeof value !== "number" || !Number.isInteger(value) || value <= 0 || value < 1 || value > 100) {
        ctx.addIssue({
          path: [valueKey],
          code: z.ZodIssueCode.custom,
          message: `Number must be between 1 and 100`,
        });
      }

    }
    return undefined;
  };
};

// ✅ Final schema with custom refinements
const ruleAddSchema = baseSchema.superRefine((data, ctx) => {
  validateAdjustmentValue("prime_adjustment_type", "prime_adjustment_value", "Prime adjustment value")(data, ctx);
  validateAdjustmentValue("non_prime_next_day_adjustment_type", "non_prime_next_day_adjustment_value", "Non-prime next day adjustment value")(data, ctx);
  validateAdjustmentValue("non_prime_adjustment_type", "non_prime_adjustment_value", "Non-prime adjustment value")(data, ctx);
  validateConditionalRoi("is_min_roi_30_days", "min_roi_30_days", "Minimum ROI after 30 days")(data, ctx);
  validateConditionalRoi("is_min_roi_60_days", "min_roi_60_days", "Minimum ROI after 60 days")(data, ctx);
});
export { ruleAddSchema };
