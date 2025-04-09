import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { LuInfo } from "react-icons/lu";
import { Transition } from "../layouts/DashboardLayout/FAQs/Transition";
import { ShipmentItems } from "@/types/shipmentTypes";
import { useEffect, useState } from "react";
import { useUpdateCOGMutation } from "@/store/api/shipmentApi";

export const DeleteExpenseModal = ({
  showDeleteExpenseModal,
  setShowDeleteExpenseModal,
  selectedItem,
}: {
  showDeleteExpenseModal: boolean;
  setShowDeleteExpenseModal: (value: boolean) => void;
  selectedItem: ShipmentItems;
}) => {
  const [shippingCost, setShippingCost] = useState("0");
  const [vatRate, setVatRate] = useState("0");
  const [unitCost, setUnitCost] = useState<string>("0");
  // const { updateCog, isUpdateSuccess } = useShipmentStore()
  const [updateCOG] = useUpdateCOGMutation();

  useEffect(() => {
    if (selectedItem) {
      setVatRate(selectedItem?.vat_cog?.toString() || "0");
      setUnitCost(selectedItem?.unit_cost?.toString() || "0");
    }
  }, [selectedItem]);

  const handleSave = async () => {
    if (selectedItem) {
      try {
        const res = await updateCOG({
          id: selectedItem.id.toString(),
          unit_cost: unitCost,
          vat_cog: vatRate,
        });
        console.log("res", res);
        setShowDeleteExpenseModal(false);
        resetState();
      } catch (error) {}
    }
  };

  const resetState = () => {
    setShippingCost("0");
    setVatRate(selectedItem?.vat_cog?.toString() || "0");
    setUnitCost(selectedItem?.unit_cost?.toString() || "0");
  };

  return (
    <Dialog
      open={showDeleteExpenseModal}
      onClose={() => {
        setShowDeleteExpenseModal(false);
        resetState();
      }}
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
            onClick={() => setShowDeleteExpenseModal(false)}
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
              Are you sure want to delete <strong>2 expenses</strong> from the list?
            </Typography>
          </Box>

          <Box className="flex gap-4 pb-4 mt-4">
            <button
              onClick={() => handleSave()}
              type="button"
              className="cursor-pointer bg-[#E50000] dark:bg-[#292929] hover:bg-gray-400 
               text-[#FFFFFF] dark:text-[#FFFFFF] text-[12px] font-medium p-0 rounded 
               inline-flex items-center w-[120px] h-[36px] justify-center"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setShowDeleteExpenseModal(false);
                resetState();
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
