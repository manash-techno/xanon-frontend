import { Radio } from "@mui/material"
import { RadioGroup } from "@radix-ui/react-dropdown-menu"
import { error } from "console"
import { set } from "date-fns"
import { useEffect, useState } from "react"

interface PriceOptionProps {
    title: string
    groupName: string
    onChange: (value: string) => void
    setPriceAmount: (value: string) => void
    validationErrors: string[]
    selectedOption: string
    value: string
}

const PriceOptions: React.FC<PriceOptionProps> = ({ selectedOption ,title, groupName, onChange, setPriceAmount, validationErrors, value }) => {
    const [aboveAmount, setAboveAmount] = useState("")
    const [abovePercent, setAbovePercent] = useState("")
    const [belowPercent, setBelowPercent] = useState("")

    const handleChange = (e: string) => {
        onChange(e)
        setAboveAmount("")
        setAbovePercent("")
        setBelowPercent("")
        setPriceAmount("")
    }

    useEffect(() => {
        if (selectedOption == "fixed_amount_above") {
            setAboveAmount(value)
        } else if (selectedOption == "percentage_above") {
            setAbovePercent(value)
        } else if (selectedOption == "percentage_below") {
            setBelowPercent(value)
        }
        
        if (selectedOption == "do_not_match" || selectedOption == "match_price") {
            setAboveAmount("")
            setAbovePercent("")
            setBelowPercent("")
            setPriceAmount("")
        }
    }, [selectedOption, value])
    

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
                    <div className="flex flex-col">
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
                            value={aboveAmount}
                            onChange={(e) => {
                                setAboveAmount(e.target.value)
                                setPriceAmount(e.target.value)
                            }}
                            disabled={selectedOption !== "fixed_amount_above"}
                        // required={selectedOption == "fixed_amount_above"}
                        ></input>
                        {selectedOption === "fixed_amount_above" && validationErrors?.length > 0 && (
                            <p className="text-red-500 text-sm">{validationErrors[0]}</p>
                        )}
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
                    <div className="flex flex-col">
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
                            value={abovePercent}
                            onChange={(e) => {
                                setAbovePercent(e.target.value)
                                setPriceAmount(e.target.value)
                            }}
                            disabled={selectedOption !== "percentage_above"}
                        ></input>
                        {selectedOption === "percentage_above" && validationErrors?.length > 0 && (
                            <p className="text-red-500 text-sm">{validationErrors[0]}</p>
                        )}
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
                    <div className="flex flex-col">
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
                            value={belowPercent}
                            onChange={(e) => {
                                setBelowPercent(e.target.value)
                                setPriceAmount(e.target.value)
                            }}
                            disabled={selectedOption !== "percentage_below"}
                        ></input>
                        {selectedOption === "percentage_below" && validationErrors?.length > 0 && (
                            <p className="text-red-500 text-sm">{validationErrors[0]}</p>
                        )}
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