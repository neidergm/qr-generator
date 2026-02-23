import { create } from 'zustand';
import type { CornerDotType, CornerSquareType, DotType, ErrorCorrectionLevel } from 'qr-code-styling';
import type { PatternColorMode, QrConfig } from '@/types/qr';

interface QrStore extends QrConfig {
  setQrQuality: (qrQuality: ErrorCorrectionLevel) => void;
  setQrSize: (qrSize: number) => void;
  setData: (data: string) => void;
  setDotType: (dotType: DotType) => void;
  setGradientRotation: (gradientRotation: number) => void;
  setCornerSquareType: (cornerSquareType: CornerSquareType) => void;
  setCornerDotType: (cornerDotType: CornerDotType) => void;
  setCornerColorMode: (cornerColorMode: PatternColorMode) => void;
  setCornerGradientRotation: (cornerGradientRotation: number) => void;
  setBackgroundColor: (backgroundColor: string) => void;
  setLogoDataUrl: (logoDataUrl: string | null) => void;
  setColor: (color: string, colorEnd?: string) => void;
  setCornersColor: (color: string, colorEnd?: string) => void;
  setColorMode: (colorMode: PatternColorMode, type?: 'pattern' | 'corner') => void;
}

const initialState: QrConfig = {
  qrQuality: 'Q',
  qrSize: 320,
  data: 'https://example.com',
  dotType: 'rounded',
  colorMode: 'solid',
  solidColor: '#121212',
  gradientStart: '#1f4cff',
  gradientEnd: '#00c2b8',
  gradientRotation: 135,
  cornerSquareType: 'extra-rounded',
  cornerDotType: 'dot',
  cornerColorMode: 'solid',
  cornerSolidColor: '#121212',
  cornerGradientStart: '#1f4cff',
  cornerGradientEnd: '#00c2b8',
  cornerGradientRotation: 135,
  backgroundColor: '#ffffff',
  logoDataUrl: null,
};

export const useQrStore = create<QrStore>()((set) => ({
  ...initialState,
  setQrQuality: (qrQuality) => set({ qrQuality }),
  setQrSize: (qrSize) => set({ qrSize: Math.min(640, Math.max(180, qrSize)) }),
  setData: (data) => set({ data }),
  setDotType: (dotType) => set({ dotType }),
  setColorMode: (colorMode, type = 'pattern') => {
    if (type === 'pattern') return set({ colorMode });
    set({ cornerColorMode: colorMode });
  },
  setBackgroundColor: (backgroundColor) => set({ backgroundColor }),
  setCornerGradientRotation: (cornerGradientRotation) => set({ cornerGradientRotation }),
  setGradientRotation: (gradientRotation) => set({ gradientRotation }),
  setCornerSquareType: (cornerSquareType) => set({ cornerSquareType }),
  setCornerDotType: (cornerDotType) => set({ cornerDotType }),
  setCornerColorMode: (cornerColorMode) => set({ cornerColorMode }),
  setLogoDataUrl: (logoDataUrl) => set({ logoDataUrl }),
  setColor: (color, colorEnd) => {
    if (colorEnd) {
      return set({
        gradientStart: color,
        gradientEnd: colorEnd,
      });
    }

    set({ solidColor: color })
  },
  setCornersColor: (color, colorEnd) => {
    if (colorEnd) {
      return set({
        cornerGradientStart: color,
        cornerGradientEnd: colorEnd,
      });
    }

    set({ cornerSolidColor: color })
  },
}));
