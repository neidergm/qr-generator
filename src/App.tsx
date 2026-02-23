import { Moon, Sun } from 'lucide-react';
import { ExportDropdown } from '@/components/ExportDropdown/ExportDropdown';
import { InputPanel } from '@/components/InputPanel/InputPanel';
import { QrPreview } from '@/components/QrPreview/QrPreview';
import { SettingsPanel } from '@/components/SettingsPanel/SettingsPanel';
import styles from '@/App.module.scss';
import LOGO from '/logo-main.png';
import useTheme from './store/useTheme';

function App() {
  const themeMode = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);

  return (
    <main className={styles.appShell} data-theme={themeMode}>
      <section className={styles.appCard}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <div>
            <img height={50} className={styles.logo} src={LOGO} alt="QR Studio Logo" loading='lazy' />
            </div>
            <div>
              <h1>QR Studio</h1>
              <p>Generador de codigos QR moderno y personalizable</p>
            </div>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.themeToggle}
              onClick={() => toggleTheme()}
              aria-label={`Cambiar a modo ${themeMode === 'light' ? 'oscuro' : 'claro'}`}
            >
              {themeMode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <ExportDropdown />
          </div>
        </header>

        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <InputPanel />
            <QrPreview />
          </div>
          <SettingsPanel />
        </div>
      </section>
      <footer className={styles.footer}>
        <p>Made with ❤️ by NeiderG</p>
      </footer>
    </main>
  );
}

export default App;
