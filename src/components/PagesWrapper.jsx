import Navbar from './Navbar'

export default function PagesWrapper({ children }) {
  return (
    <div className="pages-wrapper">
      {children}
    </div>
  )
}

export function Header() {
  return (
    <header className="app-header">
      <Navbar />
    </header>
  )
}