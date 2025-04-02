import { useState, forwardRef, FC, ReactElement, JSX } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Slide,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TransitionProps } from "@mui/material/transitions";
import { ReactImage } from "@/components/ui/ReactImage.tsx";
import { AssetsConfig } from "@/config/assetsConfig.ts";
import CloseIcon from "@mui/icons-material/Close";

const Transition = forwardRef<
  HTMLDivElement,
  TransitionProps & { children?: ReactElement }
>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const FAQs: () => JSX.Element = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Info Icon as Button */}
      <ReactImage
        src={AssetsConfig.icons.infoIcon.src}
        width={24}
        height={24}
        alt={AssetsConfig.icons.infoIcon.alt}
        className="cursor-pointer"
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="faq-dialog-title"
        slots={{ transition: Transition }}
        slotProps={{
          paper: {
            className:
              "bg-[#fff!important] dark:bg-[#242424!important] text-[#1F1F1F] dark:text-[#fff]",
          },
        }}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "920px", // Set your width here
            },
          },
        }}
      >
        {/* Dialog Title with Dark Mode */}
        <DialogTitle className="p-4 border-b border-0 pb-0">
          <div className="flex items-center justify-between space-x-2 pl-2">
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Frequently Asked Questions
            </span>
            <IconButton
              type="button"
              onClick={handleClose}
            >
              <CloseIcon className="text-[#7c7c7c] dark:text-gray-[#828282]" />
            </IconButton>
          </div>
        </DialogTitle>

        {/* Dialog Content with Dark Mode */}
        <DialogContent dividers className="bg-[transparent] border-0">
          <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Accordion
              className="bg-[#fff!important] dark:bg-[#292929!important] text-gray-900 dark:text-gray-100 border border-[#EEEEEE] dark:border-[#373737] box-shadow-none"
              sx={{
                borderRadius: "8px!important",
                minHeight: "52px!important",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon className="text-[#7c7c7c] dark:text-gray-[#828282]" />
                }
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Box  className="text-gray-900 dark:text-gray-100" sx={{ fontWeight: '700' }}>
                  How do I get support?
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <span className="text-gray-700 dark:text-gray-300">
                  You can reach out via our support portal or email us at
                  support@example.com.
                </span>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className="bg-[#fff!important] dark:bg-[#292929!important] text-gray-900 dark:text-gray-100 border border-[#EEEEEE] dark:border-[#373737] box-shadow-none"
              sx={{
                "&:before": {
                  display: "none",
                },
                borderRadius: "8px!important",
                minHeight: "52px!important",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon className="text-[#7c7c7c] dark:text-gray-[#828282]" />
                }
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Box  className="text-gray-900 dark:text-gray-100" sx={{ fontWeight: '700' }}>
                  What is the refund policy?
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <span className="text-gray-700 dark:text-gray-300">
                  We offer a 30-day money-back guarantee on all purchases.
                </span>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className="bg-[#fff!important] dark:bg-[#292929!important] text-gray-900 dark:text-gray-100 border border-[#EEEEEE] dark:border-[#373737] box-shadow-none"
              sx={{
                "&:before": {
                  display: "none",
                },
                borderRadius: "8px!important",
                minHeight: "52px!important",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon className="text-[#7c7c7c] dark:text-gray-[#828282]" />
                }
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Box  className="text-gray-900 dark:text-gray-100" sx={{ fontWeight: '700' }}>
                  Do you provide API access?
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <span className="text-gray-700 dark:text-gray-300">
                  Yes! Our API documentation is available at
                  developers.example.com.
                </span>
              </AccordionDetails>
            </Accordion>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
