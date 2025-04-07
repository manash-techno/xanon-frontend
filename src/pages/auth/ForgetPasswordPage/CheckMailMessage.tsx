import { ReactImage } from "@/components/ui/ReactImage.tsx";
import {AssetsConfig} from "@/config/assetsConfig.ts";
import {Fragment, JSX} from "react";

type CheckMailMessageProps = {
    email: string;
};

export const CheckMailMessage = ({ email }: CheckMailMessageProps): JSX.Element => {
    return (
        <Fragment>
            <div className="flex flex-col gap-6">
                <h1 className="text-[#444444] dark:text-gray-100 font-bold text-xl">
                    Check Your Email
                </h1>
                <div
                    className="w-[60px] h-[60px] rounded-full bg-[#F2F7FC] dark:bg-[#00213D] flex items-center justify-center">
                    <ReactImage src={AssetsConfig.icons.emailBlue.src} alt={AssetsConfig.icons.emailBlue.alt}/>
                </div>
            </div>
            <p className="text-md text-gray-700 dark:text-gray-300">
                We’ve sent verification link in your <b>{email}</b> email,
                click the link to confirm your email address.
            </p>
        </Fragment>
    );
};
