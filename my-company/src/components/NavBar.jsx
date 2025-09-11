import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{
      padding: '12px 24px',
      borderBottom: '1px solid #e5e7eb',
      background: '#0f172a',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1080px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ color: '#f8fafc', fontWeight: 700, fontSize: '18px' }}>My Company</div>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '16px', margin: 0, padding: 0 }}>
          <li>
            <Link to="/" style={{ color: '#e5e7eb', textDecoration: 'none', padding: '8px 12px', borderRadius: '8px', display: 'inline-block' }}>Home</Link>
          </li>
          <li>
            <Link to="/about" style={{ color: '#e5e7eb', textDecoration: 'none', padding: '8px 12px', borderRadius: '8px', display: 'inline-block' }}>About</Link>
          </li>
          <li>
            <Link to="/services" style={{ color: '#e5e7eb', textDecoration: 'none', padding: '8px 12px', borderRadius: '8px', display: 'inline-block' }}>Services</Link>
          </li>
          <li>
            <Link to="/contact" style={{ color: '#e5e7eb', textDecoration: 'none', padding: '8px 12px', borderRadius: '8px', display: 'inline-block' }}>Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar


