'use client'

import { useRouter } from "next/navigation";



export default function LoginPage() {

  const router = useRouter()
  return (
    <div style={{ padding: '40px', maxWidth: '400px' }}>

      <h2>Sign In</h2>
      <input
        type="text"
        data-testid="username-input"
        placeholder="Enter your username"
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="Enter your password"
      />
      <button
        type="submit"
        data-testid="login-button"
      >
        Login
      </button>
    </div>
  );
}
