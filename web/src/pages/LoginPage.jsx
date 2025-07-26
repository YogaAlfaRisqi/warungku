import { useState } from 'react'
import InputField from '../components/InputField'
import LoginVector from '../assets/react.svg' // Gambar SVG lokal

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    console.log('Login with:', email, password)
    // Tambahkan logika autentikasi di sini
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Kiri: Gambar */}
      <div className="hidden md:flex items-center justify-center bg-blue-100">
        <img src={LoginVector} alt="Login Illustration" className="max-w-md w-full" />
      </div>

      {/* Kanan: Form */}
      <div className="flex items-center justify-center px-6 py-10 bg-gray-100">
        <div className="w-full max-w-md">
          <InputField
            title="Login to Warungku"
            subtitle="Smart Inventory & Sales App"
            buttonText="Login"
            onSubmit={handleLogin}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Input your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </InputField>
        </div>
      </div>
    </div>
  )
}
