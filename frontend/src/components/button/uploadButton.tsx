import "./uploadButton.css";

import React, { useEffect, useRef, useState } from "react";

import type { uploadCard } from "../../types/index";

const ImageUploadCard = ({ onPreview, onFile }: uploadCard) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const set_preview = async () => await setPreview(onPreview);
    set_preview();
  }, [onPreview]);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (preview) window.open(preview, "_blank");
  };

  return (
    <div>
      {/* Upload Box */}
      <div className="upload-card" onClick={() => fileRef.current?.click()}>
        {preview ? (
          <img
            src={preview}
            className="image"
            style={{
              width: "100 %",
              height: "250px",
              objectFit: "cover",
            }}
          />
        ) : (
          <div className="upload-text">Click to upload image</div>
        )}

        {/* Hover Buttons */}
        {preview && (
          <div className="overlay">
            <div className="icon-btn" onClick={handleDetail}>
              {/* Eye SVG */}
              <svg width="22" height="22" fill="black" viewBox="0 0 24 24">
                <path
                  d="M12 5c-7.633 0-11 7-11 7s3.367 7 11 7  
                         11-7 11-7-3.367-7-11-7zm0 12c-2.757  
                         0-5-2.243-5-5 0-2.757 2.243-5 5-5s5  
                         2.243 5 5c0 2.757-2.243 5-5 5zm0-8c-1.654  
                         0-3 1.346-3 3 0 1.654 1.346 3 3 3s3-1.346  
                         3-3c0-1.654-1.346-3-3-3z"
                />
              </svg>
            </div>
            <div className="icon-btn" onClick={handleDelete}>
              {/* Delete SVG */}
              <svg width="22" height="22" fill="red" viewBox="0 0 24 24">
                <path d="M3 6h18v2H3zm2 3h14l-1 12H6L5 9zm5-7h4v2h-4z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Hidden Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        style={{ display: "none" }}
        onChange={(e) => onFile(e)}
      />
    </div>
  );
};

export default ImageUploadCard;
