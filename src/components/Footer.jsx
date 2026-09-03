import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="mt-16 bg-blue-950 text-white/85">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-7 px-6 py-10">
        <div className="max-w-xs">
          <p className="mb-2 text-xl font-extrabold text-white">
            ابدأها <span className="text-amber-500">صح</span>
          </p>
          <p className="text-sm text-white/65">
            منصة تساعد طلاب فلسطين بعد التوجيهي يختاروا تخصصهم الجامعي
            ويبلشوا أول سنة جامعة صح.
          </p>
        </div>

        <nav className="flex flex-wrap gap-5">
          <Link to="/majors" className="text-[15px] text-white/85 hover:text-amber-500">
            التخصصات
          </Link>
          <Link to="/compare" className="text-[15px] text-white/85 hover:text-amber-500">
            قارن بين تخصصات
          </Link>
          <Link to="/guide" className="text-[15px] text-white/85 hover:text-amber-500">
            دليل أول سنة
          </Link>
          <Link to="/resources" className="text-[15px] text-white/85 hover:text-amber-500">
            مصادر مجانية
          </Link>
        </nav>

        <a
          href="mailto:contact@ibdahasah.ps"
          className="shrink-0 rounded-lg border-2 border-white/50 px-5 py-2.5 text-[15px] font-bold text-white transition hover:bg-white/10"
        >
          تواصل معنا
        </a>
      </div>

      <div className="border-t border-white/10 px-6 py-4">
        <p className="mx-auto w-full max-w-6xl text-[13px] text-white/55">
          © {new Date().getFullYear()} ابدأها صح. كل الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
