import { Link } from "react-router-dom";
import {JSX} from "react";

const NotFoundPage: () => JSX.Element = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
            <h1 className="text-6xl font-bold text-gray-900">404</h1>
            <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
            <p className="mt-2 text-gray-600">
                Sorry, the page you are looking for does not exist.
            </p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
            >
                Go Home
            </Link>
        </div>
    );
};
export default NotFoundPage