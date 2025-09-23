'use client'

import { Header } from '@/components/header'
import { TwitterIcon, LinkedInIcon, DiscordIcon, TelegramIcon } from '@/components/icons'

export default function ThankYouPage() {
    const socialLinks = [
        {
            name: 'Twitter',
            url: 'https://twitter.com/0dotxyz',
            icon: TwitterIcon,
            color: 'hover:text-blue-400'
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com/company/0dotxyz',
            icon: LinkedInIcon,
            color: 'hover:text-blue-600'
        },
        {
            name: 'Discord',
            url: 'https://discord.gg/0dotxyz',
            icon: DiscordIcon,
            color: 'hover:text-indigo-500'
        },
        {
            name: 'Telegram',
            url: 'https://t.me/0dotxyz',
            icon: TelegramIcon,
            color: 'hover:text-blue-500'
        }
    ]

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header />

            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-280px)]">
                <div className="text-center max-w-2xl mx-auto">
                    {/* Success Icon */}
                    <div className="w-15 h-15 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    {/* Thank You Message */}
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Thank You for applying
                    </h1>

                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        <span className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                            Early access users will be selected at Project 0's discretion.<br />
                        </span>
                        <span className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                            Users will be notified via email for early access.<br />
                        </span>
                        <span className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                            We will never ask for your secret key or seed phrase.
                        </span>
                        <span className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                            Only one application per user.
                        </span>
                    </p>

                    <hr className="my-8 border-gray-200" />

                    <p className="text-lg text-gray-500 mb-12">
                        Stay connected with us for updates and announcements:
                    </p>

                    {/* Social Media Links */}
                    <div className="flex flex-wrap justify-center gap-6 mb-12">
                        {socialLinks.map((social, index) => (
                            <social.icon className="w-6 h-6 mb-2" />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}