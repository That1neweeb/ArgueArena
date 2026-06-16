import { useState, useCallback } from 'react';

export default function useToast() {
  const [toast, setToast] = useState({ msg: '', type: '', show: false });

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type, show: true });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 3600);
  }, []);

  return { toast, showToast };
}
