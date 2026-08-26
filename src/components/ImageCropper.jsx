import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';
import './ImageCropper.css';

export default function ImageCropper({ image, onCropComplete, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropCompleteHandler = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleApplyCrop = async () => {
    if (!croppedAreaPixels || !image) return;
    
    setIsProcessing(true);
    try {
      const croppedImageBase64 = await getCroppedImg(image, croppedAreaPixels);
      onCropComplete(croppedImageBase64);
    } catch (e) {
      console.error(e);
      alert('Failed to crop image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="cropper-modal-overlay">
      <div className="cropper-modal-content">
        <h2 className="cropper-title">Adjust Your Photo</h2>
        <p className="cropper-subtitle">Pinch to zoom and drag to center your face</p>
        
        <div className="cropper-container">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1} /* 1:1 Square aspect ratio */
            onCropChange={setCrop}
            onCropComplete={onCropCompleteHandler}
            onZoomChange={setZoom}
            objectFit="horizontal-cover"
          />
        </div>

        <div className="cropper-controls">
          <label className="zoom-label">Zoom</label>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(Number(e.target.value))}
            className="zoom-slider"
          />
        </div>

        <div className="cropper-actions">
          <button className="btn cropper-btn-cancel" onClick={onCancel} disabled={isProcessing}>
            Cancel
          </button>
          <button className="btn cropper-btn-apply" onClick={handleApplyCrop} disabled={isProcessing}>
            {isProcessing ? 'Saving...' : 'Apply Crop'}
          </button>
        </div>
      </div>
    </div>
  );
}
