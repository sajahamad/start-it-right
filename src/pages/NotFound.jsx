import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="px-6 py-24 text-center">
      <h1 className="mb-3 text-4xl font-extrabold text-blue-950">404</h1>
      <p className="mb-6 text-stone-600">هاد الصفحة مش موجودة.</p>
      <Link
        to="/"
        className="inline-flex rounded-lg bg-amber-600 px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-md"
      >
        ارجع للرئيسية
      </Link>
    </section>
  );
}

export default NotFound;
