import guideSections from '../data/guide.json';

function Guide() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <span className="mb-4 inline-block rounded-full bg-amber-100 px-3.5 py-1.5 text-sm font-bold text-amber-700">
            دليل أول سنة
          </span>
          <h2 className="mb-3 text-3xl font-bold text-blue-950">ابدأها صح من أول سنة جامعة</h2>
          <p className="text-[17px] text-stone-600">
            نصائح عملية مبنية على تجارب طلاب فعلاً مروا بأول سنة.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {guideSections.map((section) => (
            <article
              key={section.id}
              className="rounded-2xl border border-stone-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xl">
                  {section.icon}
                </span>
                <h3 className="text-lg font-bold text-blue-950">{section.title}</h3>
              </div>
              <ul className="flex flex-col gap-2.5">
                {section.tips.map((tip) => (
                  <li
                    key={tip}
                    className="relative pr-5.5 text-[15px] before:absolute before:right-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-amber-600"
                  >
                    {tip}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Guide;
