"use client";
import React, { useRef, useState } from "react";
import Resizer from "react-image-file-resizer";
import Image from "next/image";
import CropImageDialog from "./CropImageDialog";

const ImageInput = ({
  src,
  aspectRatio = 1,
  shape = "rect",
  previewSize = 150,
  onImageCropped,
}) => {
  const [imageToCrop, setImageToCrop] = useState(null);
  const fileInputRef = useRef(null);

  function onImageSelected(image) {
    if (!image) return;
    Resizer.imageFileResizer(
      image,
      1024,
      1024,
      "WEBP",
      100,
      0,
      (uri) => setImageToCrop(uri),
      "file"
    );
  }

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onImageSelected(e.target.files[0])}
        ref={fileInputRef}
        className="sr-only hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="group relative block"
        style={
          shape === "circle" ? { width: previewSize, height: previewSize } : {}
        }
      >
        <Image
          src={src}
          alt="preview"
          width={previewSize}
          height={previewSize}
          className={`object-cover ${
            shape === "circle" ? "rounded-full" : "rounded-md w-full h-32"
          }`}
        />
        <span className="bg-opacity-30 group-hover:bg-opacity-25 absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full bg-black text-white transition-colors duration-300">
          <Image src={"/camera.png"} alt="camera icon" height={20} width={20} />
        </span>
      </button>
      {imageToCrop && (
        <CropImageDialog
          src={URL.createObjectURL(imageToCrop)}
          cropAspectRatio={aspectRatio}
          onCropped={onImageCropped}
          onclose={() => {
            setImageToCrop(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
          }}
        />
      )}
    </>
  );
};

export default ImageInput;
