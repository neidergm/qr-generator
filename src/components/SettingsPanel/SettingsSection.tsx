import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import styles from './SettingsPanel.module.scss';

interface SettingsSectionProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}

export function SettingsSection({ icon: Icon, title, children }: SettingsSectionProps) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>
        <Icon size={16} />
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
}
