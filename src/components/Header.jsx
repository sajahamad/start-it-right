import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'الرئيسية' },
  { to: '/majors', label: 'التخصصات' },
  { to: '/compare', label: 'قارن بين تخصصات' },
  { to: '/guide', label: 'دليل أول سنة' },
  { to: '/resources', label: 'مصادر مجانية' },
];

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-amber-50/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <NavLink to="/" className="shrink-0 text-xl font-extrabold text-blue-950">
          ابدأها <span className="text-amber-600">صح</span>
        </NavLink>

        <nav className="order-3 flex w-full flex-wrap items-center justify-center gap-5 md:order-none md:w-auto md:justify-start">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `border-b-2 pb-1 text-[15px] font-medium transition-colors ${
                  isActive
                    ? 'border-amber-600 font-bold text-blue-950'
                    : 'border-transparent text-stone-600 hover:text-blue-950'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/majors"
          className="shrink-0 rounded-lg bg-amber-600 px-5 py-2.5 text-[15px] font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-md"
        >
          ابدأ الآن
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
