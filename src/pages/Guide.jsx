import { Clapperboard, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import cover1 from '../assets/cover-1-nasaeh.jpg';
import cover2 from '../assets/cover-2-bawaba-moodle.jpg';
import cover3 from '../assets/cover-3-ikhtibar-takhassus.jpg';
import cover4 from '../assets/cover-4-mueadal-aali.jpg';
import GuideCard from '../components/GuideCard.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import VideoCard from '../components/VideoCard.jsx';
import faqItems from '../data/guideFaq.json';
import guideSections from '../data/guide.json';
import guideVideos from '../data/guideVideos.json';

const CARD_ORDER = ['time-management', 'before-start', 'online-study', 'gpa'];

const VIDEO_IMAGES = {
  'golden-tips-year-one': cover1,
  'portal-vs-moodle': cover2,
  'test-your-major': cover3,
  'high-gpa-year-one': cover4,
};

function Guide() {
  const [openFaqId, setOpenFaqId] = useState(null);

  const cards = CARD_ORDER.map((id) => guideSections.find((section) => section.id === id)).filter(Boolean);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="خطوتك الأولى نحو تجربة جامعية متوازنة وناجحة"
            title="الدليل الشامل لانطلاقة ذكية في الجامعة"
            description="نصائح وإرشادات عملية ضمنت لمساعدتك على تنظيم وقتك وتحقيق التميز الأكاديمي منذ اليوم الأول."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {cards.map((section, index) => (
            <Reveal key={section.id} delay={index * 80} className="h-full">
              <GuideCard
                category={section.category}
                subtitle={section.subtitle}
                title={section.title}
                icon={section.icon}
                tips={section.tips}
                color={section.color}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Reveal>
            <h2 className="mb-2 flex items-center justify-center gap-2 text-2xl font-bold text-ink">
              <Clapperboard className="h-6 w-6 text-primary" strokeWidth={1.75} aria-hidden="true" />
              فيديوهات إرشادية سريعة
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-[15px] text-muted">
              شروحات ونصائح مصورة من حسابنا على إنستجرام لتسهيل مسيرتك الجامعية خطوة بخطوة.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 text-right sm:grid-cols-2 lg:grid-cols-4">
            {guideVideos.map((video, index) => (
              <Reveal key={video.id} delay={index * 80} className="h-full">
                <VideoCard
                  title={video.title}
                  description={video.description}
                  url={video.url}
                  image={VIDEO_IMAGES[video.id]}
                />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <Reveal>
            <h2 className="mb-6 text-2xl font-bold text-ink">أسئلة شائعة عن أول سنة جامعية</h2>
          </Reveal>
          <div className="flex flex-col gap-3">
            {faqItems.map((item, index) => {
              const isOpen = openFaqId === item.id;
              return (
                <Reveal key={item.id} delay={Math.min(index * 60, 300)}>
                  <div className="rounded-2xl border border-border bg-white">
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-6 py-4 text-right"
                    >
                      <span className="font-bold text-ink">{item.question}</span>
                      <span className="shrink-0 text-primary">
                        {isOpen ? (
                          <Minus className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
                        ) : (
                          <Plus className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
                        )}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-border px-6 py-4 text-[15px] text-muted">
                        {item.bullets ? (
                          <>
                            <p className="m-0 mb-3">{item.intro}</p>
                            {item.bulletsIntro && <p className="m-0 mb-2 font-bold text-ink">{item.bulletsIntro}</p>}
                            <ul className="mb-3 flex flex-col gap-2.5">
                              {item.bullets.map((bullet) => (
                                <li
                                  key={bullet.lead}
                                  className="relative pr-5.5 before:absolute before:right-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-primary"
                                >
                                  <span className="font-bold text-ink">{bullet.lead}</span> {bullet.text}
                                </li>
                              ))}
                            </ul>
                            {item.outro && <p className="m-0">{item.outro}</p>}
                          </>
                        ) : (
                          <p className="m-0">{item.answer}</p>
                        )}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Guide;
