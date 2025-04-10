import { AssetsConfig } from "@/config/assetsConfig";
import { Box, Typography } from "@mui/material";
import { JSX } from "react";

const RulesPage = () => {
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
            Rules
          </h1>
        </div>
        <div className="text-[#0077E5] text-xs font-semibold cursor-pointer">
          Add Rules
        </div>
      </Box>

      <Box className="flex flex-wrap -m-[16px]">
        <Box className="w-full max-w-[33.33%] p-[16px]">
          <Box className="border border-solid border-[#EEEEEE] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="font-bold text-xl leading-[150%] tracking-[-1%] text-[#1E1E1E]">Main Default Rule</div>
              <button type="button" className="flex items-center">
                <img src="/assets/images/editgray.svg" alt="" />
              </button>
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RulesPage;
