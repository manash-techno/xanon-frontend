import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from "@mui/material";
import { Transition } from "../layouts/DashboardLayout/FAQs/Transition";

export const DeleteExpenseModal = ({
  showDeleteExpenseModal,
  onDelete,
  onCancel,
}: {
  showDeleteExpenseModal: boolean;
  onDelete: () => void;
  onCancel: () => void;
}) => {


  return (
    <Dialog
      open={showDeleteExpenseModal}
      onClose={onCancel}
      slots={{ transition: Transition }}
      slotProps={{
        paper: {
          className:
            "bg-[#fff!important] dark:bg-[#2E2E2E!important] text-[#1F1F1F] dark:text-[#fff]",
        },
      }}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "528px", // Set your width here
            maxHeight: "calc(100vh - 32px)",
            overflow: "auto",
            borderRadius: '16px'
          },
        },
      }}
    >
      {/* Dialog Title with Dark Mode */}
      <DialogTitle className="p-4 pb-0 border-b border-0 ">
        <div className="flex items-center justify-between space-x-2">
          <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Delete Expense
          </span>
          <IconButton
            type="button"
            onClick={() => onCancel()}
          >
            <CloseIcon className="text-[#7c7c7c] dark:text-gray-[#828282]" />
          </IconButton>
        </div>
      </DialogTitle>

      {/* Dialog Content with Dark Mode */}
      <DialogContent dividers className="bg-[transparent] border-0 pt-0">
        <Box className="flex flex-col gap-3">
          <Box className="flex items-center justify-center w-[80px] h-[80px] rounded-md bg-[#FFEAE5]">
            <img src="/assets/icons/delete-btn.svg" alt="" />
          </Box>
          <Box className="flex gap-1 items-center">
            <Typography className="text-[#1E1E1E] dark:text-[#fff]">
              Are you sure want to delete this{" "}
              {/* <strong>2 expenses</strong>  */}
              from the list?
            </Typography>
          </Box>

          <Box className="flex gap-4 pb-4 mt-4">
            <button
              onClick={() => onDelete()}
              type="button"
              className="cursor-pointer bg-[#E50000] dark:bg-[#292929] hover:bg-gray-400 
               text-[#FFFFFF] dark:text-[#FFFFFF] text-[12px] font-medium p-0 rounded 
               inline-flex items-center w-[120px] h-[36px] justify-center"
            >
              Delete
            </button>
            <button
              onClick={() => {
                onCancel();
              }}
              type="button"
              className="cursor-pointer bg-[transparent] hover:bg-[#F0F0F0] text-[#6E8091] dark:text-[#828282] text-[12px] font-medium p-0 rounded 
               inline-flex items-center w-[100px] h-[36px] justify-center"
            >
              Cancel
            </button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
