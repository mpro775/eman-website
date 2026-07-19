import { forwardRef, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import './VariableProximity.css';

function useAnimationFrame(callback: () => void) {
  useEffect(() => {
    let frameId: number;
    const loop = () => {
      callback();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [callback]);
}

function useMousePositionRef(containerRef: React.RefObject<HTMLDivElement | null>) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

interface VariableProximityProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  radius?: number;
  falloff?: 'linear' | 'exponential' | 'gaussian';
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 50,
    falloff = 'linear',
    className = '',
    onClick,
    style,
    ...restProps
  } = props;

  // Refs are now per-word instead of per-letter
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const interpolatedSettingsRef = useRef<string[]>([]);
  const mousePositionRef = useMousePositionRef(containerRef);
  const lastPositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr: string) =>
      new Map(
        settingsStr
          .split(',')
          .map(s => s.trim())
          .map(s => {
            const [name, value] = s.split(' ');
            return [name.replace(/['"]/g, ''), parseFloat(value)] as [string, number];
          })
      );

    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const calculateFalloff = useCallback(
    (distance: number) => {
      const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
      switch (falloff) {
        case 'exponential':
          return norm ** 2;
        case 'gaussian':
          return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
        case 'linear':
        default:
          return norm;
      }
    },
    [falloff, radius]
  );

  useAnimationFrame(() => {
    if (!containerRef?.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const { x, y } = mousePositionRef.current;
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
      return;
    }
    lastPositionRef.current = { x, y };

    wordRefs.current.forEach((wordRef, index) => {
      if (!wordRef) return;

      const rect = wordRef.getBoundingClientRect();
      const wordCenterX = rect.left + rect.width / 2 - containerRect.left;
      const wordCenterY = rect.top + rect.height / 2 - containerRect.top;

      const distance = calculateDistance(
        mousePositionRef.current.x,
        mousePositionRef.current.y,
        wordCenterX,
        wordCenterY
      );

      if (distance >= radius) {
        wordRef.style.fontVariationSettings = fromFontVariationSettings;
        // Also set fontWeight directly for non-variable fonts
        const wghtSetting = parsedSettings.find(s => s.axis === 'wght');
        if (wghtSetting) {
          wordRef.style.fontWeight = String(wghtSetting.fromValue);
        }
        return;
      }

      const falloffValue = calculateFalloff(distance);
      const newSettings = parsedSettings
        .map(({ axis, fromValue, toValue }) => {
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
          return `'${axis}' ${interpolatedValue}`;
        })
        .join(', ');

      interpolatedSettingsRef.current[index] = newSettings;
      wordRef.style.fontVariationSettings = newSettings;

      // Also set fontWeight directly for non-variable fonts
      const wghtSetting = parsedSettings.find(s => s.axis === 'wght');
      if (wghtSetting) {
        const interpolatedWeight = wghtSetting.fromValue + (wghtSetting.toValue - wghtSetting.fromValue) * falloffValue;
        wordRef.style.fontWeight = String(Math.round(interpolatedWeight));
      }
    });
  });

  const words = label.split(/\s+/).filter(Boolean);

  return (
    <span
      ref={ref}
      className={`${className} variable-proximity`}
      onClick={onClick}
      style={{ display: 'inline', ...style }}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          ref={(el: HTMLSpanElement | null) => {
            wordRefs.current[wordIndex] = el;
          }}
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            fontVariationSettings: interpolatedSettingsRef.current[wordIndex],
          }}
          aria-hidden="true"
        >
          {word}
          {wordIndex < words.length - 1 && '\u00A0'}
        </motion.span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;
