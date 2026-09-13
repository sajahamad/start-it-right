import { Play } from 'lucide-react';

function VideoCard({ title, description, url, image }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
    >
      <div className="relative h-36 w-full overflow-hidden bg-surface">
        <img src={image} alt="" className="h-full w-full object-cover object-top" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/55 to-transparent" />
        <span className="absolute bottom-3 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-white text-primary shadow-md">
          <Play className="h-5 w-5 -translate-x-0.5" fill="currentColor" strokeWidth={0} aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1.5 text-base font-bold text-ink">{title}</h3>
        <p className="m-0 mb-4 flex-1 text-sm text-muted">{description}</p>
        <span className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-bold text-white">مشاهدة</span>
      </div>
    </a>
  );
}

export default VideoCard;
