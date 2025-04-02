import { forwardRef } from "react";
import { Slide, SlideProps } from "@mui/material";

/** Smooth Transition for Dialog */
export const Transition = forwardRef<unknown, SlideProps>((props, ref) => (
    <Slide direction="up" ref={ref as React.Ref<HTMLDivElement>} {...props} />
));
