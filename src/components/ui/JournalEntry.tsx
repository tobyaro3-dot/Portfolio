import { useState } from "react";
import type { JournalEntry as JournalEntryType } from "../../data/portfolio";

type JournalEntryProps = {
  entry: JournalEntryType;
};

export function JournalEntry({ entry }: JournalEntryProps) {
  const [isSimple, setIsSimple] = useState(false);

  return (
    <article className="group grid gap-5 rounded-[40px] border border-stroke bg-surface/30 p-4 transition-colors duration-300 hover:bg-surface lg:grid-cols-[6rem_minmax(0,1fr)_18rem_2.75rem] lg:items-center lg:rounded-full lg:gap-6">
      <img
        src={entry.image}
        alt=""
        className="h-24 w-full rounded-[28px] object-cover lg:h-24 lg:w-24 lg:rounded-full"
      />
      <div className="min-w-0 flex-1">
        <h3 className="text-xl leading-tight text-text-primary md:text-2xl">
          {entry.title}
        </h3>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-[0.22em] text-muted">
          <span>{entry.readTime}</span>
          <span>{entry.date}</span>
        </div>
      </div>
      <div className="complexity-preview" data-simple={isSimple}>
        <div
          className="mb-3 inline-flex rounded-full border border-white/10 bg-bg/70 p-1 text-[10px] uppercase tracking-[0.18em] text-muted"
          aria-label="Complex to simple toggle"
        >
          <button
            type="button"
            className={`rounded-full px-3 py-1 transition duration-300 ${
              !isSimple ? "bg-stroke/70 text-text-primary" : "hover:text-text-primary"
            }`}
            aria-pressed={!isSimple}
            onClick={() => setIsSimple(false)}
          >
            Complex
          </button>
          <button
            type="button"
            className={`rounded-full px-3 py-1 transition duration-300 ${
              isSimple ? "bg-text-primary text-bg" : "hover:text-text-primary"
            }`}
            aria-pressed={isSimple}
            onClick={() => setIsSimple(true)}
          >
            Simple
          </button>
        </div>
        <div className="complexity-system">
          <div className="complexity-ui complexity-ui-primary">
            <span className="complexity-ui-label">Request type</span>
            <span className="complexity-ui-field" />
          </div>
          <div className="complexity-ui complexity-ui-secondary">
            <span className="complexity-ui-label">Assign owner</span>
            <span className="complexity-ui-field" />
          </div>
          <div className="complexity-ui complexity-ui-tertiary">
            <span className="complexity-ui-label">Confirm</span>
            <span className="complexity-ui-button" />
          </div>
          <span className="complexity-step complexity-step-a">Step 1</span>
          <span className="complexity-step complexity-step-b">Step 4</span>
          <span className="complexity-warning complexity-warning-a">!</span>
          <span className="complexity-warning complexity-warning-b">!</span>
          <span className="complexity-feedback">Reduced steps</span>
        </div>
      </div>
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stroke text-muted transition-colors duration-300 group-hover:border-white/20 group-hover:text-text-primary"
        aria-hidden="true"
      >
        ↗
      </span>
    </article>
  );
}
