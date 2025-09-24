import { CheckCircleIcon } from "@heroicons/react/24/outline"

export interface ConfirmationItem {
    id: string
    label: string
    value: string
    icon: React.ComponentType<{ className?: string }>
    displayFormat?: (value: string) => string
}


export const ConfirmationItemCard = ({ item }: { item: ConfirmationItem }) => {
    const displayValue = item.displayFormat ? item.displayFormat(item.value) : item.value;
    
    return (
        <div className="flex items-center p-4 bg-gray-50/50 rounded-xl border border-gray-100">
            <div className="flex items-center flex-1 min-w-0">
                <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
                    <item.icon className="h-5 w-5 text-gray-600" />
                </div>
                <div className="ml-4 flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {item.label}
                    </div>
                    <div className="text-base text-gray-900 font-medium truncate" title={displayValue}>
                        {displayValue}
                    </div>
                </div>
            </div>
            <div className="flex-shrink-0 ml-4">
                <div className="p-1 bg-green-100 rounded-full">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                </div>
            </div>
        </div>
    );
};