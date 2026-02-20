import { useCallback, useRef } from 'react';
import type QRCodeStyling from 'qr-code-styling';
import { Moon, Sun } from 'lucide-react';
import type { ExportFormat } from '@/types/qr';
import { ExportDropdown } from '@/components/ExportDropdown/ExportDropdown';
import { InputPanel } from '@/components/InputPanel/InputPanel';
import { QrPreview } from '@/components/QrPreview/QrPreview';
import { SettingsPanel } from '@/components/SettingsPanel/SettingsPanel';
import { useQrStore } from '@/store/useQrStore';
import styles from '@/App.module.scss';
import LOGO from '/logo-main.png';

function App() {
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const themeMode = useQrStore((state) => state.themeMode);
  const setThemeMode = useQrStore((state) => state.setThemeMode);

  const handleExport = useCallback(async (format: ExportFormat) => {
    if (!qrCodeRef.current) {
      return;
    }

    await qrCodeRef.current.download({
      name: `qr-code-${Date.now()}`,
      extension: format,
    });
  }, []);

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
              onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
              aria-label={`Cambiar a modo ${themeMode === 'light' ? 'oscuro' : 'claro'}`}
            >
              {themeMode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <ExportDropdown onExport={handleExport} />
          </div>
        </header>

        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <InputPanel />
            <QrPreview qrCodeRef={qrCodeRef} />
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
