function Services() {
    return (
      <div style={{
        padding: '40px 20px',
        maxWidth: '1080px',
        margin: '0 auto',
        color: '#0f172a'
      }}>
        <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Our Services</h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px'
        }}>
          {[{
            title: 'Technology Consulting',
            desc: 'Strategy, architecture, and modernization for scalable systems.'
          }, {
            title: 'Market Analysis',
            desc: 'Insights and intelligence to guide product-market fit.'
          }, {
            title: 'Product Development',
            desc: 'Design, build, and iterate on high-impact products.'
          }].map((s, idx) => (
            <div key={idx} style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 6px 18px rgba(2, 6, 23, 0.06)'
            }}>
              <h3 style={{ marginTop: 0, marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  export default Services;