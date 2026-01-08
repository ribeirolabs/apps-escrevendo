// Simplified - no automatic validation
// The app is for practice, not testing

export interface ValidationResult {
  coverage: number;
  accuracy: number;
  isSuccess: boolean;
}

export function createLetterMask(
  _character: string,
  _width: number,
  _height: number,
  _topLine: number,
  _bottomLine: number
): ImageData {
  // Return empty image data - not used anymore
  return new ImageData(1, 1);
}

export function validateTracing(
  _maskData: ImageData,
  _strokeCanvas: HTMLCanvasElement
): ValidationResult {
  // No automatic validation
  return {
    coverage: 0,
    accuracy: 0,
    isSuccess: false,
  };
}
