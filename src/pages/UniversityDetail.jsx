import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/Button.jsx';
import CompareBar from '../components/CompareBar.jsx';
import MajorCard from '../components/MajorCard.jsx';
import Reveal from '../components/Reveal.jsx';
import majors from '../data/majors.json';
import { filterMajors } from '../utils/majors.js';
import { getMajorsForUniversity, getUniversityById } from '../utils/universities.js';

function UniversityDetail() {
  const { universityId } = useParams();
  const [search, setSearch] = useState('');

  const university = getUniversityById(majors, universityId);
  const universityMajors = useMemo(
    () => (university ? getMajorsForUniversity(majors, universityId) : []),
    [university, universityId],
  );
  const filtered = useMemo(
    () => filterMajors(universityMajors, { search }),
    [universityMajors, search],
  );

  if (!university) {
    return (
      <section className="px-6 py-16">
        <div className="mx-auto w-full max-w-6xl py-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-ink">ما لقينا هاي الجامعة</h2>
          <p className="mb-6 text-muted">يمكن الرابط غلط.</p>
          <Button to="/universities">ارجع لكل الجامعات</Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-surface px-6 py-12">
        <div className="mx-auto w-full max-w-6xl">
          <Link to="/universities" className="mb-4 inline-block text-sm text-muted hover:text-ink">
            ← كل الجامعات
          </Link>
          <h1 className="mb-4 text-3xl font-extrabold text-ink md:text-4xl">{university.name}</h1>

          <Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:max-w-md">
              <div className="rounded-2xl border border-border bg-white p-5">
                <p className="mb-1 text-xs text-muted">عدد التخصصات المتوفرة</p>
                <p className="m-0 text-xl font-bold text-ink">{university.majorsCount}</p>
              </div>
              <div className="rounded-2xl border border-border bg-white p-5">
                <p className="mb-1 text-xs text-muted">مدى معدل القبول</p>
                <p className="m-0 text-xl font-bold text-ink" dir="ltr">
                  {university.gpaRange.min === university.gpaRange.max
                    ? `${university.gpaRange.min}%`
                    : `${university.gpaRange.min}% - ${university.gpaRange.max}%`}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8">
            <input
              type="search"
              placeholder="دور باسم التخصص أو الكلية بهاي الجامعة..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full max-w-md rounded-lg border border-border bg-white px-4.5 py-3 text-ink outline-none focus:border-primary"
            />
          </div>

          {universityMajors.length === 0 ? (
            <p className="py-10 text-center text-muted">لا توجد تخصصات مضافة لهذه الجامعة بعد.</p>
          ) : filtered.length === 0 ? (
            <div className="py-10 text-center">
              <p className="mb-4 text-muted">ما في تخصصات مطابقة لبحثك، جرب كلمة تانية.</p>
              <button
                type="button"
                onClick={() => setSearch('')}
                className="rounded-lg border border-border bg-white px-5 py-2.5 font-semibold text-ink hover:border-primary"
              >
                إعادة تعيين البحث
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

      <div className="px-6 pb-16 text-center">
        <Link to="/universities" className="font-bold text-primary hover:underline">
          عرض جميع الجامعات ←
        </Link>
      </div>

      <CompareBar />
    </>
  );
}

export default UniversityDetail;
