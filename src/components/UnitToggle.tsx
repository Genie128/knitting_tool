import React from 'react';
import { UnitSystem } from '../types';

interface UnitToggleProps {
  selectedUnit: UnitSystem;
  onUnitChange: (unit: UnitSystem) => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ selectedUnit, onUnitChange }) => {
  const commonButtonClasses = "w-1/2 py-2 px-4 text-sm font-semibold rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-dark";
  const selectedClasses = "bg-sage-dark text-white shadow";
  const unselectedClasses = "bg-gray-100 text-stone-text hover:bg-sage-light";

  return (
    <div>
      <label className="block text-sm font-medium text-stone-text mb-2">測量單位</label>
      <div className="flex bg-gray-100 p-1 rounded-full">
        <button
          onClick={() => onUnitChange(UnitSystem.METRIC)}
          className={`${commonButtonClasses} ${selectedUnit === UnitSystem.METRIC ? selectedClasses : unselectedClasses}`}
          aria-pressed={selectedUnit === UnitSystem.METRIC}
        >
          公制 (cm)
        </button>
        <button
          onClick={() => onUnitChange(UnitSystem.IMPERIAL)}
          className={`${commonButtonClasses} ${selectedUnit === UnitSystem.IMPERIAL ? selectedClasses : unselectedClasses}`}
          aria-pressed={selectedUnit === UnitSystem.IMPERIAL}
        >
          英制 (吋)
        </button>
      </div>
    </div>
  );
};

export default UnitToggle;
