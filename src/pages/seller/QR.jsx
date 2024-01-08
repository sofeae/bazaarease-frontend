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
    if (node == null) {
        return;
    }

    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Convert canvas to data URI
    const dataURI = node.toDataURL("image/png");

    // Define the size of the larger square QR code
    const qrCodeSize = 100; // Increased size

    // Calculate the position to center the QR code on the PDF
    const xPosition = (pdf.internal.pageSize.getWidth() - qrCodeSize) / 2;
    const yPosition = (pdf.internal.pageSize.getHeight() - qrCodeSize) / 3; // Adjusted vertical position

    // Add the image to the PDF
    pdf.addImage(dataURI, "PNG", xPosition, yPosition, qrCodeSize, qrCodeSize);

    // Calculate the position to center the business name above the QR code
    const businessNameWidth = pdf.getTextDimensions(user.businessName).w;
    const businessNameXPosition = (pdf.internal.pageSize.getWidth() - businessNameWidth) / 2;
    const businessNameYPosition = yPosition - 20; // Adjusted gap

    // Set the font style for the business name to bold and larger
    pdf.setFont("bold");
    pdf.setFontSize(50); // Adjusted font size

    // Add business name above the QR code
    pdf.text(user.businessName, businessNameXPosition, businessNameYPosition);

    // Calculate the position to center the text below the QR code with a gap
    const textWidth = pdf.getTextDimensions("SCAN ME!").w;
    const textXPosition = (pdf.internal.pageSize.getWidth() - textWidth) / 2;
    const textYPosition = yPosition + qrCodeSize + 40; // Increased gap

    // Set the font style for the text below QR code
    pdf.setFont("normal");
    pdf.setFontSize(30); // Adjusted font size

    // Add text below the QR code
    pdf.text("SCAN ME!", textXPosition, textYPosition);

    // Save the PDF
    pdf.save(`${user.businessName}_QRCode.pdf`);
}

  return (
    <div className="flex flex-col items-center justify-center h-screen">
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
        onClick={onCanvasButtonClick}
      >
        Download QR Code
      </Button>
    </div>
  );
};

export default QR;
