'use client'

import React, { createContext, useContext, useState, type ReactNode } from 'react'
import { Toast } from '@/components/toast'

interface ToastContextType {
	showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning', duration?: number) => void
	hideToast: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

interface ToastProviderProps {
	children: ReactNode
	position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
}

export function ToastProvider({ children, position = 'top-right' }: ToastProviderProps) {
	const [toast, setToast] = useState<{
		message: string
		isVisible: boolean
		type: 'success' | 'error' | 'info' | 'warning'
		duration: number
	}>({
		message: '',
		isVisible: false,
		type: 'success',
		duration: 3000
	})

	const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success', duration: number = 3000) => {
		setToast({ message, isVisible: true, type, duration })
	}

	const hideToast = () => {
		setToast(prev => ({ ...prev, isVisible: false }))
	}

	return (
		<ToastContext.Provider value={{ showToast, hideToast }}>
			{children}
			<Toast
				message={toast.message}
				isVisible={toast.isVisible}
				onClose={hideToast}
				type={toast.type}
				duration={toast.duration}
				position={position}
			/>
		</ToastContext.Provider>
	)
}

export function useToast() {
	const context = useContext(ToastContext)
	if (context === undefined) {
		throw new Error('useToast must be used within a ToastProvider')
	}
	return context
}