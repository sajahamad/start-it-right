function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-10 max-w-xl text-center">
      <span className="mb-4 inline-block rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-bold text-primary">
        {eyebrow}
      </span>
      <h2 className="mb-3 text-3xl font-bold text-ink">{title}</h2>
      <p className="text-[17px] text-muted">{description}</p>
    </div>
  );
}

export default SectionHeader;
