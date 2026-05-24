import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

export default function DangerZone() {
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/auth')
  }

  const handleDelete = async () => {
    try {
      await API.delete('/profile')
      localStorage.removeItem('token')
      setShowDeleteModal(false)
      navigate('/auth')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="danger-zone">
        <button className="danger-zone__btn danger-zone__btn--logout" type="button" onClick={handleLogout}>
          Log Out
        </button>
        <button className="danger-zone__btn danger-zone__btn--delete" type="button" onClick={() => setShowDeleteModal(true)}>
          Delete Account
        </button>
      </div>

      {showDeleteModal && (
        <div className="danger-zone__overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="danger-zone__modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="danger-zone__modal-title">Delete Account?</h3>
            <p className="danger-zone__modal-text">
              This will permanently delete your account and all your data. This action cannot be undone.
            </p>
            <div className="danger-zone__modal-actions">
              <button className="danger-zone__btn danger-zone__btn--ghost" type="button" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="danger-zone__btn danger-zone__btn--delete" type="button" onClick={handleDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}