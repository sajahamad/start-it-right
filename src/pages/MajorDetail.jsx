import { Link, useParams } from 'react-router-dom';
import Button from '../components/Button.jsx';
import MajorCard from '../components/MajorCard.jsx';
import majors from '../data/majors.json';
import { getMajorById, getRelatedMajors } from '../utils/majors.js';

function MajorDetail() {
  const { id } = useParams();
  const major = getMajorById(majors, id);

  if (!major) {
    return (
      <section className="px-6 py-16">
        <div className="mx-auto w-full max-w-6xl py-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-ink">ما لقينا هاد التخصص</h2>
          <p className="mb-6 text-muted">يمكن الرابط غلط أو التخصص انحذف.</p>
          <Button to="/majors">ارجع لكل التخصصات</Button>
        </div>
      </section>
    );
  }

  const related = getRelatedMajors(majors, major);

  return (
    <>
      <section className="bg-ink pb-12 pt-10 text-white">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Link to="/majors" className="mb-4 inline-block text-sm text-white/70 hover:text-white">
            ← كل التخصصات
          </Link>
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-white">
            {major.track.join(' / ')}
          </span>
          <h1 className="mt-3 mb-1.5 text-3xl font-extrabold text-white md:text-4xl">
            {major.name}
          </h1>
          <p className="m-0 text-white/75">
            {major.faculty} · مدة الدراسة {major.duration}
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-10">
            <h2 className="mb-2 text-2xl font-bold text-ink">معدلات القبول حسب الجامعة</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse overflow-hidden rounded-2xl border border-border bg-white">
                <thead>
                  <tr>
                    <th className="border-b border-border bg-surface px-4 py-3.5 text-right text-xs text-ink">
                      الجامعة
                    </th>
                    <th className="border-b border-border bg-surface px-4 py-3.5 text-right text-xs text-ink">
                      السنة
                    </th>
                    <th className="border-b border-border bg-surface px-4 py-3.5 text-right text-xs text-ink">
                      المعدل
                    </th>
                    <th className="border-b border-border bg-surface px-4 py-3.5 text-right text-xs text-ink">
                      رسوم الساعة
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {major.admission.map((entry) => (
                    <tr key={`${entry.university}-${entry.year}`} className="last:[&>td]:border-b-0">
                      <td className="border-b border-border px-4 py-3.5 text-[15px]">
                        {entry.university}
                      </td>
                      <td className="border-b border-border px-4 py-3.5 text-[15px]">
                        {entry.year}
                      </td>
                      <td className="border-b border-border px-4 py-3.5 text-right text-[15px]" dir="ltr">
                        {entry.minGpa === entry.competitiveGpa
                          ? `${entry.minGpa}%`
                          : `${entry.minGpa}% - ${entry.competitiveGpa}%`}
                      </td>
                      <td className="border-b border-border px-4 py-3.5 text-[15px]">
                        {entry.feePerCreditHour ? `${entry.feePerCreditHour} دينار` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-ink">المهارات المطلوبة</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {major.skillsNeeded.map((skill) => (
                  <li key={skill} className="relative pr-5.5 text-[15px] before:absolute before:right-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-ink">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-bold text-ink">ابدأ تتعلمها من هلق</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {major.skillsToLearnNow.map((skill) => (
                  <li key={skill} className="relative pr-5.5 text-[15px] before:absolute before:right-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-primary">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-bold text-ink">فرص العمل بعد التخرج</h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {major.careers.map((career) => (
                <li
                  key={career}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-ink"
                >
                  {career}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mx-auto mt-10 w-full max-w-6xl">
            <h2 className="mb-2 text-2xl font-bold text-ink">تخصصات قريبة</h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedMajor) => (
                <MajorCard key={relatedMajor.id} major={relatedMajor} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default MajorDetail;
