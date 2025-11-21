import { useState } from 'react';
import FiltersSidebar from './FiltersSidebar';
import ImageViewer from './ImageViewer';
import MetadataPanel from './MetadataPanel';
import { Filters, ImageData } from '../types';

const mockImages: ImageData[] = [
  {
    id: '1',
    name: 'radar_001.jpg',
    path: '/datasets/images/radar_001.jpg',
    resolution: '1920x1080',
    classes: ['RadarSystems', 'Vehicles'],
    geography: 'Urban',
    lighting: 'Bright',
    crowding: 'Non-crowded',
    backgroundMode: 'Include',
    captureDate: '2025-01-15',
    groundTruthBoxes: [
      { x: 10, y: 20, width: 30, height: 25, class: 'RadarSystems' },
      { x: 50, y: 60, width: 20, height: 15, class: 'Vehicles' },
    ],
  },
  {
    id: '2',
    name: 'tank_002.jpg',
    path: '/datasets/images/tank_002.jpg',
    resolution: '2048x1536',
    classes: ['Tanks', 'Camo'],
    geography: 'Green',
    lighting: 'Neutral',
    crowding: 'Crowded',
    backgroundMode: 'Include',
    captureDate: '2025-02-10',
    groundTruthBoxes: [
      { x: 15, y: 25, width: 35, height: 30, class: 'Tanks' },
      { x: 55, y: 45, width: 25, height: 20, class: 'Camo' },
    ],
  },
];

export default function DatasetExplorer() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  const currentImage = mockImages[currentImageIndex];

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => Math.min(mockImages.length - 1, prev + 1));
  };

  return (
    <div className="flex h-full">
      <FiltersSidebar filters={filters} onFiltersChange={setFilters} />

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-hidden">
          <ImageViewer
            imageSrc="https://images.pexels.com/photos/163726/belgium-antwerp-port-panorama-163726.jpeg?auto=compress&cs=tinysrgb&w=1200"
            boundingBoxes={currentImage.groundTruthBoxes}
            onPrevious={handlePrevious}
            onNext={handleNext}
            hasPrevious={currentImageIndex > 0}
            hasNext={currentImageIndex < mockImages.length - 1}
          />
        </div>

        <div className="flex-shrink-0 overflow-y-auto max-h-64">
          <MetadataPanel image={currentImage} />
        </div>
      </div>
    </div>
  );
}
