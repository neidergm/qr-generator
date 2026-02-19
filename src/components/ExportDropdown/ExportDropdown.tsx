import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Download } from 'lucide-react';
import type { ExportFormat } from '@/types/qr';
import styles from '@/components/ExportDropdown/ExportDropdown.module.scss';

interface ExportDropdownProps {
  onExport: (format: ExportFormat) => Promise<void>;
}

const EXPORT_FORMATS: Array<{ value: ExportFormat; label: string }> = [
  { value: 'svg', label: 'SVG' },
  { value: 'png', label: 'PNG' },
  { value: 'jpeg', label: 'JPG' },
];

export function ExportDropdown({ onExport }: ExportDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) {
        return;
      }

      if (event.target instanceof Node && !rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExportClick = async (format: ExportFormat) => {
    setIsOpen(false);
    setIsExporting(true);
    try {
      await onExport(format);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((current) => !current)}
        disabled={isExporting}
      >
        <Download size={16} />
        <span>{isExporting ? 'Exportando...' : 'Exportar'}</span>
        <ChevronDown size={16} className={isOpen ? styles.chevronOpen : ''} />
      </button>

      {isOpen && (
        <div className={styles.menu}>
          {EXPORT_FORMATS.map((format) => (
            <button
              key={format.value}
              type="button"
              className={styles.option}
              onClick={() => {
                void handleExportClick(format.value);
              }}
            >
              {format.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
