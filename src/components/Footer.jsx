import { Link } from 'react-router-dom';

const CONTACT_LINKEDIN = 'https://www.linkedin.com/in/saja-hamad-dev';

const quickLinks = [
  { to: '/majors', label: 'التخصصات' },
  { to: '/universities', label: 'الجامعات الشريكة' },
  { to: '/compare', label: 'قارن بين تخصصات' },
  { to: '/guide', label: 'دليل أول سنة' },
  { to: '/resources', label: 'مصادر مجانية' },
];

const team = [
  { name: 'م. سجى حامد أبو منديل', linkedin: 'https://www.linkedin.com/in/saja-hamad-dev' },
  { name: 'م. أريج إسماعيل أبو عايش', linkedin: 'https://www.linkedin.com/in/areej-abu-ayesh-691714287/' },
];

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-current" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.44-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="mt-16 bg-ink text-white/85 print:hidden">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="mb-2 text-xl font-extrabold text-white">
            ابدأها <span className="text-primary">صح</span>
          </p>
          <p className="text-sm text-white/65">
            منصة تساعد طلاب فلسطين بعد التوجيهي يختاروا تخصصهم الجامعي
            ويبلشوا أول سنة جامعة صح.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">روابط سريعة</h3>
          <nav className="flex flex-col gap-2.5">
            {quickLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm text-white/75 hover:text-primary">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">الدعم والمساعدة</h3>
          <nav className="flex flex-col gap-2.5">
            <Link to="/guide" className="text-sm text-white/75 hover:text-primary">
              الأسئلة الشائعة
            </Link>
            <a
              href={CONTACT_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/75 hover:text-primary"
            >
              تواصل معنا
            </a>
          </nav>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">تعرف علينا</h3>
          <nav className="flex flex-col gap-3">
            {team.map((person) => (
              <a
                key={person.name}
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/75 hover:text-primary"
              >
                <LinkedInIcon />
                {person.name}
              </a>
            ))}
          </nav>
        </div>
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
