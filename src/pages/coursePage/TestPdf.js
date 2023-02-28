import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDFViewer({ url }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    fetch(url, {
      mode: "no-cors",
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      });
  }, [url]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function onPageChange({ pageNumber }) {
    setPageNumber(pageNumber);
  }

  return (
    <div>
      {fileData && (
        <Document file={{ data: fileData }}>
          <Page
            pageNumber={pageNumber}
            onLoadSuccess={onDocumentLoadSuccess}
            onPageChange={onPageChange}
          />
        </Document>
      )}
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default PDFViewer;
