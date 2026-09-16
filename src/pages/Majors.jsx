import { useMemo, useState } from 'react';
import CompareBar from '../components/CompareBar.jsx';
import MajorCard from '../components/MajorCard.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import majors from '../data/majors.json';
import { filterMajors, getTracks, sortMajors } from '../utils/majors.js';

const SORT_OPTIONS = [
  { value: 'gpa-desc', label: 'حسب معدل القبول (الأعلى أولاً)' },
  { value: 'gpa-asc', label: 'حسب معدل القبول (الأقل أولاً)' },
  { value: 'alpha', label: 'أبجدي (أ - ي)' },
  { value: 'duration', label: 'مدة الدراسة (الأقصر أولاً)' },
];

function Majors() {
  const [search, setSearch] = useState('');
  const [track, setTrack] = useState('');
  const [sortKey, setSortKey] = useState('gpa-desc');

  const tracks = useMemo(() => getTracks(majors), []);
  const filtered = useMemo(() => {
    const matched = filterMajors(majors, { search, track });
    return sortMajors(matched, sortKey);
  }, [search, track, sortKey]);

  function resetFilters() {
    setSearch('');
    setTrack('');
  }

  return (
    <>
      <section className="px-6 py-16">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <SectionHeader
              eyebrow="التخصصات"
              title="دور على تخصصك الجامعي"
              description="ابحث بالاسم أو فلتر حسب الفرع عشان توصل للتخصص المناسب إلك."
            />
          </Reveal>

          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <select
              value={sortKey}
              onChange={(event) => setSortKey(event.target.value)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-primary sm:w-auto"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  ترتيب النتائج: {option.label}
                </option>
              ))}
            </select>

            <input
              type="search"
              placeholder="دور باسم التخصص أو الكلية..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-lg border border-border bg-white px-4.5 py-3 text-ink outline-none focus:border-primary sm:min-w-70 sm:flex-1"
            />
          </div>

          <div className="mb-4 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setTrack('')}
              className={`rounded-full border px-4.5 py-2 font-semibold transition ${
                track === ''
                  ? 'border-primary bg-primary text-white'
                  : 'border-border bg-white text-ink hover:border-primary'
              }`}
            >
              الكل
            </button>
            {tracks.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTrack(item)}
                className={`rounded-full border px-4.5 py-2 font-semibold transition ${
                  track === item
                    ? 'border-primary bg-primary text-white'
                    : 'border-border bg-white text-ink hover:border-primary'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <p className="mb-8 text-sm text-muted">المعروض: {filtered.length} تخصصات</p>

          {filtered.length === 0 ? (
            <div className="py-10 text-center">
              <p className="mb-4 text-muted">ما في تخصصات مطابقة لبحثك، جرب كلمة أو فلاتر مختلفة.</p>
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-lg border border-border bg-white px-5 py-2.5 font-semibold text-ink hover:border-primary"
              >
                إعادة تعيين الفلاتر
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((major, index) => (
                <Reveal key={major.id} delay={Math.min(index * 60, 300)} className="h-full">
                  <MajorCard major={major} showCompareToggle />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CompareBar />
    </>
  );
}

export default Majors;
