import ContentIcon from '../components/ContentIcon.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import resourceGroups from '../data/resources.json';

function Resources() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="مصادر مجانية"
            title="تعلم من الآن قبل الجامعة"
            description="دورات ومصادر مجانية مبوبة حسب مجالك، تساعدك تبلش وانت مستعد."
          />
        </Reveal>

        <div className="flex flex-col gap-12">
          {resourceGroups.map((group) => (
            <div key={group.id}>
              <Reveal>
                <div className="mb-5 flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ContentIcon name={group.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-bold text-ink">{group.category}</h3>
                </div>
              </Reveal>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item, index) => (
                  <Reveal key={item.title} delay={index * 80} className="h-full">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-full flex-col gap-2 rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <span className="text-xs font-bold text-primary">{item.provider}</span>
                      <h4 className="text-base font-bold text-ink">{item.title}</h4>
                      <p className="m-0 text-sm text-muted">{item.description}</p>
                    </a>
                  </Reveal>
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
