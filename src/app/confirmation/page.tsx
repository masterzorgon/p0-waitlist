'use client'

import { Header } from '@/components/header'
import { Disclaimers } from '@/components/confirmation/disclaimers'
import { ConfirmationItemCard, ConfirmationItem } from '@/components/confirmation/confirmation-item'
import { 
    CheckCircleIcon,
    EnvelopeIcon,
    WalletIcon,
    ChatBubbleLeftRightIcon,
    UserIcon,
    StarIcon,
    TrophyIcon,
    LinkIcon
} from '@heroicons/react/24/outline'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUturnLeftIcon } from '@heroicons/react/16/solid'

interface UserData {
    email: string
    telegram: string
    twitter: string
    wallet: string
    points?: number
    rank?: number
    tweetUrl?: string
}

function ThankYouContent() {
    const searchParams = useSearchParams()
    const [userData, setUserData] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const email = searchParams.get('email')
        const telegram = searchParams.get('telegram')
        const twitter = searchParams.get('twitter')
        const wallet = searchParams.get('wallet')
        const points = searchParams.get('points')
        const rank = searchParams.get('rank')
        const tweetUrl = searchParams.get('tweetUrl')

        if (email && telegram && twitter && wallet) {
            setUserData({
                email,
                telegram,
                twitter,
                wallet,
                points: points ? parseInt(points) : undefined,
                rank: rank ? parseInt(rank) : undefined,
                tweetUrl: tweetUrl || undefined
            })
        } else {
            const storedData = localStorage.getItem('p0-waitlist-data')
            if (storedData) {
                try {
                    const parsed = JSON.parse(storedData)
                    setUserData(parsed)
                } catch (error) {
                    console.error('Error parsing stored data:', error)
                }
            }
        }
        setLoading(false)
    }, [searchParams])

    const formatWallet = (wallet: string) => {
        if (wallet.length > 20) {
            return `${wallet.slice(0, 8)}...${wallet.slice(-8)}`
        }
        return wallet
    }

    const formatTweetUrl = (url: string) => {
        if (url.length > 50) {
            return `${url.slice(0, 30)}...${url.slice(-20)}`
        }
        return url
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <Header />
                <div className="flex items-center justify-center min-h-[calc(100vh-280px)]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            </main>
        )
    }

    if (!userData) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <Header />
                <div className="flex items-center justify-center min-h-[calc(100vh-280px)]">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">No data found</h1>
                        <p className="text-gray-600">Please complete the application form first.</p>
                    </div>
                </div>
            </main>
        )
    }

    const confirmationItems: ConfirmationItem[] = [
        { 
            id: 'email',
            label: 'Email', 
            value: userData.email,
            icon: EnvelopeIcon
        },
        { 
            id: 'telegram',
            label: 'Telegram', 
            value: userData.telegram.startsWith('@') ? userData.telegram : `@${userData.telegram}`,
            icon: ChatBubbleLeftRightIcon
        },
        { 
            id: 'twitter',
            label: 'Twitter', 
            value: userData.twitter.startsWith('@') ? userData.twitter : `@${userData.twitter}`,
            icon: UserIcon
        },
        { 
            id: 'wallet',
            label: 'Wallet Address', 
            value: userData.wallet,
            icon: WalletIcon,
            displayFormat: formatWallet
        },
        ...(userData.points ? [{ 
            id: 'points',
            label: 'Points', 
            value: userData.points.toLocaleString(),
            icon: StarIcon
        }] : []),
        ...(userData.rank ? [{ 
            id: 'rank',
            label: 'Rank', 
            value: `#${userData.rank.toLocaleString()}`,
            icon: TrophyIcon
        }] : []),
        ...(userData.tweetUrl ? [{ 
            id: 'tweetUrl',
            label: 'Tweet URL', 
            value: userData.tweetUrl,
            icon: LinkIcon,
            displayFormat: formatTweetUrl
        }] : [])
    ]

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header />

            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-280px)] px-4 border-2 pb-32">
                <div className="mx-auto mt-16 max-w-2xl w-full">
                    <div className="bg-white/60 rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10">
                        <div className="space-y-6">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Application Confirmed
                                </h3>
                                <p className="text-sm text-gray-600 max-w-md mx-auto">
                                    Thank you for applying! Your information has been successfully submitted.
                                </p>
                            </div>
                            
                            <div className="space-y-3">
                                {confirmationItems.map((item) => (
                                    <ConfirmationItemCard key={item.id} item={item} />
                                ))}
                            </div>

                            <Disclaimers className="mt-6" />

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="text-center">
                                    <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                                        <CheckCircleIcon className="h-4 w-4 mr-2" />
                                        Application Complete
                                    </div>
                                    <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
                                        <ArrowUturnLeftIcon className="h-4 w-4 mr-2" />
                                        <Link href="/">Back to form</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default function ThankYouPage() {
    return (
        <Suspense
            fallback={
                <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                    <Header />
                    <div className="flex items-center justify-center min-h-[calc(100vh-280px)]">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                </main>
            }
        >
            <ThankYouContent />
        </Suspense>
    )
}