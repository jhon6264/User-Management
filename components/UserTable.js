'use client'

import { useState, useEffect } from 'react'

export default function UserTable({ users, loading, onUserUpdated, onEditUser }) {
  const [deletingUser, setDeletingUser] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  // Set current time on client side only
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString())
  }, [])

  // Handle delete user
  const handleDelete = async (userId) => {
    try {
      await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
      })
      onUserUpdated()
      setDeletingUser(null)
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  // Handle refresh - updates both user list AND scan time
  const handleRefresh = async () => {
    setRefreshing(true)
    
    // Update the scan time immediately
    setCurrentTime(new Date().toLocaleTimeString())
    
    // Refresh the user data
    await onUserUpdated()
    
    // Keep refreshing state for a moment for better UX
    setTimeout(() => setRefreshing(false), 500)
  }

  // Smart skeleton loading - show 3 rows if no users, otherwise match current count
  const skeletonCount = users.length === 0 ? 3 : users.length

  // Cosmic Skeleton Loading Rows
  const SkeletonRow = () => (
    <tr className="animate-pulse border-b border-cyan-500/10">
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-cyan-500/20 mr-3 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-cyan-500/20 rounded w-32"></div>
            <div className="h-3 bg-cyan-500/10 rounded w-24"></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="h-4 bg-cyan-500/20 rounded w-40"></div>
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="h-4 bg-cyan-500/20 rounded w-28"></div>
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="flex space-x-3">
          <div className="h-9 bg-cyan-500/20 rounded w-20"></div>
          <div className="h-9 bg-cyan-500/20 rounded w-20"></div>
        </div>
      </td>
    </tr>
  )

  if (loading) {
    return (
      <div className="overflow-hidden">
        {/* Loading Header */}
        <div className="px-6 py-5 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-cyan-300">USER DATABASE</h3>
              <p className="text-cyan-400/60 text-sm font-mono mt-1 animate-pulse">
                SCANNING USER DATA...
              </p>
            </div>
            <div className="h-8 bg-cyan-500/20 rounded w-32 animate-pulse"></div>
          </div>
        </div>
        
        <table className="min-w-full">
          <thead className="bg-cyan-500/10 backdrop-blur-sm">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-b border-cyan-500/20">
                USER PROFILE
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-b border-cyan-500/20">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-b border-cyan-500/20">
                REGISTRATION
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-b border-cyan-500/20">
                COMMANDS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-500/10">
            {[...Array(skeletonCount)].map((_, index) => (
              <SkeletonRow key={index} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-5 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-cyan-300">USER DATABASE</h3>
            <p className="text-cyan-400/60 text-sm font-mono mt-1">
              DATABASE STATUS: ONLINE
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center px-4 py-2 text-cyan-300 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-200 transition-all duration-300 border border-cyan-500/30 hover:border-cyan-400/50 hover:scale-105 font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg 
                className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {refreshing ? 'REFRESHING...' : 'REFRESH'}
            </button>
            <div className="text-cyan-400/60 text-sm font-mono bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/20">
              SCAN: {currentTime || 'LOADING...'}
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-cyan-500/10 backdrop-blur-sm sticky top-0">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-b border-cyan-500/20">
                USER PROFILE
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-b border-cyan-500/20">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-b border-cyan-500/20">
                REGISTRATION
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-b border-cyan-500/20">
                COMMANDS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-500/10">
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center text-cyan-400/60">
                    <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mb-6 border border-cyan-500/20">
                      <svg className="w-10 h-10 text-cyan-500/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <p className="text-xl font-semibold text-cyan-300 mb-3 font-mono">NO USERS DETECTED</p>
                    <p className="text-cyan-400/60 font-mono">INITIATE FIRST USER PROTOCOL</p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr 
                  key={user.id} 
                  className="transition-all duration-300 hover:bg-cyan-500/5 group border-b border-cyan-500/10 last:border-b-0"
                >
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3 shadow-lg shadow-cyan-500/25 group-hover:scale-110 transition-transform duration-300">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-cyan-100 group-hover:text-cyan-300 transition-colors">
                          {user.name}
                        </div>
                        <div className="text-xs text-cyan-400/60 font-mono">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm text-cyan-100">{user.email}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm text-cyan-100 font-mono">
                      {new Date(user.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-xs text-cyan-400/60 font-mono">
                      {new Date(user.created_at).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => onEditUser(user)}
                        className="inline-flex items-center px-4 py-2 text-xs font-semibold text-cyan-300 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-200 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/25 border border-cyan-500/30 hover:border-cyan-400/50 hover:scale-105 font-mono"
                      >
                        <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        EDIT
                      </button>
                      <button
                        onClick={() => setDeletingUser(user)}
                        className="inline-flex items-center px-4 py-2 text-xs font-semibold text-red-400 bg-red-500/10 rounded-lg hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-500/25 border border-red-500/30 hover:border-red-400/50 hover:scale-105 font-mono"
                      >
                        <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        DELETE
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xl flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-gray-900/95 border border-red-500/30 rounded-2xl shadow-2xl shadow-red-500/20 max-w-md w-full animate-scale-in">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-red-500/20 rounded-full flex items-center justify-center mr-3 border border-red-500/30">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-400 font-mono">TERMINATION PROTOCOL</h3>
                  <p className="text-red-400/60 text-sm font-mono mt-1">USER DATA DELETION</p>
                </div>
              </div>
              <p className="text-cyan-100 mb-6 leading-relaxed">
                Confirm termination of user profile: <span className="font-semibold text-red-300">{deletingUser.name}</span>
                <br />
                <span className="text-cyan-400/60 text-sm font-mono">
                  This action is irreversible. All user data will be permanently erased from the database.
                </span>
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeletingUser(null)}
                  className="px-6 py-3 text-cyan-300 hover:text-cyan-200 font-semibold transition-all duration-200 hover:bg-cyan-500/10 rounded-xl border border-cyan-500/30 font-mono"
                >
                  ABORT
                </button>
                <button
                  onClick={() => handleDelete(deletingUser.id)}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-red-500/25 hover:scale-105 font-mono"
                >
                  CONFIRM TERMINATE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}