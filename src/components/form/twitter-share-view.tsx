'use client'

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/button";
import { useToast } from "@/components/toast-provider";
import { getTwitterProfileImage, validateTweetUrl } from "@/lib/utils";
import { CheckCircleIcon, ArrowDownTrayIcon, CheckIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { TwitterIconNoBackground } from "@/components/icons";

interface TwitterShareViewProps {
    formData: {
        email: string;
        telegram: string;
        twitter: string;
        wallet: string;
    };
    generatedBanner?: {
        image: string;
        imageId: string;
        shareableUrl: string;
        profileImage: string;
        username: string;
    } | null;
    walletPoints?: {
        points?: number;
        rank?: number;
    } | null;
}

interface BannerResponse {
    success: boolean;
    image: string;
    imageId: string;
    shareableUrl: string;
    profileImage: string;
    username: string;
}

export const TwitterShareView = ({ formData, generatedBanner, walletPoints }: TwitterShareViewProps) => {
    const { showToast } = useToast();
    const router = useRouter();

    const [bannerImage, setBannerImage] = useState<string>('');
    const [isGeneratingBanner, setIsGeneratingBanner] = useState(!generatedBanner);
    const [isSharing, setIsSharing] = useState(false);
    const [tweetUrl, setTweetUrl] = useState('');
    const [isSubmittingProof, setIsSubmittingProof] = useState(false);
    const [urlError, setUrlError] = useState<string>('');

    // TODO: Generate a simple referral code based on wallet address
    const referralCode = `socapital.trading/waitlist?ref=${formData.wallet.slice(-8)}`;

    const generateBanner = async () => {
        // try {
        //     setIsGeneratingBanner(true);
        //     const response = await fetch('/api/banner', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             username: formData.twitter.replace('@', ''),
        //             email: formData.email,
        //             mutual: false
        //         }),
        //     });

        //     const result: BannerResponse = await response.json();

        //     if (result.success) {
        //         setBannerImage(`data:image/png;base64,${result.image}`);
        //     } else {
        //         showToast('Failed to generate banner image', 'error');
        //     }
        // } catch (error) {
        //     console.error('Error generating banner:', error);
        //     showToast('Error generating banner image', 'error');
        // } finally {
        //     setIsGeneratingBanner(false);
        // }
    };

    const handleShareOnTwitter = () => {
        const tweetText = `Just applied for the new @so_capital rollout. Join me: ${referralCode}`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

        setIsSharing(true);
        window.open(twitterUrl, '_blank');

        // Reset sharing state after a short delay
        setTimeout(() => {
            setIsSharing(false);
        }, 1000);
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTweetUrl(value);

        if (urlError) {
            setUrlError('');
        }

        if (value.trim()) {
            const validation = validateTweetUrl(value);
            if (!validation.isValid) {
                setUrlError(validation.error || '');
            }
        }
    };

    const handleUrlBlur = () => {
        if (tweetUrl.trim()) {
            const validation = validateTweetUrl(tweetUrl);
            if (!validation.isValid) {
                setUrlError(validation.error || '');
            } else {
                setUrlError('');
            }
        }
    };

    const handleSubmitProof = async () => {
        const validation = validateTweetUrl(tweetUrl);
        if (!validation.isValid) {
            setUrlError(validation.error || '');
            showToast(validation.error || 'Please enter a valid tweet URL', 'error');
            return;
        }

        try {
            setIsSubmittingProof(true);

            // Update localStorage with tweet URL
            const existingData = localStorage.getItem('p0-waitlist-data');
            let dataToStore;

            if (existingData) {
                try {
                    dataToStore = JSON.parse(existingData);
                    dataToStore.tweetUrl = tweetUrl;
                } catch (error) {
                    console.error('Error parsing existing data:', error);
                    dataToStore = {
                        ...formData,
                        ...walletPoints,
                        tweetUrl: tweetUrl,
                        timestamp: new Date().toISOString()
                    };
                }
            } else {
                dataToStore = {
                    ...formData,
                    ...walletPoints,
                    tweetUrl: tweetUrl,
                    timestamp: new Date().toISOString()
                };
            }

            localStorage.setItem('p0-waitlist-data', JSON.stringify(dataToStore));

            // Prepare URL parameters for confirmation page
            const params = new URLSearchParams({
                email: formData.email,
                telegram: formData.telegram,
                twitter: formData.twitter,
                wallet: formData.wallet,
                ...(walletPoints?.points && { points: walletPoints.points.toString() }),
                ...(walletPoints?.rank && { rank: walletPoints.rank.toString() }),
                tweetUrl: tweetUrl
            });

            showToast('Tweet proof submitted successfully!', 'success');

            // Navigate to confirmation page with all data
            router.push(`/confirmation?${params.toString()}`);

        } catch (error) {
            console.error('Error submitting proof:', error);
            showToast('Error submitting tweet proof', 'error');
        } finally {
            setIsSubmittingProof(false);
        }
    };

    const handleDownloadBanner = () => {
        if (!bannerImage) return;

        try {
            const link = document.createElement('a');
            link.href = bannerImage;
            link.download = `project-0-banner-${formData.twitter.replace('@', '')}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showToast('Banner downloaded successfully!', 'success');
        } catch (error) {
            console.error('Error downloading banner:', error);
            showToast('Error downloading banner', 'error');
        }
    };

    useEffect(() => {
        // If we have a pre-generated banner, use it
        if (generatedBanner) {
            setBannerImage(`data:image/png;base64,${generatedBanner.image}`);
            setIsGeneratingBanner(false);
        } else {
            // Otherwise generate one
            generateBanner();
        }
    }, [generatedBanner]);

    const profileImage = getTwitterProfileImage(formData.twitter);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="max-w-md mx-auto"
        >
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Spread the word!
                </h2>
                <p className="text-gray-600">
                    Announce your application and earn referral rewards.<br />Submit your tweet link for proof.
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 mb-6">
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling?.classList.remove('hidden');
                            }}
                        />
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hidden">
                            <span className="text-white font-bold text-sm">
                                {formData.twitter.charAt(1).toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <div className="ml-3">
                        <div className="flex items-center">
                            <span className="font-bold text-gray-900">{formData.twitter}</span>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-gray-900 leading-relaxed">
                        Just applied for the new <span className="text-blue-500">@so_capital</span> rollout. Join me: <span className="text-blue-500">{referralCode}</span>
                    </p>
                </div>

                <div className={`rounded-xl overflow-hidden bg-gray-100 relative ${isGeneratingBanner && 'animate-pulse'}`}>
                    {isGeneratingBanner ? (
                        <div className="h-48 flex items-center justify-center">
                            <div className="flex flex-col items-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500 mb-2"></div>
                                <p className="text-gray-500 text-sm">Generating banner...</p>
                            </div>
                        </div>
                    ) : bannerImage ? (
                        <>
                            <img
                                src={bannerImage}
                                alt="Social Capital Banner"
                                className="w-full h-auto"
                            />
                            <button
                                onClick={handleDownloadBanner}
                                className="cursor-pointer absolute bottom-3 left-3 p-2 bg-black bg-opacity-50 rounded-full"
                                title="Download banner"
                            >
                                <ArrowDownTrayIcon className="w-5 h-5 text-white" />
                            </button>
                        </>
                    ) : (
                        <div className="h-48 flex items-center justify-center">
                            <p className="text-gray-500">Banner not available</p>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <Button
                        variant="secondary"
                        onClick={generateBanner}
                        disabled={isGeneratingBanner}
                        loading={isGeneratingBanner}
                    >
                        Regenerate
                    </Button>

                    <Button
                        variant="primary"
                        onClick={handleShareOnTwitter}
                        disabled={isSharing}
                        className="flex items-center gap-1"
                    >
                        Share on
                        <TwitterIconNoBackground className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="mt-4">
                <div className="relative rounded-md shadow-sm outline outline-1 outline-gray-200 bg-white">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        {urlError ? (
                            <div className="p-1 bg-red-100 rounded-full">
                                <XCircleIcon className="h-5 w-5 text-red-600" />
                            </div>
                        ) : tweetUrl.trim() && !urlError ? (
                            <div className="p-1 bg-green-100 rounded-full">
                                <CheckCircleIcon className="h-5 w-5 text-green-600" />
                            </div>
                        ) : (
                            <CheckIcon className="h-5 w-5 text-gray-400" />
                        )}
                    </div>
                    <input
                        type="url"
                        id="tweet-url"
                        className={`ml-2 py-4 block w-full pl-10 sm:text-sm rounded-md text-gray-900 bg-white border-0 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 ${urlError ? 'outline-red-500 outline-2' : ''
                            }`}
                        placeholder="https://x.com/username/status/1234386091818959039"
                        value={tweetUrl}
                        onChange={handleUrlChange}
                        onBlur={handleUrlBlur}
                    />
                </div>
                {urlError && (
                    <p className="mt-2 text-sm text-red-600">{urlError}</p>
                )}
            </div>

            <Button
                className="w-full py-3 mt-4"
                onClick={handleSubmitProof}
                loading={isSubmittingProof}
                disabled={!tweetUrl.trim() || isSubmittingProof || !!urlError}
            >
                Submit Tweet Proof
            </Button>

            <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                    We only consider applications with proof of tweet.
                </p>
            </div>
        </motion.div>
    );
};