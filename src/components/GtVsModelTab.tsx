import { useState } from 'react';
import EvaluationControls from './EvaluationControls';
import EvaluationViewer from './EvaluationViewer';
import MetricsPanel from './MetricsPanel';
import { EvaluationMetrics, MatchedBox, Filters } from '../types';

const mockMetrics: EvaluationMetrics = {
  precision: 0.875,
  recall: 0.821,
  f1Score: 0.847,
  mAP50: 0.892,
  mAP75: 0.756,
  perClassMetrics: [
    { className: 'RadarSystems', tp: 45, fp: 5, fn: 8, precision: 0.90, recall: 0.85 },
    { className: 'Vehicles', tp: 120, fp: 15, fn: 20, precision: 0.89, recall: 0.86 },
    { className: 'Missiles', tp: 32, fp: 8, fn: 5, precision: 0.80, recall: 0.86 },
    { className: 'Tanks', tp: 78, fp: 12, fn: 15, precision: 0.87, recall: 0.84 },
  ],
};

const mockGtBoxes: MatchedBox[] = [
  { x: 10, y: 20, width: 30, height: 25, class: 'RadarSystems', matchType: 'TP', iou: 0.85 },
  { x: 50, y: 60, width: 20, height: 15, class: 'Vehicles', matchType: 'FN' },
];

const mockModelBoxes: MatchedBox[] = [
  { x: 12, y: 22, width: 28, height: 24, class: 'RadarSystems', matchType: 'TP', iou: 0.85, confidence: 0.92 },
  { x: 70, y: 40, width: 15, height: 18, class: 'Tanks', matchType: 'FP', confidence: 0.67 },
];

export default function GtVsModelTab() {
  const [iouThreshold, setIouThreshold] = useState(0.5);
  const [scoreThreshold, setScoreThreshold] = useState(0.5);
  const [filters, setFilters] = useState<Filters>({
    classes: [],
    geography: [],
    lighting: [],
    crowding: [],
    backgroundMode: [],
    dateFrom: '',
    dateTo: '',
    searchName: '',
  });
  const [showTP, setShowTP] = useState(true);
  const [showFP, setShowFP] = useState(true);
  const [showFN, setShowFN] = useState(true);
  const [matchingMode, setMatchingMode] = useState('strict');
  const [overlayOpacity, setOverlayOpacity] = useState(0.7);
  const [displayMode, setDisplayMode] = useState<'gt' | 'model' | 'both'>('both');
  const [highlightMatchesOnly, setHighlightMatchesOnly] = useState(false);
  const [showLabels, setShowLabels] = useState(true);

  const handleRunEvaluation = () => {
    console.log('Running evaluation with settings:', {
      iouThreshold,
      scoreThreshold,
      filters,
      matchingMode,
    });
  };

  const handleClearFilters = () => {
    setFilters({
      classes: [],
      geography: [],
      lighting: [],
      crowding: [],
      backgroundMode: [],
      dateFrom: '',
      dateTo: '',
      searchName: '',
    });
    setIouThreshold(0.5);
    setScoreThreshold(0.5);
    setMatchingMode('strict');
  };

  const handleClassClick = (className: string) => {
    console.log('Filter by class:', className);
  };

  return (
    <div className="flex h-screen">
      <EvaluationControls
        iouThreshold={iouThreshold}
        onIouThresholdChange={setIouThreshold}
        scoreThreshold={scoreThreshold}
        onScoreThresholdChange={setScoreThreshold}
        filters={filters}
        onFiltersChange={setFilters}
        showTP={showTP}
        showFP={showFP}
        showFN={showFN}
        onShowTPChange={setShowTP}
        onShowFPChange={setShowFP}
        onShowFNChange={setShowFN}
        matchingMode={matchingMode}
        onMatchingModeChange={setMatchingMode}
        onRunEvaluation={handleRunEvaluation}
        onClearFilters={handleClearFilters}
      />

      <EvaluationViewer
        imageSrc="https://images.pexels.com/photos/163726/belgium-antwerp-port-panorama-163726.jpeg?auto=compress&cs=tinysrgb&w=1200"
        gtBoxes={mockGtBoxes}
        modelBoxes={mockModelBoxes}
        showTP={showTP}
        showFP={showFP}
        showFN={showFN}
        overlayOpacity={overlayOpacity}
        onOverlayOpacityChange={setOverlayOpacity}
        displayMode={displayMode}
        onDisplayModeChange={setDisplayMode}
        highlightMatchesOnly={highlightMatchesOnly}
        onHighlightMatchesOnlyChange={setHighlightMatchesOnly}
        showLabels={showLabels}
        onShowLabelsChange={setShowLabels}
      />

      <MetricsPanel metrics={mockMetrics} onClassClick={handleClassClick} />
    </div>
  );
}
