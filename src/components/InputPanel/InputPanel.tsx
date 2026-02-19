import { Link2 } from 'lucide-react';
import { useQrStore } from '@/store/useQrStore';
import styles from '@/components/InputPanel/InputPanel.module.scss';

export function InputPanel() {
  const data = useQrStore((state) => state.data);
  const setData = useQrStore((state) => state.setData);

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <Link2 size={16} />
        <h2>Contenido</h2>
      </div>
      <textarea
        className={styles.textarea}
        value={data}
        onChange={(event) => setData(event.target.value)}
        placeholder="Escribe texto o pega una URL"
        rows={2}
      />
    </section>
  );
}
