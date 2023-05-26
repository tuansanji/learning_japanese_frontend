import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const TinyMce = ({ setContent, content, blogData }) => {
  const tinyRef = useRef(null);
  function handleEditorChange(value) {
    setContent(value);
  }

  useEffect(() => {
    if (blogData) {
      setContent(blogData?.content);
    }
  }, [blogData]);

  return (
    <div
      style={{ height: content ? "700px" : "300px" }}
      className="tinymce__main"
    >
      <Editor
        onInit={(evt, editor) => {
          tinyRef.current = editor;
        }}
        initialValue={blogData ? blogData?.content : ""}
        apiKey={process.env.REACT_APP_TINYMCE_KEY}
        init={{
          height: "100%",
          width: "100%",
          menubar: false,
          statusbar: false,
          plugins: ["image", "code"],
          toolbar: `
                        undo redo | formatselect | bold italic |  image | backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | code
                        `,
          file_picker_types: "file image media",
          image_class_list: [{ title: "Responsive", value: "img-tiny" }],
          images_upload_handler: async (blobInfo) => {
            return new Promise((resolve, reject) => {
              let imageFile = new FormData();
              imageFile.append("image", blobInfo.blob());
              axios
                .post(
                  "https://X10-server.onrender.com/upload/image",
                  imageFile,
                  {
                    headers: {
                      Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDE1MmVmZDViNDUyZTQwYWJiMTRkNyIsImZ1bGxOYW1lIjoibGlvbmVsIG1lc3NpIiwiaWF0IjoxNjg1MTI0NjgxLCJleHAiOjE2ODc3MTY2ODF9.Yp6-9of2VadczZpATNRJKeX-rBh3m1kgde62meKD8LA",
                      "Content-Type": "multipart/form-data",
                    },
                  }
                )
                .uploadImg(imageFile)
                .then((data) => {
                  const url = data.image;
                  resolve(url);
                })
                .catch((e) => {
                  reject(e);
                });
            });
          },
        }}
        // value={content}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};

export default TinyMce;
