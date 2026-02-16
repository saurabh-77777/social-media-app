import axios from "axios";
import React, { useState } from "react";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      setLoading(true);

      await axios.post(
        "import.meta.env.VITE_API_URL/api/v1/create-post",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Post created successfully ✅");
      setCaption("");
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.log(err);
      alert("Error creating post ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">

      <div className="bg-white w-full max-w-3xl rounded-lg shadow-md">

        {/* Header */}
        <div className="border-b p-4 text-center font-semibold text-lg">
          Create New Post
        </div>

        <div className="flex flex-col md:flex-row">

          {/* Image Upload Section */}
          <div className="md:w-1/2 border-r flex justify-center items-center p-6">
            {!preview ? (
              <label className="cursor-pointer text-center">
                <div className="text-gray-500 mb-3 text-4xl">📷</div>
                <p className="text-sm font-medium">
                  Click to upload image
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            ) : (
              <img
                src={preview}
                alt="preview"
                className="max-h-[400px] object-contain rounded-md"
              />
            )}
          </div>

          {/* Caption Section */}
          <div className="md:w-1/2 p-6 flex flex-col">

            <textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="border rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-gray-400"
              rows="6"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-4 bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition disabled:opacity-50"
            >
              {loading ? "Posting..." : "Share"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
