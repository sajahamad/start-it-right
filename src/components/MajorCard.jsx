import { Check, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext.jsx';
import { gpaSummary } from '../utils/majors.js';

function MajorCard({ major, showCompareToggle = false }) {
  const { min, max } = gpaSummary(major);
  const { selectedIds, toggleMajor, maxSelection } = useCompare();
  const isSelected = selectedIds.includes(major.id);
  const isDisabled = !isSelected && selectedIds.length >= maxSelection;

  return (
    <div className="relative flex h-full flex-col gap-3.5 rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/majors/${major.id}`} className="absolute inset-0 z-0" aria-label={major.name} />

      <div className="pointer-events-none relative z-1">
        <span className="inline-flex rounded-full border border-border bg-surface px-3 py-1 text-xs font-bold text-ink">
          {major.track.join(' / ')}
        </span>
        <h3 className="mt-2.5 mb-1 text-xl font-bold text-ink">{major.name}</h3>
        <p className="m-0 text-sm text-muted">{major.faculty}</p>
      </div>

      <dl className="pointer-events-none relative z-1 grid grid-cols-2 gap-3 border-t border-border pt-3.5">
        <div>
          <dt className="mb-1 text-xs text-muted">مدة الدراسة</dt>
          <dd className="m-0 text-[15px] font-bold text-ink">{major.duration}</dd>
        </div>
        <div>
          <dt className="mb-1 text-xs text-muted">معدل القبول التقريبي</dt>
          <dd className="m-0 text-right text-[15px] font-bold text-ink" dir="ltr">
            {min === max ? `${min}%` : `${min}% - ${max}%`}
          </dd>
        </div>
      </dl>

      {showCompareToggle && (
        <button
          type="button"
          disabled={isDisabled}
          onClick={(event) => {
            event.preventDefault();
            toggleMajor(major.id);
          }}
          className={`relative z-1 flex items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${
            isSelected
              ? 'border-primary bg-primary text-white'
              : 'border-border bg-white text-ink hover:border-primary'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              تم الاختيار
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              قارن
            </>
          )}
        </button>
      )}
    </div>
  );
}

export default MajorCard;
