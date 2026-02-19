import { CornersSection } from '@/components/SettingsPanel/CornersSection';
import { LogoSection } from '@/components/SettingsPanel/LogoSection';
import { PatternColorSection } from '@/components/SettingsPanel/PatternColorSection';
import { PatternSection } from '@/components/SettingsPanel/PatternSection';
import styles from '@/components/SettingsPanel/SettingsPanel.module.scss';
import { CornersColorSection } from './CornersColorSection';

export function SettingsPanel() {
  return (
    <aside className={styles.panel}>
      <PatternSection />
      <PatternColorSection />
      <CornersSection />
      <CornersColorSection />
      <LogoSection />
    </aside>
  );
}
