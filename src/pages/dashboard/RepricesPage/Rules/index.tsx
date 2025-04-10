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
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold text-xl leading-[150%] tracking-[-1%] text-[#1E1E1E]">
                Main Default Rule
              </div>
              <button
                type="button"
                className="flex items-center cursor-pointer bg-[transparent]"
              >
                <img src="/assets/images/editgray.svg" alt="" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="w-full">
                <div className="font-semibold text-base leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1">
                  Price Match
                </div>
                <ul className="list-disc list-outside font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] pl-4">
                  <li>
                    If lowest price is Prime offer, then match offer price
                  </li>
                  <li>
                    Do not match Prime Offers that do not have next day delivery
                    unless no prime with next day delivery
                  </li>
                  <li>Do not match Non-Prime Offers</li>
                </ul>
              </div>
              <div className="w-full">
                <div className="font-semibold text-base leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1">
                Price Match - Guard
                </div>
                <div className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]">Not Required</div>
              </div>
              <div className="w-full">
                <div className="font-semibold text-base leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1">
                Min/Max
                </div>
                <ul className="list-disc list-outside font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] pl-4">
                  <li>
                  Keep a minimum ROI of 5.00%
                  </li>
                  <li>There are no maximum set</li>
                </ul>
              </div>
              <div className="w-full">
                <div className="font-semibold text-base leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1">
                Exclude Sellers
                </div>
               <div className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]">Not Required</div>
              </div>
            </div>
          </Box>
        </Box>
        <Box className="w-full max-w-[33.33%] p-[16px]">
          <Box className="border border-solid border-[#EEEEEE] rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold text-xl leading-[150%] tracking-[-1%] text-[#1E1E1E]">
                Main Default Rule
              </div>
              <button
                type="button"
                className="flex items-center cursor-pointer bg-[transparent]"
              >
                <img src="/assets/images/editgray.svg" alt="" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="w-full">
                <div className="font-semibold text-base leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1">
                  Price Match
                </div>
                <ul className="list-disc list-outside font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] pl-4">
                  <li>
                    If lowest price is Prime offer, then match offer price
                  </li>
                  <li>
                    Do not match Prime Offers that do not have next day delivery
                    unless no prime with next day delivery
                  </li>
                  <li>Do not match Non-Prime Offers</li>
                </ul>
              </div>
              <div className="w-full">
                <div className="font-semibold text-base leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1">
                Price Match - Guard
                </div>
                <div className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]">Not Required</div>
              </div>
              <div className="w-full">
                <div className="font-semibold text-base leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1">
                Min/Max
                </div>
                <ul className="list-disc list-outside font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] pl-4">
                  <li>
                  Keep a minimum ROI of 5.00%
                  </li>
                  <li>There are no maximum set</li>
                </ul>
              </div>
              <div className="w-full">
                <div className="font-semibold text-base leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1">
                Exclude Sellers
                </div>
               <div className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]">Not Required</div>
              </div>
            </div>
          </Box>
        </Box>
        <Box className="w-full max-w-[33.33%] p-[16px]">
          <Box className="border border-solid border-[#EEEEEE] rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold text-xl leading-[150%] tracking-[-1%] text-[#1E1E1E]">
                Main Default Rule
              </div>
              <button
                type="button"
                className="flex items-center cursor-pointer bg-[transparent]"
              >
                <img src="/assets/images/editgray.svg" alt="" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="w-full">
                <div className="font-semibold text-base leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1">
                  Price Match
                </div>
                <ul className="list-disc list-outside font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] pl-4">
                  <li>
                    If lowest price is Prime offer, then match offer price
                  </li>
                  <li>
                    Do not match Prime Offers that do not have next day delivery
                    unless no prime with next day delivery
                  </li>
                  <li>Do not match Non-Prime Offers</li>
                </ul>
              </div>
              <div className="w-full">
                <div className="font-semibold text-base leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1">
                Price Match - Guard
                </div>
                <div className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]">Not Required</div>
              </div>
              <div className="w-full">
                <div className="font-semibold text-base leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1">
                Min/Max
                </div>
                <ul className="list-disc list-outside font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] pl-4">
                  <li>
                  Keep a minimum ROI of 5.00%
                  </li>
                  <li>There are no maximum set</li>
                </ul>
              </div>
              <div className="w-full">
                <div className="font-semibold text-base leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1">
                Exclude Sellers
                </div>
               <div className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]">Not Required</div>
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RulesPage;
