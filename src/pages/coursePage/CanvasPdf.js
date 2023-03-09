import React, { useRef, useEffect } from "react";
import { pdfjs, Document, Page } from "pdfjs-dist";

function PdfViewer(props) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const worker = pdfjs.getWorker({
      workerSrc:
        "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.min.js",
    });

    const canvas = canvasRef.current;
    const pdfUrl = props.url;

    const loadingTask = pdfjs.getDocument(pdfUrl);
    loadingTask.promise.then((pdf) => {
      const firstPage = pdf.getPage(1);
      const viewport = firstPage.getViewport({ scale: 1.0 });

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      };

      firstPage.render(renderContext);
    });
  }, [props.url]);

  return <canvas ref={canvasRef} />;
}

export default PdfViewer;
