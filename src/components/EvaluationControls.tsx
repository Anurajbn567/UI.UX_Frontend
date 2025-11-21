import { Upload } from 'lucide-react';
import { Filters } from '../types';

interface EvaluationControlsProps {
  iouThreshold: number;
  onIouThresholdChange: (value: number) => void;
  scoreThreshold: number;
  onScoreThresholdChange: (value: number) => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  showTP: boolean;
  showFP: boolean;
  showFN: boolean;
  onShowTPChange: (value: boolean) => void;
  onShowFPChange: (value: boolean) => void;
  onShowFNChange: (value: boolean) => void;
  matchingMode: string;
  onMatchingModeChange: (mode: string) => void;
  onRunEvaluation: () => void;
  onClearFilters: () => void;
}

export default function EvaluationControls({
  iouThreshold,
  onIouThresholdChange,
  scoreThreshold,
  onScoreThresholdChange,
  filters,
  onFiltersChange,
  showTP,
  showFP,
  showFN,
  onShowTPChange,
  onShowFPChange,
  onShowFNChange,
  matchingMode,
  onMatchingModeChange,
  onRunEvaluation,
  onClearFilters,
}: EvaluationControlsProps) {

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Evaluation Controls</h2>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Upload Data</h3>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-2">
            <Upload className="w-4 h-4" />
            Upload ZIP (Images + XML)
          </button>
          <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded mt-2">
            Upload ZIP containing images and annotations XML
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Model Run
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
            <option>Model Run 1</option>
            <option>Model Run 2</option>
            <option>Model Run 3</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overlap Threshold (IoU): {Math.round(iouThreshold * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={iouThreshold}
            onChange={(e) => onIouThresholdChange(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Score Threshold: {scoreThreshold.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={scoreThreshold}
            onChange={(e) => onScoreThresholdChange(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0.0</span>
            <span>1.0</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Matching Mode
          </label>
          <select
            value={matchingMode}
            onChange={(e) => onMatchingModeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="strict">Strict (Class + IoU)</option>
            <option value="iou">IoU only</option>
            <option value="class">Class only</option>
          </select>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Filters</h3>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Search image name..."
                value={filters.searchName}
                onChange={(e) => onFiltersChange({ ...filters, searchName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">Classes</label>
              <select
                multiple
                value={filters.classes}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, option => option.value) as any;
                  onFiltersChange({ ...filters, classes: selected });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                size={5}
              >
                <option value="RadarSystems">RadarSystems</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Missiles">Missiles</option>
                <option value="ArtilleryGuns">ArtilleryGuns</option>
                <option value="Tanks">Tanks</option>
                <option value="Camo">Camo</option>
                <option value="Radar2">Radar2</option>
                <option value="Missile2">Missile2</option>
                <option value="Tank2">Tank2</option>
                <option value="Vehicle2">Vehicle2</option>
                <option value="99">99</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">Geography</label>
              <select
                multiple
                value={filters.geography}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, option => option.value) as any;
                  onFiltersChange({ ...filters, geography: selected });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                size={4}
              >
                <option value="Urban">Urban</option>
                <option value="Green">Green</option>
                <option value="Snow">Snow</option>
                <option value="Desert">Desert</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">Lighting</label>
              <select
                multiple
                value={filters.lighting}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, option => option.value) as any;
                  onFiltersChange({ ...filters, lighting: selected });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                size={3}
              >
                <option value="Dark">Dark</option>
                <option value="Neutral">Neutral</option>
                <option value="Bright">Bright</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">Crowding</label>
              <select
                multiple
                value={filters.crowding}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, option => option.value) as any;
                  onFiltersChange({ ...filters, crowding: selected });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                size={3}
              >
                <option value="Any">Any</option>
                <option value="Non-crowded">Non-crowded</option>
                <option value="Crowded">Crowded</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">Background Mode</label>
              <select
                multiple
                value={filters.backgroundMode}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, option => option.value) as any;
                  onFiltersChange({ ...filters, backgroundMode: selected });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                size={3}
              >
                <option value="Include">Include</option>
                <option value="Exclude">Exclude</option>
                <option value="Only Background">Only Background</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">From Date</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">To Date</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Display Options</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showTP}
                onChange={(e) => onShowTPChange(e.target.checked)}
                className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">Show True Positive</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showFP}
                onChange={(e) => onShowFPChange(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded focus:ring-2 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">Show False Positive</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showFN}
                onChange={(e) => onShowFNChange(e.target.checked)}
                className="w-4 h-4 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">Show False Negative</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={onRunEvaluation}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Run Evaluation
          </button>
          <button
            onClick={onClearFilters}
            className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
