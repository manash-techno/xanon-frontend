import * as React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

/** Smooth Transition for Dialog */
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/** Context & Hook to Manage Dialog State */
const DialogContext = React.createContext<{ open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> } | undefined>(undefined);

export const useDialog = () => {
    const context = React.useContext(DialogContext);
    if (!context) throw new Error("useDialog must be used within a DialogProvider");
    return context;
};

/** Provider to Manage Dialog Open/Close */
export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = React.useState(false);
    return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
};

/** Main Dialog Component */
export const ReactAlertDialog = ({ title, description, actionLabel }: { title: string; description: string; actionLabel: string }) => {
    const { open, setOpen } = useDialog();

    return (
        <Dialog open={open} TransitionComponent={Transition} onClose={() => setOpen(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="inherit">
                    Cancel
                </Button>
                <Button onClick={() => setOpen(false)} color="primary" autoFocus>
                    {actionLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

/** Button to Trigger Dialog */
export const AlertDialogTrigger = ({ children }: { children: React.ReactNode }) => {
    const { setOpen } = useDialog();
    return <span onClick={() => setOpen(true)}>{children}</span>;
};
