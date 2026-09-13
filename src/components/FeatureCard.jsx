import { Link } from 'react-router-dom';
import ContentIcon from './ContentIcon.jsx';

const ICON_COLORS = {
  blue: 'bg-blue-100 text-blue-600',
  pink: 'bg-pink-100 text-pink-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
};

function FeatureCard({ icon, title, description, to, linkLabel, color }) {
  const Wrapper = to ? Link : 'div';
  const wrapperProps = to ? { to } : {};
  const iconColorClasses = ICON_COLORS[color] ?? 'bg-primary/10 text-primary';

  return (
    <Wrapper
      {...wrapperProps}
      className="flex h-full flex-col rounded-2xl border border-border bg-white p-7 text-center shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
    >
      <span
        className={`mb-4 inline-flex h-14 w-14 items-center justify-center self-center rounded-full ${iconColorClasses}`}
      >
        <ContentIcon name={icon} className="h-6 w-6" />
      </span>
      <h3 className="mb-2 text-lg font-bold text-ink">{title}</h3>
      <p className="m-0 text-[15px] text-muted">{description}</p>
      {to && linkLabel && (
        <span className="mt-4 text-sm font-bold text-primary">{linkLabel}</span>
      )}
    </Wrapper>
  );
}

export default FeatureCard;
