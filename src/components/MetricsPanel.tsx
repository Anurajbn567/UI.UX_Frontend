import { EvaluationMetrics } from '../types';

interface MetricsPanelProps {
  metrics: EvaluationMetrics;
  onClassClick: (className: string) => void;
}

export default function MetricsPanel({ metrics, onClassClick }: MetricsPanelProps) {
  return (
    <div className="w-96 bg-white border-l border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Evaluation Metrics</h2>
      </div>

      <div className="p-4 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <MetricCard label="Precision" value={metrics.precision} />
          <MetricCard label="Recall" value={metrics.recall} />
          <MetricCard label="F1 Score" value={metrics.f1Score} />
          <MetricCard label="mAP@0.5" value={metrics.mAP50} />
        </div>

        <div>
          <MetricCard label="mAP@0.75" value={metrics.mAP75} fullWidth />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Per-Class Metrics</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Class</th>
                  <th className="text-center py-2 px-2 font-medium text-gray-700">TP</th>
                  <th className="text-center py-2 px-2 font-medium text-gray-700">FP</th>
                  <th className="text-center py-2 px-2 font-medium text-gray-700">FN</th>
                  <th className="text-center py-2 px-2 font-medium text-gray-700">Prec</th>
                  <th className="text-center py-2 px-2 font-medium text-gray-700">Rec</th>
                </tr>
              </thead>
              <tbody>
                {metrics.perClassMetrics.map((classMetric, index) => (
                  <tr
                    key={index}
                    onClick={() => onClassClick(classMetric.className)}
                    className="border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <td className="py-2 px-3 text-gray-800">{classMetric.className}</td>
                    <td className="text-center py-2 px-2 text-green-600 font-medium">
                      {classMetric.tp}
                    </td>
                    <td className="text-center py-2 px-2 text-red-600 font-medium">
                      {classMetric.fp}
                    </td>
                    <td className="text-center py-2 px-2 text-orange-600 font-medium">
                      {classMetric.fn}
                    </td>
                    <td className="text-center py-2 px-2 text-gray-700">
                      {classMetric.precision.toFixed(2)}
                    </td>
                    <td className="text-center py-2 px-2 text-gray-700">
                      {classMetric.recall.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-2">
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Save Evaluation
          </button>
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
            Save Subset
          </button>
          <div className="pt-2">
            <p className="text-xs font-medium text-gray-700 mb-2">Export Report:</p>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-xs font-medium">
                YOLO
              </button>
              <button className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-xs font-medium">
                COCO
              </button>
            </div>
          </div>
          <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
            Download Annotated ZIP
          </button>
          <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
            Flag Image for Review
          </button>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: number;
  fullWidth?: boolean;
}

function MetricCard({ label, value, fullWidth = false }: MetricCardProps) {
  return (
    <div
      className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200 ${
        fullWidth ? 'col-span-2' : ''
      }`}
    >
      <p className="text-xs text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value.toFixed(3)}</p>
    </div>
  );
}
