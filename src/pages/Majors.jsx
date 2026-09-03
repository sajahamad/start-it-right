import { useMemo, useState } from 'react';
import MajorCard from '../components/MajorCard.jsx';
import majors from '../data/majors.json';
import { filterMajors, getTracks } from '../utils/majors.js';

function Majors() {
  const [search, setSearch] = useState('');
  const [track, setTrack] = useState('');

  const tracks = useMemo(() => getTracks(majors), []);
  const filtered = useMemo(
    () => filterMajors(majors, { search, track }),
    [search, track],
  );

  return (
    <section className="px-6 py-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <span className="mb-4 inline-block rounded-full bg-amber-100 px-3.5 py-1.5 text-sm font-bold text-amber-700">
            التخصصات
          </span>
          <h2 className="mb-3 text-3xl font-bold text-blue-950">دور على تخصصك الجامعي</h2>
          <p className="text-[17px] text-stone-600">
            ابحث بالاسم أو فلتر حسب الفرع عشان توصل للتخصص المناسب إلك.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <input
            type="search"
            placeholder="دور باسم التخصص أو الكلية..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="min-w-70 flex-1 rounded-lg border border-stone-200 bg-white px-4.5 py-3 text-blue-950 outline-none focus:border-amber-400"
          />

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setTrack('')}
              className={`rounded-full border px-4.5 py-2 font-semibold transition ${
                track === ''
                  ? 'border-blue-950 bg-blue-950 text-white'
                  : 'border-stone-200 bg-white text-stone-600 hover:border-amber-400'
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
                    ? 'border-blue-950 bg-blue-950 text-white'
                    : 'border-stone-200 bg-white text-stone-600 hover:border-amber-400'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="py-10 text-center text-stone-500">
            ما في تخصصات مطابقة لبحثك، جرب كلمة تانية.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((major) => (
              <MajorCard key={major.id} major={major} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Majors;
