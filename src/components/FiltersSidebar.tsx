import { useState } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { FIXED_CLASSES, Filters, Geography, Lighting, Crowding, BackgroundMode } from '../types';

interface FiltersSidebarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export default function FiltersSidebar({ filters, onFiltersChange }: FiltersSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    classes: true,
    geography: true,
    lighting: true,
    crowding: true,
    background: true,
    dateRange: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleClassToggle = (className: string) => {
    const newClasses = filters.classes.includes(className as any)
      ? filters.classes.filter((c) => c !== className)
      : [...filters.classes, className as any];
    onFiltersChange({ ...filters, classes: newClasses });
  };

  const handleClearAll = () => {
    onFiltersChange({
      classes: [],
      geography: [],
      lighting: [],
      crowding: [],
      backgroundMode: [],
      dateFrom: '',
      dateTo: '',
      searchName: '',
    });
  };

  const geographies: Geography[] = ['Urban', 'Green', 'Snow', 'Desert'];
  const lightings: Lighting[] = ['Dark', 'Neutral', 'Bright'];
  const crowdings: Crowding[] = ['Any', 'Non-crowded', 'Crowded'];
  const backgroundModes: BackgroundMode[] = ['Include', 'Exclude', 'Only Background'];

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        <button
          onClick={handleClearAll}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <X className="w-4 h-4" />
          Clear All
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <input
            type="text"
            placeholder="Search image name..."
            value={filters.searchName}
            onChange={(e) => onFiltersChange({ ...filters, searchName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <FilterSection
          title="Classes"
          isExpanded={expandedSections.classes}
          onToggle={() => toggleSection('classes')}
        >
          <div className="space-y-2">
            {FIXED_CLASSES.map((className) => (
              <label key={className} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.classes.includes(className)}
                  onChange={() => handleClassToggle(className)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{className}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection
          title="Geography"
          isExpanded={expandedSections.geography}
          onToggle={() => toggleSection('geography')}
        >
          <div className="space-y-2">
            {geographies.map((geo) => (
              <label key={geo} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.geography.includes(geo)}
                  onChange={(e) => {
                    const newGeo = e.target.checked
                      ? [...filters.geography, geo]
                      : filters.geography.filter((g) => g !== geo);
                    onFiltersChange({ ...filters, geography: newGeo });
                  }}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{geo}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection
          title="Lighting"
          isExpanded={expandedSections.lighting}
          onToggle={() => toggleSection('lighting')}
        >
          <div className="space-y-2">
            {lightings.map((light) => (
              <label key={light} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.lighting.includes(light)}
                  onChange={(e) => {
                    const newLighting = e.target.checked
                      ? [...filters.lighting, light]
                      : filters.lighting.filter((l) => l !== light);
                    onFiltersChange({ ...filters, lighting: newLighting });
                  }}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{light}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection
          title="Crowding"
          isExpanded={expandedSections.crowding}
          onToggle={() => toggleSection('crowding')}
        >
          <div className="space-y-2">
            {crowdings.map((crowd) => (
              <label key={crowd} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.crowding.includes(crowd)}
                  onChange={(e) => {
                    const newCrowding = e.target.checked
                      ? [...filters.crowding, crowd]
                      : filters.crowding.filter((c) => c !== crowd);
                    onFiltersChange({ ...filters, crowding: newCrowding });
                  }}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{crowd}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection
          title="Background Mode"
          isExpanded={expandedSections.background}
          onToggle={() => toggleSection('background')}
        >
          <div className="space-y-2">
            {backgroundModes.map((mode) => (
              <label key={mode} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.backgroundMode.includes(mode)}
                  onChange={(e) => {
                    const newBg = e.target.checked
                      ? [...filters.backgroundMode, mode]
                      : filters.backgroundMode.filter((b) => b !== mode);
                    onFiltersChange({ ...filters, backgroundMode: newBg });
                  }}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{mode}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection
          title="Date Range"
          isExpanded={expandedSections.dateRange}
          onToggle={() => toggleSection('dateRange')}
        >
          <div className="space-y-3">
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
        </FilterSection>
      </div>
    </div>
  );
}

interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterSection({ title, isExpanded, onToggle, children }: FilterSectionProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
      >
        <span className="font-medium text-gray-700">{title}</span>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        )}
      </button>
      {isExpanded && <div className="p-4">{children}</div>}
    </div>
  );
}
