import { FC } from "react";

interface AutomationRuleProps {
    pricingList: {
        label: string;
        value: string;
    }[];
    setAutomationRule: (value: string) => void;
    automationRule: string;
    days: number;
    num: number;
}

const AutomationRule: FC<AutomationRuleProps> = ({ pricingList, setAutomationRule, automationRule, days, num }) => {
    const isChecked = automationRule === `no_order_${days}`;
    return (
        <div className="checkagree-common-s1 flex items-start gap-2" key={`no-orders-${days}-${num}`}>
            <div className="checkcol">
                <input
                    id={`no-orders-${days}-${num}`}
                    name={`no-orders-${days}`}
                    className="theme-checkbox-s1"
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                        const condition = e.target.checked ? `no_order_${days}` : "";
                        setAutomationRule(condition);
                    }}
                />
            </div>
            <div>
                <label
                    htmlFor={`no-orders-${days}-${num}`}
                    className={`font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1 block ${!isChecked ? "opacity-50 pointer-events-none" : ""}`}
                >
                    If no orders in last {days} days
                </label>
                <select
                    className={`rounded-md px-3 py-2.5 border text-sm w-[240px]
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff] select1
                                   ${!isChecked ? "opacity-50 pointer-events-none" : ""}`}
                    disabled={!automationRule.includes(`no_order_${days}`)}
                >
                    <option value="">Select Rule</option>
                    {pricingList.map((item: any) => (
                        <option key={`${item.label}_${num}`} value={item.label}>{item.label}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default AutomationRule