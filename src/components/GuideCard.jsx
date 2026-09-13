import ContentIcon from './ContentIcon.jsx';

const COLOR_STYLES = {
  blue: { badge: 'bg-blue-50 text-blue-700', icon: 'bg-blue-100 text-blue-600', dot: 'before:bg-blue-500' },
  pink: { badge: 'bg-pink-50 text-pink-700', icon: 'bg-pink-100 text-pink-600', dot: 'before:bg-pink-500' },
  purple: { badge: 'bg-purple-50 text-purple-700', icon: 'bg-purple-100 text-purple-600', dot: 'before:bg-purple-500' },
  orange: { badge: 'bg-orange-50 text-orange-700', icon: 'bg-orange-100 text-orange-600', dot: 'before:bg-orange-500' },
};

function GuideCard({ category, subtitle, title, icon, tips, color }) {
  const styles = COLOR_STYLES[color] ?? COLOR_STYLES.blue;

  return (
    <article className="h-full rounded-2xl border border-border bg-white p-7 shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${styles.icon}`}>
          <ContentIcon name={icon} className="h-5 w-5" />
        </span>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${styles.badge}`}>{category}</span>
      </div>
      <p className="m-0 mb-1 text-xs font-bold text-muted">{subtitle}</p>
      <h3 className="mb-4 text-lg font-bold text-ink">{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {tips.map((tip) => (
          <li
            key={tip}
            className={`relative pr-5.5 text-[15px] before:absolute before:right-0 before:top-2 before:h-2 before:w-2 before:rounded-full ${styles.dot}`}
          >
            {tip}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default GuideCard;
