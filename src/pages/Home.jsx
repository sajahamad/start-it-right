import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/جامعة.jpg';
import Button from '../components/Button.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import MajorCard from '../components/MajorCard.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import StatCard from '../components/StatCard.jsx';
import homeData from '../data/home.json';
import majors from '../data/majors.json';
import { filterMajors, getTracks } from '../utils/majors.js';
import { getUniversities } from '../utils/universities.js';

function Home() {
  const [track, setTrack] = useState('');
  const tracks = useMemo(() => getTracks(majors), []);
  const universities = useMemo(() => getUniversities(majors), []);
  const previewMajors = useMemo(() => filterMajors(majors, { track }).slice(0, 3), [track]);

  return (
    <>
      <section className="relative mt-3 h-120 w-full overflow-hidden rounded-t-2xl text-white sm:h-130 md:h-137.5">
        <img
          src={heroImg}
          alt="بوابات جامعات فلسطين"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/85 to-ink/45" />

        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
            ابدأها <span className="text-primary">صح</span> من أول خطوة بالجامعة
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-white/90">
            منصة بتساعدك تختار تخصصك الجامعي بمعلومات واضحة، تعرف معدلات
            القبول، وتبلش أول سنة جامعة بثقة وبدون تخبط.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/majors">استكشف التخصصات</Button>
            <Button to="/guide" variant="ghost">
              دليل أول سنة
            </Button>
          </div>

          <p className="absolute bottom-4 px-6 text-xs text-white/50">
            صور من: الجامعة الإسلامية بغزة، جامعة الأزهر، جامعة فلسطين، جامعة الأقصى
          </p>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
          <Reveal delay={0}>
            <StatCard value={100} suffix="%" label="مصادر ومعلومات مجانية" icon="book" />
          </Reveal>
          <Reveal delay={100}>
            <StatCard value={universities.length} label="جامعات شريكة" icon="building" />
          </Reveal>
          <Reveal delay={200}>
            <StatCard value={majors.length} suffix="+" label="تخصص جامعي" icon="graduation-cap" />
          </Reveal>
        </div>
      </section>

      <section className="bg-surface px-6 py-16">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <SectionHeader
              eyebrow="أدواتنا الأساسية"
              title="كل ما تحتاجه لرحلتك الأكاديمية الأولى"
              description="من اختيار التخصص لغاية أول امتحان، خطوة بخطوة."
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {homeData.features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 80} className="h-full">
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  to={feature.to}
                  linkLabel={feature.linkLabel}
                  color={feature.color}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <SectionHeader
              eyebrow="التخصصات"
              title="أبرز التخصصات الجامعية"
              description="أمثلة على تخصصات متوفرة — تصفح حسب الفرع أو شوف القائمة كاملة."
            />
          </Reveal>

          <div className="mb-8 flex flex-wrap justify-center gap-2.5">
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

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {previewMajors.map((major, index) => (
              <Reveal key={major.id} delay={index * 80} className="h-full">
                <MajorCard major={major} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/majors" className="font-bold text-primary hover:underline">
              عرض جميع التخصصات المتاحة (+{majors.length} تخصص) ←
            </Link>
          </div>
        </div>
      </section>

      <Reveal>
        <section className="bg-ink px-6 py-16 text-white">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 text-center">
            <span className="inline-block rounded-full bg-primary px-3.5 py-1.5 text-sm font-bold text-white">
              ميزة جديدة
            </span>
            <h2 className="text-3xl font-bold text-white">محتار بين تخصصين؟ جرب أداة المقارنة المباشرة</h2>
            <p className="max-w-2xl text-white/75">
              قارن معدلات القبول، مدة الدراسة، وفرص العمل بين لغاية 3 تخصصات بجدول واحد وضح.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button to="/majors" variant="ghost">
                تصفح التخصصات
              </Button>
              <Button to="/compare">ابدأ المقارنة الآن</Button>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}

export default Home;
