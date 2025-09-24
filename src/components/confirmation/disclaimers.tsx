import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const DISCLAIMERS = [
    {
        id: 'no-guarantee',
        text: 'Application does not guarantee early access'
    },
    {
        id: 'discretion',
        text: 'Early access users will be selected at Project 0\'s discretion'
    },
    {
        id: 'email-notification',
        text: 'Users granted early access will be notified via email'
    },
    {
        id: 'security',
        text: 'We will never ask for your secret key or seed phrase'
    }
]


export const Disclaimers = (className : { className?: string }) => {
    return (
        <div className={`p-4 bg-amber-50 border border-amber-200 rounded-xl ${className}`}>
            <h4 className="text-sm font-semibold text-amber-900 mb-3 flex items-center">
                <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                Important Disclaimers
            </h4>
            <ul className="space-y-2 text-sm text-amber-800">
                {DISCLAIMERS.map((disclaimer) => (
                    <li key={disclaimer.id} className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>{disclaimer.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
