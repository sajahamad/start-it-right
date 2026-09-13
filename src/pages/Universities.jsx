import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import majors from '../data/majors.json';
import { getUniversities } from '../utils/universities.js';

function Universities() {
  const universities = getUniversities(majors);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="الجامعات"
            title="الجامعات الشريكة"
            description="تصفح الجامعات وشوف كل التخصصات المتوفرة فيها ومعدلات القبول."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {universities.map((university, index) => (
            <Reveal key={university.id} delay={index * 80} className="h-full">
              <Link
                to={`/universities/${university.id}`}
                className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-lg font-bold text-ink">{university.name}</h3>
                <dl className="grid grid-cols-2 gap-3 border-t border-border pt-3.5">
                  <div>
                    <dt className="mb-1 text-xs text-muted">عدد التخصصات</dt>
                    <dd className="m-0 text-[15px] font-bold text-ink">{university.majorsCount}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-xs text-muted">مدى معدل القبول</dt>
                    <dd className="m-0 text-right text-[15px] font-bold text-ink" dir="ltr">
                      {university.gpaRange.min === university.gpaRange.max
                        ? `${university.gpaRange.min}%`
                        : `${university.gpaRange.min}% - ${university.gpaRange.max}%`}
                    </dd>
                  </div>
                </dl>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Universities;
