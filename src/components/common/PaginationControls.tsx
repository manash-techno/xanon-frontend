import ReactPaginate from "react-paginate";
import { JSX } from "react";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (selectedPage: number) => void;
}

export const PaginationControls: ({currentPage, totalPages, onPageChange}: PaginationControlsProps) => JSX.Element = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    return (
        <div className="flex justify-center items-center py-4 w-full">
            <ReactPaginate
                previousLabel="← Previous"
                nextLabel="Next →"
                breakLabel="..."
                pageCount={totalPages}
                forcePage={currentPage - 1} // Ensure correct active page selection
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={(event) => onPageChange(event.selected + 1)}
                containerClassName="flex space-x-2 p-2 w-full justify-center"
                pageClassName="reactPaginate-click px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                activeClassName="bg-blue-600 text-white dark:bg-blue-500"
                previousClassName="reactPaginate-click px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md cursor-pointer transition-colors"
                nextClassName="reactPaginate-click px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md cursor-pointer transition-colors"
                disabledClassName="opacity-50 cursor-not-allowed"
            />
        </div>
    );
};
