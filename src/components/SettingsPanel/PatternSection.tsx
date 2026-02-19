import { Sparkles } from 'lucide-react';
import { useQrStore } from '@/store/useQrStore';
import { dotPatternOptions } from '@/utils/qrOptions';
import styles from '@/components/SettingsPanel/SettingsPanel.module.scss';
import { SettingsSection } from '@/components/SettingsPanel/SettingsSection';

export function PatternSection() {
  const dotType = useQrStore((state) => state.dotType);
  const setDotType = useQrStore((state) => state.setDotType);

  return (
    <SettingsSection icon={Sparkles} title="Patron">
      <label className={styles.label} htmlFor="pattern-type">
        Tipo de patron
      </label>
      <select
        id="pattern-type"
        className={styles.select}
        value={dotType}
        onChange={(event) => setDotType(event.target.value as typeof dotType)}
      >
        {dotPatternOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </SettingsSection>
  );
}
