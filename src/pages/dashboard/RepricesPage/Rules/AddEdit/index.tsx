import { AssetsConfig } from "@/config/assetsConfig";
import { pagePaths } from "@/config/pagePaths";
import { useAddRuleMutation, useGetPricingRulesQuery, useGetRuleQuery, useUpdateRuleMutation } from "@/store/api/repriceApi";
import { Box, Tooltip } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { LuInfo } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import AutomationRule from "./AutomationRule";
import PriceOptions from "./PriceOptions";

const AddEditRulesPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const noOrdersArray = [30, 60, 90];
  const stockDropArray = [20, 50, 90];
  const stockAgesArray = [30, 60, 90];

  const [ruleName, setRuleName] = useState("")
  const [isPriceMatch, setIsPriceMatch] = useState(false)
  const [guardPreventBelowPrime, setGuardPreventBelowPrime] = useState(false)
  const [guardPreventBelowNonPrime, setGuardPreventBelowNonPrime] = useState(false)
  const [primeAdjustmentType, setPrimeAdjustmentType] = useState("do_not_match")
  const [primeAdjustmentValue, setPrimeAdjustmentValue] = useState("")
  const [primeNextDayAdjustmentType, setPrimeNextDayAdjustmentType] = useState("do_not_match")
  const [primeNextDayAdjustmentValue, setPrimeNextDayAdjustmentValue] = useState("")
  const [nonPrimeAdjustmentType, setNonPrimeAdjustmentType] = useState("do_not_match")
  const [nonPrimeAdjustmentValue, setNonPrimeAdjustmentValue] = useState("")
  const [automationConditionOrder, setAutomationConditionOrder] = useState("")
  const [automationConditionStockDrop, setAutomationConditionStockDrop] = useState("")
  const [automationConditionStockAge, setAutomationConditionStockAge] = useState("")

  const [excludeAmazon, setExcludeAmazon] = useState(false)
  const [excludeAmazonEU, setExcludeAmazonEU] = useState(false)
  const [excludeSellers, setExcludeSellers] = useState(false)

  const [minRoi, setMinRoi] = useState("")
  const [maxRoi, setMaxRoi] = useState("")
  const [absRoi, setAbsRoi] = useState("")

  const [isMinRoi30, setIsMinRoi30] = useState(false)
  const [minRoi30, setMinRoi30] = useState("")
  const [isMinRoi60, setIsMinRoi60] = useState(false)
  const [minRoi60, setMinRoi60] = useState("")

  const { data: pricingRules, isSuccess, refetch
  } = useGetPricingRulesQuery();

  const [addRule, { error }] = useAddRuleMutation();
  const [updateRule, { error: updateError }] = useUpdateRuleMutation();
  const { data: rule, isSuccess: isRuleSuccess, isLoading: isRuleLoading, refetch: ruleRefetch } = useGetRuleQuery(id as string, {
    skip: !id,
  });

  const pricingList = useMemo(() => {
    if (!isSuccess || !pricingRules?.results) return [];
    return pricingRules.results.map((item) => ({
      label: item.rule_name,
      value: item.rule_name,
    }));
  }, [isSuccess, pricingRules]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rule = {
      rule_name: ruleName,

      min_roi: minRoi,
      max_roi: maxRoi,
      abs_min_roi: absRoi,

      prime_adjustment_type: primeAdjustmentType,
      prime_adjustment_value: primeAdjustmentValue,
      non_prime_next_day_adjustment_type: primeNextDayAdjustmentType,
      non_prime_next_day_adjustment_value: primeNextDayAdjustmentValue,
      non_prime_adjustment_type: nonPrimeAdjustmentType,
      non_prime_adjustment_value: nonPrimeAdjustmentValue,

      is_min_roi_30_days: isMinRoi30,
      min_roi_30_days: minRoi30,
      is_min_roi_60_days: isMinRoi60,
      min_roi_60_days: minRoi60,

      exclude_amazon: excludeAmazon,
      exclude_amazon_eu: excludeAmazonEU,
      exclude_sellers: excludeSellers,

      guard_prevent_below_prime: guardPreventBelowPrime,
      guard_prevent_below_non_prime: guardPreventBelowNonPrime,
      automation_condition_order: automationConditionOrder,
      automation_condition_stock_drop: automationConditionStockDrop,
      automation_condition_stock_age: automationConditionStockAge,
    }

    if (id) {
      updateRule({ id, rule }).unwrap().
        then((res) => {
          console.log('success', res)
          refetch();
          ruleRefetch();
          navigate(-1)
        })
        .catch((err) => {
          console.log('error', err)
        })
    } else {
      addRule(rule).unwrap()
        .then((res) => {
          console.log('success', res)
          refetch()
          navigate(-1)
        })
        .catch((err) => {
          console.log('error', err)
        })
    }
  }

  useEffect(() => {
    if (!isRuleLoading && isRuleSuccess) {
      setRuleName(rule.rule_name)
      setGuardPreventBelowPrime(rule.guard_prevent_below_prime)
      setGuardPreventBelowNonPrime(rule.guard_prevent_below_non_prime)
      setPrimeAdjustmentType(rule.prime_adjustment_type)
      setPrimeAdjustmentValue(rule.prime_adjustment_value as string)
      setPrimeNextDayAdjustmentType(rule.non_prime_next_day_adjustment_type)
      setPrimeNextDayAdjustmentValue(rule.non_prime_next_day_adjustment_value)
      setNonPrimeAdjustmentType(rule.non_prime_adjustment_type)
      setNonPrimeAdjustmentValue(rule.non_prime_adjustment_value as string)
      if (rule.no_order_30) {
        setAutomationConditionOrder(rule.no_order_30_rule || "")
      }
      if (rule.no_order_60) {
        setAutomationConditionOrder(rule.no_order_60_rule || "")
      }
      if (rule.no_order_90) {
        setAutomationConditionOrder(rule.no_order_90_rule || "")
      }
      if (rule.stock_drop_20) {
        setAutomationConditionStockDrop(rule.stock_drop_20_rule || "")
      }
      if (rule.stock_drop_50) {
        setAutomationConditionStockDrop(rule.stock_drop_50_rule || "")
      }
      if (rule.stock_drop_90) {
        setAutomationConditionStockDrop(rule.stock_drop_90_rule || "")
      }
      if (rule.stock_age_30) {
        setAutomationConditionStockAge(rule.stock_age_30_rule || "")
      }
      if (rule.stock_age_60) {
        setAutomationConditionStockAge(rule.stock_age_60_rule || "")
      }
      if (rule.stock_age_90) {
        setAutomationConditionStockAge(rule.stock_age_90_rule || "")
      }
      setExcludeAmazon(rule.exclude_amazon)
      setExcludeAmazonEU(rule.exclude_amazon_eu)
      setExcludeSellers(rule.exclude_merchant || false)
      setMinRoi(rule.min_roi || "")
      setMaxRoi(rule.max_roi || "")
      setAbsRoi(rule.abs_min_roi || "")
      setIsMinRoi30(rule.is_min_roi_30_days || false)
      setMinRoi30(rule.min_roi_30_days || "")
      setIsMinRoi60(rule.is_min_roi_60_days || false)
      setMinRoi60(rule.min_roi_60_days || "")
    }
  }, [id, isRuleLoading, isRuleSuccess, rule]);


  return (
    <form onSubmit={onSubmit}>
      <Box className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-2 mb-6">
          <img
            src={AssetsConfig.icons.back.src}
            width={20}
            height={20}
            alt={AssetsConfig.icons.back.alt}
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-[#1E1E1E] dark:text-[#F2F2F2] font-bold text-xl">
            {id ? "Edit" : "Add"} Rules
          </h1>
        </div>
      </Box>
      <Box className="flex flex-col gap-3">
        <div className="flex flex-wrap -m-[8px]">
          <div className="w-full p-[8px]">
            <div className="flex flex-wrap -m-[8px]">
              <div className="w-full max-w-[33.33%] p-[8px]">
                <label
                  htmlFor=""
                  className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block"
                >
                  Rules Name
                </label>
                <input
                  type="text"
                  placeholder="Enter rule name"
                  className="rounded-md px-3 py-2.5 border text-sm w-full
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                ></input>
              </div>
            </div>
          </div>

          <div className="w-full p-[8px]">
            <label
              htmlFor=""
              className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block font-bold text-[16px]"
            >
              Match Offer
            </label>
            <div className="checkagree-common-s1 flex items-start gap-2">
              <div className="checkcol">
                <input type="radio" name="" checked={isPriceMatch} onChange={(e) => setIsPriceMatch(e.target.checked)} className="theme-radio-s1" id="" />
              </div>
              <label
                htmlFor="price-match"
                className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
              >
                Price Match
              </label>
            </div>
          </div>

          <div className="w-full p-[8px]">
            <label
              htmlFor=""
              className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block"
            >
              Price Match - Guard
            </label>

            <div className="flex flex-col gap-y-2">
              <div className="checkagree-common-s1 flex items-start gap-2">
                <div className="checkcol">
                  <input
                    type="checkbox"
                    name=""
                    checked={guardPreventBelowPrime}
                    onChange={(e) => setGuardPreventBelowPrime(e.target.checked)}
                    className="theme-toggle-s1"
                    id=""
                  />
                </div>
                <label
                  htmlFor=""
                  className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
                >
                  If Prime offer, do not price lower than the calculated Prime
                  price
                </label>
              </div>
              <div className="checkagree-common-s1 flex items-start gap-2">
                <div className="checkcol">
                  <input
                    type="checkbox"
                    name=""
                    checked={guardPreventBelowNonPrime}
                    onChange={(e) => setGuardPreventBelowNonPrime(e.target.checked)}
                    className="theme-toggle-s1"
                    id=""
                  />
                </div>
                <label
                  htmlFor=""
                  className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
                >
                  If Non Prime offer, do not price lower than the calculated Non
                  Prime price
                </label>
              </div>
            </div>
          </div>

          <div className="w-full p-[8px]">
            <div className="flex flex-wrap -m-[8px]">
              {/* <RadioGroup  className="w-full max-w-[33.33%] p-[8px]">
                <label
                  htmlFor=""
                  className="text-xs text-[#444444] dark:text-[#F2F2F2] mb-2 block"
                >
                  Prime
                </label>
                <div className="flex gap-y-2 flex-col">
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="radio"
                        name=""
                        className="theme-radio-s1"
                        id=""
                      />
                    </div>
                    <label
                      htmlFor=""
                      className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
                    >
                      Do not Match
                    </label>
                  </div>
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="radio"
                        name=""
                        className="theme-radio-s1"
                        id=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1 block"
                      >
                        Price above by fixed amount
                      </label>
                      <input
                        className="rounded-md px-3 py-2.5 border text-sm w-[240px]
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                        placeholder="Enter Amount"
                        type="text"
                      ></input>
                    </div>
                  </div>
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="radio"
                        name=""
                        className="theme-radio-s1"
                        id=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1 block"
                      >
                        Price below by fixed %
                      </label>
                      <input
                        className="rounded-md px-3 py-2.5 border text-sm w-[240px]
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                        placeholder="Enter Amount"
                        type="text"
                      ></input>
                    </div>
                  </div>
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="radio"
                        name=""
                        className="theme-radio-s1"
                        id=""
                      />
                    </div>
                    <label
                      htmlFor=""
                      className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
                    >
                      Match Price
                    </label>
                  </div>
                </div>
              </RadioGroup> */}
              <PriceOptions title="Prime" groupName="Prime" onChange={setPrimeAdjustmentType} setPriceAmount={setPrimeAdjustmentValue} />
              <PriceOptions title="Prime - Next Day Delivery" groupName="prime-next-day" onChange={setPrimeNextDayAdjustmentType} setPriceAmount={setPrimeNextDayAdjustmentValue} />
              <PriceOptions title="Non Prime" groupName="non-prime" onChange={setNonPrimeAdjustmentType} setPriceAmount={setNonPrimeAdjustmentValue} />
            </div>
          </div>

          <div className="w-full p-[8px]">
            <label
              htmlFor=""
              className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block font-bold text-[16px]"
            >
              Automations
            </label>

            <div className="flex flex-wrap -m-[8px]">
              {/* No Orders */}
              <div className="w-full max-w-[33.33%] p-[8px]">
                <label
                  htmlFor=""
                  className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block font-bold text-[16px]"
                >
                  No Orders
                </label>
                <div className="flex gap-y-2 flex-col">
                  {noOrdersArray.map((days) => (
                    <AutomationRule
                      key={`no-orders-${days}-1`}
                      pricingList={pricingList}
                      setAutomationRule={setAutomationConditionOrder}
                      automationRule={automationConditionOrder}
                      days={days}
                      num={1}
                    />
                  ))}
                </div>
              </div>

              {/* Stock Drop */}
              <div className="w-full max-w-[33.33%] p-[8px]">
                <label
                  htmlFor=""
                  className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block font-bold text-[16px]"
                >
                  Stock Drop
                </label>
                <div className="flex gap-y-2 flex-col">
                  {stockDropArray.map((days) => (
                    <AutomationRule
                      key={`no-orders-${days}-2`}
                      pricingList={pricingList}
                      setAutomationRule={setAutomationConditionStockDrop}
                      automationRule={automationConditionStockDrop}
                      days={days}
                      num={2} />
                  ))}
                </div>
              </div>

              {/* Stock Ages */}
              <div className="w-full max-w-[33.33%] p-[8px]">
                <label
                  htmlFor=""
                  className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block font-bold text-[16px]"
                >
                  Stock Ages
                </label>
                <div className="flex gap-y-2 flex-col">
                  {stockAgesArray.map((days) => (
                    <AutomationRule
                      key={`no-orders-${days}-3`}
                      pricingList={pricingList}
                      setAutomationRule={setAutomationConditionStockAge}
                      automationRule={automationConditionStockAge}
                      days={days}
                      num={3} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Minimums & Maximums */}
          <div className="w-full p-[8px]">
            <label
              htmlFor=""
              className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block font-bold text-[16px]"
            >
              Minimums & Maximums
            </label>
            <div className="flex flex-col gap-y-3">
              <div className="flex flex-wrap -m-[8px]">
                <div className="w-full max-w-[240px] p-[8px]">
                  <Box className="flex items-center mb-2 gap-2">
                    <label className="text-xs text-[#1E1E1E] dark:text-[#fff] block">
                      Minimum ROI%
                    </label>
                    <Box className="flex items-center text-[#6E8091] dark:text-[#828282]">
                      <Tooltip
                        componentsProps={{
                          tooltip: {
                            sx: {
                              lineHeight: "23px",
                              fontSize: "14px",
                              bgcolor: "#0D0D0D",
                              "& .MuiTooltip-arrow": {
                                color: "#0D0D0D",
                              },
                            },
                          },
                        }}
                        arrow
                        title={`This is the minimum ROI criteria ideally when sourcing a product. It will be the price that is matched within the first 30 days.`}
                      >
                        <LuInfo />
                      </Tooltip>
                    </Box>
                  </Box>
                  <div className="relative">
                    <input
                      id="minRoi"
                      name="minRoi"
                      className="rounded-md px-3 py-2.5 border text-sm w-full
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                      placeholder="0"
                      type="text"
                      value={minRoi}
                      onChange={(e) => {
                        setMinRoi(e.target.value);
                      }}
                    />
                    <span className="absolute -translate-y-2/4 text-[#6E8091] font-normal text-sm leading-[150%] tracking-[-1%] right-2.5 top-2/4">
                      %
                    </span>
                  </div>
                </div>
                <div className="w-full max-w-[240px] p-[8px]">
                  <Box className="flex items-center mb-2 gap-2">
                    <label className="text-xs text-[#1E1E1E] dark:text-[#fff] block">
                      Maximum ROI%
                    </label>
                    <Box className="flex items-center text-[#6E8091] dark:text-[#828282]">
                      <Tooltip
                        componentsProps={{
                          tooltip: {
                            sx: {
                              lineHeight: "23px",
                              fontSize: "14px",
                              bgcolor: "#0D0D0D",
                              "& .MuiTooltip-arrow": {
                                color: "#0D0D0D",
                              },
                            },
                          },
                        }}
                        arrow
                        title={`The maximum ROI you are willing to sell a product for.`}
                      >
                        <LuInfo />
                      </Tooltip>
                    </Box>
                  </Box>
                  <div className="relative">
                    <input
                      id="maxRoi"
                      name="maxRoi"
                      className="rounded-md px-3 py-2.5 border text-sm w-full
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                      placeholder="0"
                      type="text"
                      value={maxRoi}
                      onChange={(e) => {
                        setMaxRoi(e.target.value);
                      }}
                    />
                    <span className="absolute -translate-y-2/4 text-[#6E8091] font-normal text-sm leading-[150%] tracking-[-1%] right-2.5 top-2/4">
                      %
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -m-[8px]">
                <div className="w-full max-w-[240px] p-[8px]">
                  <Box className="flex items-center mb-2 gap-2">
                    <label className="text-xs text-[#1E1E1E] dark:text-[#fff] block">
                      Absolute Minimum ROI%
                    </label>
                    <Box className="flex items-center text-[#6E8091] dark:text-[#828282]">
                      <Tooltip
                        componentsProps={{
                          tooltip: {
                            sx: {
                              lineHeight: "23px",
                              fontSize: "14px",
                              bgcolor: "#0D0D0D",
                              "& .MuiTooltip-arrow": {
                                color: "#0D0D0D",
                              },
                            },
                          },
                        }}
                        arrow
                        title={`This is the absolute ROI criteria ideally when sourcing a product. It will be the price that is matched within the first 30 days.`}
                      >
                        <LuInfo />
                      </Tooltip>
                    </Box>
                  </Box>
                  <div className="relative">
                    <input
                      id="absRoi"
                      name="absRoi"
                      className="rounded-md px-3 py-2.5 border text-sm w-full
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                      placeholder="0"
                      type="text"
                      value={absRoi}
                      onChange={(e) => {
                        setAbsRoi(e.target.value);
                      }}
                    />
                    <span className="absolute -translate-y-2/4 text-[#6E8091] font-normal text-sm leading-[150%] tracking-[-1%] right-2.5 top-2/4">
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-[8px]">
            <div className="flex gap-y-2 flex-col">
              <div className="checkagree-common-s1 flex items-start gap-2">
                <div className="checkcol">
                  <input
                    id="isMinRoi30"
                    name="isMinRoi30"
                    type="checkbox"
                    className="theme-checkbox-s1"
                    checked={isMinRoi30}
                    onChange={(e) => setIsMinRoi30(e.target.checked)}
                  />
                </div>
                <div className="w-full max-w-[240px] ">
                  <Box className="flex items-center mb-2 gap-2">
                    <label className="text-xs text-[#1E1E1E] dark:text-[#fff] block">
                      Minimum ROI% after 30 days
                    </label>
                    <Box className="flex items-center text-[#6E8091] dark:text-[#828282]">
                      <Tooltip
                        componentsProps={{
                          tooltip: {
                            sx: {
                              lineHeight: "23px",
                              fontSize: "14px",
                              bgcolor: "#0D0D0D",
                              "& .MuiTooltip-arrow": {
                                color: "#0D0D0D",
                              },
                            },
                          },
                        }}
                        arrow
                        title={`The ROI you are willing to sell the product at after inventory as aged 30days.`}
                      >
                        <LuInfo />
                      </Tooltip>
                    </Box>
                  </Box>
                  <div className="relative">
                    <input
                      id="minRoi30"
                      name="minRoi30"
                      className="rounded-md px-3 py-2.5 border text-sm w-full
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                      placeholder="0"
                      type="text"
                      value={minRoi30}
                      onChange={(e) => {
                        setMinRoi30(e.target.value);
                      }}
                      disabled={!isMinRoi30}
                    />
                    <span className="absolute -translate-y-2/4 text-[#6E8091] font-normal text-sm leading-[150%] tracking-[-1%] right-2.5 top-2/4">
                      %
                    </span>
                  </div>
                </div>
              </div>
              <div className="checkagree-common-s1 flex items-start gap-2">
                <div className="checkcol">
                  <input
                    id="isMinRoi60"
                    name="isMinRoi60"
                    type="checkbox"
                    className="theme-checkbox-s1"
                    checked={isMinRoi60}
                    onChange={(e) => setIsMinRoi60(e.target.checked)}
                  />
                </div>
                <div className="w-full max-w-[240px] ">
                  <Box className="flex items-center mb-2 gap-2">
                    <label className="text-xs text-[#1E1E1E] dark:text-[#fff] block">
                      Minimum ROI% after 60 days
                    </label>
                    <Box className="flex items-center text-[#6E8091] dark:text-[#828282]">
                      <Tooltip
                        componentsProps={{
                          tooltip: {
                            sx: {
                              lineHeight: "23px",
                              fontSize: "14px",
                              bgcolor: "#0D0D0D",
                              "& .MuiTooltip-arrow": {
                                color: "#0D0D0D",
                              },
                            },
                          },
                        }}
                        arrow
                        title={`The ROI you are willing to sell the product at after inventory as aged 60days.`}
                      >
                        <LuInfo />
                      </Tooltip>
                    </Box>
                  </Box>
                  <div className="relative">
                    <input
                      id="minRoi60"
                      name="minRoi60"
                      className="rounded-md px-3 py-2.5 border text-sm w-full
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                      placeholder="0"
                      type="text"
                      value={minRoi60}
                      onChange={(e) => {
                        setMinRoi60(e.target.value);
                      }}
                      disabled={!isMinRoi60}
                    />
                    <span className="absolute -translate-y-2/4 text-[#6E8091] font-normal text-sm leading-[150%] tracking-[-1%] right-2.5 top-2/4">
                      %
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="w-full p-[8px]">
            <label
              htmlFor=""
              className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] block font-bold text-[16px]"
            >
              Exclude Sellers
            </label>

          </div>

          <div className="w-full p-[8px]">
            <div className="flex flex-col gap-y-2">
              <div className="checkagree-common-s1 flex items-start gap-2">
                <div className="checkcol">
                  <input
                    id="excludeAmazon"
                    name="excludeAmazon"
                    type="checkbox"
                    className="theme-toggle-s1"
                    checked={excludeAmazon}
                    onChange={(e) => setExcludeAmazon(e.target.checked)}
                  />
                </div>
                <label
                  htmlFor=""
                  className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
                >
                  Exclude Amazon
                </label>
              </div>
              <div className="checkagree-common-s1 flex items-start gap-2">
                <div className="checkcol">
                  <input
                    id="excludeAmazonEU"
                    name="excludeAmazonEU"
                    type="checkbox"
                    className="theme-toggle-s1"
                    checked={excludeAmazonEU}
                    onChange={(e) => setExcludeAmazonEU(e.target.checked)}
                  />
                </div>
                <label
                  htmlFor=""
                  className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
                >
                  Exclude Amazon_EU
                </label>
              </div>
              <div className="checkagree-common-s1 flex items-start gap-2">
                <div className="checkcol">
                  <input
                    id="excludeSellers"
                    name="excludeSellers"
                    type="checkbox"
                    className="theme-toggle-s1"
                    checked={excludeSellers}
                    onChange={(e) => setExcludeSellers(e.target.checked)}
                  />
                </div>
                <label
                  htmlFor=""
                  className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
                >
                  Exclude Sellers
                </label>
              </div>
            </div>
          </div>


        </div>
        <Box className="flex gap-4 pt-4">
          <button
            type="submit"
            className="cursor-pointer bg-[#F0F0F0] dark:bg-[#292929] hover:bg-gray-400 
              text-[#6E8091] dark:text-[#696969] text-[12px] font-medium p-0 rounded 
              inline-flex items-center w-[100px] h-[36px] justify-center"
          >
            Save
          </button>
          <button
            type="button"
            className="cursor-pointer bg-[transparent] text-[#828282] dark:text-[#828282] 
            text-[12px] font-medium p-0 rounded 
              inline-flex items-center w-[100px] h-[36px] justify-center"
          >
            Cancel
          </button>
        </Box>
      </Box>
    </form>
  );
};

export default AddEditRulesPage;
