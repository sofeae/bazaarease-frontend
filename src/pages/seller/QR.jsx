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

  const qrCodeSize = 250; // Adjust the size as needed

  function onCanvasButtonClick() {
    const node = document.getElementById("canvas");
    if (node == null) {
      return;
    }
    const dataURI = node.toDataURL("image/png");
    downloadStringAsFile(dataURI, `${user.businessName}.png`);
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
