import React, { useState, useEffect, useCallback } from 'react';
import { UnitSystem } from './types';
import type { CalculationResult } from './types';
import UnitToggle from './components/UnitToggle';
import InputField from './components/InputField';
import ResultsDisplay from './components/ResultsDisplay';
import { YarnBallIcon, RulerIcon } from './components/icons';

const App: React.FC = () => {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(UnitSystem.METRIC);
  const [gaugeStitches, setGaugeStitches] = useState<string>('22');
  const [targetWidth, setTargetWidth] = useState<string>('50');
  const [ease, setEase] = useState<string>('0');
  const [patternRepeat, setPatternRepeat] = useState<string>('1');

  const [results, setResults] = useState<CalculationResult | null>(null);

  const calculate = useCallback(() => {
    const gaugeNum = parseFloat(gaugeStitches);
    const widthNum = parseFloat(targetWidth);
    const easeNum = parseFloat(ease) || 0;
    const repeatNum = parseInt(patternRepeat, 10) || 1;

    if (isNaN(gaugeNum) || isNaN(widthNum) || gaugeNum <= 0 || widthNum <= 0) {
      setResults(null);
      return;
    }

    const base = unitSystem === UnitSystem.METRIC ? 10 : 4;
    const finalWidth = widthNum + easeNum;
    if (finalWidth <= 0) {
      setResults(null);
      return;
    }

    const stitchesPerUnit = gaugeNum / base;
    const exactStitches = stitchesPerUnit * finalWidth;

    const recommendedStitches = Math.round(exactStitches);

    const newResult: CalculationResult = {
      exactStitches: parseFloat(exactStitches.toFixed(2)),
      recommendedStitches: recommendedStitches,
      patternRepeatRecommendations: null,
    };

    if (repeatNum > 1) {
      const repeats = Math.floor(exactStitches / repeatNum);
      const tighterStitches = repeats * repeatNum;
      const looserStitches = (repeats + 1) * repeatNum;

      newResult.patternRepeatRecommendations = {
        tighter: { stitches: tighterStitches, repeats: repeats },
        looser: { stitches: looserStitches, repeats: repeats + 1 },
      };
      
      // Smartly adjust the main recommendation to be the closer of the two pattern options
      newResult.recommendedStitches = 
        Math.abs(tighterStitches - exactStitches) < Math.abs(looserStitches - exactStitches)
        ? tighterStitches
        : looserStitches;

    }

    setResults(newResult);
  }, [gaugeStitches, targetWidth, ease, patternRepeat, unitSystem]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  const handleUnitChange = (newUnit: UnitSystem) => {
    const oldUnit = unitSystem;
    setUnitSystem(newUnit);
    
    // Convert target width and ease when unit changes
    const conversionFactor = 2.54; // cm per inch
    const currentWidth = parseFloat(targetWidth);
    const currentEase = parseFloat(ease);

    if (newUnit === UnitSystem.METRIC && oldUnit === UnitSystem.IMPERIAL) {
        if (!isNaN(currentWidth)) setTargetWidth((currentWidth * conversionFactor).toFixed(1));
        if (!isNaN(currentEase)) setEase((currentEase * conversionFactor).toFixed(1));
    } else if (newUnit === UnitSystem.IMPERIAL && oldUnit === UnitSystem.METRIC) {
        if (!isNaN(currentWidth)) setTargetWidth((currentWidth / conversionFactor).toFixed(1));
        if (!isNaN(currentEase)) setEase((currentEase / conversionFactor).toFixed(1));
    }
  };


  return (
    <div className="min-h-screen bg-cream text-stone-text flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <YarnBallIcon className="w-16 h-16 mx-auto text-taupe mb-2" />
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-text">織片密度計算機</h1>
          <p className="text-taupe mt-2 font-sans">棒針、鉤針適用</p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-8">
          {/* Settings Section */}
          <div className="border-b border-sage-light pb-6">
            <h2 className="text-lg font-bold font-serif text-stone-text mb-4">設定</h2>
            <UnitToggle selectedUnit={unitSystem} onUnitChange={handleUnitChange} />
          </div>

          {/* Inputs Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-bold font-serif text-stone-text mb-4 flex items-center gap-2">
                <RulerIcon className="w-5 h-5 text-taupe" />
                您的織片密度
              </h2>
              <InputField
                id="gauge-stitches"
                label={`針數 / ${unitSystem === UnitSystem.METRIC ? '10cm' : '4吋'}`}
                value={gaugeStitches}
                onChange={(e) => setGaugeStitches(e.target.value)}
                placeholder="例如：22"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif text-stone-text mb-4">您的作品</h2>
              <InputField
                id="target-width"
                label={`目標寬度 (${unitSystem === UnitSystem.METRIC ? 'cm' : '吋'})`}
                value={targetWidth}
                onChange={(e) => setTargetWidth(e.target.value)}
                placeholder="例如：50"
              />
            </div>
            <div>
               <h2 className="text-lg font-bold font-serif text-stone-text mb-4">尺寸調整 (選填)</h2>
              <InputField
                id="ease"
                label={`鬆份 (寬容度) (${unitSystem === UnitSystem.METRIC ? 'cm' : '吋'})`}
                value={ease}
                onChange={(e) => setEase(e.target.value)}
                placeholder="例如：5 或 -2"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif text-stone-text mb-4 opacity-0 hidden md:block">_</h2>
              <InputField
                id="pattern-repeat"
                label="花樣針數 (一組幾針)"
                value={patternRepeat}
                onChange={(e) => setPatternRepeat(e.target.value)}
                placeholder="例如：6"
              />
            </div>
          </div>
          
          {/* Results Section */}
          <div className="pt-6 border-t border-sage-light">
             <h2 className="text-2xl font-bold font-serif text-center text-stone-text mb-4">建議起針數</h2>
             <ResultsDisplay results={results} />
          </div>
        </div>
        <footer className="text-center mt-8 text-taupe text-sm">
          <p>&copy; {new Date().getFullYear()} 溫馨工作室. 祝您編織愉快！</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
