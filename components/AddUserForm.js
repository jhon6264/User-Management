'use client'

import { useState } from 'react'

export default function AddUserForm({ onClose, onUserAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add user')
      }

      onUserAdded()
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-gray-900/95 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 max-w-md w-full animate-scale-in">
        {/* Header with Cosmic Gradient */}
        <div className="px-6 py-5 bg-gradient-to-r from-cyan-600/80 to-blue-600/80 rounded-t-2xl border-b border-cyan-400/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white font-mono">ADD USER</h2>
                <p className="text-cyan-100 text-sm font-mono mt-1">CREATE NEW USER PROFILE</p>
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
              <label htmlFor="name" className="block text-sm font-semibold text-cyan-300 mb-3 font-mono">
                NAME *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="block w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-cyan-100 placeholder-cyan-500/40 font-mono backdrop-blur-sm"
                  placeholder="Enter name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-cyan-300 mb-3 font-mono">
                EMAIL *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="block w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-cyan-100 placeholder-cyan-500/40 font-mono backdrop-blur-sm"
                  placeholder="Enter email"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-cyan-500/20">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 text-cyan-300 hover:text-cyan-200 font-semibold transition-all duration-200 hover:bg-cyan-500/10 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 hover:scale-105 font-mono"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-mono"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ADDING...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  ADD USER
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}