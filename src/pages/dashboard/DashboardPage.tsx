import { Fragment, JSX, useState } from "react";
import { ArrowUpIcon, CheckIcon, ChevronDownIcon } from "lucide-react";
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle
// } from "@/components/ui/card";
import {
  ReactDropdownMenu,
  DropdownMenuContent,
  // DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/ReactDropdownMenu.tsx";
import { ReactButton } from "@/components/ui/ReactButton.tsx";
import { countryFilter } from "@/constants/filter.ts";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import OverallDashboard from "@/components/OverallDashboard";
import { ReactDatePicker } from "@/components/ui/ReactDatePicker";
import { Card, Stack } from "@mui/material";
import { CardBody } from "@/components/ui/Card";
import SalesProfitChart from "@/components/ui/SalesProfitChart";
// import SalesProfitDashboard from "@/components/SalesProfitDashboard";
// import ExpensesDashboard from "@/components/ExpensesDashboard";
// import InventoryDashboard from "@/components/InventoryDashboard";
// import ProfitLossDashboard from "@/components/ProfitLossDashboard";
// import RecentOrderDashboard from "@/components/RecentOrderDashboard";
// import TopProductDashboard from "@/components/TopProductDashboard";
// import DatePicker from "@/components/Datepicker";
// import { countryFilter } from "@/data/filter";
// import { Expense } from "@/store/useExpenseDashboardStore";
// import { Inventory } from "@/store/useInventoryDashboard";
// import { ProfitLoss } from "@/store/useProfitLossStore";
// import { RecentOrder } from "@/store/useRecentOrderDashboardStore";
// import { TopProduct } from "@/store/useTopProductDashboard";

const DashboardPage: () => JSX.Element = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    "All Country"
  );

  const handleDateRangeChange = (range: string) => {};

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl xl:text-2xl leading-[150%] text-[#1E1E1E] dark:text-[#F2F2F2]">
          Dashboard
        </h1>
        <div className="flex items-center gap-x-[20px]">
          <div className="w-[240px] hidden xl:block">
            <select
              className="rounded-md px-3 py-2.5 border text-sm w-full
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff] select1"
            >
              <option value="">Last 7 days</option>
            </select>
          </div>
          <div className="w-[240px] hidden xl:block">
            <select
              className="rounded-md px-3 py-2.5 border text-sm w-full
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff] select1"
            >
              <option value="">All country</option>
            </select>
          </div>
          <button
            type="button"
            className="font-semibold text-sm leading-[150%] text-[0077E5] border w-36 h-[39px] text-[#0077E5] rounded-md border-solid border-[#0077E5] cursor-pointer"
          >
            Custom Report
          </button>
        </div>
      </div>
      <div className="flex items-center gap-x-[10px] xl:gap-x-[20px] justify-end xl:hidden mt-4">
        <div className="w-[50%] lg:w-[240px]">
          <select
            className="rounded-md px-3 py-2.5 border text-sm w-full
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff] select1"
          >
            <option value="">Last 7 days</option>
          </select>
        </div>
        <div className="w-[50%] lg:w-[240px]">
          <select
            className="rounded-md px-3 py-2.5 border text-sm w-full
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff] select1"
          >
            <option value="">All country</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap -m-[5px] sm:-m-[10px] mt-4 lg:mt-[24px]">
        <div className="w-full w-full max-w-[50%] xl:max-w-[25%] p-[5px] sm:p-[10px]">
          <div className="w-full relative pt-[80%] sm:pt-[50%] xl:pt-[80%] 2xl:pt-[65%]">
            <div className="h-full bg-[#FAFAFA] dark:bg-[#1A1A1A] px-[16px] py-[12px] rounded-md absolute top-0 left-0 w-full flex flex-col">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold font-bold text-md sm:text-xl leading-[150%]">
                  Sales
                </h3>
                <div className="items-center justify-end gap-[4px] flex sm:hidden">
                  <img
                    src="/assets/images/arrow-up-right.svg"
                    className="w-[15px] mt-[3px]"
                    alt=""
                  />
                  <h6 className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    117.5%
                  </h6>
                </div>
              </div>

              <div className="flex justify-center my-auto">
                <div className="p-[28%] sm:p-[18%] xl:p-[24%] 2xl:p-[18%] relative">
                  <div className="absolute top-0 left-0 w-[100%] h-[100%] flex items-center justify-center rounded-[100%] border-[3px] border-solid border-[#1A91FF]">
                    <div className="font-semibold text-sm sm:text-base leading-[150%] tracking-[-1%]">
                      £539.50
                    </div>
                  </div>
                </div>
              </div>
              <div className="items-center justify-end gap-[4px] hidden sm:flex">
                <img
                  src="/assets/images/arrow-up-right.svg"
                  className="w-[15px] mt-[3px]"
                  alt=""
                />
                <h6 className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                  117.5%
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full w-full max-w-[50%] xl:max-w-[25%] p-[5px] sm:p-[10px]">
          <div className="w-full relative pt-[80%] sm:pt-[50%] xl:pt-[80%] 2xl:pt-[65%]">
            <div className="h-full bg-[#FAFAFA] dark:bg-[#1A1A1A] px-[16px] py-[12px] rounded-md absolute top-0 left-0 w-full flex flex-col">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold font-bold text-md sm:text-xl leading-[150%]">
                Profit
                </h3>
                <div className="items-center justify-end gap-[4px] flex sm:hidden">
                  <img
                    src="/assets/images/arrow-up-right.svg"
                    className="w-[15px] mt-[3px]"
                    alt=""
                  />
                  <h6 className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                  133.1%
                  </h6>
                </div>
              </div>

              <div className="flex justify-center my-auto">
                <div className="p-[28%] sm:p-[18%] xl:p-[24%] 2xl:p-[18%] relative">
                  <div className="absolute top-0 left-0 w-[100%] h-[100%] flex items-center justify-center rounded-[100%] border-[3px] border-solid border-[#1A91FF]">
                    <div className="font-semibold text-sm sm:text-base leading-[150%] tracking-[-1%]">
                    £72.41
                    </div>
                  </div>
                </div>
              </div>
              <div className="items-center justify-end gap-[4px] hidden sm:flex">
                <img
                  src="/assets/images/arrow-up-right.svg"
                  className="w-[15px] mt-[3px]"
                  alt=""
                />
                <h6 className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                133.1%
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full w-full max-w-[50%] xl:max-w-[25%] p-[5px] sm:p-[10px]">
          <div className="w-full relative pt-[80%] sm:pt-[50%] xl:pt-[80%] 2xl:pt-[65%]">
            <div className="h-full bg-[#FAFAFA] dark:bg-[#1A1A1A] px-[16px] py-[12px] rounded-md absolute top-0 left-0 w-full flex flex-col">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold font-bold text-md sm:text-xl leading-[150%]">
                Units
                </h3>
                <div className="items-center justify-end gap-[4px] flex sm:hidden">
                  <img
                    src="/assets/images/arrow-up-right.svg"
                    className="w-[15px] mt-[3px]"
                    alt=""
                  />
                  <h6 className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                  173.1%
                  </h6>
                </div>
              </div>

              <div className="flex justify-center my-auto">
                <div className="p-[28%] sm:p-[18%] xl:p-[24%] 2xl:p-[18%] relative">
                  <div className="absolute top-0 left-0 w-[100%] h-[100%] flex items-center justify-center rounded-[100%] border-[3px] border-solid border-[#1A91FF]">
                    <div className="font-semibold text-sm sm:text-base leading-[150%] tracking-[-1%]">
                      45
                    </div>
                  </div>
                </div>
              </div>
              <div className="items-center justify-end gap-[4px] hidden sm:flex">
                <img
                  src="/assets/images/arrow-up-right.svg"
                  className="w-[15px] mt-[3px]"
                  alt=""
                />
                <h6 className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                173.1%
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full w-full max-w-[50%] xl:max-w-[25%] p-[5px] sm:p-[10px]">
          <div className="w-full relative pt-[80%] sm:pt-[50%] xl:pt-[80%] 2xl:pt-[65%]">
            <div className="h-full bg-[#FAFAFA] dark:bg-[#1A1A1A] px-[16px] py-[12px] rounded-md absolute top-0 left-0 w-full flex flex-col">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold font-bold text-md sm:text-xl leading-[150%]">
                ROI
                </h3>
                <div className="items-center justify-end gap-[4px] flex sm:hidden">
                  <img
                    src="/assets/images/arrow-up-right.svg"
                    className="w-[15px] mt-[3px]"
                    alt=""
                  />
                  <h6 className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                  86.2%
                  </h6>
                </div>
              </div>

              <div className="flex justify-center my-auto">
                <div className="p-[28%] sm:p-[18%] xl:p-[24%] 2xl:p-[18%] relative">
                  <div className="absolute top-0 left-0 w-[100%] h-[100%] flex items-center justify-center rounded-[100%] border-[3px] border-solid border-[#1A91FF]">
                    <div className="font-semibold text-sm sm:text-base leading-[150%] tracking-[-1%]">
                      25%
                    </div>
                  </div>
                </div>
              </div>
              <div className="items-center justify-end gap-[4px] hidden sm:flex">
                <img
                  src="/assets/images/arrow-up-right.svg"
                  className="w-[15px] mt-[3px]"
                  alt=""
                />
                <h6 className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                86.2%
                </h6>
              </div>
            </div>
          </div>
        </div>



      </div>
      <div className="flex flex-wrap -m-[10px]  mt-[10px]">
        <div className="w-full xl:max-w-[25%] p-[10px]">
          <div className="flex flex-wrap -m-[6px]">
            <div className="w-full max-w-[50%] xl:max-w-full p-[6px]">
              <div className="bg-[#FAFAFA] dark:bg-[#1A1A1A] rounded-sm p-[16px]">
                <h4 className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                  Orders
                </h4>
                <div className="flex items-center justify-between mt-1">
                  <div className="font-normal text-base leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    37
                  </div>
                  <div className="flex items-center justify-end gap-[4px]">
                    <img
                      src="/assets/images/arrow-up-right.svg"
                      className="w-[15px] mt-[3px]"
                      alt=""
                    />
                    <h6 className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                      13.42%
                    </h6>
                  </div>
                </div>
                <div className="h-1 bg-[#E5F3FF] relative mt-1">
                  <div
                    className="absolute h-full bg-[#0077E5] z-[1] left-0 top-0"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-[50%] xl:max-w-full p-[6px]">
              <div className="bg-[#FAFAFA] dark:bg-[#1A1A1A] rounded-sm p-[16px]">
                <h4 className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                  Margin
                </h4>
                <div className="flex items-center justify-between mt-1">
                  <div className="font-normal text-base leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    13.42%
                  </div>
                  <div className="flex items-center justify-end gap-[4px]">
                    <img
                      src="/assets/images/arrow-down-right.svg"
                      className="w-[15px] mt-[3px]"
                      alt=""
                    />
                    <h6 className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                      5.2%
                    </h6>
                  </div>
                </div>
                <div className="h-1 bg-[#E5F3FF] relative mt-1">
                  <div
                    className="absolute h-full bg-[#0077E5] z-[1] left-0 top-0"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-[50%] xl:max-w-full p-[6px]">
              <div className="bg-[#FAFAFA] dark:bg-[#1A1A1A] rounded-sm p-[16px]">
                <h4 className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                  Reimbursement
                </h4>
                <div className="flex items-center justify-between mt-1">
                  <div className="font-normal text-base leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    45
                  </div>
                  <div className="flex items-center justify-end gap-[4px]">
                    <img
                      src="/assets/images/arrow-up-right.svg"
                      className="w-[15px] mt-[3px]"
                      alt=""
                    />
                    <h6 className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                      117.5%
                    </h6>
                  </div>
                </div>
                <div className="h-1 bg-[#E5F3FF] relative mt-1">
                  <div
                    className="absolute h-full bg-[#0077E5] z-[1] left-0 top-0"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-[50%] xl:max-w-full p-[6px]">
              <div className="bg-[#FAFAFA] dark:bg-[#1A1A1A] rounded-sm p-[16px]">
                <h4 className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                  Refunds
                </h4>
                <div className="flex items-center justify-between mt-1">
                  <div className="font-normal text-base leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    1
                  </div>
                  <div className="flex items-center justify-end gap-[4px]">
                    <img
                      src="/assets/images/arrow-up-right.svg"
                      className="w-[15px] mt-[3px]"
                      alt=""
                    />
                    <h6 className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                      10%
                    </h6>
                  </div>
                </div>
                <div className="h-1 bg-[#E5F3FF] relative mt-1">
                  <div
                    className="absolute h-full bg-[#0077E5] z-[1] left-0 top-0"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full xl:max-w-[75%] p-[10px]">
          <div className="h-full bg-[#FAFAFA] dark:bg-[#1A1A1A] px-[16px] py-[12px] rounded-md">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold font-bold text-xl leading-[150%]">
                Sales & Profit
              </h3>
              <button
                type="button"
                className=" font-normal text-xs leading-[150%] tracking-[-1%] text-[#0077E5] bg-[transparent]"
              >
                Compare
              </button>
            </div>
            <div className="w-full">
              <SalesProfitChart />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -m-[10px] mt-[10px]">
        <div className="w-full xl:max-w-[50%] p-[10px]">
          <div className="h-full bg-[#FAFAFA] dark:bg-[#1A1A1A] px-[16px] py-[12px] rounded-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold font-bold text-xl leading-[150%]">
                Top Products
              </h3>
              <button type="button" className="border-0 flex bg-[transparent]">
                <img src="/assets/images/arrow-up-right-xl.svg" alt="" />
              </button>
            </div>

            <div className="flex">
              <div className="flex items-center bg-[transparent] dark:bg-[#242424] rounded-sm">
                <button
                  type="button"
                  className="flex items-center justify-center text-center w-[80px] h-[32px] bg-[#E5F3FF] text-[#0077E5] dark:bg-[#00213D] dark:text-[#1A91FF] rounded-sm font-semibold text-xs leading-[150%] tracking-[-1%]"
                >
                  Profit
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center text-center w-[80px] h-[32px] bg-[transparent] rounded-sm font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#828282]"
                >
                  ROI %
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center text-center w-[80px] h-[32px] bg-[transparent] rounded-sm font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#828282]"
                >
                  Units
                </button>
              </div>
            </div>


            <div className="bg-[#FAFAFA] py-[16px] px-[10px] flex flex-col gap-4 max-h-[460px] overflow-x-hidden overflow-y-auto xl:hidden">
              <div className="flex flex-col gap-3 border-b border-[#eaeaea] first-child:border-b-0 pb-4">
                <div className="flex gap-4 items-center">
                  <div className="bg-[#F0F0F0] dark:bg-[#292929] w-[60px] h-[60px] rounded-[6px] flex items-center justify-center flex-[0_0_auto]">
                    <img alt="" src="/assets/images/box-icon.svg" />
                  </div>
                  <div className="MuiBox-root css-0">
                    <p
                      className=" text-[#1E1E1E] dark:text-[#fff] break-words whitespace-normal overflow-hidden text-ellipsis"
                      style={{
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical"
                      }}
                    >
                      Schwarzkopf Silhouette Super Hold Hairspray 300ml
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <p className=" text-[#6E8091] text-[14px] dark:text-[#828282]">
                        3V-YU78-8UOF
                      </p>
                      <p className=" text-[#6E8091] text-[14px] dark:text-[#828282]">
                        B007OTJ4D4
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-[35px] gap-y-[14px]">
                  <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">Profit: £1.03</div>
                  <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">ROI %: 34.33%</div>
                  <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">Units: 32</div>
                  <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">Total Profit: £7,717.4</div>
                </div>
              </div>
              <div className="flex flex-col gap-3 first-child:border-b-0 pb-4">
                  <div className="flex gap-4 items-center">
                    <div className="bg-[#F0F0F0] dark:bg-[#292929] w-[60px] h-[60px] rounded-[6px] flex items-center justify-center flex-[0_0_auto]">
                      <img alt="" src="/assets/images/box-icon.svg" />
                    </div>
                    <div className="MuiBox-root css-0">
                      <p
                        className=" text-[#1E1E1E] dark:text-[#fff] break-words whitespace-normal overflow-hidden text-ellipsis"
                        style={{
                          overflowWrap: "break-word",
                          wordBreak: "break-word",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical"
                        }}
                      >
                        Schwarzkopf Silhouette Super Hold Hairspray 300ml
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <p className=" text-[#6E8091] text-[14px] dark:text-[#828282]">
                          3V-YU78-8UOF
                        </p>
                        <p className=" text-[#6E8091] text-[14px] dark:text-[#828282]">
                          B007OTJ4D4
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-[35px] gap-y-[14px]">
                                  <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">Profit: £1.03</div>
                                  <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">ROI %: 34.33%</div>
                                  <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">Units: 32</div>
                                  <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">Total Profit: £7,717.4</div>
                  </div>
                </div>
              <div className="flex flex-col gap-3 first-child:border-b-0 pb-4">
                  <div className="flex gap-4 items-center">
                    <div className="bg-[#F0F0F0] dark:bg-[#292929] w-[60px] h-[60px] rounded-[6px] flex items-center justify-center flex-[0_0_auto]">
                      <img alt="" src="/assets/images/box-icon.svg" />
                    </div>
                    <div className="MuiBox-root css-0">
                      <p
                        className=" text-[#1E1E1E] dark:text-[#fff] break-words whitespace-normal overflow-hidden text-ellipsis"
                        style={{
                          overflowWrap: "break-word",
                          wordBreak: "break-word",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical"
                        }}
                      >
                        Schwarzkopf Silhouette Super Hold Hairspray 300ml
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <p className=" text-[#6E8091] text-[14px] dark:text-[#828282]">
                          3V-YU78-8UOF
                        </p>
                        <p className=" text-[#6E8091] text-[14px] dark:text-[#828282]">
                          B007OTJ4D4
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-[35px] gap-y-[14px]">
                                  <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">Profit: £1.03</div>
                                  <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">ROI %: 34.33%</div>
                                  <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">Units: 32</div>
                                  <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">Total Profit: £7,717.4</div>
                  </div>
                </div>
              <div className="flex flex-col gap-3 first-child:border-b-0 pb-4">
                  <div className="flex gap-4 items-center">
                    <div className="bg-[#F0F0F0] dark:bg-[#292929] w-[60px] h-[60px] rounded-[6px] flex items-center justify-center flex-[0_0_auto]">
                      <img alt="" src="/assets/images/box-icon.svg" />
                    </div>
                    <div className="MuiBox-root css-0">
                      <p
                        className=" text-[#1E1E1E] dark:text-[#fff] break-words whitespace-normal overflow-hidden text-ellipsis"
                        style={{
                          overflowWrap: "break-word",
                          wordBreak: "break-word",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical"
                        }}
                      >
                        Schwarzkopf Silhouette Super Hold Hairspray 300ml
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <p className=" text-[#6E8091] text-[14px] dark:text-[#828282]">
                          3V-YU78-8UOF
                        </p>
                        <p className=" text-[#6E8091] text-[14px] dark:text-[#828282]">
                          B007OTJ4D4
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-[35px] gap-y-[14px]">
                                  <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">Profit: £1.03</div>
                                  <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">ROI %: 34.33%</div>
                                  <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">Units: 32</div>
                                  <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">Total Profit: £7,717.4</div>
                  </div>
                </div>

            </div>



            <div className="w-full overflow-x-auto overflow-y-hidden hidden xl:block">
            <table
              className="border-separate w-full"
              style={{ borderSpacing: "0 10px" }}
            >
              <thead>
                <tr>
                  <th className="border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    Image
                  </th>
                  <th className="border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    <div>
                      <div>Product</div>
                      <div className="text-[#6E8091] text-[10px] dark:text-[#828282]">
                        SKU - ASIN
                      </div>
                    </div>
                  </th>
                  <th className="border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    Profit
                  </th>
                  <th className="border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    ROI %
                  </th>
                  <th className="border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    Units
                  </th>
                  <th className="border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    Total Profit
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-left px-1">
                    <div className="w-[48px] h-[48px] bg-[#F0F0F0] dark:bg-[#3B3B3B] rounded-xs flex items-center justify-center">
                      <img src="assets/images/cube1.svg" alt="" />
                    </div>
                  </td>
                  <td className="text-left px-1">
                    <div className="w-[140px]">
                      <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                        Shiseido Japan Fino Premium Touch Hair Treatment Mask
                        (...
                      </div>
                      <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                        3V-YU78-8UOF - 3V...
                      </div>
                    </div>
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-left px-1">
                    £1.03
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-left px-1">
                    34.33%
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-left px-1">
                    32
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-right px-1">
                    £7,717.4
                  </td>
                </tr>
                <tr>
                  <td className="text-left px-1">
                    <div className="w-[48px] h-[48px] bg-[#F0F0F0] dark:bg-[#3B3B3B] rounded-xs flex items-center justify-center">
                      <img src="assets/images/cube1.svg" alt="" />
                    </div>
                  </td>
                  <td className="text-left px-1">
                    <div className="w-[140px]">
                      <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                        Shiseido Japan Fino Premium Touch Hair Treatment Mask
                        (...
                      </div>
                      <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                        3V-YU78-8UOF - 3V...
                      </div>
                    </div>
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-left px-1">
                    £1.03
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-left px-1">
                    34.33%
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-left px-1">
                    32
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-right px-1">
                    £7,717.4
                  </td>
                </tr>
                <tr>
                  <td className="text-left px-1">
                    <div className="w-[48px] h-[48px] bg-[#F0F0F0] dark:bg-[#3B3B3B] rounded-xs flex items-center justify-center">
                      <img src="assets/images/cube1.svg" alt="" />
                    </div>
                  </td>
                  <td className="text-left px-1">
                    <div className="w-[140px]">
                      <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                        Shiseido Japan Fino Premium Touch Hair Treatment Mask
                        (...
                      </div>
                      <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                        3V-YU78-8UOF - 3V...
                      </div>
                    </div>
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-left px-1">
                    £1.03
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-left px-1">
                    34.33%
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-left px-1">
                    32
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-right px-1">
                    £7,717.4
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>

        <div className="w-full xl:max-w-[25%] p-[10px]">
          <div className="h-full bg-[#FAFAFA] dark:bg-[#1A1A1A] px-[16px] py-[12px] rounded-md">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold font-bold text-xl leading-[150%]">
                Expenses
              </h3>
              <button type="button" className="border-0 flex bg-[transparent]">
                <img src="/assets/images/arrow-up-right-xl.svg" alt="" />
              </button>
            </div>
            <div className="flex flex-col">
              <div className="item border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid py-2">
                <div className="flex items-center gap-2">
                  <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    Jul 25, 24
                  </div>
                  <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                    11:22 AM
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    Subscription
                  </div>
                  <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                    Doesn’t Recurs
                  </div>
                </div>
                <div className="mt-2">
                  <div className="item-center flex justify-between">
                    <div className="font-normal text-sm leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                      Developer Apps
                    </div>
                    <div className="font-normal text-sm leading-[150%] tracking-[-1%] text-right dark:text-[#F2F2F2]">
                      -£9.40
                    </div>
                  </div>
                  <div className="flex items-center gap-2 justify-between">
                    <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                      VaT Amount
                    </div>
                    <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                      £0.45
                    </div>
                  </div>
                </div>
              </div>
              <div className="item border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid py-2">
                <div className="flex items-center gap-2">
                  <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    Jul 25, 24
                  </div>
                  <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                    11:22 AM
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    Subscription
                  </div>
                  <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                    Doesn’t Recurs
                  </div>
                </div>
                <div className="mt-2">
                  <div className="item-center flex justify-between">
                    <div className="font-normal text-sm leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                      Developer Apps
                    </div>
                    <div className="font-normal text-sm leading-[150%] tracking-[-1%] text-right dark:text-[#F2F2F2]">
                      -£9.40
                    </div>
                  </div>
                  <div className="flex items-center gap-2 justify-between">
                    <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                      VaT Amount
                    </div>
                    <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                      £0.45
                    </div>
                  </div>
                </div>
              </div>
              <div className="item py-2">
                <div className="flex items-center gap-2">
                  <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    Jul 25, 24
                  </div>
                  <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                    11:22 AM
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                    Subscription
                  </div>
                  <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                    Doesn’t Recurs
                  </div>
                </div>
                <div className="mt-2">
                  <div className="item-center flex justify-between">
                    <div className="font-normal text-sm leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                      Developer Apps
                    </div>
                    <div className="font-normal text-sm leading-[150%] tracking-[-1%] text-right dark:text-[#F2F2F2]">
                      -£9.40
                    </div>
                  </div>
                  <div className="flex items-center gap-2 justify-between">
                    <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                      VaT Amount
                    </div>
                    <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                      £0.45
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full xl:max-w-[25%] p-[10px]">
          <div className="h-full bg-[#FAFAFA] dark:bg-[#1A1A1A] px-[16px] py-[12px] rounded-md">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold font-bold text-xl leading-[150%]">
                Profit and Loss
              </h3>
              <button type="button" className="border-0 flex bg-[transparent]">
                <img src="/assets/images/arrow-up-right-xl.svg" alt="" />
              </button>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center justify-between border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid ga-1 px-1 py-2">
                <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                  Description
                </div>
                <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                  Amount
                </div>
              </div>
              <div className="flex items-center justify-between border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid ga-1 px-1 py-2">
                <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                  Profit & Loss
                </div>
                <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                  £559.54
                </div>
              </div>
              <div className="flex items-center justify-between border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid ga-1 px-1 py-2">
                <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                  Margin
                </div>
                <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                  4.15%
                </div>
              </div>
              <div className="flex items-center justify-between border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid ga-1 px-1 py-2">
                <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                  Profit on Sales
                </div>
                <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                  £1,100.35
                </div>
              </div>
              <div className="flex items-center justify-between border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid ga-1 px-1 py-2">
                <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                  Other FBA Fees
                </div>
                <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                  -£194.86
                </div>
              </div>
              <div className="flex items-center justify-between border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid ga-1 px-1 py-2">
                <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                  Profit on Reimbursements
                </div>
                <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                  £43.36
                </div>
              </div>
              <div className="flex items-center justify-between border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid ga-1 px-1 py-2">
                <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                  Equipment
                </div>
                <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                  -£31.21
                </div>
              </div>
              <div className="flex items-center justify-between border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid ga-1 px-1 py-2">
                <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                  Travel expenses
                </div>
                <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                  -£233.33
                </div>
              </div>
              <div className="flex items-center justify-between border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid ga-1 px-1 py-2">
                <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                  Accountancy Fees
                </div>
                <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                  -£60.00
                </div>
              </div>
              <div className="flex items-center justify-between border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid ga-1 px-1 py-2">
                <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                  Office expenses and supplies
                </div>
                <div className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                  -£64.77
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full xl:max-w-[50%] p-[10px]">
          <div className="h-full bg-[#FAFAFA] dark:bg-[#1A1A1A] px-[16px] py-[12px] rounded-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold font-bold text-xl leading-[150%]">
                Inventory by Category
              </h3>
              <button type="button" className="border-0 flex bg-[transparent]">
                <img src="/assets/images/arrow-up-right-xl.svg" alt="" />
              </button>
            </div>
            <div className="w-full overflow-x-auto overflow-y-hidden">
            <table
              className="border-separate w-full"
              style={{ borderSpacing: "0 10px" }}
            >
              <thead>
                <tr>
                  <th className="align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2] px-1">
                    Description
                  </th>

                  <th className="align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] px-1 dark:text-[#F2F2F2]">
                    Units
                  </th>
                  <th className="align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] px-1 dark:text-[#F2F2F2]">
                    Total Unit Cost
                  </th>
                  <th className="align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] px-1 dark:text-[#F2F2F2]">
                    Resale
                  </th>
                  <th className="align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] px-1 dark:text-[#F2F2F2]">
                    Potential Profit
                  </th>
                  <th className="align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] px-1 dark:text-[#F2F2F2]">
                    % ROI
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="dark:text-[#F2F2F2] px-1 align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E]">
                    All
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    1052
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    £3,706.85
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    £10,156.44
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    £1,603.58
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    51.58
                  </td>
                </tr>
                <tr>
                  <td className="dark:text-[#F2F2F2] px-1 align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E]">
                    Available FBA
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    1052
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    £3,706.85
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    £10,156.44
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    £1,603.58
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    51.58
                  </td>
                </tr>
                <tr>
                  <td className="dark:text-[#F2F2F2] px-1 align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E]">
                    Inbound
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    1052
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    £3,706.85
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    £10,156.44
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    £1,603.58
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    51.58
                  </td>
                </tr>
                <tr>
                  <td className="dark:text-[#F2F2F2] px-1 align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E]">
                    Researching
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    1052
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    £3,706.85
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    £10,156.44
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    £1,603.58
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    51.58
                  </td>
                </tr>
                <tr>
                  <td className="dark:text-[#F2F2F2] px-1 align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E]">
                    Transfer
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    1052
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    £3,706.85
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    £10,156.44
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    £1,603.58
                  </td>
                  <td className="dark:text-[#828282] px-1 align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#6E8091]">
                    51.58
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>

        <div className="w-full xl:max-w-[50%] p-[10px]">
          <div className="h-full bg-[#FAFAFA] dark:bg-[#1A1A1A] px-[16px] py-[12px] rounded-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold font-bold text-xl leading-[150%]">
                Recent Order
              </h3>
              <button type="button" className="border-0 flex bg-[transparent]">
                <img src="/assets/images/arrow-up-right-xl.svg" alt="" />
              </button>
            </div>
            <div className="w-full overflow-x-auto overflow-y-hidden">
            <table
              className="border-separate w-full"
              style={{ borderSpacing: "0 10px" }}
            >
              <thead>
                <tr>
                  <th className="dark:text-[#F2F2F2] border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] px-1">
                    Date
                  </th>
                  <th className="dark:text-[#F2F2F2] border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] px-1">
                    Image
                  </th>
                  <th className="dark:text-[#F2F2F2] border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] px-1">
                    <div>
                      <div>Product</div>
                      <div className="text-[#6E8091] text-[10px] dark:text-[#828282]">
                        SKU - ASIN
                      </div>
                    </div>
                  </th>
                  <th className="dark:text-[#F2F2F2] border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] px-1">
                    <div>
                      <div>Status</div>
                      <div className="text-[#6E8091] text-[10px] dark:text-[#828282]">
                        Amazon.uk
                      </div>
                    </div>
                  </th>
                  <th className="dark:text-[#F2F2F2] border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] px-1">
                    Available
                  </th>
                  <th className="dark:text-[#F2F2F2] border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] px-1">
                    <div>
                      <div>Quantity</div>
                      <div className="text-[#6E8091] text-[10px] dark:text-[#828282]">
                        Order Type
                      </div>
                    </div>
                  </th>
                  <th className="dark:text-[#F2F2F2] border-b-[#EEEEEE] dark:border-b-[#3B3B3B] border-b border-solid align-top text-right font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] px-1">
                    <div>
                      <div>Total Sale</div>
                      <div className="text-[#6E8091] text-[10px] dark:text-[#828282]">
                        ROI %
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="min-w-[60px] px-1">
                    <div className="">
                      <div className="text-[#1E1E1E] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                        Jul 25, 24
                      </div>
                      <div className="text-[#6E8091] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#828282]">
                        11:22 AM
                      </div>
                    </div>
                  </td>
                  <td className="text-left px-1">
                    <div className="w-[48px] h-[48px] bg-[#F0F0F0] dark:bg-[#3B3B3B] rounded-xs flex items-center justify-center">
                      <img src="assets/images/cube1.svg" alt="" />
                    </div>
                  </td>
                  <td className="text-left px-1">
                    <div className="w-[140px]">
                      <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                        Shiseido Japan Fino Premium Touch Hair Treatment Mask
                        (...
                      </div>
                      <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                        3V-YU78-8UOF - 3V...
                      </div>
                    </div>
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-left px-1">
                    <div className="">
                      <div className="text-[#1E1E1E] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                        Pending
                      </div>
                      <div className="text-[#6E8091] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#828282]">
                        Amazon.uk
                      </div>
                    </div>
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-left px-1">
                    <div className="w-[80px]">
                      <div className="text-[#1E1E1E] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                        <div className="flex item-center justify-between">
                          <div>Jul 25, 24</div>
                          <div>21</div>
                        </div>
                      </div>
                      <div className="text-[#6E8091] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#828282]">
                        <div className="flex item-center justify-between">
                          <div>Inbound</div>
                          <div>0</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-left px-1">
                    <div className="">
                      <div className="text-[#1E1E1E] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                        2
                      </div>
                      <div className="text-[#6E8091] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#828282]">
                        Customer Order
                      </div>
                    </div>
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-right px-1">
                    <div className="flex flex-col items-end">
                      <div className="text-[#1E1E1E] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                        £9.40
                      </div>
                      <div className="text-[#6E8091] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#828282]">
                        22.1%
                      </div>
                      <button
                        type="button"
                        className="text-[#1E1E1E] flex items-center gap-1 cursor-pointer"
                      >
                        More{" "}
                        <img src="/assets/images/downarowmore.svg" alt="" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="min-w-[60px] px-1">
                    <div className="">
                      <div className="text-[#1E1E1E] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                        Jul 25, 24
                      </div>
                      <div className="text-[#6E8091] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#828282]">
                        11:22 AM
                      </div>
                    </div>
                  </td>
                  <td className="text-left px-1">
                    <div className="w-[48px] h-[48px] bg-[#F0F0F0] dark:bg-[#3B3B3B] rounded-xs flex items-center justify-center">
                      <img src="assets/images/cube1.svg" alt="" />
                    </div>
                  </td>
                  <td className="text-left px-1">
                    <div className="w-[140px]">
                      <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                        Shiseido Japan Fino Premium Touch Hair Treatment Mask
                        (...
                      </div>
                      <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                        3V-YU78-8UOF - 3V...
                      </div>
                    </div>
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-left px-1">
                    <div className="">
                      <div className="text-[#1E1E1E] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                        Pending
                      </div>
                      <div className="text-[#6E8091] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#828282]">
                        Amazon.uk
                      </div>
                    </div>
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-left px-1">
                    <div className="w-[80px]">
                      <div className="text-[#1E1E1E] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                        <div className="flex item-center justify-between">
                          <div>Jul 25, 24</div>
                          <div>21</div>
                        </div>
                      </div>
                      <div className="text-[#6E8091] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#828282]">
                        <div className="flex item-center justify-between">
                          <div>Inbound</div>
                          <div>0</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-left px-1">
                    <div className="">
                      <div className="text-[#1E1E1E] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                        2
                      </div>
                      <div className="text-[#6E8091] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#828282]">
                        Customer Order
                      </div>
                    </div>
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-right px-1">
                    <div className="flex flex-col items-end">
                      <div className="text-[#1E1E1E] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                        £9.40
                      </div>
                      <div className="text-[#6E8091] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#828282]">
                        22.1%
                      </div>
                      <button
                        type="button"
                        className="text-[#1E1E1E] flex items-center gap-1 cursor-pointer"
                      >
                        More{" "}
                        <img src="/assets/images/downarowmore.svg" alt="" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="min-w-[60px] px-1">
                    <div className="">
                      <div className="text-[#1E1E1E] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                        Jul 25, 24
                      </div>
                      <div className="text-[#6E8091] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#828282]">
                        11:22 AM
                      </div>
                    </div>
                  </td>
                  <td className="text-left px-1">
                    <div className="w-[48px] h-[48px] bg-[#F0F0F0] dark:bg-[#3B3B3B] rounded-xs flex items-center justify-center">
                      <img src="assets/images/cube1.svg" alt="" />
                    </div>
                  </td>
                  <td className="text-left px-1">
                    <div className="w-[140px]">
                      <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                        Shiseido Japan Fino Premium Touch Hair Treatment Mask
                        (...
                      </div>
                      <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#828282]">
                        3V-YU78-8UOF - 3V...
                      </div>
                    </div>
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-left px-1">
                    <div className="">
                      <div className="text-[#1E1E1E] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                        Pending
                      </div>
                      <div className="text-[#6E8091] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#828282]">
                        Amazon.uk
                      </div>
                    </div>
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-left px-1">
                    <div className="w-[80px]">
                      <div className="text-[#1E1E1E] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                        <div className="flex item-center justify-between">
                          <div>Jul 25, 24</div>
                          <div>21</div>
                        </div>
                      </div>
                      <div className="text-[#6E8091] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#828282]">
                        <div className="flex item-center justify-between">
                          <div>Inbound</div>
                          <div>0</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-left px-1">
                    <div className="">
                      <div className="text-[#1E1E1E] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                        2
                      </div>
                      <div className="text-[#6E8091] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#828282]">
                        Customer Order
                      </div>
                    </div>
                  </td>
                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-right px-1">
                    <div className="flex flex-col items-end">
                      <div className="text-[#1E1E1E] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                        £9.40
                      </div>
                      <div className="text-[#6E8091] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#828282]">
                        22.1%
                      </div>
                      <button
                        type="button"
                        className="text-[#1E1E1E] flex items-center gap-1 cursor-pointer"
                      >
                        More{" "}
                        <img src="/assets/images/downarowmore.svg" alt="" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>

        <div className="w-full xl:max-w-[50%] p-[10px]">
          <div className="h-full bg-[#FAFAFA] dark:bg-[#1A1A1A] px-[16px] py-[12px] rounded-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold font-bold text-xl leading-[150%]">
                Shipment
              </h3>
              <button type="button" className="border-0 flex bg-[transparent]">
                <img src="/assets/images/arrow-up-right-xl.svg" alt="" />
              </button>
            </div>

            <div className="bg-[#FAFAFA] py-[16px] px-[10px] flex flex-col gap-4 xl:hidden max-h-[481px] overflow-x-hidden overflow-y-auto">
  <div className="flex flex-col gap-3 border-b border-[#eaeaea] first-child:border-b-0 pb-4">
    <div className="flex gap-2">
      <p className=" text-[#1E1E1E] dark:text-[#fff] font-light">
        Jul 25, 24
      </p>
      <p className=" text-[#6E8091] dark:text-[#828282] font-light">
        11:22 AM
      </p>
    </div>
    <div className="flex gap-1 items-center">
      <p className=" text-[#1E1E1E] dark:text-[#fff]">
        203-4886959-8683560
      </p>
      <svg
        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium text-[#6E8091] dark:text-[#828282] css-1umw9bq-MuiSvgIcon-root"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="ArrowOutwardIcon"
        style={{ fontSize: 20 }}
      >
        <path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z" />
      </svg>
    </div>
    <div className="flex gap-1 items-center">
    <p className=" text-[#6E8091] text-[14px] dark:text-[#828282]">
            B007OTJ4D4
          </p>
      <svg
        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium text-[#6E8091] dark:text-[#828282] css-1umw9bq-MuiSvgIcon-root"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="ArrowOutwardIcon"
        style={{ fontSize: 20 }}
      >
        <path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z" />
      </svg>
      <div className="font-normal text-md leading-[150%] tracking-[-1%] text-[#0077E5]">+2</div>
    </div>
    <div className="flex gap-4 items-center">
      <div className="bg-[#F0F0F0] dark:bg-[#292929] w-[60px] h-[60px] rounded-[6px] flex items-center justify-center flex-[0_0_auto]">
        <img alt="" src="/assets/images/box-icon.svg" />
      </div>
      <div className="MuiBox-root css-0">
        <p
          className=" text-[#1E1E1E] dark:text-[#fff] break-words whitespace-normal overflow-hidden text-ellipsis"
          style={{
            overflowWrap: "break-word",
            wordBreak: "break-word",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical"
          }}
        >
          Schwarzkopf Silhouette Super Hold Hairspray 300ml
        </p>
        <div className="flex flex-wrap gap-2">
          <p className=" text-[#6E8091] text-[14px] dark:text-[#828282]">
            3V-YU78-8UOF
          </p>
          <p className=" text-[#6E8091] text-[14px] dark:text-[#828282]">
            B007OTJ4D4
          </p>
        </div>
      </div>
      <div className="text-[#1E1E1E] dark:text-[#F2F2F2] font-normal text-[14px] leading-[150%] tracking-[-1%] flex-[0_0_auto] ml-auto pl-2">6</div>
    </div>
  </div>
  <div className="flex flex-col gap-3 border-b border-[#eaeaea] first-child:border-b-0 pb-4">
    <div className="flex gap-2">
      <p className=" text-[#1E1E1E] dark:text-[#fff] font-light">
        Jul 25, 24
      </p>
      <p className=" text-[#6E8091] dark:text-[#828282] font-light">
        11:22 AM
      </p>
    </div>
    <div className="flex gap-1 items-center">
      <p className=" text-[#1E1E1E] dark:text-[#fff]">
        203-4886959-8683560
      </p>
      <svg
        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium text-[#6E8091] dark:text-[#828282] css-1umw9bq-MuiSvgIcon-root"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="ArrowOutwardIcon"
        style={{ fontSize: 20 }}
      >
        <path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z" />
      </svg>
    </div>
    <div className="flex gap-4 items-center">
      <div className="bg-[#F0F0F0] dark:bg-[#292929] w-[60px] h-[60px] rounded-[6px] flex items-center justify-center flex-[0_0_auto]">
        <img alt="" src="/assets/images/box-icon.svg" />
      </div>
      <div className="MuiBox-root css-0">
        <p
          className=" text-[#1E1E1E] dark:text-[#fff] break-words whitespace-normal overflow-hidden text-ellipsis"
          style={{
            overflowWrap: "break-word",
            wordBreak: "break-word",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical"
          }}
        >
          Schwarzkopf Silhouette Super Hold Hairspray 300ml
        </p>
        <div className="flex flex-wrap gap-2">
          <p className=" text-[#6E8091] text-[14px] dark:text-[#828282]">
            3V-YU78-8UOF
          </p>
          <p className=" text-[#6E8091] text-[14px] dark:text-[#828282]">
            B007OTJ4D4
          </p>
        </div>
      </div>
      <div className="text-[#1E1E1E] dark:text-[#F2F2F2] font-normal text-[14px] leading-[150%] tracking-[-1%] flex-[0_0_auto] ml-auto pl-2">12</div>
    </div>
  </div>
  <div className="flex flex-col gap-3 border-b border-[#eaeaea] first-child:border-b-0 pb-4">
    <div className="flex gap-2">
      <p className=" text-[#1E1E1E] dark:text-[#fff] font-light">
        Jul 25, 24
      </p>
      <p className=" text-[#6E8091] dark:text-[#828282] font-light">
        11:22 AM
      </p>
    </div>
    <div className="flex gap-1 items-center">
      <p className=" text-[#1E1E1E] dark:text-[#fff]">
        203-4886959-8683560
      </p>
      <svg
        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium text-[#6E8091] dark:text-[#828282] css-1umw9bq-MuiSvgIcon-root"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="ArrowOutwardIcon"
        style={{ fontSize: 20 }}
      >
        <path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z" />
      </svg>
    </div>
    <div className="flex gap-4 items-center">
      <div className="bg-[#F0F0F0] dark:bg-[#292929] w-[60px] h-[60px] rounded-[6px] flex items-center justify-center flex-[0_0_auto]">
        <img alt="" src="/assets/images/box-icon.svg" />
      </div>
      <div className="MuiBox-root css-0">
        <p
          className=" text-[#1E1E1E] dark:text-[#fff] break-words whitespace-normal overflow-hidden text-ellipsis"
          style={{
            overflowWrap: "break-word",
            wordBreak: "break-word",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical"
          }}
        >
          Schwarzkopf Silhouette Super Hold Hairspray 300ml
        </p>
        <div className="flex flex-wrap gap-2">
          <p className=" text-[#6E8091] text-[14px] dark:text-[#828282]">
            3V-YU78-8UOF
          </p>
          <p className=" text-[#6E8091] text-[14px] dark:text-[#828282]">
            B007OTJ4D4
          </p>
        </div>
      </div>
      <div className="text-[#1E1E1E] dark:text-[#F2F2F2] font-normal text-[14px] leading-[150%] tracking-[-1%] flex-[0_0_auto] ml-auto pl-2">12</div>
    </div>
  </div>
  <div className="flex flex-col gap-3 border-b border-[#eaeaea] first-child:border-b-0 pb-4">
    <div className="flex gap-2">
      <p className=" text-[#1E1E1E] dark:text-[#fff] font-light">
        Jul 25, 24
      </p>
      <p className=" text-[#6E8091] dark:text-[#828282] font-light">
        11:22 AM
      </p>
    </div>
    <div className="flex gap-1 items-center">
      <p className=" text-[#1E1E1E] dark:text-[#fff]">
        203-4886959-8683560
      </p>
      <svg
        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium text-[#6E8091] dark:text-[#828282] css-1umw9bq-MuiSvgIcon-root"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="ArrowOutwardIcon"
        style={{ fontSize: 20 }}
      >
        <path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z" />
      </svg>
    </div>
    <div className="flex gap-4 items-center">
      <div className="bg-[#F0F0F0] dark:bg-[#292929] w-[60px] h-[60px] rounded-[6px] flex items-center justify-center flex-[0_0_auto]">
        <img alt="" src="/assets/images/box-icon.svg" />
      </div>
      <div className="MuiBox-root css-0">
        <p
          className=" text-[#1E1E1E] dark:text-[#fff] break-words whitespace-normal overflow-hidden text-ellipsis"
          style={{
            overflowWrap: "break-word",
            wordBreak: "break-word",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical"
          }}
        >
          Schwarzkopf Silhouette Super Hold Hairspray 300ml
        </p>
        <div className="flex flex-wrap gap-2">
          <p className=" text-[#6E8091] text-[14px] dark:text-[#828282]">
            3V-YU78-8UOF
          </p>
          <p className=" text-[#6E8091] text-[14px] dark:text-[#828282]">
            B007OTJ4D4
          </p>
        </div>
      </div>
      <div className="text-[#1E1E1E] dark:text-[#F2F2F2] font-normal text-[14px] leading-[150%] tracking-[-1%] flex-[0_0_auto] ml-auto pl-2">12</div>
    </div>
  </div>
</div>


            <div className="w-full overflow-x-auto overflow-y-hidden hidden xl:block">
            <table
              className="border-separate w-full"
              style={{ borderSpacing: "0 10px" }}
            >
              <thead>
                <tr>
                  <th className=" border-b-[#EEEEEE] dark:text-[#F2F2F2] dark:border-b-[#3B3B3B] border-b border-solid align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] px-1">
                    Date
                  </th>
                  <th className="border-b-[#EEEEEE] dark:text-[#F2F2F2] dark:border-b-[#3B3B3B] border-b border-solid align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] px-1">
                    <div>
                      <div>Shipment</div>
                      <div className="text-[#6E8091] dark:border-b-[#3B3B3B] dark:text-[#828282] text-[10px]">
                        Tracking ID
                      </div>
                    </div>
                  </th>
                  <th className="border-b-[#EEEEEE] dark:text-[#F2F2F2] dark:border-b-[#3B3B3B] border-b border-solid align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] px-1">
                    Image
                  </th>
                  <th className="border-b-[#EEEEEE] dark:text-[#F2F2F2] dark:border-b-[#3B3B3B] border-b border-solid align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] px-1">
                    <div>
                      <div>Product</div>
                      <div className="text-[#6E8091] dark:border-b-[#3B3B3B] dark:text-[#828282] text-[10px]">
                        SKU - ASIN
                      </div>
                    </div>
                  </th>

                  <th className="border-b-[#EEEEEE] dark:text-[#F2F2F2] dark:border-b-[#3B3B3B] border-b border-solid align-top text-left font-normal text-xs leading-[150%] tracking-[-1%] text-[#1E1E1E] px-1">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="min-w-[60px] px-1">
                    <div className="">
                      <div className="text-[#1E1E1E] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                        Jul 25, 24
                      </div>
                      <div className="text-[#6E8091] font-normal text-[10px] leading-[150%] tracking-[-1%]">
                        11:22 AM
                      </div>
                    </div>
                  </td>
                  <td className="px-1">
                    <div className="w-[140px]">
                      <div className="flex items-center gap-1">
                        <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                          M5N1234567
                        </div>
                        <button
                          type="button"
                          className="border-0 flex bg-[transparent]"
                        >
                          <img
                            src="/assets/images/arrow-up-right-xl.svg"
                            alt=""
                          />
                        </button>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#6E8091] dark:text-[#F2F2F2]">
                          203-4886959-8683...
                        </div>
                        <button
                          type="button"
                          className="border-0 flex bg-[transparent]"
                        >
                          <img
                            src="/assets/images/arrow-up-right-xl.svg"
                            alt=""
                          />
                        </button>
                        <span className="font-normal text-xs leading-[150%] tracking-[-1%] text-[#0077E5]">
                          +2
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-left px-1">
                    <div className="w-[48px] h-[48px] bg-[#F0F0F0] dark:bg-[#3B3B3B] rounded-xs flex items-center justify-center">
                      <img src="assets/images/cube1.svg" alt="" />
                    </div>
                  </td>
                  <td className="text-left px-1">
                    <div className="w-[140px]">
                      <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#1E1E1E] dark:text-[#F2F2F2]">
                        Shiseido Japan Fino Premium Touch Hair Treatment Mask
                        (...
                      </div>
                      <div className="font-normal text-[10px] leading-[150%] tracking-[-1%] text-[#6E8091]">
                        3V-YU78-8UOF - 3V...
                      </div>
                    </div>
                  </td>

                  <td className="font-normal text-xs leading-[150%] tracking-[-1%] text-left px-1">
                    <div className="">
                      <div className="text-[#1E1E1E] font-normal text-[10px] leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                        6
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardPage;
