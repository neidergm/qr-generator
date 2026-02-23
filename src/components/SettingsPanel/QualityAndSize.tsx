import styles from '@/components/SettingsPanel/SettingsPanel.module.scss';
import { useQrStore } from '@/store/useQrStore';
import type { ErrorCorrectionLevel } from 'qr-code-styling';

const QUALITY_OPTIONS: Array<{ value: ErrorCorrectionLevel; label: string }> = [
    { value: 'L', label: 'Baja (L)' },
    { value: 'M', label: 'Media (M)' },
    { value: 'Q', label: 'Alta (Q)' },
    { value: 'H', label: 'Muy alta (H)' },
];

const QualityAndSize = () => {

    const qrQuality = useQrStore((state) => state.qrQuality);
    const qrSize = useQrStore((state) => state.qrSize);
    const setQrQuality = useQrStore((state) => state.setQrQuality)
    const setQrSize = useQrStore((state) => state.setQrSize);

    return (
        <div className={styles.qrMetaControls}>
            <div className={styles.metaField}>
                <label className={styles.label} htmlFor="qr-quality">
                    Calidad QR
                </label>
                <select
                    id="qr-quality"
                    className={styles.select}
                    value={qrQuality}
                    onChange={(event) => setQrQuality(event.target.value as ErrorCorrectionLevel)}
                >
                    {QUALITY_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.metaField}>
                <label className={styles.label} htmlFor="qr-size">
                    Tamaño ({qrSize}px)
                </label>
                <input
                    id="qr-size"
                    type="range"
                    min={180}
                    max={640}
                    step={10}
                    className={styles.rangeInput}
                    value={qrSize}
                    onChange={(event) => setQrSize(Number(event.target.value))}
                />
            </div>
        </div>
    )
}

export default QualityAndSize