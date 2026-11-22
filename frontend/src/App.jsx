import React, { useState, useEffect } from 'react'
import { CheckCircle2, AlertCircle, RefreshCw, Layers, ShieldCheck, Database, ArrowRight } from 'lucide-react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'

export default function App() {
  const [backendStatus, setBackendStatus] = useState('checking') // 'checking' | 'connected' | 'error'
  const [backendData, setBackendData] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const checkBackendHealth = async () => {
    setBackendStatus('checking')
    setErrorMsg('')
    try {
      const res = await axios.get(`${API_BASE}/health`, { timeout: 4000 })
      setBackendData(res.data)
      setBackendStatus('connected')
    } catch (err) {
      setBackendStatus('error')
      setErrorMsg(err.message || 'Failed to connect to backend service')
    }
  }

  useEffect(() => {
    checkBackendHealth()
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm font-bold text-lg">
              LF
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">College Lost &amp; Found</h1>
              <p className="text-xs text-slate-500 font-medium">Campus Recovery &amp; Claim Portal</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              Phase 1: Foundation Ready
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-12 flex-grow flex flex-col justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-10">
          <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Project Foundation Initialized</h2>
              <p className="text-slate-600 text-sm mt-1">
                Dockerized stack with React (Vite) + FastAPI + PostgreSQL.
              </p>
            </div>
            <button
              onClick={checkBackendHealth}
              disabled={backendStatus === 'checking'}
              className="inline-flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${backendStatus === 'checking' ? 'animate-spin' : ''}`} />
              <span>Re-check API</span>
            </button>
          </div>

          {/* Health Status Indicator */}
          <div className="mb-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Backend Service Link
            </div>
            {backendStatus === 'checking' && (
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-600">
                <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
                <span className="text-sm font-medium">Testing connection to {API_BASE}/health...</span>
              </div>
            )}
            {backendStatus === 'connected' && (
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div className="text-sm">
                  <span className="font-semibold">FastAPI Connected: </span>
                  <span>{backendData?.service || 'API v1 is healthy and responding'}</span>
                </div>
              </div>
            )}
            {backendStatus === 'error' && (
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                <div className="text-sm">
                  <span className="font-semibold">Cannot reach backend: </span>
                  <span>{errorMsg}</span>
                </div>
              </div>
            )}
          </div>

          {/* Architecture Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center space-x-2 mb-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <h3 className="font-semibold text-slate-900 text-sm">Frontend</h3>
              </div>
              <p className="text-xs text-slate-600">React 18 + Vite 5 + Tailwind CSS on port 5173</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center space-x-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="font-semibold text-slate-900 text-sm">Backend</h3>
              </div>
              <p className="text-xs text-slate-600">FastAPI + Pydantic v2 + Uvicorn on port 8000</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center space-x-2 mb-2">
                <Database className="w-4 h-4 text-purple-600" />
                <h3 className="font-semibold text-slate-900 text-sm">Database</h3>
              </div>
              <p className="text-xs text-slate-600">PostgreSQL 16 with persistent volume</p>
            </div>
          </div>

          {/* Phase 2 preview */}
          <div className="rounded-xl p-4 bg-blue-50 border border-blue-100 flex items-start justify-between">
            <div>
              <h4 className="text-sm font-semibold text-blue-900">Next Step: Phase 2 Database Implementation</h4>
              <p className="text-xs text-blue-700 mt-0.5">
                SQLAlchemy 2.x models for Users, Categories, Items, Claims, and Notifications with Alembic migrations.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 ml-4 mt-0.5" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        College Lost &amp; Found Portal &bull; Clean Architecture Foundation
      </footer>
    </div>
  )
}
