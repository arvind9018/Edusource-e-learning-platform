import React, { useEffect, useState } from "react";
import { auth, storage, db } from "../firebase";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    dob: "",
    courses: 0,
    timeSpent: "0 mins",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        await fetchProfile(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchProfile = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setProfile({
        name: data.name || "",
        dob: data.dob || "",
        courses: data.courses || 0,
        timeSpent: data.timeSpent || "0 mins",
      });
      setImageURL(data.imageURL || "");
      setImagePath(data.imagePath || "");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    setUploading(true);
    const path = `profileImages/${user.uid}/${file.name}`;
    const imageRef = ref(storage, path);

    try {
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      setImageURL(url);
      setImagePath(path);

      await setDoc(
        doc(db, "users", user.uid),
        { imageURL: url, imagePath: path },
        { merge: true }
      );
    } catch (error) {
      console.error("Image upload failed", error);
      alert("Image upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const removeProfileImage = async () => {
    if (!user || !imagePath) return;

    const imageRef = ref(storage, imagePath);
    try {
      await deleteObject(imageRef);
      await setDoc(doc(db, "users", user.uid), { imageURL: "", imagePath: "" }, { merge: true });
      setImageURL("");
      setImagePath("");
    } catch (err) {
      console.error("Error deleting image", err);
      alert("Couldn't delete image.");
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    if (!user) return;

    await setDoc(
      doc(db, "users", user.uid),
      {
        name: profile.name,
        dob: profile.dob,
        courses: profile.courses,
        timeSpent: profile.timeSpent,
      },
      { merge: true }
    );

    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar profileImage={imageURL} />

      <div className="max-w-4xl mx-auto mt-12 bg-white shadow-lg p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-6 text-slate-800">User Dashboard</h2>

        {user ? (
          <>
            <div className="flex items-center gap-6 mb-6">
              <div className="relative group">
                <img
                  src={imageURL || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-blue-400"
                />
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white px-2 py-1 text-xs rounded-full cursor-pointer group-hover:opacity-100 opacity-0 transition">
                  Change
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {imageURL && (
                  <button
                    onClick={removeProfileImage}
                    className="text-xs mt-2 text-red-500 underline"
                  >
                    Remove Image
                  </button>
                )}
              </div>
              <div>
                <p className="text-lg font-semibold">Email: {user.email}</p>
                <p className="text-sm text-gray-600">UID: {user.uid}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-100 p-4 rounded shadow">
                <h3 className="font-bold">Name</h3>
                {editing ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full mt-2 p-2 rounded border"
                  />
                ) : (
                  <p>{profile.name || "Not provided"}</p>
                )}
              </div>

              <div className="bg-green-100 p-4 rounded shadow">
                <h3 className="font-bold">Date of Birth</h3>
                {editing ? (
                  <input
                    type="date"
                    name="dob"
                    value={profile.dob}
                    onChange={handleChange}
                    className="w-full mt-2 p-2 rounded border"
                  />
                ) : (
                  <p>{profile.dob || "Not provided"}</p>
                )}
              </div>

              <div className="bg-purple-100 p-4 rounded shadow">
                <h3 className="font-bold">Courses Enrolled</h3>
                <p>{profile.courses}</p>
              </div>

              <div className="bg-yellow-100 p-4 rounded shadow">
                <h3 className="font-bold">Time Spent</h3>
                <p>{profile.timeSpent}</p>
              </div>
            </div>

            <div className="mt-6 text-right">
              {editing ? (
                <button
                  onClick={saveProfile}
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                  {uploading ? "Saving..." : "Save Changes"}
                </button>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </>
        ) : (
          <p className="text-red-600">User not logged in.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;