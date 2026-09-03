import { Link } from 'react-router-dom';
import heroImg from '../assets/جامعة.jpg';
import FeatureCard from '../components/FeatureCard.jsx';
import homeData from '../data/home.json';

function Home() {
  return (
    <>
      <section className="relative h-120 w-full overflow-hidden text-white sm:h-130 md:h-137.5">
        <img
          src={heroImg}
          alt="بوابات جامعات فلسطين"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-blue-950/80 to-blue-950/40" />

        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
            ابدأها صح من أول خطوة بالجامعة
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-white/90">
            منصة بتساعدك تختار تخصصك الجامعي بمعلومات واضحة، تعرف معدلات
            القبول، وتبلش أول سنة جامعة بثقة وبدون تخبط.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/majors"
              className="rounded-lg bg-amber-600 px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-md"
            >
              استكشف التخصصات
            </Link>
            <Link
              to="/guide"
              className="rounded-lg border-2 border-white/50 px-6 py-3.5 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              دليل أول سنة
            </Link>
          </div>

          <p className="absolute bottom-4 px-6 text-xs text-white/50">
            صور من: الجامعة الإسلامية بغزة، جامعة الأزهر، جامعة فلسطين، جامعة الأقصى
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <span className="mb-4 inline-block rounded-full bg-amber-100 px-3.5 py-1.5 text-sm font-bold text-amber-700">
              ليش ابدأها صح
            </span>
            <h2 className="mb-3 text-3xl font-bold text-blue-950">
              كل شي بتحتاجه قبل ما تبلش الجامعة
            </h2>
            <p className="text-[17px] text-stone-600">
              من اختيار التخصص لغاية أول امتحان، خطوة بخطوة.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {homeData.features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
