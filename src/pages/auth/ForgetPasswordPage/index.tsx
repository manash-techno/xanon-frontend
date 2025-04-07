import { JSX, useMemo, useState} from "react";
import { ForgotPasswordForm } from "./ForgotPasswordForm.tsx";
import { CheckMailMessage } from "./CheckMailMessage.tsx";
import { AuthFormWrapper } from "@/components/AuthFormWrapper.tsx";

const ForgetPasswordPage = () => {
    const [email, setEmail] = useState<string|null>(null);

    const Content: JSX.Element = useMemo<JSX.Element>(() => {
        return email ? (
            <CheckMailMessage email={email}/>
        ) : (
            <ForgotPasswordForm onSuccess={(email: string) => setEmail(email)} />
        );
    }, [email]);

    return (
        <AuthFormWrapper>{Content}</AuthFormWrapper>
    );
};

export default ForgetPasswordPage;
