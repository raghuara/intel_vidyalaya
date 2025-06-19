import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import bonafideCertificate from '../Images/Bonafide-Certificate-Format.webp';

export default function CertificateGenerator() {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    section: ''
  });

  const certificateRef = useRef(null);

  const handleDownload = async () => {
    const element = certificateRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imageData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('landscape', 'pt', 'a4');
    const imgProps = pdf.getImageProperties(imageData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`certificate-${formData.name || 'student'}.pdf`);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Certificate Generator</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
          value={formData.name}
          style={{ marginRight: 10 }}
        />
        <input
          name="class"
          placeholder="Enter Class"
          onChange={handleChange}
          value={formData.class}
          style={{ marginRight: 10 }}
        />
        <input
          name="section"
          placeholder="Enter Section"
          onChange={handleChange}
          value={formData.section}
        />
      </div>

      <div
        ref={certificateRef}
        style={{
          width: '1123px',
          height: '794px',
          backgroundImage: `url(${bonafideCertificate})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          margin: '0 auto',
          fontFamily: 'serif'
        }}
      >
        {/* Name Placement */}
        <div
          style={{
            position: 'absolute',
            top: '320px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '30px',
            fontWeight: 'bold',
            color: '#000',
          }}
        >
          {formData.name || '__________'}
        </div>

        {/* Class Placement */}
        <div
          style={{
            position: 'absolute',
            top: '400px',
            left: '30%',
            fontSize: '24px',
            color: '#000',
          }}
        >
          Class: {formData.class || '__'}
        </div>

        {/* Section Placement */}
        <div
          style={{
            position: 'absolute',
            top: '400px',
            left: '60%',
            fontSize: '24px',
            color: '#000',
          }}
        >
          Section: {formData.section || '__'}
        </div>
      </div>

      <button style={{ marginTop: 20 }} onClick={handleDownload}>
        Download Certificate
      </button>
    </div>
  );
}
