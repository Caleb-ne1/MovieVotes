import React, { useEffect, useState } from "react";
import supabase from "../supabase/client";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch the user's email
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user) {
        setEmail(user.email);
      } else if (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    fetchUser();
  }, []);

  const handleDeleteAccount = async () => {
    setLoading(true);
    setMessage("");

    try {
      await supabase.auth.signOut();

      setMessage(
        "Account deletion request has been processed. Please contact support if necessary."
      );
    } catch (error) {
      console.error("Error deleting account:", error.message);
      setMessage("Failed to delete account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Your Profile
        </h2>
        {message && (
          <p className="text-sm text-center mb-4 text-blue-600">{message}</p>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium">Email:</label>
          <p className="mt-1 text-gray-700">{email || "Loading..."}</p>
        </div>
        <button
          onClick={handleDeleteAccount}
          disabled={loading}
          className={`w-full py-2 rounded-md ${
            loading
              ? "bg-red-300 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
        >
          {loading ? "Processing..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
