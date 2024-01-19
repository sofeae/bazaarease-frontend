import Button from "../../components/elements/Button";
import React, { useRef } from "react";
import QRCode, { QRCodeCanvas } from "qrcode.react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { frontendBaseURL } from "../../utils/imageUrl";
import jsPDF from 'jspdf';

function downloadStringAsFile(data, filename) {
  let a = document.createElement("a");
  a.download = filename;
  a.href = data;
  a.click();
}

const QR = () => {
  const { user } = useAuthContext();
  const canvasRef = useRef(null);

  const qrCodeSize = 250; // Adjust the size as needed

  function onCanvasButtonClick() {
    const node = document.getElementById("canvas");
    if (node === null) {
      return;
    }
  
    // Create a new jsPDF instance
    const pdf = new jsPDF();
  
    // Convert canvas to data URI
    const dataURI = node.toDataURL("image/png");
  
    // Define the size of the QR code and text
    const qrCodeSize = 100;
    const textSize = 55;
    const topGap = 30; // Adjust the top gap as needed
    const bottomGap = 30; // Adjust the bottom gap as needed
  
    // Calculate the position to center the QR code on the PDF
    const xPosition = (pdf.internal.pageSize.getWidth() - qrCodeSize) / 2;
    const yPosition = (pdf.internal.pageSize.getHeight() - qrCodeSize - textSize - topGap + 80) / 2;
  
    // Add the QR code to the PDF
    pdf.addImage(dataURI, "PNG", xPosition, yPosition, qrCodeSize, qrCodeSize);
  
    // Add "Welcome to" text above user business name
    const welcomeTextYPosition = yPosition - 30; // Adjust the vertical position as needed
    pdf.setFontSize(35); // Adjust font size as needed
    pdf.setFont("helvetica", "normal"); // Set font style to normal
    pdf.text("Welcome to", pdf.internal.pageSize.getWidth() / 2, welcomeTextYPosition - 15, { align: 'center' });
  
    // Add business name above the QR code in all capital letters
    pdf.setFontSize(textSize);
    pdf.setFont("helvetica", "bold"); // Set font to bold
    pdf.setTextColor("#000"); // Set text color
    pdf.text(user.businessName.toUpperCase(), pdf.internal.pageSize.getWidth() / 2, yPosition - 15, { align: 'center' });
  
    // Add "Scan to Order" text below the QR code
    const scanTextYPosition = yPosition + qrCodeSize + bottomGap;
    pdf.setFontSize(45); // Adjust font size as needed
    pdf.text("Scan QR to Order!", pdf.internal.pageSize.getWidth() / 2, scanTextYPosition, { align: 'center' });
  
    // Save the PDF
    pdf.save(`${user.businessName}_QRCode.pdf`);
  }  
  
  return (
    <div className="flex flex-col items-center mt-10">
      {/* Add "hai" text above businessName */}
      {/* <p className="text-xl mb-4 text-center">Customer can make orders through the QR code,</p> */}
      <p className="text-xl mb-1 text-center">Instruction: Download and display QR code below at your stall,</p>
      <p className="text-xl mb-8 text-center">customers should scan the QR to make orders.</p>
      <h1 className="text-3xl font-bold mb-4">{user.businessName}</h1>
      <div className="border border-black p-4 mb-4">
        <QRCodeCanvas
          id="canvas"
          value={frontendBaseURL + `/Menu/${user.id}/CustomerPage`}
          size={qrCodeSize}
        />
      </div>
      <Button
        className="text-white hover:text-black bg-yellow-500 font-bold text-decoration-line px-3"
        onClick={onCanvasButtonClick}>
        Download QR Code
      </Button>
    </div>
  );
};

export default QR;