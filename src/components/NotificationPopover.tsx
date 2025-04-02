import { FC, JSX, memo, useCallback, useState } from "react";
import { Popover } from "@/components/ui/popover"; // Importing the Material-UI Popover wrapper
import { Tabs, Tab, TabPanel } from "@/components/ui/Tabs.tsx";
import { ReactButton } from "@/components/ui/ReactButton.tsx";
import { ReactImage } from "@/components/ui/ReactImage.tsx";
import { AssetsConfig } from "@/config/assetsConfig.ts";
import { Box } from "@mui/material";

/**
 * Notification interface representing the structure of a notification item.
 */
interface Notification {
    id: string;
    type: "invite" | "message" | "alert";
    username: string;
    content: string;
    time: string;
    read: boolean;
}

/**
 * NotificationPopover component renders a Material-UI Popover with a tabbed notification system.
 */
const NotificationPopover: FC = memo((): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [tabValue, setTabValue] = useState<number>(0);
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "1",
            type: "invite",
            username: "username",
            content: "FBA Manchester",
            time: "Today",
            read: false,
        },
    ]);

    const unreadCount = notifications.filter((n) => !n.read).length;

    /**
     * Handles accepting a notification.
     * @param id - Notification ID to accept.
     */
    const handleAccept = useCallback((id: string): void => {
        console.log(`Accepted notification ${id}`);
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, []);

    /**
     * Handles rejecting a notification.
     * @param id - Notification ID to reject.
     */
    const handleReject = useCallback((id: string): void => {
        console.log(`Rejected notification ${id}`);
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, []);

    return (
        <>
            {/* Popover Trigger Button */}
            <ReactButton
                variant="outline"
                size="icon"
                className="relative bg-transparent w-fit h-fit border-none shadow-none"
                onClick={(event) => setAnchorEl(event.currentTarget)}
            >
                <ReactImage
                    src={AssetsConfig.icons.notification.src}
                    width={24}
                    height={24}
                    alt={AssetsConfig.icons.notification.alt}
                    className="cursor-pointer"
                />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 flex h-2 w-2 items-center justify-center rounded-full bg-[#E50000] text-[10px] text-primary-foreground">
                        {/* {unreadCount} */}
                    </span>
                )}
            </ReactButton>

            {/* Material-UI Popover */}
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                slotProps={{
                    paper: {
                      className:
                        "bg-[#fff!important] dark:bg-[#1E1E1E!important] text-[#1F1F1F] dark:text-[#fff] p-[12px]",
                    },
                  }}
            >
                <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} className="w-full"
                    sx={{
                        "& div": {
                            padding: "0",
                        },
                      }}>
                  <Box>
                  <Box className="flex gap-2 ">
                        <Tab label="Notification" className="font-semibold text p-0 dark:text-[#fff!important] text-base"
                         style={{textTransform: 'capitalize',minWidth: 'unset', minHeight: 'unset',opacity: '1'}} />
                        <Tab label="Leaderboard" className="font-semibold p-0 dark:text-[#fff!important] text-base"
                         style={{textTransform: 'capitalize',minWidth: 'unset', minHeight: 'unset'}} />
                    </Box>
                    <TabPanel value={tabValue} index={0} className="space-y-2 mt-2 p-0">
                        {notifications.length > 0 ? (
                            <>
                                <div className="text-sm text-[#6E8091] mb-2">Today</div>
                                {notifications.map((notification) => (
                                    <NotificationItem
                                        key={notification.id}
                                        notification={notification}
                                        onAccept={() => handleAccept(notification.id)}
                                        onReject={() => handleReject(notification.id)}
                                    />
                                ))}
                            </>
                        ) : (
                            <div className="py-6 text-center text-muted-foreground">No notifications</div>
                        )}
                    </TabPanel>
                    <TabPanel value={tabValue} index={1} className="space-y-2 mt-0 p-0">
                        <div className="text-sm text-muted-foreground">Today</div>
                        {notifications.map((notification) => (
                            <LeaderboardItem key={notification.id} notification={notification} />
                        ))}
                    </TabPanel>
                  </Box>
                </Tabs>
            </Popover>
        </>
    );
});

/**
 * Props for the NotificationItem component.
 */
interface NotificationItemProps {
    notification: Notification;
    onAccept: () => void;
    onReject: () => void;
}

/**
 * NotificationItem component representing an individual notification.
 */
const NotificationItem: FC<NotificationItemProps> = memo(({ notification, onAccept, onReject }): JSX.Element => {
    return (
        <section className="flex items-start gap-3 p-4 border border-[#EEEEEE!important] dark:border-[#4F4F4F!important] rounded-md">
            <div className="flex-shrink-0 ">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <ReactImage
                        src={"/profile-blue.svg"}
                        width={16}
                        height={15}
                        alt="profile"
                        className="cursor-pointer text-[#0077E5]"
                    />
                </div>
            </div>
            <div className="flex-1 space-y-2">
                <p className="text-sm dark:text-white">
                    <span className="font-medium">@{notification.username}</span> has invited you to join{" "}
                    {notification.content}
                </p>
                <div className="flex gap-2">
                    <ReactButton
                        variant="outline"
                        size="sm"
                        onClick={onAccept}
                        className="border-[#0077E5] text-[#0077E5] hover:bg-transparent hover:text-[#0077E5] bg-transparent shadow-none"
                    >
                        Accept
                    </ReactButton>
                    <ReactButton variant="link" size="sm" onClick={onReject} className=" dark:text-[#828282]">
                        Reject
                    </ReactButton>
                </div>
            </div>
        </section>
    );
});

/**
 * Props for the LeaderboardItem component.
 */
interface LeaderboardItemProps {
    notification: Notification;
}

/**
 * LeaderboardItem component representing leaderboard notifications.
 */
const LeaderboardItem: FC<LeaderboardItemProps> = memo(({ notification }): JSX.Element => {
    return (
        <div className="flex items-start gap-3 p-4 border rounded-md">
            <div className="flex-shrink-0 mt-1">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <ReactImage
                        src={"/profile-blue.svg"}
                        width={16}
                        height={15}
                        alt="profile"
                        className="cursor-pointer text-[#0077E5]"
                    />
                </div>
            </div>
            <div className="flex-1 space-y-2">
                <p className="text-sm">
                    <span className="font-medium">You</span> were invited to {notification.content}
                </p>
            </div>
        </div>
    );
});

export default NotificationPopover;
