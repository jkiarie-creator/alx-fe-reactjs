function Home() {
    return (
      <div style={{
        padding: '40px 20px',
        maxWidth: '1080px',
        margin: '0 auto',
        color: '#0f172a'
      }}>
        <section style={{
          background: 'linear-gradient(135deg, #e0f2fe 0%, #f5f3ff 100%)',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 8px 24px rgba(2, 6, 23, 0.08)'
        }}>
          <h1 style={{ fontSize: '36px', margin: 0 }}>Welcome to Our Company</h1>
          <p style={{ fontSize: '18px', marginTop: '12px', lineHeight: 1.6 }}>
            We are dedicated to delivering excellence in all our services.
          </p>
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            <a href="/services" style={{ background: '#0ea5e9', color: '#ffffff', padding: '10px 16px', borderRadius: '10px', textDecoration: 'none' }}>Explore Services</a>
            <a href="/contact" style={{ background: '#22c55e', color: '#ffffff', padding: '10px 16px', borderRadius: '10px', textDecoration: 'none' }}>Contact Us</a>
          </div>
        </section>
      </div>
    );
  }

  export default Home;