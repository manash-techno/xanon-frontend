import { AssetsConfig } from "@/config/assetsConfig";
import { Box, Typography } from "@mui/material";
import { JSX } from "react";

const RepriceDetailsPage: () => JSX.Element = () => {
  return (
    <>
      <Box className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-2 mb-6">
          <img
            src={AssetsConfig.icons.back.src}
            width={20}
            height={20}
            alt={AssetsConfig.icons.back.alt}
            className="cursor-pointer"
          />
          <h1 className="text-[#1E1E1E] dark:text-[#F2F2F2] font-bold text-xl">
            Reprice detail
          </h1>
        </div>
        <div className="text-[#0077E5] text-xs font-semibold">Rules</div>
      </Box>
      <Box className="flex flex-col gap-3">
        <Box className="flex flex-wrap">
          <Box className="w-full ">
            <Typography className="text-[#1E1E1E]  dark:text-[#fff]">
              Snooze start
            </Typography>
            <Typography className="text-[#6E8091] text-[14px] text-[#828282]">
              30 day breakeven
            </Typography>
          </Box>
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
        <Box className="flex">
          <Box className="w-full ">
            <Typography className="text-[#1E1E1E]  dark:text-[#fff]">
              Last updated
            </Typography>
            <Typography className="text-[#6E8091] text-[14px] text-[#828282]">
              Jul 25, 24 11:22 AM
            </Typography>
          </Box>
        </Box>
        <Box className="flex">
          <Box className="w-full ">
          <Typography className="text-[#1E1E1E]  dark:text-[#fff]">
          Country:
                </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RepriceDetailsPage;
