'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Phone, Mail, MapPin, MessageSquare, CheckCircle, X } from 'lucide-react';
import { COUNTRY_CODES } from '@/utils/countryCodes';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002";
      const response = await fetch(`${API_URL}/public/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          subject: formData.subject,
          message: formData.message
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setShowModal(true);
        setFormData({
          name: '',
          email: '',
          countryCode: '+91 (India)',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (error) {
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="contact-page">
      <div className="contact-container">
        
        {/* LEFT PANEL */}
        <div className="contact-left">
          <div className="contact-left-bg" style={{ backgroundImage: "url('/contact-bg.jpg')" }}></div>
          <div className="contact-left-overlay"></div>
          
          <div className="contact-left-content">
            <div className="contact-logo">
              <Image src="/admin-icon.svg" alt="Auxosys Logo" width={32} height={32} className="logo-icon-img" />
              <span className="logo-text">AUXOSYS</span>
            </div>

            <div className="contact-info-list">
              <div className="info-item">
                <div className="info-icon">
                  <Clock size={20} />
                </div>
                <div className="info-text">
                  <span className="info-label">OFFICE HOURS</span>
                  <span className="info-value">Monday to Friday, 10 AM – 6 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="contact-right">
          <h1 className="contact-title">Contact Us</h1>
          
          <div className="contact-form-container">
            <div className="form-header">
              <div className="form-icon">
                <MessageSquare size={18} />
              </div>
              <div className="form-header-text">
                <h3>Send us a message</h3>
                <p>Fill out the form below and we'll respond within 24 hours</p>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
              </div>

              <div className="form-group">
                <label>Contact Number</label>
                <div className="phone-input-group">
                  <div className="select-wrapper">
                    <select className="country-select" name="countryCode" value={formData.countryCode} onChange={handleChange}>
                      {COUNTRY_CODES.map((item) => (
                        <option key={item.country} value={item.code}>
                          {item.code} ({item.country})
                        </option>
                      ))}
                    </select>
                  </div>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Contact Number" />
                </div>
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="What is this about?" />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea rows="4" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us what's on your mind..." required></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

      </div>

      {showModal && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <CheckCircle className="success-icon" size={48} />
            <h2>Message Sent</h2>
            <p>Thank you for reaching out!<br />We will connect with you shortly.</p>
            <Link href="/" className="btn btn-primary mt-4">Back to Home</Link>
          </div>
        </div>
      )}
    </div>
  );
}
