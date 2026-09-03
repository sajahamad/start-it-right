import { Link } from 'react-router-dom';
import { gpaSummary } from '../utils/majors.js';

function MajorCard({ major }) {
  const { min, max } = gpaSummary(major);

  return (
    <Link
      to={`/majors/${major.id}`}
      className="flex flex-col gap-3.5 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div>
        <span className="inline-flex rounded-full border border-stone-200 bg-amber-50 px-3 py-1 text-xs font-bold text-blue-900">
          {major.track.join(' / ')}
        </span>
        <h3 className="mt-2.5 mb-1 text-xl font-bold text-blue-950">{major.name}</h3>
        <p className="m-0 text-sm text-stone-600">{major.faculty}</p>
      </div>

      <dl className="grid grid-cols-2 gap-3 border-t border-stone-200 pt-3.5">
        <div>
          <dt className="mb-1 text-xs text-stone-500">مدة الدراسة</dt>
          <dd className="m-0 text-[15px] font-bold text-blue-950">{major.duration}</dd>
        </div>
        <div>
          <dt className="mb-1 text-xs text-stone-500">معدل القبول التقريبي</dt>
          <dd className="m-0 text-right text-[15px] font-bold text-blue-950" dir="ltr">
            {min === max ? `${min}%` : `${min}% - ${max}%`}
          </dd>
        </div>
      </dl>
    </Link>
  );
}

export default MajorCard;
