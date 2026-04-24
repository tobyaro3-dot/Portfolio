import type { ExplorationItem } from "../../data/portfolio";

type ExplorationCardProps = {
  item: ExplorationItem;
  onClick: (item: ExplorationItem) => void;
};

export function ExplorationCard({ item, onClick }: ExplorationCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(item)}
      className="group relative aspect-square w-full max-w-[320px] overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-2xl shadow-black/30 transition-transform duration-500 hover:scale-[1.03]"
      style={{ rotate: `${item.rotation}deg` }}
      aria-label={`Open ${item.title}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <span className="absolute inset-x-4 bottom-4 rounded-full bg-bg/70 px-4 py-2 text-left text-xs uppercase tracking-[0.22em] text-text-primary opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
        {item.title}
      </span>
    </button>
  );
}
