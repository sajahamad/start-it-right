import Button from '../components/Button.jsx';

function NotFound() {
  return (
    <section className="px-6 py-24 text-center">
      <h1 className="mb-3 text-4xl font-extrabold text-ink">404</h1>
      <p className="mb-6 text-muted">هاد الصفحة مش موجودة.</p>
      <Button to="/">ارجع للرئيسية</Button>
    </section>
  );
}

export default NotFound;
