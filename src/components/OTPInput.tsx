import React, { useRef, useCallback } from "react";
import {setOTP} from "@/store/slices/registerSlice";
import { useDispatch } from "react-redux";

const OTPInput: React.FC = () => {
    // const { updateOTP } = useRegisterStore();
    const dispacth = useDispatch();
    
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const setInputRef = useCallback((el: HTMLInputElement | null, index: number) => {
        inputsRef.current[index] = el;
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        // Allow only numbers
        if (!/^\d?$/.test(value)) {
            e.target.value = ""; // Clear invalid input
            return;
        }

        if (inputsRef.current[index]) {
            inputsRef.current[index]!.value = value;
        }

        // Collect all current values from inputs
        const otp = inputsRef.current.map((input) => input?.value || "").join("");

        // Update OTP in the store
        // updateOTP(Number(otp));
        dispacth( setOTP(Number(otp)) ); // Assuming setOTP is a function to update OTP in the store

        // Move to the next input if a digit is entered
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex space-x-2">
            {Array(6)
                .fill(0)
                .map((_, index) => (
                    <input
                        key={index}
                        ref={(el) => setInputRef(el, index)}
                        type="text"
                        maxLength={1}
                        className="w-12 text-center border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none text-4xl font-bold"
                        onChange={(e) => handleInputChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                ))}
        </div>
    );
};

export default OTPInput;
