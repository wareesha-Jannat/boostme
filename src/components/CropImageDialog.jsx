"use client";
import { useRef } from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function CropImageDialog({
  src,
  cropAspectRatio,
  onCropped,
  onclose,
}) {
  const cropperRef = useRef(null);

  function crop() {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;
    cropper.getCroppedCanvas().toBlob((blob) => onCropped(blob), "image/webp");
    onclose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-2xl p-4">
        <h2 className="text-lg font-semibold mb-4">Crop Image</h2>

        <div className="max-h-[70vh] overflow-hidden">
          <Cropper
            src={src}
            aspectRatio={cropAspectRatio}
            guides={false}
            zoomable={false}
            ref={cropperRef}
            className="mx-auto max-h-[60vh] w-full"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onclose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={crop}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
          >
            Crop
          </button>
        </div>
      </div>
    </div>
  );
}
