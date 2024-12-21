import React from "react";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
          Verify Your Email
        </h2>
        <p className="text-gray-700 mb-6">
          A verification email has been sent to your email address. Please check
          your inbox and click the verification link to
          activate your account.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Go to Sign In
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
