import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext.jsx';

function CompareBar() {
  const { selectedIds, clear } = useCompare();

  if (selectedIds.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-30 flex justify-center px-4">
      <div className="flex w-full max-w-md items-center justify-between gap-4 rounded-xl bg-ink px-5 py-3.5 text-white shadow-lg">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold">
            {selectedIds.length}
          </span>
          <span className="text-sm font-bold">المقارنة النشطة</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={clear}
            aria-label="تفريغ الاختيار"
            className="text-sm text-white/70 hover:text-white"
          >
            تفريغ
          </button>
          <Link
            to="/compare"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-primary-hover"
          >
            افتح المقارنة
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CompareBar;
