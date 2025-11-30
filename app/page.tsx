'use client'

import { useState, useEffect } from 'react'
import UserTable from '../components/UserTable'
import AddUserForm from '../components/AddUserForm'
import EditUserForm from '../components/EditUserForm'

export default function Home() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [currentTime, setCurrentTime] = useState('')

  // Set current time on client side only
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString())
  }, [])

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load users on component mount
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen relative z-10">
      {/* Cosmic Header */}
      <header className="relative bg-gray-900/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="h-12 w-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25 animate-pulse-slow">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-cyan-500/20 rounded-xl blur-sm animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  USER MANAGEMENT
                </h1>
                <p className="text-cyan-300/80 text-sm font-mono mt-1">
                  Admin
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="relative px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 border border-cyan-400/30 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                ADD USER
              </span>
            </button>
          </div>
          
          {/* Status Bar */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-cyan-500/20">
            <div className="flex items-center space-x-6 text-sm font-mono">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-cyan-300">SYSTEM: ONLINE</span>
              </div>
              <div className="text-cyan-400/60">
                USERS: <span className="text-cyan-300">{users.length}</span>
              </div>
              <div className="text-cyan-400/60">
                LAST SCAN: <span className="text-cyan-300">{currentTime || 'LOADING...'}</span>
              </div>
            </div>
            <div className="text-cyan-400/60 text-sm font-mono">
              VERSION: 2.4.1
            </div>
          </div>
        </div>
        
        {/* Animated Header Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 overflow-hidden">
          <UserTable 
            users={users} 
            loading={loading}
            onUserUpdated={fetchUsers}
            onEditUser={setEditingUser}
          />
        </div>
      </main>

      {/* Add User Form Modal */}
      {showAddForm && (
        <AddUserForm
          onClose={() => setShowAddForm(false)}
          onUserAdded={fetchUsers}
        />
      )}

      {/* Edit User Form Modal */}
      {editingUser && (
        <EditUserForm
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onUserUpdated={fetchUsers}
        />
      )}
    </div>
  )
}