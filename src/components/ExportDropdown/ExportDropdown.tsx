import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ChevronDown, Download } from 'lucide-react';
import type { ExportFormat } from '@/types/qr';
import styles from '@/components/ExportDropdown/ExportDropdown.module.scss';
import { useQrInstanceStore } from '@/store/useQrInstanceStore';

const EXPORT_FORMATS: Array<{ value: ExportFormat; label: string }> = [
  { value: 'svg', label: 'SVG' },
  { value: 'png', label: 'PNG' },
  { value: 'jpeg', label: 'JPG' },
];

export function ExportDropdown() {
  const onExport = useQrInstanceStore((state) => state.exportQr);
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const pendingFocusIndexRef = useRef(0);
  const menuId = useId();

  const focusOption = (index: number) => {
    optionRefs.current[index]?.focus();
  };

  const openMenu = (focusIndex = 0) => {
    pendingFocusIndexRef.current = focusIndex;
    setIsOpen(true);
  };

  const closeMenu = (focusTrigger = false) => {
    setIsOpen(false);
    pendingFocusIndexRef.current = 0;

    if (focusTrigger) {
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
  };

  const handleTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (isExporting) {
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openMenu(0);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      openMenu(EXPORT_FORMATS.length - 1);
    }
  };

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const currentIndex = optionRefs.current.findIndex((item) => item === document.activeElement);

    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu(true);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % EXPORT_FORMATS.length;
      focusOption(nextIndex);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const nextIndex = currentIndex < 0
        ? EXPORT_FORMATS.length - 1
        : (currentIndex - 1 + EXPORT_FORMATS.length) % EXPORT_FORMATS.length;
      focusOption(nextIndex);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      focusOption(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      focusOption(EXPORT_FORMATS.length - 1);
      return;
    }

    if (event.key === 'Tab') {
      closeMenu();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) {
        return;
      }

      if (event.target instanceof Node && !rootRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const focusIndex = Math.min(pendingFocusIndexRef.current, EXPORT_FORMATS.length - 1);
    requestAnimationFrame(() => focusOption(focusIndex));
  }, [isOpen]);

  const handleExportClick = async (format: ExportFormat) => {
    closeMenu();
    setIsExporting(true);

    try {
      await onExport(format);
    } finally {
      setIsExporting(false);
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        onKeyDown={handleTriggerKeyDown}
        disabled={isExporting}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isExporting ? 'Exportando codigo QR' : 'Exportar codigo QR'}
      >
        <Download size={16} />
        <span>{isExporting ? 'Exportando...' : 'Exportar'}</span>
        <ChevronDown size={16} className={isOpen ? styles.chevronOpen : ''} />
      </button>

      {isOpen && (
        <div
          id={menuId}
          className={styles.menu}
          role="menu"
          aria-label="Formatos de exportacion"
          onKeyDown={handleMenuKeyDown}
        >
          {EXPORT_FORMATS.map((format, index) => (
            <button
              key={format.value}
              type="button"
              className={styles.option}
              role="menuitem"
              ref={(item) => {
                optionRefs.current[index] = item;
              }}
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
