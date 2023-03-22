import React, { useState, useRef, useEffect } from "react";
import * as pdfjs from "pdfjs-dist";
import Loading from "../../component/SupportTab/Loading";
function PDFViewer({ url }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [numImages, setNumImages] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Khởi tạo PDFJS
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

    // Lấy tham chiếu đến canvas và mảng chứa tham chiếu đến các ảnh

    // Tải tài liệu PDF
    const loadingTask = pdfjs.getDocument(url);

    // Xử lý khi tài liệu được load thành công
    loadingTask.promise.then(
      (pdf) => {
        console.log("Tài liệu được load thành công");
        setLoading(false);
        // Lấy số lượng trang của tài liệu PDF
        const numPages = pdf.numPages;

        // Render từng trang của tài liệu thành hình ảnh PNG
        const newImages = [];
        for (let i = 1; i <= numPages; i++) {
          pdf.getPage(i).then((page) => {
            const viewport = page.getViewport({
              scale: 1,
            });
            const canvas = document.createElement("canvas");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            canvas.style.width = `${viewport.width}px`;
            canvas.style.height = `${viewport.height}px`;
            const ctx = canvas.getContext("2d");
            // ctx.imageSmoothingEnabled = true;
            page
              .render({
                canvasContext: ctx,
                viewport: viewport,
              })
              .promise.then(() => {
                // Lấy hình ảnh PNG từ canvas
                const pngData = canvas.toDataURL("image/png");

                // Tạo thẻ <img> để hiển thị hình ảnh
                const img = new Image();
                img.width = viewport.width;
                img.height = viewport.height;

                img.src = pngData;
                newImages.push(img);
                setNumImages(newImages.length);
              });
          });
        }
        imagesRef.current = newImages;
      },
      (reason) => {
        console.error("Lỗi khi load tài liệu");
      }
    );
  }, [url]);

  return (
    <div>
      <canvas ref={canvasRef} className="pdf-canvas h-[2rem]" />
      {loading && <Loading />}
      <div className="w-[80%] md:w-[95%] flex flex-col justify-center items-center mx-auto">
        {imagesRef.current
          .slice(0, numImages)
          .sort((a, b) =>
            a.pageIndex === 0
              ? 1
              : b.pageIndex === 0
              ? -1
              : a.pageIndex - b.pageIndex
          )
          .map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt=""
              width={img.width}
              height={img.height}
              className="w-[80%]"
            />
          ))}
      </div>
    </div>
  );
}

export default PDFViewer;
