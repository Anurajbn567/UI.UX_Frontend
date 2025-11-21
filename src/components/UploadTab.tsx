import { useState } from 'react';
import { Upload, X, CheckCircle } from 'lucide-react';

interface UploadTabProps {
  onUploadSuccess: () => void;
}

export default function UploadTab({ onUploadSuccess }: UploadTabProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.zip')) {
        setSelectedFile(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadSuccess(true);
          setTimeout(() => {
            onUploadSuccess();
          }, 1500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setUploadSuccess(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Upload CVAT Dataset</h1>
        <p className="text-gray-600">Upload ZIP containing images and CVAT XML annotations</p>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />

        {!selectedFile ? (
          <>
            <p className="text-lg text-gray-700 mb-2">Drag and drop your ZIP file here</p>
            <p className="text-sm text-gray-500 mb-4">or</p>
            <label className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
              Browse Files
              <input
                type="file"
                accept=".zip"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-500 mt-4">Only .zip files are allowed</p>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <p className="text-lg text-gray-700">{selectedFile.name}</p>
              <button onClick={handleCancel} className="text-red-500 hover:text-red-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        )}
      </div>

      {isUploading && (
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-blue-600 h-4 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">{uploadProgress}% uploaded</p>
        </div>
      )}

      {uploadSuccess && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
            <p className="text-green-800 font-medium">Upload successful. Ingestion started.</p>
            <p className="text-green-600 text-sm">Redirecting to Dataset Explorer...</p>
          </div>
        </div>
      )}

      {selectedFile && !isUploading && !uploadSuccess && (
        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={handleUpload}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Upload ZIP
          </button>
          <button
            onClick={handleCancel}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancel Upload
          </button>
        </div>
      )}
    </div>
  );
}
