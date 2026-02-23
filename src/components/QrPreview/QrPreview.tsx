import { useEffect, useRef, type CSSProperties } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { QrCode } from 'lucide-react';
import { useQrInstanceStore } from '@/store/useQrInstanceStore';
import { useQrStore } from '@/store/useQrStore';
import { buildQrOptions } from '@/utils/qrOptions';
import styles from '@/components/QrPreview/QrPreview.module.scss';
import QualityAndSize from '../SettingsPanel/QualityAndSize';

export function QrPreview() {
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const qrInstance = useQrInstanceStore((state) => state.qrInstance);
  const setQrInstance = useQrInstanceStore((state) => state.setQrInstance);

  const {
    data,
    qrQuality,
    qrSize,
    dotType,
    colorMode,
    solidColor,
    gradientStart,
    gradientEnd,
    gradientRotation,
    cornerSquareType,
    cornerDotType,
    cornerColorMode,
    cornerSolidColor,
    cornerGradientStart,
    cornerGradientEnd,
    cornerGradientRotation,
    backgroundColor,
    logoDataUrl,
  } = useQrStore();

  useEffect(() => {
    const previewContainer = previewContainerRef.current;

    if (!previewContainer) {
      return;
    }

    let currentQr = qrInstance;

    if (!currentQr) {
      currentQr = new QRCodeStyling({
        width: qrSize,
        height: qrSize,
        type: 'svg',
        margin: 0,
      });
      setQrInstance(currentQr);
    }

    previewContainer.innerHTML = '';
    currentQr.append(previewContainer);

    return () => {
      previewContainer.innerHTML = '';
    };
  }, [qrInstance, qrSize, setQrInstance]);

  useEffect(() => {
    if (!qrInstance) {
      return;
    }

    qrInstance.update(
      buildQrOptions({
        data,
        qrQuality,
        qrSize,
        dotType,
        colorMode,
        solidColor,
        gradientStart,
        gradientEnd,
        gradientRotation,
        cornerSquareType,
        cornerDotType,
        cornerColorMode,
        cornerSolidColor,
        cornerGradientStart,
        cornerGradientEnd,
        cornerGradientRotation,
        backgroundColor,
        logoDataUrl,
      }),
    );
  }, [
    backgroundColor,
    colorMode,
    cornerColorMode,
    cornerDotType,
    cornerGradientEnd,
    cornerGradientRotation,
    cornerGradientStart,
    cornerSolidColor,
    cornerSquareType,
    data,
    dotType,
    gradientEnd,
    gradientRotation,
    gradientStart,
    logoDataUrl,
    qrQuality,
    qrSize,
    qrInstance,
    solidColor,
  ]);

  const canvasStyles = {
    '--qr-size': `${qrSize}px`,
  } as CSSProperties;

  return (
    <section className={styles.card}>
      <div className={styles.controlsPanel}>
        <div className={styles.header}>
          <QrCode size={16} />
          <h2>Previsualizacion</h2>
        </div>

        <QualityAndSize />
      </div>

      <div className={styles.stickyPreview}>
        <div className={styles.previewArea}>
          <div
            className={styles.qrCanvas}
            style={canvasStyles}
            ref={previewContainerRef}
            aria-label="Vista previa QR"
          />
        </div>
      </div>

    </section>
  );
}
