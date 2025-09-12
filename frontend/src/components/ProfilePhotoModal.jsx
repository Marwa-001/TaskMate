import { useState } from "react";
import axios from "axios";
import { useAuth } from "../store/AuthContext";

const ProfilePhotoModal = ({ isOpen, onClose }) => {
  const { user, token } = useAuth();
  const [file, setFile] = useState(null);

  if (!isOpen) return null;

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    try {
      const formData = new FormData();
      formData.append("profilePhoto", file);

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/upload-photo`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile photo updated!");
      window.location.reload(); // refresh UI to see the new photo
    } catch (err) {
      console.error("Error uploading photo:", err);
      alert("Failed to upload photo");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md text-center shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-800">Update Profile Photo</h2>

        {/* Current Profile Photo */}
        <img
          className="w-32 h-32 aspect-square mx-auto rounded-full object-cover border-2 border-gray-300 mb-4"
          src={
            user?.profilePhoto
              ? `${process.env.REACT_APP_BACKEND_URL}${user.profilePhoto}`
              : "https://placehold.co/128x128/E0E0E0/white?text=U"
          }
          alt={user?.name || "User"}
        />

        {/* Upload Form */}
        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Upload New Photo
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePhotoModal;
