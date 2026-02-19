import { Palette } from 'lucide-react';
import { useQrStore } from '@/store/useQrStore';
import styles from '@/components/SettingsPanel/SettingsPanel.module.scss';
import { SettingsSection } from '@/components/SettingsPanel/SettingsSection';

export function PatternColorSection() {
  const colorMode = useQrStore((state) => state.colorMode);
  const solidColor = useQrStore((state) => state.solidColor);
  const gradientStart = useQrStore((state) => state.gradientStart);
  const gradientEnd = useQrStore((state) => state.gradientEnd);
  const gradientRotation = useQrStore((state) => state.gradientRotation);
  const backgroundColor = useQrStore((state) => state.backgroundColor);

  const {
    setColorMode,
    setColor,
    setGradientRotation,
    setBackgroundColor,
  } = useQrStore();

  return (
    <SettingsSection icon={Palette} title="Color del patron">
      <div className={styles.segmented}>
        <button
          type="button"
          className={colorMode === 'solid' ? styles.segmentedActive : styles.segmentedButton}
          onClick={() => setColorMode('solid')}
        >
          Solido
        </button>
        <button
          type="button"
          className={colorMode === 'gradient' ? styles.segmentedActive : styles.segmentedButton}
          onClick={() => setColorMode('gradient')}
        >
          Gradiente
        </button>
      </div>

      <div className={colorMode === 'solid' ? styles.colorGroup : undefined}>
        {colorMode === 'solid' ? (
          <div>
            <label className={styles.label} htmlFor="solid-color">
              Color
            </label>
            <input
              id="solid-color"
              type="color"
              className={styles.colorInput}
              value={solidColor}
              onChange={(event) => setColor(event.target.value)}
            />
          </div>
        ) : (
          <>
            <div className={styles.colorGroup}>
              <div>
                <label className={styles.label} htmlFor="gradient-start">
                  Color inicial
                </label>
                <input
                  id="gradient-start"
                  type="color"
                  className={styles.colorInput}
                  value={gradientStart}
                  onChange={(event) => setColor(event.target.value, gradientEnd)}
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
                  value={gradientEnd}
                  onChange={(event) => setColor(gradientStart, event.target.value)}
                />
              </div>
            </div>

            <div>
              <label className={styles.label} htmlFor="gradient-rotation">
                Rotacion: {gradientRotation}deg
              </label>
              <input
                id="gradient-rotation"
                type="range"
                min={0}
                max={360}
                className={styles.rangeInput}
                value={gradientRotation}
                onChange={(event) => setGradientRotation(Number(event.target.value))}
              />
            </div>
          </>
        )}

        <div>
          <label className={styles.label} htmlFor="background-color">
            Fondo
          </label>
          <input
            id="background-color"
            type="color"
            className={styles.colorInput}
            value={backgroundColor}
            onChange={(event) => setBackgroundColor(event.target.value)}
          />
        </div>
      </div>
    </SettingsSection>
  );
}
