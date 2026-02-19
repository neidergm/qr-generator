import { Palette } from 'lucide-react';
import { useQrStore } from '@/store/useQrStore';
import styles from '@/components/SettingsPanel/SettingsPanel.module.scss';
import { SettingsSection } from '@/components/SettingsPanel/SettingsSection';

export function CornersColorSection() {

  const {
    cornerColorMode,
    cornerSolidColor,
    cornerGradientStart,
    cornerGradientEnd,
    cornerGradientRotation
  } = useQrStore()


  const {
    setColorMode,
    setCornersColor,
    setCornerGradientRotation,
  } = useQrStore();

  return (
    <SettingsSection icon={Palette} title="Color de las esquinas">
      <div className={styles.segmented}>
        <button
          type="button"
          className={cornerColorMode === 'solid' ? styles.segmentedActive : styles.segmentedButton}
          onClick={() => setColorMode('solid', 'corner')}
        >
          Solido
        </button>
        <button
          type="button"
          className={cornerColorMode === 'gradient' ? styles.segmentedActive : styles.segmentedButton}
          onClick={() => setColorMode('gradient', 'corner')}
        >
          Gradiente
        </button>
      </div>

      {cornerColorMode === 'solid' ? (
        <>
          <label className={styles.label} htmlFor="solid-color">
            Color
          </label>
          <input
            id="solid-color"
            type="color"
            className={styles.colorInput}
            value={cornerSolidColor}
            onChange={(event) => setCornersColor(event.target.value)}
          />
        </>
      ) : (<>
        <div className={styles.colorGroup}>
          <div>
            <label className={styles.label} htmlFor="gradient-start">
              Color inicial
            </label>
            <input
              id="gradient-start"
              type="color"
              className={styles.colorInput}
              value={cornerGradientStart}
              onChange={(event) => setCornersColor(event.target.value, cornerGradientEnd)}
            />
          </div>

          <div>
            <label className={styles.label} htmlFor="gradient-end">
              Color final
            </label>
            <input
              id="gradient-end"
              type="color"
              className={styles.colorInput}
              value={cornerGradientEnd}
              onChange={(event) => setCornersColor(cornerGradientStart, event.target.value)}
            />
          </div>
        </div>
        
        <label className={styles.label} htmlFor="gradient-rotation">
          Rotacion: {cornerGradientRotation}deg
        </label>
        <input
          id="gradient-rotation"
          type="range"
          min={0}
          max={360}
          className={styles.rangeInput}
          value={cornerGradientRotation}
          onChange={(event) => setCornerGradientRotation(Number(event.target.value))}
        />
      </>
      )}
    </SettingsSection>
  );
}
