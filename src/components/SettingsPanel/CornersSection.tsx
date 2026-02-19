import { ScanQrCode } from 'lucide-react';
import { useQrStore } from '@/store/useQrStore';
import { cornerDotPatternOptions, cornerSquarePatternOptions } from '@/utils/qrOptions';
import styles from './SettingsPanel.module.scss';
import { SettingsSection } from './SettingsSection';

export function CornersSection() {

  const cornerSquareType = useQrStore((state) => state.cornerSquareType);
  const cornerDotType = useQrStore((state) => state.cornerDotType);

  const setCornerSquareType = useQrStore((state) => state.setCornerSquareType);
  const setCornerDotType = useQrStore((state) => state.setCornerDotType);

  return (
    <SettingsSection icon={ScanQrCode} title="Esquinas">
      <label className={styles.label} htmlFor="corner-square-type">
        Tipo de esquina externa
      </label>
      <select
        id="corner-square-type"
        className={styles.select}
        value={cornerSquareType}
        onChange={(event) => setCornerSquareType(event.target.value as typeof cornerSquareType)}
      >
        {cornerSquarePatternOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label className={styles.label} htmlFor="corner-dot-type">
        Tipo de esquina interna
      </label>
      <select
        id="corner-dot-type"
        className={styles.select}
        value={cornerDotType}
        onChange={(event) => setCornerDotType(event.target.value as typeof cornerDotType)}
      >
        {cornerDotPatternOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </SettingsSection>
  );
}
