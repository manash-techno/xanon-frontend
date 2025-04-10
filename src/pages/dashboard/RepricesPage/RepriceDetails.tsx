import { AssetsConfig } from "@/config/assetsConfig";
import { Box, Typography } from "@mui/material";
import { JSX } from "react";
import { useNavigate } from "react-router-dom";

const RepriceDetailsPage: () => JSX.Element = () => {
  const navigate = useNavigate()
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
            onClick={() => navigate(-1)}
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
          <Box className="w-full flex items-center gap-2">
            <Typography className="text-[#1E1E1E] dark:text-[#fff]">
              Country:
            </Typography>
            <Box className="">
              <img src="/assets/images/ukLogo.png" alt="" />
              {/* <img src="/assets/images/ukLogo-white.png" alt="" /> */}
            </Box>
          </Box>
        </Box>
        <Box className="w-full max-w-[744px]">
          <Box className="flex flex-wrap -m-[6px] gap-y-2">
            <Box className="w-full p-[6px]">
              <Box className="flex flex-wrap -m-[6px]">
                <Box className="w-full max-w-[33.33%] p-[6px]">
                  <label
                    htmlFor=""
                    className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block"
                  >
                    Reprice Rule
                  </label>
                  <select
                    className="rounded-md px-3 py-2.5 border text-sm w-full
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff] select1"
                  >
                    <option value="">My Default rule</option>
                  </select>
                </Box>
              </Box>
            </Box>

            <Box className="w-full p-[6px]">
              <Box className="flex flex-wrap -m-[6px]">
                <Box className="w-full max-w-[33.33%] p-[6px]">
                  <label
                    htmlFor=""
                    className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block"
                  >
                    Current Price (£)
                  </label>
                  <Box
                    className="rounded-md px-3 py-2.5 border text-sm w-full
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#0077E5] dark:text-[#0077E5] flex items-center gap-[8px]"
                  >
                    <span>7.63</span>{" "}
                    <span>
                      <img src="/assets/check.svg" alt="" />
                    </span>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box className="w-full max-w-[400px] p-[6px]">
              <Box className="flex flex-wrap -m-[6px]">
                <Box className="w-full max-w-[20%] p-[6px]">
                  <label
                    htmlFor=""
                    className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block"
                  >
                    Buy Box
                  </label>
                  <Box className="flex items-center gap-[8px] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    <span>£7.63</span>
                    <span>
                      <img src="/assets/check.svg" alt="" />
                    </span>
                  </Box>
                </Box>
                <Box className="w-full max-w-[20%] p-[6px]">
                  <label
                    htmlFor=""
                    className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block"
                  >
                    Position
                  </label>
                  <Box className="flex items-center gap-[8px] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    <span>4 (4)</span>
                  </Box>
                </Box>
                <Box className="w-full max-w-[20%] p-[6px]">
                  <label
                    htmlFor=""
                    className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block"
                  >
                    CoG
                  </label>
                  <Box className="flex items-center gap-[8px] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    <span>£2.45</span>
                  </Box>
                </Box>
                <Box className="w-full max-w-[20%] p-[6px]">
                  <label
                    htmlFor=""
                    className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block"
                  >
                    Fees
                  </label>
                  <Box className="flex items-center gap-[8px] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    <span>£3.68</span>
                  </Box>
                </Box>
                <Box className="w-full max-w-[20%] p-[6px]">
                  <label
                    htmlFor=""
                    className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block"
                  >
                    VAT
                  </label>
                  <Box className="flex items-center gap-[8px] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    <span>£0.86</span>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box className="w-full p-[6px]">
              <Box className="flex flex-wrap -m-[6px]">
                <Box className="w-full max-w-[33.33%] p-[6px]">
                  <label
                    htmlFor=""
                    className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block"
                  >
                    Profit (£)
                  </label>
                  <input
                    type="text"
                    className="rounded-md px-3 py-2.5 border text-sm w-full
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]" value={'0.64'}
                  ></input>
                </Box>
                <Box className="w-full max-w-[33.33%] p-[6px]">
                  <label
                    htmlFor=""
                    className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block"
                  >
                    ROI (%)
                  </label>
                  <input
                    type="text"
                    className="rounded-md px-3 py-2.5 border text-sm w-full
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]" value={'31.37'}
                  ></input>
                </Box>
                <Box className="w-full max-w-[33.33%] p-[6px]">
                  <label
                    htmlFor=""
                    className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block"
                  >
                    Margin (%)
                  </label>
                  <input
                    type="text"
                    className="rounded-md px-3 py-2.5 border text-sm w-full
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]" value={'10.06'}
                  ></input>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className="flex gap-4 pt-4">
          <button
            type="button"
            className="cursor-pointer bg-[#F0F0F0] dark:bg-[#292929] hover:bg-gray-400 
              text-[#6E8091] dark:text-[#696969] text-[12px] font-medium p-0 rounded 
              inline-flex items-center w-[100px] h-[36px] justify-center"
          >
            Save
          </button>
          <button
            type="button"
            className="cursor-pointer bg-[transparent] text-[#E50000] dark:text-[#E50000] 
            text-[12px] font-medium p-0 rounded 
              inline-flex items-center w-[100px] h-[36px] justify-center"
          >
            Reset
          </button>
        </Box>
        </Box>
      </Box>
    </>
  );
};

export default RepriceDetailsPage;
