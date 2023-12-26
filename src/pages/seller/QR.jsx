// QRCodePage.js
import Button from "../../components/elements/Button";
import React, { useRef } from "react";
import QRCode, { QRCodeCanvas } from "qrcode.react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { frontendBaseURL } from "../../utils/imageUrl";

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
  const qrCodeSize = 250; // Adjust the size as needed

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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1>{user.businessName}</h1>
      <div style={{ textAlign: "center", margin: "20px", border: "2px solid #000", padding: "10px" }}>
        <QRCodeCanvas
          id="canvas"
          value={frontendBaseURL + `/Menu/${user.id}/CustomerPage`}
          size={qrCodeSize}
        // imageSettings={{
        //   height: 1000,
        //   width: 1000,
        // }}
        />
      </div>
      <Button className="text-yellow-400 hover:text-yellow-500 bg-gray-800 font-bold text-decoration-line px-3"
        onClick={onCanvasButtonClick}>Download QR Code</Button>
    </div>
  );
};

export default QR;
