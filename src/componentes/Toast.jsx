import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

const ToastContext = createContext(null)

let idCounter = 1

export function ToastProvider({ children }) {
	const [toasts, setToasts] = useState([])

	const addToast = useCallback((message, type = 'info', opts = {}) => {
		const id = idCounter++
		const ttl = typeof opts.ttl === 'number' ? opts.ttl : 3500
		setToasts((t) => [...t, { id, message, type }])
		if (ttl > 0) {
			setTimeout(() => {
				setToasts((t) => t.filter((x) => x.id !== id))
			}, ttl)
		}
		return id
	}, [])

	const removeToast = useCallback((id) => {
		setToasts((t) => t.filter((x) => x.id !== id))
	}, [])

	return (
		<ToastContext.Provider value={{ addToast, removeToast }}>
			{children}
			<div aria-live="polite" className="fixed bottom-6 right-6 z-[99999] flex flex-col gap-3">
				{toasts.map((toast) => (
					<div key={toast.id} className={`max-w-sm w-full px-4 py-3 rounded-lg shadow-lg text-white ${toast.type === 'error' ? 'bg-red-600' : toast.type === 'success' ? 'bg-green-600' : 'bg-black/80'}`}>
						<div className="text-sm">{toast.message}</div>
					</div>
				))}
			</div>
		</ToastContext.Provider>
	)
}

export function useToast() {
	const ctx = useContext(ToastContext)
	if (!ctx) {
		throw new Error('useToast must be used within a ToastProvider')
	}
	return ctx
}

export default ToastProvider

