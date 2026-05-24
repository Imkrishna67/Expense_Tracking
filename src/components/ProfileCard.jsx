import { useState, useCallback, useEffect } from 'react'
import API from '../api'

export default function ProfileCard() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [editing, setEditing] = useState(false)
  const [tempName, setTempName] = useState('')
  const [memberSince, setMemberSince] = useState('')

  useEffect(() => {
    API.get('/profile')
      .then(res => {
        setName(res.data.name)
        setEmail(res.data.email)
        setTempName(res.data.name)
        setMemberSince(res.data.createdAt)
      })
      .catch(err => console.log(err))
  }, [])

  const saveEdit = useCallback(async () => {
    const trimmed = tempName.trim()
    if (trimmed) {
      try {
        await API.put('/profile', { name: trimmed })
        setName(trimmed)
      } catch (err) {
        console.log(err)
      }
    }
    setEditing(false)
  }, [tempName])

  const avatarLetter = name?.charAt(0).toUpperCase() || '?'

  return (
    <div className="profile-card">
      <div className="profile-card__avatar">{avatarLetter}</div>
      <div className="profile-card__details">
        {editing ? (
          <div className="profile-card__edit-row">
            <input className="profile-card__input" value={tempName} onChange={(e) => setTempName(e.target.value)} onBlur={saveEdit} onKeyDown={(e) => e.key === 'Enter' && saveEdit()} autoFocus />
          </div>
        ) : (
          <h2 className="profile-card__name">{name}</h2>
        )}
        <p className="profile-card__email">{email}</p>
        {memberSince && <p className="profile-card__meta">Member since {new Date(memberSince).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>}
      </div>
      {!editing && (
        <button className="profile-card__edit-btn" type="button" onClick={() => setEditing(true)}>Edit Profile</button>
      )}
    </div>
  )
}