import { useState } from 'react';

   function Contact() {
     const [formData, setFormData] = useState({
       name: '',
       email: '',
       message: ''
     });

     const handleChange = (e) => {
       setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const handleSubmit = (e) => {
       e.preventDefault();
       alert('Form submitted!');
     };

     return (
       <div style={{
         padding: '40px 20px',
         maxWidth: '720px',
         margin: '0 auto',
         color: '#0f172a'
       }}>
         <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Contact Us</h1>
         <form onSubmit={handleSubmit} style={{
           background: '#ffffff',
           border: '1px solid #e5e7eb',
           borderRadius: '12px',
           padding: '24px',
           boxShadow: '0 6px 18px rgba(2, 6, 23, 0.06)'
         }}>
           <label style={{ display: 'block', fontWeight: 600, marginTop: 8 }}>Name</label>
           <input
             type="text"
             name="name"
             placeholder="Your Name"
             value={formData.name}
             onChange={handleChange}
             style={{
               display: 'block',
               margin: '8px 0 12px',
               width: '100%',
               padding: '10px 12px',
               borderRadius: '8px',
               border: '1px solid #cbd5e1'
             }}
           />
           <label style={{ display: 'block', fontWeight: 600, marginTop: 8 }}>Email</label>
           <input
             type="email"
             name="email"
             placeholder="Your Email"
             value={formData.email}
             onChange={handleChange}
             style={{
               display: 'block',
               margin: '8px 0 12px',
               width: '100%',
               padding: '10px 12px',
               borderRadius: '8px',
               border: '1px solid #cbd5e1'
             }}
           />
           <label style={{ display: 'block', fontWeight: 600, marginTop: 8 }}>Message</label>
           <textarea
             name="message"
             placeholder="Your Message"
             value={formData.message}
             onChange={handleChange}
             style={{
               display: 'block',
               margin: '8px 0 16px',
               width: '100%',
               padding: '10px 12px',
               borderRadius: '8px',
               border: '1px solid #cbd5e1',
               minHeight: '120px'
             }}
           />
           <button type="submit" style={{
             background: '#0ea5e9',
             color: '#ffffff',
             padding: '10px 16px',
             borderRadius: '10px',
             border: 'none',
             cursor: 'pointer'
           }}>Send Message</button>
         </form>
       </div>
     );
   }

   export default Contact;