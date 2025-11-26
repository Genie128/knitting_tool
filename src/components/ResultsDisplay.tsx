import React from 'react';
import type { CalculationResult } from '../types';

interface ResultsDisplayProps {
  results: CalculationResult | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  if (!results) {
    return (
      <div className="text-center p-8 bg-cream rounded-lg">
        <p className="text-taupe">請輸入您的織片密度與作品詳情，即可計算所需針數。</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center bg-sage-light/50 p-6 rounded-xl border border-sage-light">
        <p className="text-lg font-sans text-stone-text">建議針數</p>
        <p className="text-6xl font-bold font-serif text-sage-dark my-2">{results.recommendedStitches}</p>
        <p className="text-sm text-taupe">精確計算：{results.exactStitches} 針</p>
      </div>

      {results.patternRepeatRecommendations && (
        <div>
          <h3 className="text-center text-lg font-serif font-bold text-stone-text mb-3">花樣針數建議選項</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-cream border border-dashed border-sage-light p-4 rounded-lg text-center">
              <p className="font-semibold text-stone-text">選項 A (較緊)</p>
              <p className="text-3xl font-bold text-taupe">{results.patternRepeatRecommendations.tighter.stitches}</p>
              <p className="text-sm text-taupe">共 {results.patternRepeatRecommendations.tighter.repeats} 組花樣</p>
            </div>
            <div className="bg-cream border border-dashed border-sage-light p-4 rounded-lg text-center">
              <p className="font-semibold text-stone-text">選項 B (較鬆)</p>
              <p className="text-3xl font-bold text-taupe">{results.patternRepeatRecommendations.looser.stitches}</p>
              <p className="text-sm text-taupe">共 {results.patternRepeatRecommendations.looser.repeats} 組花樣</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
