import { useRef, useCallback, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
}

interface UseDrawingOptions {
  strokeColor?: string;
  strokeWidth?: number;
}

export function useDrawing(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  options: UseDrawingOptions = {}
) {
  const {
    strokeColor = '#9b87f5',
    strokeWidth = 12,
  } = options;

  const isDrawing = useRef(false);
  const lastPoint = useRef<Point | null>(null);

  const getPoint = useCallback((e: MouseEvent | TouchEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      if (!touch) return null;
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, [canvasRef]);

  const drawLine = useCallback((from: Point, to: Point) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }, [canvasRef, strokeColor, strokeWidth]);

  const handleStart = useCallback((e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const point = getPoint(e);
    if (!point) return;

    isDrawing.current = true;
    lastPoint.current = point;
  }, [getPoint]);

  const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDrawing.current || !lastPoint.current) return;

    const point = getPoint(e);
    if (!point) return;

    drawLine(lastPoint.current, point);
    lastPoint.current = point;
  }, [getPoint, drawLine]);

  const handleEnd = useCallback((e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDrawing.current) return;

    isDrawing.current = false;
    lastPoint.current = null;
  }, []);

  // Global handler to prevent default during drawing
  useEffect(() => {
    const preventGestures = (e: TouchEvent) => {
      if (isDrawing.current) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventGestures, { passive: false });
    return () => {
      document.removeEventListener('touchmove', preventGestures);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Mouse events
    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('mouseleave', handleEnd);

    // Touch events with capture to intercept before system gestures
    canvas.addEventListener('touchstart', handleStart, { passive: false, capture: true });
    canvas.addEventListener('touchmove', handleMove, { passive: false, capture: true });
    canvas.addEventListener('touchend', handleEnd, { passive: false, capture: true });
    canvas.addEventListener('touchcancel', handleEnd, { passive: false, capture: true });

    return () => {
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('mouseleave', handleEnd);
      canvas.removeEventListener('touchstart', handleStart, { capture: true });
      canvas.removeEventListener('touchmove', handleMove, { capture: true });
      canvas.removeEventListener('touchend', handleEnd, { capture: true });
      canvas.removeEventListener('touchcancel', handleEnd, { capture: true });
    };
  }, [canvasRef, handleStart, handleMove, handleEnd]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [canvasRef]);

  return { clearCanvas };
}
