import { Radio } from "@mui/material"
import { RadioGroup } from "@radix-ui/react-dropdown-menu"
import { useEffect, useState } from "react"

interface PriceOptionProps {
    title: string
    groupName: string
    onChange: (value: string) => void
    setPriceAmount: (value: string) => void
}

const PriceOptions: React.FC<PriceOptionProps> = ({ title, groupName, onChange, setPriceAmount }) => {
    const [selectedOption, setSelectedOption] = useState("do_not_match")
    const [aboveAmount, setAboveAmount] = useState("")
    const [abovePercent, setAbovePercent] = useState("")
    const [belowPercent, setBelowPercent] = useState("")

    const handleChange = (e: string) => {
        setSelectedOption(e)
        onChange(e)
    }

    useEffect(() => {
        if (selectedOption == "fixed_amount_above") {
            setPriceAmount(aboveAmount)
        } else if (selectedOption == "percentage_above") {
            setPriceAmount(abovePercent)
        } else if (selectedOption == "percentage_below") {
            setPriceAmount(belowPercent)
        } else {
            setPriceAmount("")
        }
    }, [aboveAmount, abovePercent, belowPercent, selectedOption])

    return (
        <RadioGroup className="w-full max-w-[33.33%] p-[8px]" value={selectedOption} onValueChange={(e) => handleChange(e)}>
            <label
                htmlFor=""
                className="text-xs text-[#444444] dark:text-[#F2F2F2] mb-2 block"
            >
                {title}
            </label>

            <div className="flex gap-y-2 flex-col">
                {/* Do not match */}
                <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                        <Radio
                            id={`${groupName}-1`}
                            name={`${groupName}-1`}
                            className="theme-radio-s1"
                            value="do_not_match"
                            checked={selectedOption === "do_not_match"}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </div>
                    <label
                        htmlFor={`${groupName}-1`}
                        className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
                    >
                        Do not Match
                    </label>
                </div>

                {/* Price above by fixed amount */}
                <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                        <Radio
                            id={`${groupName}-2`}
                            name={`${groupName}-2`}
                            className="theme-radio-s1"
                            value="fixed_amount_above"
                            checked={selectedOption === "fixed_amount_above"}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor={`${groupName}-2`}
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
                            disabled={selectedOption !== "fixed_amount_above"}
                            value={aboveAmount}
                            onChange={(e) => setAboveAmount(e.target.value)}
                            required={selectedOption == "fixed_amount_above"}
                        ></input>
                    </div>
                </div>

                {/* Price above by fixed % */}
                <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                        <Radio
                            id={`${groupName}-3`}
                            name={`${groupName}-3`}
                            className="theme-radio-s1"
                            value="percentage_above"
                            checked={selectedOption === "percentage_above"}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor={`${groupName}-3`}
                            className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1 block"
                        >
                            Price above by fixed %
                        </label>
                        <input
                            className="rounded-md px-3 py-2.5 border text-sm w-[240px]
                                               bg-white dark:bg-[#242424]
                                           border-[#EEEEEE] dark:border-[#373737]
                                           text-[#1E1E1E] dark:text-[#fff]"
                            placeholder="Enter Amount"
                            type="text"
                            disabled={selectedOption !== "fixed_amount_above"}
                            value={abovePercent}
                            onChange={(e) => setAbovePercent(e.target.value)}
                            required={selectedOption == "fixed_amount_above"}
                        ></input>
                    </div>
                </div>
      
                {/* Price below by fixed % */}
                <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                        <Radio
                            id={`${groupName}-4`}
                            name={`${groupName}-4`}
                            className="theme-radio-s1"
                            value="percentage_below"
                            checked={selectedOption === "percentage_below"}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor={`${groupName}-4`}
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
                            disabled={selectedOption !== "fixed_amount_above"}
                            value={belowPercent}
                            onChange={(e) => setBelowPercent(e.target.value)}
                            required={selectedOption == "fixed_amount_above"}
                        ></input>
                    </div>
                </div>

                {/* match price  */}
                <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                        <Radio
                            id={`${groupName}-1`}
                            name={`${groupName}-1`}
                            className="theme-radio-s1"
                            value="match_price"
                            checked={selectedOption === "match_price"}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </div>
                    <label
                        htmlFor={`${groupName}-1`}
                        className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
                    >
                        Match price
                    </label>
                </div>
            </div>
        </RadioGroup>
    )

}

export default PriceOptions