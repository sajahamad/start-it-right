function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl">
        {icon}
      </span>
      <h3 className="mb-2 text-lg font-bold text-blue-950">{title}</h3>
      <p className="m-0 text-[15px] text-stone-600">{description}</p>
    </div>
  );
}

export default FeatureCard;
