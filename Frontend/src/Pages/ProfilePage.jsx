import { useState, useEffect } from "react";
import { UseAuthData } from "../Hooks/UseAuthData";
import { UseMessage } from "../Hooks/UseMessage";
import { updateProfileService } from "../Services/AuthServices";
import { FaUserCircle } from "react-icons/fa";
import { FiMail, FiPhone, FiCheck, FiX } from "react-icons/fi";

export const ProfilePage = () => {
  const { user, setUser } = UseAuthData();
  const { showMessage } = UseMessage();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setEditName(user.userName);
    }
  }, [user]);

  const handleSave = async () => {
    if (!editName.trim()) {
      showMessage("Name cannot be empty", "error");
      return;
    }
    try {
      setIsSaving(true);
      const data = await updateProfileService(editName);
      setUser(data.user); // Update the global auth state
      showMessage(data.message, "success");
      setIsEditing(false);
    } catch (error) {
      showMessage(error, "error");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-gray-500">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          My Profile
        </h1>
        <p className="text-gray-500 mt-2">Manage your account details and preferences.</p>
      </header>

      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-8 max-w-2xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4 shadow-inner">
            <FaUserCircle className="text-6xl" />
          </div>
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="text-2xl font-bold text-center text-gray-900 border-b-2 border-indigo-600 focus:outline-none bg-transparent w-full max-w-xs px-2"
              autoFocus
            />
          ) : (
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 break-words text-center px-2">{user.userName}</h2>
          )}
          
          {user.isAdmin && (
            <span className="mt-2 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold uppercase rounded-full tracking-wider">
              Admin
            </span>
          )}
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="p-2 sm:p-3 bg-white rounded-full text-indigo-500 shadow-sm mr-3 sm:mr-4 flex-shrink-0">
              <FiMail className="text-lg sm:text-xl" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-500 uppercase">Email Address</p>
              <p className="text-sm sm:text-base font-medium text-gray-900 truncate">{user.userEmail}</p>
            </div>
          </div>

          <div className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="p-2 sm:p-3 bg-white rounded-full text-indigo-500 shadow-sm mr-3 sm:mr-4 flex-shrink-0">
              <FiPhone className="text-lg sm:text-xl" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-500 uppercase">Phone Number</p>
              <p className="text-sm sm:text-base font-medium text-gray-900 truncate">{user.phone || "Not Provided"}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditName(user.userName);
                }}
                className="w-full sm:w-auto justify-center px-5 py-2.5 bg-white text-gray-600 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2"
              >
                <FiX /> Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full sm:w-auto justify-center px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-70"
              >
                <FiCheck /> {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="w-full sm:w-auto justify-center px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
            >
              Edit Profile
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
