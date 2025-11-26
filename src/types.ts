
export enum UnitSystem {
  METRIC = 'metric',
  IMPERIAL = 'imperial',
}

export interface PatternRepeatRecommendation {
  tighter: {
    stitches: number;
    repeats: number;
  };
  looser: {
    stitches: number;
    repeats: number;
  };
}

export interface CalculationResult {
  exactStitches: number;
  recommendedStitches: number;
  patternRepeatRecommendations: PatternRepeatRecommendation | null;
}
