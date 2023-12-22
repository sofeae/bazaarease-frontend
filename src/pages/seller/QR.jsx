// QRCodePage.js
import React, { useRef } from "react";
import QRCode, { QRCodeCanvas } from "qrcode.react";
import { useAuthContext } from "../../hooks/useAuthContext";

function downloadStringAsFile(data, filename) {
  let a = document.createElement("a");
  a.download = filename;
  a.href = data;
  a.click();
}

const QR = () => {
  const { user } = useAuthContext();
  const canvasRef = useRef(null);

  console.log(user);
  const qrCodeSize = 500; // Adjust the size as needed

  function onCanvasButtonClick() {
    const node = document.getElementById("canvas");
    if (node == null) {
      return;
    }
    // For canvas, we just extract the image data and send that directly.
    const dataURI = node.toDataURL("image/png");
    downloadStringAsFile(dataURI, `${user.businessName}.png`);
  }

  return (
    <div>
      <h1>{user.email}</h1>
      <div>
        {/*Kene tukar value online */}
        <QRCodeCanvas
          id="canvas"
          value={`https://bazaarease-frontend-server.onrender.com/Menu/${user.id}`}
          size={qrCodeSize}
          imageSettings={{
            height: 1000,
            width: 1000,
          }}
        />
      </div>
      <button onClick={onCanvasButtonClick}>Download QR Code</button>
    </div>
  );
};

export default QR;
