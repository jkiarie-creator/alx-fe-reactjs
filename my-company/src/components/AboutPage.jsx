function About() {
    return (
      <div style={{
        padding: '40px 20px',
        maxWidth: '900px',
        margin: '0 auto',
        color: '#0f172a'
      }}>
        <h1 style={{ fontSize: '32px', marginBottom: '12px' }}>About Us</h1>
        <p style={{ lineHeight: 1.8, fontSize: '18px' }}>
          Our company has been providing top-notch services since 1990. We specialize in various
          fields including technology, marketing, and consultancy.
        </p>
        <div style={{
          marginTop: '24px',
          background: '#f8fafc',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 6px 18px rgba(2, 6, 23, 0.06)'
        }}>
          <h2 style={{ fontSize: '22px', marginTop: 0 }}>Our Mission</h2>
          <p style={{ marginTop: '8px' }}>
            To empower businesses with innovative solutions, exceptional service, and lasting partnerships.
          </p>
        </div>
      </div>
    );
  }

  export default About;