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

export const NotepadModal = ({
  showNotepadModal,
  setShowNotepadModal,
}: {
  showNotepadModal: boolean;
  setShowNotepadModal: (value: boolean) => void;
}) => (
  <Dialog
    open={showNotepadModal}
    onOpenChange={setShowNotepadModal}
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
          maxHeight: 'calc(100vh - 32px)',
          overflow: 'auto'
        },
      },
    }}
  >
    {/* Dialog Title with Dark Mode */}
    <DialogTitle className="p-4 border-b border-0 ">
      <div className="flex items-center justify-between space-x-2">
        <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Notepad
        </span>
        <IconButton type="button"
         onClick={() => setShowNotepadModal(false)}>
          <CloseIcon className="text-[#7c7c7c] dark:text-gray-[#828282]" />
        </IconButton>
      </div>
    </DialogTitle>

    {/* Dialog Content with Dark Mode */}
    <DialogContent dividers className="bg-[transparent] border-0 pt-0">
      <Box className="flex flex-col gap-3">
        <Box className="flex gap-4">
          <Typography className="text-[#1E1E1E] dark:text-[#fff] font-light">
            Jul 25, 24
          </Typography>
          <Typography className="text-[#6E8091] dark:text-[#828282] font-light">
            11:22 AM
          </Typography>
        </Box>
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
          <Box className="w-full max-w-[120px]">
            <Typography className="text-[#1E1E1E]  dark:text-[#fff]">
              Pending
            </Typography>
            <Typography className="text-[#6E8091] text-[14px] text-[#828282]">
              Amazon.uk
            </Typography>
          </Box>
          <Box className="w-full max-w-[120px]">
            <Typography className="text-[#1E1E1E]  dark:text-[#fff]">
              1
            </Typography>
            <Typography className="text-[#6E8091] text-[14px] text-[#828282]">
              Customer Order
            </Typography>
          </Box>
        </Box>
        <Box className="">
          <Box className="flex">
            <Typography className="text-[#1E1E1E] w-[120px]  dark:text-[#fff]">
              Sales
            </Typography>
            <Typography className="text-[#1E1E1E]  dark:text-[#fff]">
              £9.40
            </Typography>
          </Box>
          <Box className="flex">
            <Typography className="text-[#6E8091] text-[14px] w-[120px] text-[#828282]">
              ROI
            </Typography>
            <Typography className="text-[#6E8091] text-[14px] text-[#828282]">
              45.67%
            </Typography>
          </Box>
          <Box className="flex">
            <Typography className="text-[#6E8091] text-[14px] w-[120px] text-[#828282]">
              Margin
            </Typography>
            <Typography className="text-[#6E8091] text-[14px] text-[#828282]">
              £0.44
            </Typography>
          </Box>
          <Box className="flex">
            <Typography className="text-[#6E8091] text-[14px] w-[120px] text-[#828282]">
              VAT
            </Typography>
            <Typography className="text-[#6E8091] text-[14px] text-[#828282]">
              15.90%
            </Typography>
          </Box>
          <Box className="flex">
            <Typography className="text-[#6E8091] text-[14px] w-[120px] text-[#828282]">
              Fees
            </Typography>
            <Typography className="text-[#6E8091] text-[14px] text-[#828282]">
              £0.44
            </Typography>
          </Box>
        </Box>
        <Box className="">
          <Box className="text-[12px] mb-1  dark:text-[#fff]">Notepad</Box>
          <textarea
            id="message"
            rows={5}
            className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 
              focus:ring-blue-500 focus:border-blue-500 dark:bg-[transparent] dark:border-[#4F4F4F] dark:placeholder-[#B4B4B4] 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            style={{ resize: "none" }}
            placeholder="Description"
          ></textarea>
        </Box>
        <Box className="flex gap-4 pb-4">
          <button
          onClick={() => setShowNotepadModal(false)}
            type="button"
            className="cursor-pointer bg-[#F0F0F0] dark:bg-[#292929] hover:bg-gray-400 
              text-[#6E8091] dark:text-[#696969] text-[12px] font-medium p-0 rounded 
              inline-flex items-center w-[100px] h-[36px] justify-center"
          >
            Save
          </button>
          <button
          onClick={() => setShowNotepadModal(false)}
            type="button"
            className="cursor-pointer bg-[transparent] hover:bg-[#F0F0F0] text-[#6E8091] dark:text-[#828282] text-[12px] font-medium p-0 rounded 
              inline-flex items-center w-[100px] h-[36px] justify-center"
          >
            Save
          </button>
        </Box>
      </Box>
    </DialogContent>
  </Dialog>
);
