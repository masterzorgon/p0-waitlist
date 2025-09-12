"use client";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [mutual, setMutual] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/banner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, mutual, email }),
      });

      const data = await response.json();
      
      if (data.success) {
        setProfileImage(`https://unavatar.io/twitter/${username}`);
        setGeneratedImage(`data:image/png;base64,${data.image}`);
      } else {
        setError(data.error || "Failed to generate banner");
      }
    } catch (err) {
      setError("An error occurred while generating the banner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-8 rounded-lg shadow-xl w-full lg:w-96"
        >
          <h2 className="text-2xl font-bold mb-4 text-black">Generate Your Banner</h2>
          
          <input
            className="p-3 rounded text-black"
            placeholder="Your Twitter handle (without @)"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="p-3 rounded text-black"
            placeholder="Mutual's Twitter handle (without @)"
            value={mutual}
            required
            onChange={(e) => setMutual(e.target.value)}
          />
          <input
            className="p-3 rounded text-black"
            placeholder="Your email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 px-4 py-3 rounded font-semibold"
          >
            {loading ? "Generating..." : "Generate My Banner"}
          </button>
          
          {error && (
            <div className="text-red-400 text-sm mt-2">
              {error}
            </div>
          )}
        </form>

        {/* Results Section */}
        <div className="flex flex-col gap-6 w-full lg:w-auto">
          {/* Profile Preview */}
          {profileImage && (
            <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
              <h3 className="text-xl font-bold mb-4">Your Profile</h3>
              <div className="flex items-center gap-4">
                <img
                  src={profileImage}
                  alt={`${username}'s profile`}
                  className="w-16 h-16 rounded-full border-2 border-purple-600"
                  onError={(e) => {
                    e.currentTarget.src = "/default-avatar.png"; // fallback image
                  }}
                />
                <div>
                  <p className="font-semibold">@{username}</p>
                  <p className="text-gray-400 text-sm">Twitter Profile</p>
                </div>
              </div>
            </div>
          )}

          {/* Generated Banner */}
          {generatedImage && (
            <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
              <h3 className="text-xl font-bold mb-4">Generated Banner</h3>
              <div className="border-2 border-gray-700 rounded-lg overflow-hidden">
                <img
                  src={generatedImage}
                  alt="Generated banner"
                  className="w-full max-w-md mx-auto"
                />
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.download = `${username}-banner.png`;
                    link.href = generatedImage;
                    link.click();
                  }}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
                >
                  Download Banner
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
