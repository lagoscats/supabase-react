import React, { useState } from 'react';
import { supabase } from '../supabase/client';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async () => {
    const { error } = await supabase.from('contacts').insert([form]);
    if (!error) alert('Message sent!');
    else alert(error.message);
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <input
        className="contact-input"
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="contact-input"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <textarea
        className="contact-textarea"
        placeholder="Message"
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <button className="contact-button" onClick={handleSubmit}>Send</button>
    </div>
  );
};

export default Contact;
