import { useState } from 'react';
import { Link } from 'react-router-dom';
import majors from '../data/majors.json';
import { gpaSummary } from '../utils/majors.js';

const MAX_SELECTION = 3;

function Compare() {
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleMajor = (id) => {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }
      if (current.length >= MAX_SELECTION) {
        return current;
      }
      return [...current, id];
    });
  };

  const selectedMajors = selectedIds
    .map((id) => majors.find((major) => major.id === id))
    .filter(Boolean);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <span className="mb-4 inline-block rounded-full bg-amber-100 px-3.5 py-1.5 text-sm font-bold text-amber-700">
            قارن بين تخصصات
          </span>
          <h2 className="mb-3 text-3xl font-bold text-blue-950">
            اختار لغاية 3 تخصصات وشوفهم جنب بعض
          </h2>
          <p className="text-[17px] text-stone-600">
            بيساعدك تقرر أسرع لما تشوف الفروقات الأساسية بجدول واحد.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2.5">
          {majors.map((major) => {
            const isSelected = selectedIds.includes(major.id);
            const isDisabled = !isSelected && selectedIds.length >= MAX_SELECTION;
            return (
              <button
                key={major.id}
                type="button"
                disabled={isDisabled}
                onClick={() => toggleMajor(major.id)}
                className={`rounded-full border px-4.5 py-2.5 font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                  isSelected
                    ? 'border-amber-600 bg-amber-600 text-white'
                    : 'border-stone-200 bg-white text-blue-950 hover:border-amber-400'
                }`}
              >
                {major.name}
              </button>
            );
          })}
        </div>

        {selectedMajors.length === 0 ? (
          <p className="py-10 text-center text-stone-500">
            اختار تخصص أو أكتر من فوق عشان تبدأ المقارنة.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-160 border-collapse rounded-2xl border border-stone-200 bg-white">
              <tbody>
                <tr>
                  <th className="min-w-35 whitespace-nowrap border-b border-stone-200 bg-amber-50 px-4.5 py-4 text-right align-top text-sm text-blue-950">
                    التخصص
                  </th>
                  {selectedMajors.map((major) => (
                    <td
                      key={major.id}
                      className="min-w-45 border-b border-stone-200 px-4.5 py-4 text-right align-top"
                    >
                      <Link
                        to={`/majors/${major.id}`}
                        className="font-bold text-amber-700 hover:underline"
                      >
                        {major.name}
                      </Link>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th className="whitespace-nowrap border-b border-stone-200 bg-amber-50 px-4.5 py-4 text-right align-top text-sm text-blue-950">
                    الفرع
                  </th>
                  {selectedMajors.map((major) => (
                    <td key={major.id} className="border-b border-stone-200 px-4.5 py-4 text-right align-top">
                      {major.track.join(' / ')}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th className="whitespace-nowrap border-b border-stone-200 bg-amber-50 px-4.5 py-4 text-right align-top text-sm text-blue-950">
                    مدة الدراسة
                  </th>
                  {selectedMajors.map((major) => (
                    <td key={major.id} className="border-b border-stone-200 px-4.5 py-4 text-right align-top">
                      {major.duration}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th className="whitespace-nowrap border-b border-stone-200 bg-amber-50 px-4.5 py-4 text-right align-top text-sm text-blue-950">
                    معدل القبول التقريبي
                  </th>
                  {selectedMajors.map((major) => {
                    const { min, max } = gpaSummary(major);
                    return (
                      <td
                        key={major.id}
                        className="border-b border-stone-200 px-4.5 py-4 text-right align-top"
                        dir="ltr"
                      >
                        {min === max ? `${min}%` : `${min}% - ${max}%`}
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <th className="whitespace-nowrap bg-amber-50 px-4.5 py-4 text-right align-top text-sm text-blue-950">
                    فرص العمل
                  </th>
                  {selectedMajors.map((major) => (
                    <td key={major.id} className="px-4.5 py-4 text-right align-top">
                      <ul className="flex flex-col gap-1.5 text-sm">
                        {major.careers.map((career) => (
                          <li key={career}>{career}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Compare;
