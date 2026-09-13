import { Link } from 'react-router-dom';

const VARIANTS = {
  primary:
    'bg-primary text-white shadow-sm hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md',
  ghost: 'border-2 border-white/50 text-white hover:-translate-y-0.5 hover:bg-white/10',
};

function Button({ to, variant = 'primary', className = '', children }) {
  return (
    <Link
      to={to}
      className={`inline-flex rounded-lg px-6 py-3.5 text-base font-bold transition ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export default Button;
