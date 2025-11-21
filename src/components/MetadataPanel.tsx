import { ImageData } from '../types';

interface MetadataPanelProps {
  image: ImageData;
}

export default function MetadataPanel({ image }: MetadataPanelProps) {
  return (
    <div className="bg-white border-t border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Image Metadata</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <MetadataItem label="Image Name" value={image.name} />
        <MetadataItem label="File Path" value={image.path} />
        <MetadataItem label="Resolution" value={image.resolution} />
        <MetadataItem label="Geography" value={image.geography} />
        <MetadataItem label="Lighting" value={image.lighting} />
        <MetadataItem label="Crowding" value={image.crowding} />
        <MetadataItem label="Background Mode" value={image.backgroundMode} />
        <MetadataItem label="Capture Date" value={image.captureDate} />
      </div>

      <div className="mt-4">
        <MetadataItem
          label="Classes Present"
          value={image.classes.join(', ')}
        />
      </div>

      <div className="mt-6 flex gap-3 flex-wrap">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          Save Filtered Subset
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
          Combine Saved Subsets
        </button>
        <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
          Export as YOLO ZIP
        </button>
        <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
          Export as COCO ZIP
        </button>
      </div>
    </div>
  );
}

interface MetadataItemProps {
  label: string;
  value: string;
}

function MetadataItem({ label, value }: MetadataItemProps) {
  return (
    <div>
      <dt className="text-xs font-medium text-gray-500 mb-1">{label}</dt>
      <dd className="text-sm text-gray-900 break-words">{value}</dd>
    </div>
  );
}
