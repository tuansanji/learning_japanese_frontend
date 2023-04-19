import React, { useState, useRef, useEffect, memo } from "react";
import * as pdfjs from "pdfjs-dist";
import Loading from "../../component/SupportTab/Loading";

const PDFViewer = ({ url, lessonCurrent }) => {
  const canvasRef = useRef();
  const imagesRef = useRef([]);
  const [numImages, setNumImages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    imagesRef.current = [];
    setNumImages(0);
    setLoading(true);

    // Tải tài liệu PDF
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const loadingTask = pdfjs.getDocument(url);

    // Xử lý khi tài liệu được load thành công
    loadingTask.promise.then(
      (pdf) => {
        console.log("Tài liệu được load thành công");

        // Lấy số lượng trang của tài liệu PDF
        const numPages = pdf.numPages;

        // Render từng trang của tài liệu thành hình ảnh PNG
        for (let i = 1; i <= numPages; i++) {
          pdf.getPage(i).then((page) => {
            const viewport = page.getViewport({
              scale: 1.5,
            });
            const canvas = document.createElement("canvas");
            canvas.width = viewport.width; // Tăng độ phân giải lên gấp đôi
            canvas.height = viewport.height;
            canvas.style.width = `${viewport.width}px`;
            canvas.style.height = `${viewport.height}px`;
            canvas.style.imageRendering = "pixelated";
            const ctx = canvas.getContext("2d");

            page
              .render({
                canvasContext: ctx,
                viewport: viewport,
              })
              .promise.then(() => {
                const pngData = canvas.toDataURL("image/png");
                const img = new Image();
                img.width = viewport.width;
                img.height = viewport.height;

                // Lấy số thứ tự trang hiện tại và gán ảnh vào mảng lưu trữ ảnh
                const currentPage = page.pageNumber;
                imagesRef.current[currentPage - 1] = img;

                img.onload = function () {
                  setNumImages(imagesRef.current.filter(Boolean).length);
                };

                img.src = pngData;
              });
          });
        }

        setLoading(false);
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
      <div className="w-[80%] md:w-[95%] sm:W-full flex flex-col justify-center items-center mx-auto">
        {!loading &&
          imagesRef.current
            .slice(0, numImages)
            .sort((a, b) => a.pageIndex - b.pageIndex)
            .map((img, i) => (
              <img
                key={`pdf-page-${i}`} // Thêm key cho component
                src={img.src}
                alt="pdf"
                width={img.width}
                height={img.height}
                className="w-[80%] md:w-full sm:w-[125%] overflow-hidden"
              />
            ))}
      </div>
    </div>
  );
};

export default memo(PDFViewer);
