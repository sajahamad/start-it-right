import { Check, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader.jsx';
import { useCompare } from '../context/CompareContext.jsx';
import majors from '../data/majors.json';
import {
  durationYears,
  filterMajors,
  getFeeRange,
  getMajorById,
  getMajorUniversities,
  gpaSummary,
} from '../utils/majors.js';

const SUGGESTION_COUNT = 6;

function CompareRow({ label, rowMajors, render }) {
  return (
    <tr>
      <th className="min-w-35 whitespace-nowrap border-b border-border bg-surface px-4.5 py-4 text-right align-top text-sm text-ink">
        {label}
      </th>
      {rowMajors.map((major) => (
        <td key={major.id} className="min-w-45 border-b border-border px-4.5 py-4 text-right align-top">
          {render(major)}
        </td>
      ))}
    </tr>
  );
}

function Compare() {
  const { selectedIds, toggleMajor, clear, setSelection, maxSelection } = useCompare();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [copyStatus, setCopyStatus] = useState('idle');

  // استيراد المقارنة من رابط مشارك (?ids=a,b,c) مرة وحدة لما تفتح الصفحة
  useEffect(() => {
    const idsParam = searchParams.get('ids');
    if (!idsParam) return;
    const idsFromUrl = idsParam.split(',').filter((id) => getMajorById(majors, id));
    if (idsFromUrl.length > 0) setSelection(idsFromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- قراءة لمرة وحدة عند فتح الصفحة بس
  }, []);

  // خلي رابط الصفحة يعكس المقارنة الحالية دايماً عشان زر "مشاركة" ينسخ رابط صحيح
  useEffect(() => {
    if (selectedIds.length === 0) {
      if (searchParams.has('ids')) setSearchParams({}, { replace: true });
      return;
    }
    setSearchParams({ ids: selectedIds.join(',') }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds]);

  const selectedMajors = selectedIds.map((id) => getMajorById(majors, id)).filter(Boolean);
  const isFull = selectedIds.length >= maxSelection;

  const suggestions = useMemo(() => {
    const pool = query.trim() ? filterMajors(majors, { search: query }) : majors;
    return pool.filter((major) => !selectedIds.includes(major.id)).slice(0, SUGGESTION_COUNT);
  }, [query, selectedIds]);

  const bestGpaId =
    selectedMajors.length > 1
      ? selectedMajors.reduce((best, m) => (gpaSummary(m).min > gpaSummary(best).min ? m : best)).id
      : null;
  const shortestDurationId =
    selectedMajors.length > 1
      ? selectedMajors.reduce((best, m) => (durationYears(m) < durationYears(best) ? m : best)).id
      : null;
  const feeEntries = selectedMajors
    .map((m) => ({ id: m.id, range: getFeeRange(m) }))
    .filter((entry) => entry.range);
  const cheapestFeeId =
    feeEntries.length > 1
      ? feeEntries.reduce((best, entry) => (entry.range.min < best.range.min ? entry : best)).id
      : null;

  const summaryLines = [];
  if (bestGpaId) {
    const major = getMajorById(majors, bestGpaId);
    summaryLines.push(`أعلى معدل قبول مطلوب بين المقارنة: ${major.name} (${gpaSummary(major).min}%).`);
  }
  if (shortestDurationId) {
    const major = getMajorById(majors, shortestDurationId);
    summaryLines.push(`أقصر مدة دراسة: ${major.name} (${major.duration}).`);
  }
  if (cheapestFeeId) {
    const major = getMajorById(majors, cheapestFeeId);
    summaryLines.push(`أقل رسوم ساعة معلنة: ${major.name} (${getFeeRange(major).min} دينار).`);
  }

  function handleShare() {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopyStatus('copied');
        setTimeout(() => setCopyStatus('idle'), 2000);
      })
      .catch(() => setCopyStatus('error'));
  }

  return (
    <section className="px-6 py-16">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader
          eyebrow="قارن بين تخصصات"
          title={`اختار لغاية ${maxSelection} تخصصات وشوفهم جنب بعض`}
          description="بيساعدك تقرر أسرع لما تشوف الفروقات الأساسية بجدول واحد."
        />

        {selectedMajors.length > 0 && (
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {selectedMajors.map((major) => {
              const { min, max } = gpaSummary(major);
              return (
                <div key={major.id} className="relative rounded-2xl border border-border bg-white p-5 shadow-sm">
                  <button
                    type="button"
                    onClick={() => toggleMajor(major.id)}
                    aria-label={`إزالة ${major.name} من المقارنة`}
                    className="absolute left-4 top-4 flex h-6 w-6 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-ink"
                  >
                    <X className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  </button>
                  <span className="inline-flex rounded-full border border-border bg-surface px-3 py-1 text-xs font-bold text-ink">
                    {major.track.join(' / ')}
                  </span>
                  <h3 className="mt-2.5 mb-1 pl-8 text-lg font-bold text-ink">{major.name}</h3>
                  <p className="m-0 text-sm text-muted">{major.faculty}</p>
                  <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm">
                    <span className="text-muted">{major.duration}</span>
                    <span className="font-bold text-primary" dir="ltr">
                      {min === max ? `${min}%` : `${min}% - ${max}%`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mb-10 rounded-2xl border border-border bg-white p-5 print:hidden">
          <label htmlFor="compare-add" className="mb-2 block text-sm font-bold text-ink">
            {isFull
              ? `توصلت للحد الأقصى (${maxSelection} تخصصات) — احذفي وحدة عشان تضيفي غيرها`
              : 'أضف تخصص للمقارنة'}
          </label>
          <input
            id="compare-add"
            type="search"
            disabled={isFull}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="دور باسم التخصص أو الكلية..."
            className="w-full rounded-lg border border-border px-4 py-2.5 text-ink outline-none focus:border-primary disabled:bg-surface disabled:text-muted"
          />
          {!isFull && suggestions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestions.map((major) => (
                <button
                  key={major.id}
                  type="button"
                  onClick={() => {
                    toggleMajor(major.id);
                    setQuery('');
                  }}
                  className="rounded-full border border-border bg-white px-3.5 py-1.5 text-sm text-ink transition hover:border-primary"
                >
                  + {major.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedMajors.length === 0 ? (
          <div className="py-10 text-center">
            <p className="mb-4 text-muted">اختار تخصص أو أكتر من فوق عشان تبدأ المقارنة.</p>
            <Link to="/majors" className="font-bold text-primary hover:underline">
              تصفح التخصصات لاختيار ما تريد مقارنته ←
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-160 border-collapse rounded-2xl border border-border bg-white">
                <tbody>
                  <CompareRow
                    label="التخصص"
                    rowMajors={selectedMajors}
                    render={(major) => (
                      <Link to={`/majors/${major.id}`} className="font-bold text-primary hover:underline">
                        {major.name}
                      </Link>
                    )}
                  />
                  <CompareRow label="الفرع" rowMajors={selectedMajors} render={(major) => major.track.join(' / ')} />
                  <CompareRow
                    label="مدة الدراسة"
                    rowMajors={selectedMajors}
                    render={(major) => (
                      <span className={major.id === shortestDurationId ? 'font-bold text-primary' : ''}>
                        {major.duration}
                      </span>
                    )}
                  />
                  <CompareRow
                    label="معدل القبول التقريبي"
                    rowMajors={selectedMajors}
                    render={(major) => {
                      const { min, max } = gpaSummary(major);
                      return (
                        <span dir="ltr" className={major.id === bestGpaId ? 'font-bold text-primary' : ''}>
                          {min === max ? `${min}%` : `${min}% - ${max}%`}
                        </span>
                      );
                    }}
                  />
                  <CompareRow
                    label="أبرز الجامعات التي تطرحه"
                    rowMajors={selectedMajors}
                    render={(major) => (
                      <ul className="flex flex-col gap-1 text-sm">
                        {getMajorUniversities(major).map((university) => (
                          <li key={university}>{university}</li>
                        ))}
                      </ul>
                    )}
                  />
                  <CompareRow
                    label="رسوم الساعة الدراسية"
                    rowMajors={selectedMajors}
                    render={(major) => {
                      const range = getFeeRange(major);
                      if (!range) return <span className="text-muted">غير متوفر</span>;
                      return (
                        <span dir="ltr" className={major.id === cheapestFeeId ? 'font-bold text-primary' : ''}>
                          {range.min === range.max ? `${range.min} دينار` : `${range.min} - ${range.max} دينار`}
                        </span>
                      );
                    }}
                  />
                  <CompareRow
                    label="أبرز المسميات ومجالات العمل"
                    rowMajors={selectedMajors}
                    render={(major) => (
                      <ul className="flex flex-col gap-1.5 text-sm">
                        {major.careers.map((career) => (
                          <li key={career}>{career}</li>
                        ))}
                      </ul>
                    )}
                  />
                </tbody>
              </table>
            </div>

            {summaryLines.length > 0 && (
              <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
                <h3 className="mb-2 text-sm font-bold text-ink">ملخص المقارنة</h3>
                <ul className="flex flex-col gap-1 text-sm text-muted">
                  {summaryLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <p className="m-0 mt-2 text-xs text-muted">مبني على الأرقام المعروضة فوق بس، مش توصية شخصية.</p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-end gap-3 rounded-2xl border border-border bg-white p-5 print:hidden">
              <button type="button" onClick={clear} className="text-sm text-muted hover:text-ink">
                إعادة ضبط الخيارات
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-primary"
              >
                {copyStatus === 'copied' ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
                    تم نسخ الرابط
                  </>
                ) : (
                  'مشاركة رابط المقارنة'
                )}
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary-hover"
              >
                تحميل المقارنة PDF
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Compare;
