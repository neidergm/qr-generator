import { ImageUp } from 'lucide-react';
import { useRef, type ChangeEvent } from 'react';
import { useQrStore } from '@/store/useQrStore';
import styles from '@/components/SettingsPanel/SettingsPanel.module.scss';
import { SettingsSection } from '@/components/SettingsPanel/SettingsSection';


export function LogoSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const logoDataUrl = useQrStore((state) => state.logoDataUrl);
  const setLogoDataUrl = useQrStore((state) => state.setLogoDataUrl);

  const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file || !file.type.startsWith('image/')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setLogoDataUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <SettingsSection icon={ImageUp} title="Logo">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className={styles.fileInput}
        onChange={handleLogoUpload}
      />
      <button
        type="button"
        className={styles.uploadButton}
        onClick={() => fileInputRef.current?.click()}
      >
        Subir logo
      </button>

      {logoDataUrl && (
        <div className={styles.logoPreview}>
          <img src={logoDataUrl} alt="Logo seleccionado" />
          <button type="button" className={styles.removeButton} onClick={() => setLogoDataUrl(null)}>
            Quitar logo
          </button>
        </div>
      )}
    </SettingsSection>
  );
}
