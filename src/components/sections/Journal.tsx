import { journalEntries } from "../../data/portfolio";
import { SectionHeader } from "../layout/SectionHeader";
import { JournalEntry } from "../ui/JournalEntry";

export function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Journal"
          title={
            <>
              Recent{" "}
              <span className="font-display italic text-text-primary">
                thoughts
              </span>
            </>
          }
          description="Notes on design systems, brand behavior, motion, and the small decisions that make products feel alive."
          actionLabel="View all"
        />
        <div className="space-y-4">
          {journalEntries.map((entry) => (
            <JournalEntry key={entry.title} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
