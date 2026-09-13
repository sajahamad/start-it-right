import { createContext, useContext, useEffect, useState } from 'react';

const CompareContext = createContext(null);
const STORAGE_KEY = 'ibdahasah-compare';
const MAX_SELECTION = 3;

function readStoredSelection() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CompareProvider({ children }) {
  const [selectedIds, setSelectedIds] = useState(readStoredSelection);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedIds));
    } catch {
      // التخزين المحلي غير متاح (وضع خاص، أو الحصة ممتلئة) — نتجاهل بصمت
    }
  }, [selectedIds]);

  function toggleMajor(id) {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }
      if (current.length >= MAX_SELECTION) {
        return current;
      }
      return [...current, id];
    });
  }

  function clear() {
    setSelectedIds([]);
  }

  function setSelection(ids) {
    setSelectedIds([...new Set(ids)].slice(0, MAX_SELECTION));
  }

  return (
    <CompareContext.Provider
      value={{ selectedIds, toggleMajor, clear, setSelection, maxSelection: MAX_SELECTION }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare لازم يُستخدم جوا CompareProvider');
  }
  return context;
}
