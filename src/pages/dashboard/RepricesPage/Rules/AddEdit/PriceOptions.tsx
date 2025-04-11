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
        <RadioGroup className="w-full max-w-[33.33%] p-[8px]">
            <label
                htmlFor=""
                className="text-xs text-[#444444] dark:text-[#F2F2F2] mb-2 block"
            >
                {title}
            </label>
            <div className="flex gap-y-2 flex-col">
                <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                        <input
                            type="radio"
                            value="do_not_match"
                            name=""
                            className="theme-radio-s1"
                            id={`${groupName}-1`}
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
                            id={`${groupName}-1`}
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
                            disabled={selectedOption !== "fixed_amount_above"}
                            value={aboveAmount}
                            onChange={(e) => setAboveAmount(e.target.value)}
                            required={selectedOption == "fixed_amount_above"}
                        ></input>
                    </div>
                </div>
                <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                        <input
                            type="radio"
                            name=""
                            className="theme-radio-s1"
                            id={`${groupName}-2`}
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
                            id={`${groupName}-3`}
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
        </RadioGroup>
    )

}

export default PriceOptions