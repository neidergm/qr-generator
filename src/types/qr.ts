import type { CornerDotType, CornerSquareType, DotType, ErrorCorrectionLevel } from 'qr-code-styling';

export type ExportFormat = 'svg' | 'png' | 'jpeg';
export type PatternColorMode = 'solid' | 'gradient';

export interface QrConfig {
  qrQuality: ErrorCorrectionLevel;
  qrSize: number;
  data: string;
  dotType: DotType;
  colorMode: PatternColorMode;
  solidColor: string;
  gradientStart: string;
  gradientEnd: string;
  gradientRotation: number;
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  cornerColorMode: PatternColorMode;
  cornerSolidColor: string;
  cornerGradientStart: string;
  cornerGradientEnd: string;
  cornerGradientRotation: number;
  backgroundColor: string;
  logoDataUrl: string | null;
}
