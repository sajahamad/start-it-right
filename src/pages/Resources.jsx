import resourceGroups from '../data/resources.json';

function Resources() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <span className="mb-4 inline-block rounded-full bg-amber-100 px-3.5 py-1.5 text-sm font-bold text-amber-700">
            مصادر مجانية
          </span>
          <h2 className="mb-3 text-3xl font-bold text-blue-950">تعلم من هلق قبل الجامعة</h2>
          <p className="text-[17px] text-stone-600">
            دورات ومصادر مجانية مبوبة حسب مجالك، تساعدك تبلش وانت مستعد.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {resourceGroups.map((group) => (
            <div key={group.id}>
              <h3 className="mb-5 text-xl font-bold text-blue-950">{group.category}</h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <a
                    key={item.title}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col gap-2 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <span className="text-xs font-bold text-amber-700">{item.provider}</span>
                    <h4 className="text-base font-bold text-blue-950">{item.title}</h4>
                    <p className="m-0 text-sm text-stone-600">{item.description}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Resources;
