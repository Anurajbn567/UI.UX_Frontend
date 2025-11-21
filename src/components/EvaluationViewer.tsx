import { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Search } from 'lucide-react';
import { MatchedBox } from '../types';

interface EvaluationViewerProps {
  imageSrc: string;
  gtBoxes: MatchedBox[];
  modelBoxes: MatchedBox[];
  showTP: boolean;
  showFP: boolean;
  showFN: boolean;
  overlayOpacity: number;
  onOverlayOpacityChange: (value: number) => void;
  displayMode: 'gt' | 'model' | 'both';
  onDisplayModeChange: (mode: 'gt' | 'model' | 'both') => void;
  highlightMatchesOnly: boolean;
  onHighlightMatchesOnlyChange: (value: boolean) => void;
  showLabels: boolean;
  onShowLabelsChange: (value: boolean) => void;
}

export default function EvaluationViewer({
  imageSrc,
  gtBoxes,
  modelBoxes,
  showTP,
  showFP,
  showFN,
  overlayOpacity,
  onOverlayOpacityChange,
  displayMode,
  onDisplayModeChange,
  highlightMatchesOnly,
  onHighlightMatchesOnlyChange,
  showLabels,
  onShowLabelsChange,
}: EvaluationViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoom(1);

  const getBoxColor = (matchType: string | null, isModel: boolean) => {
    if (matchType === 'TP') return '#22c55e';
    if (matchType === 'FP') return '#ef4444';
    if (matchType === 'FN') return '#f97316';
    return isModel ? '#eab308' : '#3b82f6';
  };

  const shouldShowBox = (matchType: string | null) => {
    if (matchType === 'TP' && !showTP) return false;
    if (matchType === 'FP' && !showFP) return false;
    if (matchType === 'FN' && !showFN) return false;
    if (highlightMatchesOnly && !matchType) return false;
    return true;
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 flex-1">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search image..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <label className="text-sm text-gray-700">Display:</label>
            <div className="flex gap-2">
              <button
                onClick={() => onDisplayModeChange('gt')}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  displayMode === 'gt'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                GT Only
              </button>
              <button
                onClick={() => onDisplayModeChange('model')}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  displayMode === 'model'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Model Only
              </button>
              <button
                onClick={() => onDisplayModeChange('both')}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  displayMode === 'both'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Both
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={highlightMatchesOnly}
                onChange={(e) => onHighlightMatchesOnlyChange(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm text-gray-700">Highlight Matches Only</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showLabels}
                onChange={(e) => onShowLabelsChange(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm text-gray-700">Show Labels</span>
            </label>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <label className="text-sm text-gray-700">Overlay Opacity:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={overlayOpacity}
            onChange={(e) => onOverlayOpacityChange(parseFloat(e.target.value))}
            className="flex-1 max-w-xs"
          />
          <span className="text-sm text-gray-600">{Math.round(overlayOpacity * 100)}%</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="grid grid-cols-2 gap-8 h-full">
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

          <div className="flex flex-col items-center justify-center">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Overlay (GT + Model)</h3>
            <div className="relative bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
              <img
                src={imageSrc}
                alt="With overlay"
                style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
                className="max-w-full h-auto transition-transform"
              />
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ opacity: overlayOpacity }}
              >
                {(displayMode === 'gt' || displayMode === 'both') &&
                  gtBoxes
                    .filter((box) => shouldShowBox(box.matchType))
                    .map((box, index) => (
                      <g key={`gt-${index}`}>
                        <rect
                          x={`${box.x}%`}
                          y={`${box.y}%`}
                          width={`${box.width}%`}
                          height={`${box.height}%`}
                          fill="none"
                          stroke={getBoxColor(box.matchType, false)}
                          strokeWidth="2"
                        />
                        {showLabels && (
                          <text
                            x={`${box.x}%`}
                            y={`${box.y - 0.5}%`}
                            fill={getBoxColor(box.matchType, false)}
                            fontSize="12"
                            fontWeight="bold"
                          >
                            {box.class}
                          </text>
                        )}
                      </g>
                    ))}

                {(displayMode === 'model' || displayMode === 'both') &&
                  modelBoxes
                    .filter((box) => shouldShowBox(box.matchType))
                    .map((box, index) => (
                      <g key={`model-${index}`}>
                        <rect
                          x={`${box.x}%`}
                          y={`${box.y}%`}
                          width={`${box.width}%`}
                          height={`${box.height}%`}
                          fill="none"
                          stroke={getBoxColor(box.matchType, true)}
                          strokeWidth="2"
                          strokeDasharray="5,5"
                        />
                        {showLabels && (
                          <text
                            x={`${box.x}%`}
                            y={`${box.y + box.height + 1.5}%`}
                            fill={getBoxColor(box.matchType, true)}
                            fontSize="12"
                            fontWeight="bold"
                          >
                            {box.class} {box.confidence?.toFixed(2)}
                          </text>
                        )}
                      </g>
                    ))}
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-500"></div>
            <span className="text-gray-700">GT Boxes (Blue)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-yellow-500 border-dashed"></div>
            <span className="text-gray-700">Model Boxes (Yellow)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-green-500"></div>
            <span className="text-gray-700">True Positive (Green)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-red-500"></div>
            <span className="text-gray-700">False Positive (Red)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-orange-500"></div>
            <span className="text-gray-700">False Negative (Orange)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
