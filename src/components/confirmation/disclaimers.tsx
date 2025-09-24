import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface Disclaimer {
    id: string
    text: string
}

interface DisclaimersProps {
    disclaimers: Disclaimer[]
    title?: string
    className?: string
}

export const Disclaimers = ({ 
    disclaimers, 
    title = "Important Disclaimers",
    className = ""
}: DisclaimersProps) => {
    return (
        <div className={`p-4 bg-amber-50 border border-amber-200 rounded-xl ${className}`}>
            <h4 className="text-sm font-semibold text-amber-900 mb-3 flex items-center">
                <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                {title}
            </h4>
            <ul className="space-y-2 text-sm text-amber-800">
                {disclaimers.map((disclaimer) => (
                    <li key={disclaimer.id} className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>{disclaimer.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
