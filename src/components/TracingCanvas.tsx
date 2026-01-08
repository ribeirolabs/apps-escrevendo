import { useRef, useEffect, useCallback } from 'react';
import { useDrawing } from '../hooks/useDrawing';

interface TracingCanvasProps {
  character: string;
  clearTrigger?: number;
  strokeColor?: string;
  showBothCases?: boolean;
}

const CANVAS_WIDTH = 400;
const CANVAS_WIDTH_BOTH = 700;
const CANVAS_HEIGHT = 500;

// Guidelines positions (as percentage of height)
const TOP_LINE = 0.15;
const MIDDLE_LINE = 0.5;
const BOTTOM_LINE = 0.85;

// Colors
const GUIDELINE_COLOR = '#d4c4f5';
const GUIDELINE_DASHED_COLOR = '#e8dff5';
const LETTER_DOTTED_COLOR = '#c4b5e8';

export function TracingCanvas({ character, clearTrigger, strokeColor = '#9b87f5', showBothCases = false }: TracingCanvasProps) {
  const guideCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const canvasWidth = showBothCases ? CANVAS_WIDTH_BOTH : CANVAS_WIDTH;

  const { clearCanvas } = useDrawing(drawCanvasRef, {
    strokeColor,
    strokeWidth: 18,
  });

  const getFontSettings = useCallback(() => {
    const height = CANVAS_HEIGHT;
    const letterHeight = height * (BOTTOM_LINE - TOP_LINE) * 0.9;
    const fontSize = letterHeight;
    const centerY = height * (TOP_LINE + BOTTOM_LINE) / 2;
    return { fontSize, centerY };
  }, []);

  // Draw guidelines
  const drawGuidelines = useCallback((ctx: CanvasRenderingContext2D, width: number) => {
    const height = CANVAS_HEIGHT;

    ctx.clearRect(0, 0, width, height);

    // Top line (solid)
    ctx.beginPath();
    ctx.strokeStyle = GUIDELINE_COLOR;
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.moveTo(20, height * TOP_LINE);
    ctx.lineTo(width - 20, height * TOP_LINE);
    ctx.stroke();

    // Middle line (dashed - x-height)
    ctx.beginPath();
    ctx.strokeStyle = GUIDELINE_DASHED_COLOR;
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.moveTo(20, height * MIDDLE_LINE);
    ctx.lineTo(width - 20, height * MIDDLE_LINE);
    ctx.stroke();

    // Bottom line (solid - baseline)
    ctx.beginPath();
    ctx.strokeStyle = GUIDELINE_COLOR;
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.moveTo(20, height * BOTTOM_LINE);
    ctx.lineTo(width - 20, height * BOTTOM_LINE);
    ctx.stroke();
  }, []);

  // Draw dotted letter outline
  const drawDottedLetter = useCallback((ctx: CanvasRenderingContext2D, char: string, showBoth: boolean, width: number) => {
    const { fontSize, centerY } = getFontSettings();

    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (showBoth) {
      // Draw both cases side by side with same font size
      const upperChar = char.toUpperCase();
      const lowerChar = char.toLowerCase();
      const spacing = width / 4;
      
      // Draw uppercase on the left
      ctx.strokeStyle = LETTER_DOTTED_COLOR;
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 10]);
      ctx.strokeText(upperChar, width / 2 - spacing, centerY);
      ctx.fillStyle = 'rgba(228, 218, 245, 0.25)';
      ctx.fillText(upperChar, width / 2 - spacing, centerY);
      
      // Draw lowercase on the right
      ctx.strokeStyle = LETTER_DOTTED_COLOR;
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 10]);
      ctx.strokeText(lowerChar, width / 2 + spacing, centerY);
      ctx.fillStyle = 'rgba(228, 218, 245, 0.25)';
      ctx.fillText(lowerChar, width / 2 + spacing, centerY);
    } else {
      // Draw single character centered
      ctx.strokeStyle = LETTER_DOTTED_COLOR;
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 10]);
      ctx.strokeText(char, width / 2, centerY);

      // Draw light fill for better visibility
      ctx.fillStyle = 'rgba(228, 218, 245, 0.25)';
      ctx.fillText(char, width / 2, centerY);
    }
  }, [getFontSettings]);

  // Initial render of guidelines and letter
  useEffect(() => {
    const guideCanvas = guideCanvasRef.current;
    const guideCtx = guideCanvas?.getContext('2d');
    
    if (guideCtx) {
      drawGuidelines(guideCtx, canvasWidth);
      drawDottedLetter(guideCtx, character, showBothCases, canvasWidth);
    }
  }, [character, showBothCases, canvasWidth, drawGuidelines, drawDottedLetter]);

  // Clear drawing canvas when clearTrigger changes or character changes
  useEffect(() => {
    clearCanvas();
  }, [clearTrigger, character, clearCanvas]);

  return (
    <div 
      className="relative bg-white rounded-3xl shadow-lg overflow-hidden ring-2 ring-purple-200 transition-all duration-300"
      style={{ touchAction: 'none' }}
      onTouchStart={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
    >
      {/* Guidelines and letter template layer */}
      <canvas
        ref={guideCanvasRef}
        width={canvasWidth}
        height={CANVAS_HEIGHT}
        className="absolute inset-0 w-full h-full"
        style={{ touchAction: 'none' }}
      />
      
      {/* Drawing layer */}
      <canvas
        ref={drawCanvasRef}
        width={canvasWidth}
        height={CANVAS_HEIGHT}
        className="relative w-full h-full cursor-crosshair"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
}
