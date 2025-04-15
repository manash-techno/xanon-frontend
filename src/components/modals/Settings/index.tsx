import { Transition } from '@/components/layouts/DashboardLayout/FAQs/Transition';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import React from 'react'
import CloseIcon from "@mui/icons-material/Close";
import Divider from '@mui/material/Divider';
import { AssetsConfig } from '@/config/assetsConfig';
import { ReactImage } from '@/components/ui/ReactImage';
import Accounts from './Accounts';
import InvoiceDetails from './InvoiceDetails';
import Vat from './Vat';
import Subscription from './Subscription';


interface SettingsProps {
    open: boolean;
    handleClose: (state: boolean) => void;
}

const SettingList = [
    {
        name: "Account",
        icon: AssetsConfig.icons.settings.account.src,
        iconActive: AssetsConfig.icons.settings.accountActive.src,
    },
    {
        name: "Invoice Details",
        icon: AssetsConfig.icons.settings.invoiceDetails.src,
        iconActive: AssetsConfig.icons.settings.invoiceDetails.src,
    },
    {
        name: "VAT",
        icon: AssetsConfig.icons.settings.vat.src,
        iconActive: AssetsConfig.icons.settings.vatActive.src,
    },
    {
        name: "Subscription",
        icon: AssetsConfig.icons.settings.subscription.src,
        iconActive: AssetsConfig.icons.settings.subscriptionActive.src,
    },
]

const Settings: React.FC<SettingsProps> = ({ open, handleClose: handleClose }) => {
    const [currenTab, setCurrentTab] = React.useState(SettingList[0].name.toLocaleLowerCase());

    return (
        <Dialog
            open={open}
            onClose={handleClose}
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
                        maxWidth: "720px", // Set your width here
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
                        Settings
                    </span>
                    <IconButton type="button"
                        onClick={() => handleClose(false)}>
                        <CloseIcon className="text-[#7c7c7c] dark:text-gray-[#828282]" />
                    </IconButton>
                </div>
            </DialogTitle>

            {/* Dialog Content with Dark Mode */}
            <DialogContent dividers className="bg-[transparent] border-0 pt-0">
                <Stack direction={"row"} spacing={2}>
                    <Box className="flex flex-col w-48 bg-transparent h-fit py-4 px-3">
                        {/* Tabs */}
                        {SettingList.map((item, index) => (
                            <div
                                key={index}
                                className={`flex gap-1 justify-start w-48 py-1.5 px-3 rounded data-[state=active]:shadow-none data-[state=active]:bg-[#E5F3FF] data-[state=active]:text-[#0077E5] data-[state=active]:font-medium cursor-pointer ${ currenTab.toLocaleLowerCase() === item.name.toLocaleLowerCase() ? "bg-[#E5F3FF] text-[#0077E5] font-medium" : "text-[#7c7c7c] dark:text-gray-[#828282]"}`}
                                onClick={() => setCurrentTab(item.name.toLocaleLowerCase())}
                            >
                                <ReactImage
                                    src={item.name.toLocaleLowerCase() === currenTab.toLocaleLowerCase() ? item.iconActive : item.icon}
                                    width={24}
                                    height={24}
                                    alt={item.name}
                                />
                                {item.name}
                            </div>
                        ))}
                    </Box>
                    <Box className="flex flex-col gap-3 pl-2">
                        {/* Tab Content */}
                        {currenTab === "account" && <Accounts />}
                        {currenTab === "invoice details" && <InvoiceDetails />}
                        {currenTab === "vat" && <Vat />}
                        {currenTab === "subscription" && <Subscription  />}
                    </Box>
                </Stack>

            </DialogContent>
        </Dialog>
    )
}

export default Settings