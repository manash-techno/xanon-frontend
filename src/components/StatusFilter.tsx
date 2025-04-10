import { useDispatch } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { ReactButton } from "@/components/ui/ReactButton";

// 👇 Make component generic on T
interface StatusItem<T> {
  name: string;
  value: T;
}

interface StatusFilterProps<T> {
  selectedStatus: T;
  setSelectedStatus: (payload: T) => { payload: T; type: string };
  list: StatusItem<T>[];
}

const StatusFilter = <T extends string | number>({
  list,
  selectedStatus,
  setSelectedStatus,
}: StatusFilterProps<T>) => {
  const dispatch = useDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ReactButton variant="outline" className="w-60 justify-between p-2.5 text-sm">
          {list.find((status) => status.value === selectedStatus)?.name || "All"}
          <ChevronDownIcon className="ml-2 h-5 w-5" />
        </ReactButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="z-50 w-60 h-60 overflow-y-auto rounded-md border
                bg-white p-1 text-gray-900 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100
                transition-all duration-150 ease-in-out"
      >
        {list.map((status) => (
          <DropdownMenuItem
            key={String(status.value)}
            onClick={() => dispatch(setSelectedStatus(status.value))}
            className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm 
                            outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-800 
                            data-[disabled]:pointer-events-none data-[disabled]:opacity-50 
                            ${selectedStatus === status.value ? "bg-blue-500 text-white dark:bg-blue-600" : ""}`}
          >
            {status.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusFilter;
