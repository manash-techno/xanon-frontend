import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice.ts";
import { ThemeSwitcher } from "@/components/ThemeSwitcher.tsx";
import { AssetsConfig } from "@/config/assetsConfig.ts";
import { ReactNode } from "react";
import { pagePaths } from "@/config/pagePaths.ts";
import { ReactImage } from "@/components/ui/ReactImage.tsx";
import { useTheme } from "@/hooks/useTheme.tsx";
import { cn } from "@/lib/utils.ts";
import { FAQs } from "@/components/layouts/DashboardLayout/FAQs";
import NotificationPopover from "@/components/NotificationPopover.tsx";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import Settings from "@/components/modals/Settings";

const ListMenuItem = [
  {
    name: "Dashboard",
    path: pagePaths.dashboard.root,
    icon: AssetsConfig.icons.menu.dashboard,
    iconActive: AssetsConfig.icons.menu.dashboardActive,
  },
  {
    name: "Orders",
    path: pagePaths.dashboard.orders,
    icon: AssetsConfig.icons.menu.orders,
    iconActive: AssetsConfig.icons.menu.ordersActive,
  },
  {
    name: "Inventory",
    path: pagePaths.dashboard.inventory,
    icon: AssetsConfig.icons.menu.inventory,
    iconActive: AssetsConfig.icons.menu.inventoryActive,
  },
  {
    name: "Shipment",
    path: pagePaths.dashboard.shipment,
    icon: AssetsConfig.icons.menu.shipment,
    iconActive: AssetsConfig.icons.menu.shipmentActive,
  },
  {
    name: "Reprice",
    path: "/dashboard/reprice",
    icon: AssetsConfig.icons.menu.reprice,
    iconActive: AssetsConfig.icons.menu.repriceActive,
  },
  {
    name: "Expenses",
    path: "/dashboard/expenses",
    icon: AssetsConfig.icons.menu.expenses,
    iconActive: AssetsConfig.icons.menu.expensesActive,
  },
  {
    name: "Reconciliation",
    path: "/dashboard/reconciliation",
    icon: AssetsConfig.icons.menu.reconciliation,
    iconActive: AssetsConfig.icons.menu.reconciliationActive,
  },
  {
    name: "Leaderboard",
    path: "/dashboard/leaderboard",
    icon: AssetsConfig.icons.menu.leaderboard,
    iconActive: AssetsConfig.icons.menu.leaderboardActive,
  },
];

const DashboardLayout = ({
  children,
  pageTitle,
}: {
  children: ReactNode;
  pageTitle?: string;
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { appliedTheme, theme } = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Get current menu item based on path
  const currentMenuItem = ListMenuItem.filter((item) =>
    location.pathname.startsWith(item.path)
  ).sort((a, b) => b.path.length - a.path.length)[0];

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex">
      <div
        className={cn(
          "fixed md:sticky left-0 z-50 py-3 px-2 min-h-screen border-r-2 overflow-hidden",
          isSidebarOpen ? "-translate-x-full md:translate-x-[0] w-full md:w-[248px]" : "w-full md:w-16",
          "bg-[#F2F5F8] dark:bg-[#1E1E1E] border-r-[#E0E0E0] dark:border-r-[#3B3B3B]"
        )}
        style={{ transition: '0.5s' }}
      >
        <Link
          to={pagePaths.dashboard.root}
          className="flex items-center"
        >
          <div
            className={cn(
              "relative h-[34px] overflow-hidden transition-all duration-300 ease-in-out flex",
              isSidebarOpen ? "w-[140px]" : "w-[40px]"
            )}
          >
            <ReactImage
              src={AssetsConfig.images.branding.logo.src}
              alt="Full Logo"
              className="h-full w-auto min-w-[140px] object-left"
            />
          </div>
        </Link>
        <div
          className={cn(
            "flex flex-col mt-4 md:mt-10 transition-all",
            isSidebarOpen ? "w-full md:w-48" : "w-full md:w-fit"
          )}
        >
          {ListMenuItem.map((item, index) => {
            const isActive = currentMenuItem?.path === item.path;
            return (
              <NavLink
                key={index}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md transition-[width] duration-300",
                  isActive
                    ? "bg-blue-100 text-blue-600 shadow-md dark:bg-gray-700 dark:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                )}
              >
                <ReactImage
                  src={isActive ? item.iconActive.src : item.icon.src}
                  width={22}
                  height={22}
                  alt={isActive ? item.iconActive.alt : item.icon.alt}
                  className={isActive ? "opacity-90" : "opacity-100"}
                />
                <span
                  className={cn(
                    "text-sm font-medium transition-opacity duration-300",
                    { "md:opacity-0 md:w-0 md:overflow-hidden": !isSidebarOpen }
                  )}
                >
                  {item.name}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>

      <div className="w-full max-h-screen overflow-auto">
        <div className="sticky top-0 z-50 flex justify-between items-center px-5 py-2 h-fit w-full bg-[#F2F5F8] dark:bg-[#1E1E1E] border-b-2 border-b-[#E0E0E0] dark:border-b-[#3B3B3B] transition-colors">
          {/* Left Section - Menu Icon */}
          <div className="flex items-center gap-6">
            <ReactImage
              width={24}
              height={24}
              src={AssetsConfig.icons.menu_icon.src}
              alt={AssetsConfig.icons.menu_icon.alt}
              className="cursor-pointer"
              onClick={() => toggleSidebar()}
              invertColor={appliedTheme === "dark"}
            />

            {/* Page Title with Icon - Hidden on Small Devices */}
            <div className="flex items-center gap-3 hidden xs:flex sm:flex">
              {/* {currentMenuItem && (
                    <ReactImage
                        src={currentMenuItem.icon.src}
                        width={24}
                        height={24}
                        alt={currentMenuItem.icon.alt}
                    />
                )} */}
              <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {pageTitle || currentMenuItem?.name}
              </h1>
            </div>
          </div>

          {/* Right Section - Logout, Notification, ThemeSwitcher */}
          <div className="flex items-center gap-6">
            {/* <ReactImage
              src={AssetsConfig.icons.logout.src}
              width={16}
              height={16}
              alt={AssetsConfig.icons.logout.alt}
              className="cursor-pointer"
              onClick={handleLogout}
            /> */}

            <ReactImage
              src={AssetsConfig.icons.notification.src}
              width={24}
              height={24}
              alt={AssetsConfig.icons.notification.alt}
              className="cursor-pointer"
            />

            <FAQs />

            <NotificationPopover />

            <ThemeSwitcher className="cursor-pointer" />

            <ReactImage
              src={AssetsConfig.icons.profile.src}
              width={20}
              height={19}
              alt={AssetsConfig.icons.profile.alt}
              className='cursor-pointer'
              onClick={handleClick}
            />

            <Menu
              // id="basic-menu"
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              autoFocus={false}
              MenuListProps={{
                'aria-labelledby': 'image',
              }}
              sx={{
                mt: 2,
                '& .MuiPaper-root': {
                  minWidth: 200,
                  backgroundColor: appliedTheme === 'dark' ? '#1E1E1E' : '#F2F5F8',
                  color: appliedTheme === 'dark' ? '#828282' : '#6E8091',
                },
              }}
            >
              <MenuItem className="w-[200px]" onClick={handleClose}>
                <ListItemIcon className="-mr-3">
                  <ReactImage
                    src={AssetsConfig.icons.theme.src}
                    width={20}
                    height={20}
                    alt={AssetsConfig.icons.theme.alt}
                  // className='cursor-pointer'
                  />
                </ListItemIcon>
                Theme: <p className="capitalize ml-1">{theme}</p>
              </MenuItem>
              <MenuItem className="w-[200px]" onClick={() => {
                setIsSettingsOpen(true);
                handleClose();
              }}>
                <ListItemIcon className="-mr-3">
                  <ReactImage
                    src={AssetsConfig.icons.setting.src}
                    width={20}
                    height={20}
                    alt={AssetsConfig.icons.setting.alt}
                    className='cursor-pointer'
                  />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem className="w-[200px]" onClick={() => {
                handleLogout();
                handleClose();
              }}>
                <ListItemIcon className="-mr-3">
                  <ReactImage
                    src={AssetsConfig.icons.logout.src}
                    width={20}
                    height={20}
                    alt={AssetsConfig.icons.logout.alt}
                    className="cursor-pointer"
                  />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>

        <div className="p-4 md:p-5">{children}</div>
        <Settings  open={isSettingsOpen} handleClose={()=>setIsSettingsOpen(false)} />
      </div>
    </div>
  );
};

export default DashboardLayout;
