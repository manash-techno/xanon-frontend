import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import {ReactNode, Suspense} from "react";
import PageLoader from "@/components/PageLoader";

const variants = {
    initial: {
        opacity: 0,
        filter: "blur(0px)", // keep clean
    },
    animate: {
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        filter: "blur(2px)", // slight blur only on exit
        transition: {
            duration: 0.9,
            ease: "easeIn",
        },
    },
};

export const PageTransition = ({ children }: { children: ReactNode }) => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Suspense fallback={<PageLoader />}>
                <motion.div
                    key={location.pathname}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants}
                    style={{ width: "100%", height: "100%" }}
                >
                    {children}
                </motion.div>
            </Suspense>
        </AnimatePresence>
    );
};