export const FIXED_CLASSES = [
  'RadarSystems',
  'Vehicles',
  'Missiles',
  'ArtilleryGuns',
  'Tanks',
  'Camo',
  'Radar2',
  'Missile2',
  'Tank2',
  'Vehicle2',
  '99'
] as const;

export type ClassType = typeof FIXED_CLASSES[number];

export type Geography = 'Urban' | 'Green' | 'Snow' | 'Desert';
export type Lighting = 'Dark' | 'Neutral' | 'Bright';
export type Crowding = 'Any' | 'Non-crowded' | 'Crowded';
export type BackgroundMode = 'Include' | 'Exclude' | 'Only Background';

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  class: ClassType;
  confidence?: number;
}

export interface ImageData {
  id: string;
  name: string;
  path: string;
  resolution: string;
  classes: ClassType[];
  geography: Geography;
  lighting: Lighting;
  crowding: Crowding;
  backgroundMode: BackgroundMode;
  captureDate: string;
  groundTruthBoxes: BoundingBox[];
  modelBoxes?: BoundingBox[];
}

export interface Filters {
  classes: ClassType[];
  geography: Geography[];
  lighting: Lighting[];
  crowding: Crowding[];
  backgroundMode: BackgroundMode[];
  dateFrom: string;
  dateTo: string;
  searchName: string;
}

export interface EvaluationMetrics {
  precision: number;
  recall: number;
  f1Score: number;
  mAP50: number;
  mAP75: number;
  perClassMetrics: ClassMetrics[];
}

export interface ClassMetrics {
  className: ClassType;
  tp: number;
  fp: number;
  fn: number;
  precision: number;
  recall: number;
}

export type MatchType = 'TP' | 'FP' | 'FN' | null;

export interface MatchedBox extends BoundingBox {
  matchType: MatchType;
  iou?: number;
}
