'use client'

import { useState, useEffect } from 'react'

export default function EditUserForm({ user, onClose, onUserUpdated }) {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email
      })
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update user')
      }

      onUserUpdated()
      onClose()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError('')
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center p-4 z-50 animate-in fade-in duration-500">
      <div className="bg-gray-900/95 border border-green-500/30 rounded-2xl shadow-2xl shadow-green-500/20 max-w-md w-full transform animate-in scale-in duration-300 slide-in-from-bottom-4">
        {/* Header with Cosmic Gradient */}
        <div className="px-6 py-5 bg-gradient-to-r from-green-600/80 to-emerald-600/80 rounded-t-2xl border-b border-green-400/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white font-mono">UPDATE PROFILE</h2>
                <p className="text-green-100 text-sm font-mono mt-1">MODIFY USER DATA</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-all duration-200 p-2 hover:bg-white/10 rounded-lg hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start backdrop-blur-sm">
              <div className="h-5 w-5 bg-red-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-red-400 text-sm flex-1 font-mono">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-green-300 mb-3 font-mono">
                DESIGNATION *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-green-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-green-500/30 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-green-100 placeholder-green-500/40 font-mono backdrop-blur-sm"
                  placeholder="ENTER DESIGNATION"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-green-300 mb-3 font-mono">
                COMMUNICATION CHANNEL *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-green-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-green-500/30 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-green-100 placeholder-green-500/40 font-mono backdrop-blur-sm"
                  placeholder="CHANNEL@DOMAIN.COM"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-green-500/20">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 text-green-300 hover:text-green-200 font-semibold transition-all duration-200 hover:bg-green-500/10 rounded-xl border border-green-500/30 hover:border-green-400/50 hover:scale-105 font-mono"
            >
              ABORT
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-green-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-mono"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  UPDATING...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  UPDATE PROFILE
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}