import * as Headless from '@headlessui/react'
import { clsx } from 'clsx'
import { Link } from './link'

const variants = {
	primary: clsx(
		'inline-flex items-center justify-center px-4 py-[calc(--spacing(2)-1px)]',
		'rounded-lg border border-transparent bg-gray-950 shadow-md',
		'text-base font-medium whitespace-nowrap text-white',
		'data-disabled:bg-gray-950 data-disabled:opacity-40 data-hover:bg-gray-800',
		'data-disabled:cursor-not-allowed cursor-pointer',
		'min-w-[120px]',
	),
	secondary: clsx(
		'relative inline-flex items-center justify-center px-4 py-[calc(--spacing(2)-1px)]',
		'rounded-lg border border-transparent bg-white/15 shadow-md ring-1 ring-black/10',
		'after:absolute after:inset-0 after:rounded-lg after:shadow-[inset_0_0_2px_1px_#ffffff4d]',
		'text-base font-medium whitespace-nowrap text-gray-950',
		'data-disabled:bg-white/15 data-disabled:opacity-40 data-hover:bg-white/20',
		'data-disabled:cursor-not-allowed cursor-pointer',
		'min-w-[120px]',
	),
	outline: clsx(
		'inline-flex items-center justify-center px-2 py-[calc(--spacing(1.5)-1px)]',
		'rounded-lg border border-transparent shadow-sm ring-1 ring-black/10',
		'text-sm font-medium whitespace-nowrap text-gray-950',
		'data-disabled:bg-transparent data-disabled:opacity-40 data-hover:bg-gray-50',
		'data-disabled:cursor-not-allowed cursor-pointer',
		'min-w-[100px]',
	),
}

type ButtonProps = {
	variant?: keyof typeof variants
	loading?: boolean
	disabled?: boolean
} & (
		| React.ComponentPropsWithoutRef<typeof Link>
		| (Headless.ButtonProps & { href?: undefined })
	)

export function Button({
	variant = 'primary',
	className,
	loading = false,
	children,
	disabled,
	...props
}: ButtonProps) {
	className = clsx(variants[variant], className)

	const isDisabled = disabled || loading

	const buttonContent = loading ? (
		<svg
			className="animate-spin h-5 w-5 text-white"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"
			/>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	) : children

	if (typeof props.href === 'undefined') {
		return (
			<Headless.Button
				{...props}
				className={className}
				disabled={isDisabled}
			>
				{buttonContent}
			</Headless.Button>
		)
	}

    return <Link {...props} className={className}>{children as React.ReactNode}</Link>
}
