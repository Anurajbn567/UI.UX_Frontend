import { useState } from 'react';
import UploadTab from './components/UploadTab';
import DatasetExplorer from './components/DatasetExplorer';
import GtVsModelTab from './components/GtVsModelTab';

type TabType = 'upload' | 'explorer' | 'evaluation';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('upload');

  const handleUploadSuccess = () => {
    setActiveTab('explorer');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">CVAT Data Management Platform</h1>
        </div>
        <nav className="flex gap-1 px-6">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'upload'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            Upload
          </button>
          <button
            onClick={() => setActiveTab('explorer')}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'explorer'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            Dataset Explorer
          </button>
          <button
            onClick={() => setActiveTab('evaluation')}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'evaluation'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            GT vs Model
          </button>
        </nav>
      </header>

      <main className="flex-1 overflow-hidden">
        {activeTab === 'upload' && <UploadTab onUploadSuccess={handleUploadSuccess} />}
        {activeTab === 'explorer' && <DatasetExplorer />}
        {activeTab === 'evaluation' && <GtVsModelTab />}
      </main>
    </div>
  );
}

export default App;
