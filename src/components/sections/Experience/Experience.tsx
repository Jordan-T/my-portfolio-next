import Section from "@/components/ui/Section/Section";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { experience } from "@/config/experience";
import { parseRichText } from "@/lib/rich-text";
import styles from "./Experience.module.css";

const sortedExperience = experience.sort((a, b) => {
  const aDate = a.startDate ? new Date(a.startDate) : new Date();
  const bDate = b.startDate ? new Date(b.startDate) : new Date();
  return bDate.getTime() - aDate.getTime();
});

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeading number="04" title="Parcours & Impacts" />

      <ol className={styles.timeline}>
        {sortedExperience.map((job) => (
          <li key={job.company} className={styles.job}>
            <div className={styles.head}>
              <h3 className={styles.role}>
                {job.role}{" "}
                <span className={styles.at}>
                  ·{" "}
                  {job.url ? (
                    <a href={job.url} target="_blank" rel="noopener noreferrer">
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                  {job.companyInfo && (
                    <>
                      {" "}
                      <span className={styles.companyInfo}>
                        ({job.companyInfo})
                      </span>
                    </>
                  )}
                </span>
              </h3>
              <RangeDisplay startDate={job.startDate} endDate={job.endDate} />
            </div>
            <ul className={styles.highlights}>
              {job.highlights.map((highlight) => (
                <li key={highlight}>
                  {parseRichText(highlight).map((segment, i) =>
                    segment.bold ? (
                      <strong key={i}>{segment.text}</strong>
                    ) : (
                      segment.text
                    ),
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function RangeDisplay({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate?: string;
}) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
  };
  const startStr = start.toLocaleDateString("fr-FR", options);
  const endStr = endDate
    ? end.toLocaleDateString("fr-FR", options)
    : "Aujourd'hui";

  const diffInMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  const years = Math.round(diffInMonths / 12);
  const yearsStr = years > 0 ? `${years} an${years > 1 ? "s" : ""}` : "";

  return (
    <span className={styles.range}>
      {startStr} – {endStr}
      {yearsStr && <span className={styles.duration}> ({yearsStr})</span>}
    </span>
  );
}
