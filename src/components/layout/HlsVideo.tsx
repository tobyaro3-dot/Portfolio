export type HlsVideoProps = {
  src?: string;
  className?: string;
  flipped?: boolean;
  overlayClassName?: string;
};

/**
 * Animated blue nebula background, drawn with CSS.
 * Replaces the old streamed background video, which the host stopped serving.
 * Keeps the same props so existing sections did not need to change.
 */
export function HlsVideo({
  className = "",
  flipped = false,
  overlayClassName,
}: HlsVideoProps) {
  return (
    <>
      <div
        aria-hidden="true"
        className={`nebula-bg pointer-events-none absolute inset-0 overflow-hidden ${
          flipped ? "scale-y-[-1]" : ""
        } ${className}`}
      >
        <span className="nebula-swirl" />
        <span className="nebula-cloud nebula-cloud-a" />
        <span className="nebula-cloud nebula-cloud-b" />
        <span className="nebula-cloud nebula-cloud-c" />
        <span className="nebula-core" />
        <span className="nebula-stars" />
      </div>
      {overlayClassName ? (
        <div className={`absolute inset-0 ${overlayClassName}`} />
      ) : null}
    </>
  );
}
