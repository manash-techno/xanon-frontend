import { JSX, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "@/store/api/authApi.ts";
import { AssetsConfig } from "@/config/assetsConfig.ts";
import { pagePaths } from "@/config/pagePaths.ts";
import EmailIcon from "@mui/icons-material/Email";

const ForgetPasswordPage: () => JSX.Element = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  useEffect(() => {
    setEmail("");
    setMessage(null);
    setErrorMsg(null);
  }, []);

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMsg("Email is required.");
      return;
    }

    setMessage(null);
    setErrorMsg(null);

    try {
      await forgotPassword({ email }).unwrap();
      setMessage("A password reset link has been sent to your email.");
      setEmail(""); // Clear input field
    } catch (error) {
      setErrorMsg(
        error?.data?.message || "Failed to send reset email. Please try again."
      );
    }
  };

  return (
    <>
     {/* ================== start: forgot password ================== */}
     <form
        className="p-8 rounded-2xl w-96 flex flex-col gap-6
                       bg-white text-gray-900 shadow-md
                       dark:bg-[#242424] dark:text-gray-100 dark:shadow-lg"
      >
        <div className="flex items-center gap-2 mb-6">
          <img
            src={AssetsConfig.icons.back.src}
            width={20}
            height={20}
            alt={AssetsConfig.icons.back.alt}
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-[#444444] dark:text-gray-100 font-bold text-xl">
            Forgot Password
          </h1>
        </div>

        {/* Instruction Text */}
        <div className="text-xs text-gray-700 dark:text-gray-300">
          Please enter the email address associated with your account to reset
          your password.
        </div>

        {/* Error / Success Message */}
        {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
        {message && <p className="text-sm text-green-500">{message}</p>}

        {/* Email Input */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-xs text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              id="email"
              className="rounded-md px-3 py-2.5 border text-sm
                                   bg-gray-100 dark:bg-gray-700
                                   border-gray-300 dark:border-gray-600
                                   text-gray-900 dark:text-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className={`text-center rounded-md w-full py-3 font-semibold text-sm 
                           bg-[#0077E5] dark:bg-[#005bb5] 
                           text-white hover:bg-[#005bb5] dark:hover:bg-[#003f80] 
                           ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isLoading}
          onClick={handleForgotPassword}
        >
          {isLoading ? "Processing..." : "Continue"}
        </button>

        {/* Footer with Navigation Links */}
        <div className="text-xs text-center text-gray-700 dark:text-gray-300">
          Remember your password?
          <Link
            className="text-[#0077E5] dark:text-[#68A0FF] font-semibold ml-1"
            to={pagePaths.auth.login}
          >
            Sign in
          </Link>{" "}
          <br />
          Don’t have an account?
          <Link
            className="text-[#0077E5] dark:text-[#68A0FF] font-semibold ml-1"
            to={pagePaths.auth.register}
          >
            Sign up
          </Link>
        </div>
      </form>
      {/* ================== end: forgot password ================== */}
      {/* ================== start: check your email ================== */}
      {/* <form
        className="p-8 rounded-2xl w-96 flex flex-col gap-6
                       bg-white text-gray-900 shadow-md
                       dark:bg-[#242424] dark:text-gray-100 dark:shadow-lg min-h-[400px]"
      >
        <div className="flex flex-col gap-6">
          <h1 className="text-[#444444] dark:text-gray-100 font-bold text-xl">
            Check Your Email
          </h1>
          <div className="w-[60px] h-[60px] rounded-full bg-[#F2F7FC] dark:bg-[#00213D] flex items-center justify-center">
            <img src="/assets/icons/email-blue-icon.png" />
          </div>
        </div>
        <div className="text-md text-gray-700 dark:text-gray-300">
          We’ve sent verification link in your <b>email@gmail.com</b> email,
          clink the link to confirm your email address{" "}
        </div>
      </form> */}
      {/* ================== end: check your email ================== */}

      {/* ================== end: Reset Password ================== */}
      {/* <form
        className="p-8 rounded-2xl w-96 flex flex-col gap-6
                       bg-white text-gray-900 shadow-md
                       dark:bg-[#242424] dark:text-gray-100 dark:shadow-lg min-h-[400px]"
      >
        <div className="flex justify-center">
          <img
            width={60}
            height={60}
            alt="Company Logo (Single)"
            src="/assets/images/branding/logo-single.png"
          />
        </div>
        <h1 className="text-[#1E1E1E] dark:text-[#F2F2F2] font-bold text-xl">
          Reset Password
        </h1>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-0">
            <label
              htmlFor="email"
              className="text-xs text-gray-700 dark:text-[#F2F2F2]"
            >
              Email
            </label>
            <div className="text-md text-[#1E1E1E] dark:text-[#F2F2F2] font-bold">
              Youremail@gmailcom
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-xs text-gray-700 dark:text-[#F2F2F2]"
            >
              Create Password
            </label>
            <div className="relative">
              <input
                placeholder="Enter Password"
                id="password"
                className="rounded-md px-3 py-2.5 border text-sm w-full pr-11
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                required
                type="password"
              />
              <img
                className="absolute top-2.5 right-3 cursor-pointer dark:invert"
                width={20}
                height={20}
                alt="Eye Icon"
                src="/assets/icons/eye.svg"
              />
            </div>
            <ul className="list-disc list-inside text-[#6E8091] dark:text-[#828282] font-normal pl-2">
              <li>Has at least 8 characters (no spaces)</li>
              <li>Has letters, numbers, and special characters</li>
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-xs text-gray-700 dark:text-[#F2F2F2]"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                placeholder="Re-enter Password"
                id="password"
                className="rounded-md px-3 py-2.5 border text-sm w-full pr-11
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                required
                type="password"
              />
              <img
                className="absolute top-2.5 right-3 cursor-pointer dark:invert"
                width={20}
                height={20}
                alt="Eye Icon"
                src="/assets/icons/eye.svg"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="text-center rounded-md w-full py-3 font-semibold text-sm 
                           bg-[#0077E5] dark:bg-[#292929] 
                           text-white hover:bg-[#005bb5] dark:hover:bg-[#100F0F] 
                           cursor-pointer
                           "
        >
          Save
        </button>
      </form> */}
      {/* ================== end: Reset Password ================== */}

      {/* ================== start: Email Verification ================== */}
      {/* <form
        className="p-8 rounded-2xl w-96 flex flex-col gap-6
                       bg-white text-gray-900 shadow-md
                       dark:bg-[#242424] dark:text-gray-100 dark:shadow-lg min-h-[400px]"
      >
        <div className="flex items-center gap-2 mb-6">
          <img
            width={20}
            height={20}
            alt="Back Icon"
            className="cursor-pointer"
            src="/assets/icons/back.svg"
          />
          <h1 className="text-[#444444] dark:text-gray-100 font-bold text-xl">
            Email Verification
          </h1>
        </div>
        <div className="flex gap-3">
          <div className="text-xs text-gray-700 dark:text-gray-300">
            Please enter the 6-digit verification code that was sent to
            your@emailcom
          </div>
          <button type="button" className="text-[#0077E5] text-xs">
            Change
          </button>
        </div>
        <div className="flex flex-col gap-3 mt-auto">
          <div className="flex flex-col gap-1" />
          <div className="flex gap-2 text-xs text-[#6E8091] dark:text-[#828282]">
            <span>Didn’t get the code?</span>
            <button type="button">Resend (50s)</button>
          </div>
        </div>
        <button
          type="button"
          className="text-center rounded-md w-full py-3 font-semibold text-sm 
                           bg-[#0077E5] dark:bg-[#005bb5] 
                           text-white hover:bg-[#005bb5] dark:hover:bg-[#003f80] 
                            "
        >
          Submit
        </button>
      </form> */}
      {/* ================== end: Email Verification ================== */}

      {/* ================== start: Subscription ================== */}
      {/* <div
        className="p-8 rounded-2xl w-[350px] sm:w-[600px] flex flex-col gap-1
                       bg-white text-gray-900 shadow-md
                       dark:bg-[#242424] dark:text-gray-100 dark:shadow-lg min-h-[400px]"
      >
        <div className="flex flex-col gap-2 mb-6 text-center">
          <h1 className="font-bold text-2xl leading-[150%] text-[#000000] dark:text-[#F2F2F2]">
            Grow Your Amazon Business. Start{" "}
            <span className="text-[#0077E5]">FREE</span>
          </h1>
          <h4 className="font-normal text-sm leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
            Thrive Your Amazon Business to the next level . No Credit card info
            required
          </h4>
          <div className="flex justify-center items-center gap-4">
            <div className="flex bg-[#F0F0F0] dark:bg-[#1E1E1E] rounded-md p-1">
              <button
                type="button"
                className="w-[87px] h-[40px] rounded-md text-[#6E8091] text[14px] cursor-pointer dark:text-[#828282]"
              >
                Monthly
              </button>
              <button
                type="button"
                className="w-[87px] h-[40px] rounded-md text-[#1E1E1E] text[14px] bg-[#FFFFFF] cursor-pointer dark:text-[#F2F2F2] dark:bg-[#292929]"
              >
                Annually
              </button>
            </div>
            <div className="text-[#1A91FF] text-xs font-semibold">17% Off</div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-[#EEEEEE] w-full max-w-[360px] mx-auto dark:border-[#373737]">
          <h2 className="text-[20px] font-bold text-[#1E1E1E] dark:text-[#F2F2F2]">Pro</h2>
          <h5 className="text-xs font-normal text-[#6E8091] leading-[150%] tracking-[-1%] dark:text-[#828282]">
            Essential tools for Amazon sellers of all sizes.
          </h5>
          <div className="flex gap-2 items-center">
            <div className="text-[#0077E5] font-semibold text-[26.67px] leading-[140%] pt-3">
              £17
            </div>
            <div className="flex flex-col mt-3">
              <h5 className="text-xs font-normal text-[#1E1E1E] leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                GBP/month (excl VAT)
              </h5>
              <h5 className="text-xs font-normal text-[#6E8091] leading-[150%] tracking-[-1%] dark:text-[#828282]">
                billed annually
              </h5>
            </div>
          </div>
          <div className="flex my-4">
            <div
              className="text-center rounded-sm w-full max-w-[200px] py-3 font-semibold text-sm 
                           bg-[#0077E5] dark:bg-[#1A91FF] 
                           text-white"
            >
              FREE 14 Day Trial
            </div>
          </div>
          <div>
            <h4 className="text-[#191B1E] dark:text-[#F2F2F2] font-bold text-sm leading-[150%] tracking-[-1%]">
              Pro plan includes
            </h4>

            <div className="flex flex-col gap-1 mt-2">
              <div className="flex items-start gap-2">
                <img
                  src="/assets/icons/tick-blue.svg"
                  className="flex-[0_0_auto]"
                />
                <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                  Sales History Reports
                </div>
              </div>
              <div className="flex items-start gap-2">
                <img
                  src="/assets/icons/tick-blue.svg"
                  className="flex-[0_0_auto]"
                />
                <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                  Order History Reports
                </div>
              </div>
              <div className="flex items-start gap-2">
                <img
                  src="/assets/icons/tick-blue.svg"
                  className="flex-[0_0_auto]"
                />
                <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                  Reimbursements
                </div>
              </div>
              <div className="flex items-start gap-2">
                <img
                  src="/assets/icons/tick-blue.svg"
                  className="flex-[0_0_auto]"
                />
                <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                  Live Analytics Dashboard
                </div>
              </div>
              <div className="flex items-start gap-2">
                <img
                  src="/assets/icons/tick-blue.svg"
                  className="flex-[0_0_auto]"
                />
                <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                  Customer Support
                </div>
              </div>
              <div className="flex items-start gap-2">
                <img
                  src="/assets/icons/tick-blue.svg"
                  className="flex-[0_0_auto]"
                />
                <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                  Inventory Management
                </div>
              </div>
              <div className="flex items-start gap-2">
                <img
                  src="/assets/icons/tick-blue.svg"
                  className="flex-[0_0_auto]"
                />
                <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                  1 User Account Limit
                </div>
              </div>
              <div className="flex items-start gap-2">
                <img
                  src="/assets/icons/tick-blue.svg"
                  className="flex-[0_0_auto]"
                />
                <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                  Data Export
                </div>
              </div>
              <div className="flex items-start gap-2">
                <img
                  src="/assets/icons/tick-blue.svg"
                  className="flex-[0_0_auto]"
                />
                <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                  Expense Tracker
                </div>
              </div>
              <div className="flex items-start gap-2">
                <img
                  src="/assets/icons/tick-blue.svg"
                  className="flex-[0_0_auto]"
                />
                <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                  Restock Alerts
                </div>
              </div>
              <div className="flex items-start gap-2">
                <img
                  src="/assets/icons/tick-blue.svg"
                  className="flex-[0_0_auto]"
                />
                <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                  Adds-on
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* ================== end: Subscription ================== */}
    </>
  );
};

export default ForgetPasswordPage;
