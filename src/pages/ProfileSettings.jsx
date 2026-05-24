import ProfileCard from '../components/ProfileCard'
import SettingsPanel from '../components/SettingsPanel'
import DangerZone from '../components/DangerZone'
import './ProfileSettings.css'

export default function ProfileSettings() {
  return (
    <main className="profile-settings">
      <div className="profile-settings__inner">
        <h1 className="profile-settings__heading">Profile &amp; Settings</h1>

        <section className="profile-settings__section">
          <ProfileCard />
        </section>

        <section className="profile-settings__section">
          <h2 className="profile-settings__section-title">Settings</h2>
          <SettingsPanel />
        </section>

        <section className="profile-settings__section">
          <h2 className="profile-settings__section-title danger-zone__section-title">Danger Zone</h2>
          <DangerZone />
        </section>
      </div>
    </main>
  )
}
