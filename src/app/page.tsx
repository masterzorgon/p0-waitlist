'use client'

export default function Example() {

    return (
        <div className="bg-white h-full flex flex-col">
            <div className="relative isolate px-6 pt-14 lg:px-8 flex-1 flex items-center justify-center">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
                    />
                </div>
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                            Kamino Market is coming to Project 0.{" "}
                            <a href="#" className="font-semibold text-deepBlue">
                                <span aria-hidden="true" className="absolute inset-0" />
                                Learn more <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7x w-full">
                            Apply for Early Access
                        </h1>
                        <p className="mt-8 text-lg font-medium text-pretty text-gray-500">
                            Be the first to try unified margin on Solana. Lend, borrow, and unlock new strategies across the Project 0 and Kamino markets from one account.
                            Early access users will be chosen at random. Thank you for your interest!
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="/form"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Get Started
                            </a>
                        </div>
                    </div>
                </div>

                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
                    />
                </div>
            </div>
        </div>
    )
}


{/* <div className="flex flex-col gap-6 w-full lg:w-auto">
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
            <div className="mt-4 flex flex-col gap-2">
                <div className="text-sm text-gray-400 mb-2">
                    Share this image with your tweet:
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(shareableUrl);
                            alert("Shareable URL copied to clipboard!");
                        }}
                        className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm"
                    >
                        Copy Image URL
                    </button>
                    <button
                        onClick={() => {
                            const tweetText = `Unified margin is coming to DeFi, and I'm in early. I nominate @${mutual} to join the movement. ${shareableUrl}`;
                            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
                            window.open(twitterUrl, '_blank');
                        }}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
                    >
                        Share to Twitter
                    </button>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                    The image URL will be valid for 1 hour
                </div>
            </div>
        </div>
    )}
</div> */}

// const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//         const response = await fetch("/api/banner", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ username, mutual, email }),
//         });

//         const data = await response.json();

//         if (data.success) {
//             setProfileImage(`https://unavatar.io/twitter/${username}`);
//             setGeneratedImage(`data:image/png;base64,${data.image}`);
//             setShareableUrl(data.shareableUrl);
//         } else {
//             setError(data.error || "Failed to generate banner");
//         }
//     } catch (err) {
//         setError("An error occurred while generating the banner");
//     } finally {
//         setLoading(false);
//     }
// };