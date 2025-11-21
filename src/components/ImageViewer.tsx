import { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, Eye, EyeOff, Columns2, Square } from 'lucide-react';
import { BoundingBox } from '../types';

interface ImageViewerProps {
  imageSrc: string;
  boundingBoxes?: BoundingBox[];
  showControls?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export default function ImageViewer({
  imageSrc,
  boundingBoxes = [],
  showControls = true,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}: ImageViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [overlayOpacity, setOverlayOpacity] = useState(0.7);
  const [viewMode, setViewMode] = useState<'side-by-side' | 'single'>('side-by-side');

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {showControls && (
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={onPrevious}
                disabled={!hasPrevious}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={onNext}
                disabled={!hasNext}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-sm font-medium text-gray-700 min-w-16 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                className={`p-2 rounded-lg border transition-colors ${
                  showBoundingBoxes
                    ? 'bg-blue-50 border-blue-300 text-blue-600'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {showBoundingBoxes ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setViewMode(viewMode === 'side-by-side' ? 'single' : 'side-by-side')}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {viewMode === 'side-by-side' ? (
                  <Columns2 className="w-5 h-5" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {showBoundingBoxes && (
            <div className="mt-4 flex items-center gap-4">
              <label className="text-sm text-gray-700">Overlay Opacity:</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={overlayOpacity}
                onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                className="flex-1 max-w-xs"
              />
              <span className="text-sm text-gray-600">{Math.round(overlayOpacity * 100)}%</span>
            </div>
          )}
        </div>
      )}

      <div className="flex-1 overflow-auto p-8">
        <div
          className={`grid gap-8 h-full ${
            viewMode === 'side-by-side' ? 'grid-cols-2' : 'grid-cols-1 place-items-center'
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Original Image</h3>
            <div className="relative bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
              <img
                src={imageSrc}
                alt="Original"
                style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
                className="max-w-full h-auto transition-transform"
              />
            </div>
          </div>

          {viewMode === 'side-by-side' && (
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Bounding Box Overlay</h3>
              <div className="relative bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={imageSrc}
                  alt="With overlay"
                  style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
                  className="max-w-full h-auto transition-transform"
                />
                {showBoundingBoxes && (
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ opacity: overlayOpacity }}
                  >
                    {boundingBoxes.map((box, index) => (
                      <g key={index}>
                        <rect
                          x={`${box.x}%`}
                          y={`${box.y}%`}
                          width={`${box.width}%`}
                          height={`${box.height}%`}
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2"
                        />
                        <text
                          x={`${box.x}%`}
                          y={`${box.y - 0.5}%`}
                          fill="#3b82f6"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          {box.class}
                        </text>
                      </g>
                    ))}
                  </svg>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
