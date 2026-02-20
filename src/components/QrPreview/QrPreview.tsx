import { useEffect, useRef, type CSSProperties, type RefObject } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { QrCode } from 'lucide-react';
import { useQrStore } from '@/store/useQrStore';
import { buildQrOptions } from '@/utils/qrOptions';
import styles from '@/components/QrPreview/QrPreview.module.scss';
import QualityAndSize from '../SettingsPanel/QualityAndSize';

interface QrPreviewProps {
  qrCodeRef: RefObject<QRCodeStyling | null>;
}

export function QrPreview({ qrCodeRef }: QrPreviewProps) {
  const previewContainerRef = useRef<HTMLDivElement>(null);

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
    if (!previewContainerRef.current) {
      return;
    }

    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling({
        width: qrSize,
        height: qrSize,
        type: 'svg',
        margin: 0,
      });
    }

    previewContainerRef.current.innerHTML = '';
    qrCodeRef.current.append(previewContainerRef.current);

    return () => {
      if (previewContainerRef.current) {
        previewContainerRef.current.innerHTML = '';
      }
    };
  }, [qrCodeRef, qrSize]);

  useEffect(() => {
    if (!qrCodeRef.current) {
      return;
    }

    qrCodeRef.current.update(
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
    qrCodeRef,
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
