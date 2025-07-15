import React, { useState } from 'react'
import { X as XIcon } from 'lucide-react'

import { onToggleModal } from "../store/actions/app.actions";

export default function ForgotPasswordModal() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(ev) {
    ev.preventDefault()
    onToggleModal('forgotPassword', null)
  }

  return (
    <div className="forgot-password-modal">
      <button
        onClick={() => onToggleModal('forgotPassword', null)}
        className="close-btn"
        aria-label="Close"
      >
        <XIcon size={20} />
      </button>
      <h2 className="h2-modal">Forgot Password</h2>
      {!isSubmitted ? (
        <>
          <p className="p-modal">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
          <form className="form-modal" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className=""
              required
            />
            {error && <p className="">{error}</p>}
            <button
              type="submit"
              className=""
            >
              Send Reset Link
            </button>
          </form>
        </>
      ) : (
        <div className="">
          <p className="">Reset link sent!</p>
          <p className="">
            Check your email at {email} for instructions to reset your
            password.
          </p>
          <button
            onClick={onClose}
            className=""
          >
            Return to login
          </button>
        </div>
      )}
    </div>
  )
}
