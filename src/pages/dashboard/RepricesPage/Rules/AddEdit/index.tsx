import { AssetsConfig } from "@/config/assetsConfig";
import { Box, Tooltip } from "@mui/material";
import { LuInfo } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const AddEditRulesPage = () => {
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
            Add Rules
          </h1>
        </div>
      </Box>
      <Box className="flex flex-col gap-3">
        <div className="flex flex-wrap -m-[8px]">
          <div className="w-full p-[8px]">
            <div className="flex flex-wrap -m-[8px]">
              <div className="w-full max-w-[33.33%] p-[8px]">
                <label
                  htmlFor=""
                  className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block"
                >
                  Rules Name
                </label>
                <input
                  type="text"
                  className="rounded-md px-3 py-2.5 border text-sm w-full
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                ></input>
              </div>
            </div>
          </div>

          <div className="w-full p-[8px]">
            <label
              htmlFor=""
              className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block font-bold text-[16px]"
            >
              Match Offer
            </label>
            <div className="checkagree-common-s1 flex items-start gap-2">
              <div className="checkcol">
                <input type="radio" name="" className="theme-radio-s1" id="" />
              </div>
              <label
                htmlFor=""
                className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
              >
                Price Match
              </label>
            </div>
          </div>

          <div className="w-full p-[8px]">
            <label
              htmlFor=""
              className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block"
            >
              Price Match - Guard
            </label>

            <div className="flex flex-col gap-y-2">
              <div className="checkagree-common-s1 flex items-start gap-2">
                <div className="checkcol">
                  <input
                    type="checkbox"
                    name=""
                    className="theme-toggle-s1"
                    id=""
                  />
                </div>
                <label
                  htmlFor=""
                  className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
                >
                  If Prime offer, do not price lower than the calculated Prime
                  price
                </label>
              </div>
              <div className="checkagree-common-s1 flex items-start gap-2">
                <div className="checkcol">
                  <input
                    type="checkbox"
                    name=""
                    className="theme-toggle-s1"
                    id=""
                  />
                </div>
                <label
                  htmlFor=""
                  className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
                >
                  If Non Prime offer, do not price lower than the calculated Non
                  Prime price
                </label>
              </div>
            </div>
          </div>

          <div className="w-full p-[8px]">
            <div className="flex flex-wrap -m-[8px]">
              <div className="w-full max-w-[33.33%] p-[8px]">
                <label
                  htmlFor=""
                  className="text-xs text-[#444444] dark:text-[#F2F2F2] mb-2 block"
                >
                  Prime
                </label>
                <div className="flex gap-y-2 flex-col">
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="radio"
                        name=""
                        className="theme-radio-s1"
                        id=""
                      />
                    </div>
                    <label
                      htmlFor=""
                      className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
                    >
                      Do not Match
                    </label>
                  </div>
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="radio"
                        name=""
                        className="theme-radio-s1"
                        id=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1 block"
                      >
                        Price above by fixed amount
                      </label>
                      <input
                        className="rounded-md px-3 py-2.5 border text-sm w-[240px]
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                        placeholder="Enter Amount"
                        type="text"
                      ></input>
                    </div>
                  </div>
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="radio"
                        name=""
                        className="theme-radio-s1"
                        id=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1 block"
                      >
                        Price below by fixed %
                      </label>
                      <input
                        className="rounded-md px-3 py-2.5 border text-sm w-[240px]
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                        placeholder="Enter Amount"
                        type="text"
                      ></input>
                    </div>
                  </div>
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="radio"
                        name=""
                        className="theme-radio-s1"
                        id=""
                      />
                    </div>
                    <label
                      htmlFor=""
                      className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
                    >
                      Match Price
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-[33.33%] p-[8px]">
                <label
                  htmlFor=""
                  className="text-xs text-[#444444] dark:text-[#F2F2F2] mb-2 block"
                >
                  Prime - Not Next Day Delivery
                </label>
                <div className="flex gap-y-2 flex-col">
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="radio"
                        name=""
                        className="theme-radio-s1"
                        id=""
                      />
                    </div>
                    <label
                      htmlFor=""
                      className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
                    >
                      Do not Match
                    </label>
                  </div>
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="radio"
                        name=""
                        className="theme-radio-s1"
                        id=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1 block"
                      >
                        Price above by fixed amount
                      </label>
                      <input
                        className="rounded-md px-3 py-2.5 border text-sm w-[240px]
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                        placeholder="Enter Amount"
                        type="text"
                      ></input>
                    </div>
                  </div>
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="radio"
                        name=""
                        className="theme-radio-s1"
                        id=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1 block"
                      >
                        Price below by fixed %
                      </label>
                      <input
                        className="rounded-md px-3 py-2.5 border text-sm w-[240px]
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                        placeholder="Enter Amount"
                        type="text"
                      ></input>
                    </div>
                  </div>
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="radio"
                        name=""
                        className="theme-radio-s1"
                        id=""
                      />
                    </div>
                    <label
                      htmlFor=""
                      className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
                    >
                      Match Price
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-[33.33%] p-[8px]">
                <label
                  htmlFor=""
                  className="text-xs text-[#444444] dark:text-[#F2F2F2] mb-2 block"
                >
                  Non Prime
                </label>
                <div className="flex gap-y-2 flex-col">
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="radio"
                        name=""
                        className="theme-radio-s1"
                        id=""
                      />
                    </div>
                    <label
                      htmlFor=""
                      className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
                    >
                      Do not Match
                    </label>
                  </div>
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="radio"
                        name=""
                        className="theme-radio-s1"
                        id=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1 block"
                      >
                        Price above by fixed amount
                      </label>
                      <input
                        className="rounded-md px-3 py-2.5 border text-sm w-[240px]
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                        placeholder="Enter Amount"
                        type="text"
                      ></input>
                    </div>
                  </div>
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="radio"
                        name=""
                        className="theme-radio-s1"
                        id=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1 block"
                      >
                        Price below by fixed %
                      </label>
                      <input
                        className="rounded-md px-3 py-2.5 border text-sm w-[240px]
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                        placeholder="Enter Amount"
                        type="text"
                      ></input>
                    </div>
                  </div>
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="radio"
                        name=""
                        className="theme-radio-s1"
                        id=""
                      />
                    </div>
                    <label
                      htmlFor=""
                      className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
                    >
                      Match Price
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full p-[8px]">
            <label
              htmlFor=""
              className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block font-bold text-[16px]"
            >
              Automations
            </label>
            <div className="flex flex-wrap -m-[8px]">
              <div className="w-full max-w-[33.33%] p-[8px]">
                <label
                  htmlFor=""
                  className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block font-bold text-[16px]"
                >
                  No Orders
                </label>
                <div className="flex gap-y-2 flex-col">
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="checkbox"
                        name=""
                        className="theme-checkbox-s1"
                        id=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1 block"
                      >
                        If no orders in last 30 days
                      </label>
                      <select
                        className="rounded-md px-3 py-2.5 border text-sm w-[240px]
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff] select1"
                      >
                        <option value="">Select Rule</option>
                      </select>
                    </div>
                  </div>
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="checkbox"
                        name=""
                        className="theme-checkbox-s1"
                        id=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1 block"
                      >
                        If no orders in last 60 days
                      </label>
                      <select
                        className="rounded-md px-3 py-2.5 border text-sm w-[240px]
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff] select1"
                      >
                        <option value="">Select Rule</option>
                      </select>
                    </div>
                  </div>
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="checkbox"
                        name=""
                        className="theme-checkbox-s1"
                        id=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1 block"
                      >
                        If no orders in last 90 days
                      </label>
                      <select
                        className="rounded-md px-3 py-2.5 border text-sm w-[240px]
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff] select1"
                      >
                        <option value="">Select Rule</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-[33.33%] p-[8px]">
                <label
                  htmlFor=""
                  className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block font-bold text-[16px]"
                >
                  Stock Drop
                </label>
                <div className="flex gap-y-2 flex-col">
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="checkbox"
                        name=""
                        className="theme-checkbox-s1"
                        id=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1 block"
                      >
                        If no orders in last 30 days
                      </label>
                      <select
                        className="rounded-md px-3 py-2.5 border text-sm w-[240px]
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff] select1"
                      >
                        <option value="">Select Rule</option>
                      </select>
                    </div>
                  </div>
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="checkbox"
                        name=""
                        className="theme-checkbox-s1"
                        id=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1 block"
                      >
                        If no orders in last 60 days
                      </label>
                      <select
                        className="rounded-md px-3 py-2.5 border text-sm w-[240px]
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff] select1"
                      >
                        <option value="">Select Rule</option>
                      </select>
                    </div>
                  </div>
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="checkbox"
                        name=""
                        className="theme-checkbox-s1"
                        id=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1 block"
                      >
                        If no orders in last 90 days
                      </label>
                      <select
                        className="rounded-md px-3 py-2.5 border text-sm w-[240px]
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff] select1"
                      >
                        <option value="">Select Rule</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-[33.33%] p-[8px]">
                <label
                  htmlFor=""
                  className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block font-bold text-[16px]"
                >
                  Stock Ages
                </label>
                <div className="flex gap-y-2 flex-col">
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="checkbox"
                        name=""
                        className="theme-checkbox-s1"
                        id=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1 block"
                      >
                        If no orders in last 30 days
                      </label>
                      <select
                        className="rounded-md px-3 py-2.5 border text-sm w-[240px]
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff] select1"
                      >
                        <option value="">Select Rule</option>
                      </select>
                    </div>
                  </div>
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="checkbox"
                        name=""
                        className="theme-checkbox-s1"
                        id=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1 block"
                      >
                        If no orders in last 60 days
                      </label>
                      <select
                        className="rounded-md px-3 py-2.5 border text-sm w-[240px]
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff] select1"
                      >
                        <option value="">Select Rule</option>
                      </select>
                    </div>
                  </div>
                  <div className="checkagree-common-s1 flex items-start gap-2">
                    <div className="checkcol">
                      <input
                        type="checkbox"
                        name=""
                        className="theme-checkbox-s1"
                        id=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor=""
                        className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1 block"
                      >
                        If no orders in last 90 days
                      </label>
                      <select
                        className="rounded-md px-3 py-2.5 border text-sm w-[240px]
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff] select1"
                      >
                        <option value="">Select Rule</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full p-[8px]">
            <label
              htmlFor=""
              className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] mb-2 block font-bold text-[16px]"
            >
              Minimums & Maximums
            </label>
            <div className="flex flex-col gap-y-3">
              <div className="flex flex-wrap -m-[8px]">
                <div className="w-full max-w-[240px] p-[8px]">
                  <Box className="flex items-center mb-2 gap-2">
                    <label className="text-xs text-[#1E1E1E] dark:text-[#fff] block">
                      Minimum ROI%
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
                      className="rounded-md px-3 py-2.5 border text-sm w-full
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                      placeholder="0"
                      type="text"
                    />
                    <span className="absolute -translate-y-2/4 text-[#6E8091] font-normal text-sm leading-[150%] tracking-[-1%] right-2.5 top-2/4">
                      %
                    </span>
                  </div>
                </div>
                <div className="w-full max-w-[240px] p-[8px]">
                  <Box className="flex items-center mb-2 gap-2">
                    <label className="text-xs text-[#1E1E1E] dark:text-[#fff] block">
                      Maximum ROI%
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
                      className="rounded-md px-3 py-2.5 border text-sm w-full
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                      placeholder="0"
                      type="text"
                    />
                    <span className="absolute -translate-y-2/4 text-[#6E8091] font-normal text-sm leading-[150%] tracking-[-1%] right-2.5 top-2/4">
                      %
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -m-[8px]">
                <div className="w-full max-w-[240px] p-[8px]">
                  <Box className="flex items-center mb-2 gap-2">
                    <label className="text-xs text-[#1E1E1E] dark:text-[#fff] block">
                      Absolute Minimum ROI%
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
                      className="rounded-md px-3 py-2.5 border text-sm w-full
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                      placeholder="0"
                      type="text"
                    />
                    <span className="absolute -translate-y-2/4 text-[#6E8091] font-normal text-sm leading-[150%] tracking-[-1%] right-2.5 top-2/4">
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-[8px]">
            <div className="flex gap-y-2 flex-col">
              <div className="checkagree-common-s1 flex items-start gap-2">
                <div className="checkcol">
                  <input
                    type="checkbox"
                    name=""
                    className="theme-checkbox-s1"
                    id=""
                  />
                </div>
                <div className="w-full max-w-[240px] ">
                  <Box className="flex items-center mb-2 gap-2">
                    <label className="text-xs text-[#1E1E1E] dark:text-[#fff] block">
                      Minimum ROI% after 30 days
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
                      className="rounded-md px-3 py-2.5 border text-sm w-full
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                      placeholder="0"
                      type="text"
                    />
                    <span className="absolute -translate-y-2/4 text-[#6E8091] font-normal text-sm leading-[150%] tracking-[-1%] right-2.5 top-2/4">
                      %
                    </span>
                  </div>
                </div>
              </div>
              <div className="checkagree-common-s1 flex items-start gap-2">
                <div className="checkcol">
                  <input
                    type="checkbox"
                    name=""
                    className="theme-checkbox-s1"
                    id=""
                  />
                </div>
                <div className="w-full max-w-[240px] ">
                  <Box className="flex items-center mb-2 gap-2">
                    <label className="text-xs text-[#1E1E1E] dark:text-[#fff] block">
                      Minimum ROI% after 60 days
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
                      className="rounded-md px-3 py-2.5 border text-sm w-full
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                      placeholder="0"
                      type="text"
                    />
                    <span className="absolute -translate-y-2/4 text-[#6E8091] font-normal text-sm leading-[150%] tracking-[-1%] right-2.5 top-2/4">
                      %
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="w-full p-[8px]">
            <label
              htmlFor=""
              className="text-xs text-[#1E1E1E] dark:text-[#F2F2F2] block font-bold text-[16px]"
            >
              Exclude Sellers
            </label>

          </div>

          <div className="w-full p-[8px]">

            <div className="flex flex-col gap-y-2">

              <div className="checkagree-common-s1 flex items-start gap-2">
                <div className="checkcol">
                  <input
                    type="checkbox"
                    name=""
                    className="theme-toggle-s1"
                    id=""
                  />
                </div>
                <label
                  htmlFor=""
                  className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
                >
                  Exclude Amazon
                </label>
              </div>
              <div className="checkagree-common-s1 flex items-start gap-2">
                <div className="checkcol">
                  <input
                    type="checkbox"
                    name=""
                    className="theme-toggle-s1"
                    id=""
                  />
                </div>
                <label
                  htmlFor=""
                  className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
                >
                  Exclude Amazon_EU
                </label>
              </div>
              <div className="checkagree-common-s1 flex items-start gap-2">
                <div className="checkcol">
                  <input
                    type="checkbox"
                    name=""
                    className="theme-toggle-s1"
                    id=""
                  />
                </div>
                <label
                  htmlFor=""
                  className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]"
                >
                  Exclude Sellers
                </label>
              </div>
            </div>
          </div>


        </div>
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
            className="cursor-pointer bg-[transparent] text-[#828282] dark:text-[#828282] 
            text-[12px] font-medium p-0 rounded 
              inline-flex items-center w-[100px] h-[36px] justify-center"
          >
            Cancel
          </button>
        </Box>
      </Box>
    </>
  );
};

export default AddEditRulesPage;
