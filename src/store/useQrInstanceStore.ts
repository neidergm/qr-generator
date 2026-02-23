import { create } from 'zustand';
import type QRCodeStyling from 'qr-code-styling';
import type { ExportFormat } from '@/types/qr';

interface QrInstanceStore {
  qrInstance: QRCodeStyling | null;
  setQrInstance: (qrInstance: QRCodeStyling | null) => void;
  exportQr: (format: ExportFormat) => Promise<void>;
}

export const useQrInstanceStore = create<QrInstanceStore>((set, get) => ({
  qrInstance: null,
  setQrInstance: (qrInstance) => set({ qrInstance }),
  exportQr: async (format) => {
    const qrInstance = get().qrInstance;

    if (!qrInstance) {
      return;
    }

    await qrInstance.download({
      name: `qr-code-${Date.now()}`,
      extension: format,
    });
  },
}));
