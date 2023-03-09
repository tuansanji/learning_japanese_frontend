import React, { useState } from "react";
import PdfToPng from "./PdfToPng";

function PdfViewer({ pdfUrl }) {
  const [pngUrl, setPngUrl] = useState(null);

  async function convertToPng() {
    const response = await fetch(pdfUrl);
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const loadingTask = window.pdfjsLib.getDocument({ data });
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const context = canvas.getContext("2d");
    const renderContext = {
      canvasContext: context,
      viewport,
    };
    await page.render(renderContext).promise;
    const pngUrl = canvas.toDataURL("image/png");
    setPngUrl(pngUrl);
  }

  return (
    <>
      {!pngUrl ? (
        <button onClick={convertToPng}>Convert to PNG</button>
      ) : (
        <img src={pngUrl} alt="PDF as PNG" />
      )}
    </>
  );
}

export default PdfViewer;
