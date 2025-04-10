import { Label } from "@/components/ui/Label";
import { ReactButton } from "@/components/ui/ReactButton";
import { ReactInput } from "@/components/ui/ReactInput";
import { AssetsConfig } from "@/config/assetsConfig";
import { expensesCategoryList, recursList, vatList } from "@/constants/filter";
import { useAddExpenseMutation } from "@/store/api/expensesApi";
import { Box } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Calendar, ChevronDownIcon } from "lucide-react";
import { JSX, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";


const AddExpensePage = (): JSX.Element => {
    const navigate = useNavigate();
    const [date, setDate] = useState<Date>(new Date())
    const [vatCode, setVatCode] = useState<string>("")
    const [recurs, setRecurs] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [amount, setAmount] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const handleDateChange = useCallback(
        (newDate: Date) => {
            setDate(newDate);
        },
        []
    );

    const [addExpense] = useAddExpenseMutation();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const expense = {
            "date": (new Date(date)).toLocaleDateString('en-CA'),
            "vat": parseInt(vatCode.replace("%", "")) / 100,
            "recur": recurs,
            "category": category,
            "amount": amount,
            "description": description
        }

        addExpense(expense).unwrap().then((res) => {
            console.log('res', res)
            navigate("/dashboard/expenses");
            // clear states
            setDate(new Date())
            setVatCode("")
            setRecurs("")
            setCategory("")
            setAmount("")
            setDescription("")
        }).catch((err) => console.log(err));
    }

    return (
        <form className="w-full" onSubmit={onSubmit}>
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
                    Add Expense
                </h1>
            </div>

            <Label className="mb-2" htmlFor="date">Date</Label>
            <div className="flex items-center mb-6 space-x-5">
                <DatePicker
                    value={date}
                    className="p-2"
                    sx={
                        {
                            "& .MuiInputBase-root": {
                                color: "#1E1E1E",
                                fontSize: "14px",
                                fontWeight: "400",
                                width: "240px"
                            },
                            "& .MuiInputBase-input": {
                                color: "#1E1E1E",
                                fontSize: "14px",
                                fontWeight: "400",
                                padding: "9px 12px",
                            }
                        }}
                    format="dd MMM yyyy"
                    slots={{ openPickerIcon: Calendar }}
                    onChange={(newDate) => handleDateChange(newDate as Date)}
                />
            </div>

            <Label className="mb-2" htmlFor="date">Total Amount (£)</Label>
            <div className="flex items-center mb-6 space-x-5">
                <ReactInput
                    className="p-2 w-[240px]"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            <Label className="mb-2" htmlFor="date">VaT Code</Label>
            <div className="flex items-center mb-6 space-x-5">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <ReactButton variant="outline" className="w-60 justify-between p-2.5 text-sm">
                            {vatList.find(status => status.value === vatCode)?.name || "0"}
                            <ChevronDownIcon className="ml-2 h-5 w-5" />
                        </ReactButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="start"
                        className="z-50 w-60 h-60 overflow-y-auto rounded-md border
                bg-white p-1 text-gray-900 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100
                transition-all duration-150 ease-in-out"
                    >
                        <>
                            {vatList.map((status) => (
                                <DropdownMenuItem
                                    key={status.value}
                                    onClick={() => setVatCode(status.value)}
                                    className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm 
                            outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-800 
                            data-[disabled]:pointer-events-none data-[disabled]:opacity-50 
                            ${vatCode === status.value ? "bg-blue-500 text-white dark:bg-blue-600" : ""}`}
                                >
                                    {status.name}
                                </DropdownMenuItem>
                            ))}
                        </>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Label className="mb-2" htmlFor="date">Recurs</Label>
            <div className="flex items-center mb-6 space-x-5">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <ReactButton variant="outline" className="w-60 justify-between p-2.5 text-sm">
                            {recursList.find(status => status.value === recurs)?.name || "0"}
                            <ChevronDownIcon className="ml-2 h-5 w-5" />
                        </ReactButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="start"
                        className="z-50 w-60 h-60 overflow-y-auto rounded-md border
                bg-white p-1 text-gray-900 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100
                transition-all duration-150 ease-in-out"
                    >
                        <>
                            {recursList.map((status) => (
                                <DropdownMenuItem
                                    key={status.value}
                                    onClick={() => setRecurs(status.value)}
                                    className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm 
                            outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-800 
                            data-[disabled]:pointer-events-none data-[disabled]:opacity-50 
                            ${vatCode === status.value ? "bg-blue-500 text-white dark:bg-blue-600" : ""}`}
                                >
                                    {status.name}
                                </DropdownMenuItem>
                            ))}
                        </>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Label className="mb-2" htmlFor="date">Category</Label>
            <div className="flex items-center mb-6 space-x-5">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <ReactButton variant="outline" className="w-60 justify-between p-2.5 text-sm">
                            {expensesCategoryList.find(status => status.value === category)?.name || "0"}
                            <ChevronDownIcon className="ml-2 h-5 w-5" />
                        </ReactButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="start"
                        className="z-50 w-60 h-60 overflow-y-auto rounded-md border
                bg-white p-1 text-gray-900 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100
                transition-all duration-150 ease-in-out"
                    >
                        <>
                            {expensesCategoryList.map((status) => (
                                <DropdownMenuItem
                                    key={status.value}
                                    onClick={() => setCategory(status.value)}
                                    className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm 
                            outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-800 
                            data-[disabled]:pointer-events-none data-[disabled]:opacity-50 
                            ${category === status.value ? "bg-blue-500 text-white dark:bg-blue-600" : ""}`}
                                >
                                    {status.name}
                                </DropdownMenuItem>
                            ))}
                        </>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Label className="mb-2" htmlFor="date">Description</Label>
            <div className="flex items-center mb-6 space-x-5">
                <textarea
                    id="message"
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block p-2.5 w-[480px] text-sm text-gray-900 bg-white rounded-lg border border-gray-300 
              focus:ring-blue-500 focus:border-blue-500 dark:bg-[transparent] dark:border-[#4F4F4F] dark:placeholder-[#B4B4B4] 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    style={{ resize: "none" }}
                    placeholder="Description"
                ></textarea>
            </div>
            <Box className="flex gap-4 pb-4">
                <button
                    // onClick={() => setShowNotepadModal(false)}
                    type="submit"
                    className="cursor-pointer bg-[#F0F0F0] dark:bg-[#292929] hover:bg-gray-400 
                      text-[#6E8091] dark:text-[#696969] text-[12px] font-medium p-0 rounded 
                      inline-flex items-center w-[100px] h-[36px] justify-center"
                >
                    Add Expense
                </button>
                <button
                    // onClick={() => setShowNotepadModal(false)}
                    type="button"
                    className="cursor-pointer bg-[transparent] hover:bg-[#F0F0F0] text-[#6E8091] dark:text-[#828282] text-[12px] font-medium p-0 rounded 
                      inline-flex items-center w-[100px] h-[36px] justify-center"
                >
                    Cancel
                </button>
            </Box>
        </form>
    )
}

export default AddExpensePage;