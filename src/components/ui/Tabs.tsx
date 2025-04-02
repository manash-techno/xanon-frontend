import {FC, JSX, ReactNode} from 'react';
import {
    Tabs as MuiTabs,
    TabsProps as MuiTabsProps,
    Tab as MuiTab,
    TabProps as MuiTabProps,
    Box,
} from '@mui/material';

/**
 * TabsProps extends MuiTabsProps to include additional customization options.
 */
interface TabsProps extends MuiTabsProps {
    /**
     * The content of the component, normally `Tab` elements.
     */
    children: ReactNode;
    /**
     * Additional class name for styling.
     */
    className?: string;
}

/**
 * CustomTabs is a wrapper around Material-UI's Tabs component.
 * It provides a consistent API and allows for additional customization.
 */
const CustomTabs: FC<TabsProps> = ({ children, className, ...props }) => {
    return (
        <MuiTabs className={className} {...props}>
            {children}
        </MuiTabs>
    );
};

/**
 * TabProps extends MuiTabProps to include additional customization options.
 */
interface TabProps extends MuiTabProps {
    /**
     * The label of the tab.
     */
    label: ReactNode;
    /**
     * Additional class name for styling.
     */
    className?: string;
}

/**
 * CustomTab is a wrapper around Material-UI's Tab component.
 * It provides a consistent API and allows for additional customization.
 */
const CustomTab: ({ label, className, ...props }: { label: string | ReactNode; className?: string } & Omit<TabProps, "label">) => JSX.Element =
({ label, className, ...props }) => {
    return <MuiTab label={label} className={className} {...props} />;
};

/**
 * TabPanelProps defines the properties for the TabPanel component.
 */
interface TabPanelProps {
    /**
     * The content of the tab panel.
     */
    children?: ReactNode;
    /**
     * The index of the tab panel.
     */
    index: number;
    /**
     * The currently selected tab index.
     */
    value: number;
    /**
     * Additional class name for styling.
     */
    className?: string;
}

/**
 * TabPanel is a component that renders the content of a tab.
 * It is displayed when its index matches the currently selected tab index.
 */
export const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, className, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`custom-tabpanel-${index}`}
            aria-labelledby={`custom-tab-${index}`}
            className={className}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
};

export { CustomTabs as Tabs, CustomTab as Tab };
