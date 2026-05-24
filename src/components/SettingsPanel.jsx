import { useState } from 'react'
import { useTheme } from '../ThemeContext.jsx'
const CURRENCIES = ['₹ INR', '$ USD', '€ EUR']
const LANGUAGES = ['English', 'हिंदी']

export default function SettingsPanel() {
  const { theme, toggleTheme } = useTheme()
  const [currency, setCurrency] = useState('₹ INR')
  const [language, setLanguage] = useState('English')

  return (
    <div className="settings-panel">
      {/* Currency */}
      <div className="settings-panel__row">
        <label className="settings-panel__label" htmlFor="currency-select">Currency</label>
        <select id="currency-select" className="settings-panel__select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Theme */}
      <div className="settings-panel__row">
        <span className="settings-panel__label">Theme</span>
        <div className="settings-panel__toggle-row">
          <span className="settings-panel__toggle-label">{theme === 'dark' ? '🌙 Dark' : '☀️ Light'}</span>
          <button className={`settings-panel__toggle ${theme === 'light' ? 'settings-panel__toggle--left' : ''}`} type="button" onClick={toggleTheme}>
            <span className="settings-panel__toggle-knob" />
          </button>
        </div>
      </div>

      {/* Language */}
      <div className="settings-panel__row">
        <label className="settings-panel__label" htmlFor="lang-select">Language</label>
        <select id="lang-select" className="settings-panel__select" value={language} onChange={(e) => setLanguage(e.target.value)}>
          {LANGUAGES.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>
    </div>
  )
}