import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { ReactImage } from "../ui/ReactImage";
import { ReactButton } from "../ui/ReactButton";
import { AssetsConfig } from "@/config/assetsConfig";
import { Label } from "../ui/Label";
import { Textarea } from "../ui/Textarea";
import { Transition } from "../layouts/DashboardLayout/FAQs/Transition";
import { Box } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CloseIcon from "@mui/icons-material/Close";
import { LuInfo } from "react-icons/lu";
import { Tooltip } from "@mui/material";

export const CostOfGoodsModal = ({
  showCostOfGoodsModal,
  setShowCostOfGoodsModal,
}: {
  showCostOfGoodsModal: boolean;
  setShowCostOfGoodsModal: (value: boolean) => void;
}) => (
  <Dialog
    open={showCostOfGoodsModal}
    onOpenChange={setShowCostOfGoodsModal}
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
        },
      },
    }}
  >
    {/* Dialog Title with Dark Mode */}
    <DialogTitle className="p-4 pb-0 border-b border-0 ">
      <div className="flex items-center justify-between space-x-2">
        <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Cost of Goods
        </span>
        <IconButton
          type="button"
          onClick={() => setShowCostOfGoodsModal(false)}
        >
          <CloseIcon className="text-[#7c7c7c] dark:text-gray-[#828282]" />
        </IconButton>
      </div>
    </DialogTitle>

    {/* Dialog Content with Dark Mode */}
    <DialogContent dividers className="bg-[transparent] border-0 pt-0">
      <Box className="flex flex-col gap-3">
        <Box className="flex gap-1 items-center">
          <Typography className="text-[#1E1E1E] dark:text-[#fff]">
            203-4886959-8683560
          </Typography>
          <ArrowOutwardIcon
            className="text-[#6E8091] dark:text-[#828282]"
            style={{ fontSize: "20px" }}
          />
        </Box>

        <Box className="flex gap-4 items-center">
          <Box className="bg-[#F0F0F0] dark:bg-[#292929] w-[60px] h-[60px] rounded-[6px] flex items-center justify-center flex-[0_0_auto]">
            <img src="/assets/images/box-icon.svg" alt="" />
          </Box>
          <Box className="">
            <Typography className="text-[#1E1E1E] dark:text-[#fff]">
              Schwarzkopf Silhouette Super Hold Hairspray 300ml
            </Typography>
            <Typography className="text-[#6E8091] text-[14px] dark:text-[#828282]">
              3V-YU78-8UOF
            </Typography>
            <Typography className="text-[#6E8091] text-[14px] dark:text-[#828282]">
              B007OTJ4D4
            </Typography>
          </Box>
        </Box>
        <Box className="flex flex-wrap">
          <Box className="w-full max-w-[120px]">
            <Typography className="text-[#1E1E1E]  dark:text-[#fff]">
              New
            </Typography>
            <Typography className="text-[#6E8091] text-[14px] text-[#828282]">
              Beauty
            </Typography>
          </Box>
        </Box>
        <Box className="flex flex-col gap-4">
          <Box className="w-full max-w-[240px]">
            <label className="text-xs text-[#1E1E1E] dark:text-[#fff] mb-2 block">
              Shipping Cost
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Shipping Cost"
                className="rounded-md px-3 py-2.5 border text-sm w-full pl-8
                                                   bg-white dark:bg-[#242424]
                                               border-[#EEEEEE] dark:border-[#373737]
                                               text-[#1E1E1E] dark:text-[#fff]"
              />
              <div className="absolute top-2.5 left-3 cursor-pointer dark:invert">
                £
              </div>
            </div>
          </Box>
          <Box className="w-full max-w-[240px]">
            <label className="text-xs text-[#1E1E1E] dark:text-[#fff] mb-2 block">
              VAT Rate
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter VAT Rate"
                className="rounded-md px-3 py-2.5 border text-sm w-full pl-8
                                                   bg-white dark:bg-[#242424]
                                               border-[#EEEEEE] dark:border-[#373737]
                                               text-[#1E1E1E] dark:text-[#fff]"
              />
              <div className="absolute top-2.5 left-3 cursor-pointer dark:invert">
                £
              </div>
            </div>
          </Box>
          <Box className="w-full max-w-[240px]">
            <Box className="flex items-center mb-2 gap-2">
              <label className="text-xs text-[#1E1E1E] dark:text-[#fff] block">
                Unit Cost
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
                  title={`The total price include VAT`}
                >
                  <LuInfo />
                </Tooltip>
              </Box>
            </Box>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Unit Cost"
                className="rounded-md px-3 py-2.5 border text-sm w-full pl-8
                                                   bg-white dark:bg-[#242424]
                                               border-[#EEEEEE] dark:border-[#373737]
                                               text-[#1E1E1E] dark:text-[#fff]"
              />
              <div className="absolute top-2.5 left-3 cursor-pointer dark:invert">
                £
              </div>
            </div>
          </Box>
        </Box>
        <Box className="flex gap-4 pb-4 mt-4">
          <button
            onClick={() => setShowCostOfGoodsModal(false)}
            type="button"
            className="cursor-pointer bg-[#F0F0F0] dark:bg-[#292929] hover:bg-gray-400 
              text-[#6E8091] dark:text-[#696969] text-[12px] font-medium p-0 rounded 
              inline-flex items-center w-[100px] h-[36px] justify-center"
          >
            Save
          </button>
          <button
            onClick={() => setShowCostOfGoodsModal(false)}
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
