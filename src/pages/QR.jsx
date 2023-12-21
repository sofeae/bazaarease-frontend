// QRCodePage.js
import React from 'react';
import QRCode from 'qrcode.react';
import { useAuthContext } from '../hooks/useAuthContext'
import Sidebar from '../components/SidebarA';

const QR = () => {

  const { user } = useAuthContext()
  const qrCodeSize = 256; // Adjust the size as needed

  const handlePrint = () => {
    window.print(); // Open the print dialog
  };

  return (
    <div>
      <Sidebar />
      <h1>{user.email}</h1>
      <div>
        <QRCode value={JSON.stringify(user)} size={qrCodeSize} />
      </div>
      <button onClick={handlePrint}>Print QR Code</button>
    </div>
  );
};

export default QR;
