import { Link, Outlet, Routes, Route } from 'react-router-dom'

export function ProfileLayout() {
  return (
    <div>
      <h1>Profile</h1>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link to="">Details</Link>
        <Link to="settings">Settings</Link>
      </nav>
      <div style={{ paddingTop: '1rem' }}>
        <Outlet />
      </div>
    </div>
  )
}

export function ProfileDetails() {
  return (
    <div>
      <h2>Profile Details</h2>
      <p>Basic information about the user.</p>
    </div>
  )
}

export function ProfileSettings() {
  return (
    <div>
      <h2>Profile Settings</h2>
      <p>Manage your preferences and account settings.</p>
    </div>
  )
}

// Self-contained nested routing for the Profile section
export default function Profile() {
  return (
    <Routes>
      <Route element={<ProfileLayout />}>
        <Route index element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Route>
    </Routes>
  )
}


