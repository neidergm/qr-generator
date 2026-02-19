import type { CornerDotType, CornerSquareType, DotType, Gradient, Options } from 'qr-code-styling';
import type { PatternColorMode, QrConfig } from '@/types/qr';

export const dotPatternOptions: Array<{ value: DotType; label: string }> = [
  { value: 'square', label: 'Square' },
  { value: 'dots', label: 'Dots' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy Rounded' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
];

export const cornerSquarePatternOptions: Array<{ value: CornerSquareType; label: string }> = [
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Dot' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
];

export const cornerDotPatternOptions: Array<{ value: CornerDotType; label: string }> = [
  { value: 'dot', label: 'Dot' },
  { value: 'square', label: 'Square' },
];

type QrRenderConfig = Omit<QrConfig, 'themeMode'>;

function toGradient(start: string, end: string, rotation: number): Gradient {
  return {
    type: 'linear',
    rotation: (rotation * Math.PI) / 180,
    colorStops: [
      { offset: 0, color: start },
      { offset: 1, color: end },
    ],
  };
}

function buildColorStyles(config: {
  mode: PatternColorMode;
  solidColor: string;
  gradientStart: string;
  gradientEnd: string;
  gradientRotation: number;
}) {
  if (config.mode === 'solid') {
    return {
      color: config.solidColor,
      gradient: undefined,
    };
  }

  return {
    color: undefined,
    gradient: toGradient(config.gradientStart, config.gradientEnd, config.gradientRotation),
  };
}

export function buildQrOptions(config: QrRenderConfig): Partial<Options> {
  const patternStyles = buildColorStyles({
    mode: config.colorMode,
    solidColor: config.solidColor,
    gradientStart: config.gradientStart,
    gradientEnd: config.gradientEnd,
    gradientRotation: config.gradientRotation,
  });

  const cornerStyles = buildColorStyles({
    mode: config.cornerColorMode,
    solidColor: config.cornerSolidColor,
    gradientStart: config.cornerGradientStart,
    gradientEnd: config.cornerGradientEnd,
    gradientRotation: config.cornerGradientRotation,
  });

  return {
    width: config.qrSize,
    height: config.qrSize,
    data: config.data.trim() || ' ',
    qrOptions: {
      errorCorrectionLevel: config.qrQuality,
    },
    image: config.logoDataUrl ?? undefined,
    dotsOptions: {
      type: config.dotType,
      ...patternStyles,
    },
    cornersSquareOptions: {
      type: config.cornerSquareType,
      ...cornerStyles,
    },
    cornersDotOptions: {
      type: config.cornerDotType,
      ...cornerStyles,
    },
    backgroundOptions: {
      color: config.backgroundColor,
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.3,
      margin: 6,
      saveAsBlob: true,
      crossOrigin: 'anonymous',
    },
  };
}
