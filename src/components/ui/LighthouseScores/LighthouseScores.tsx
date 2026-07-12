import Tooltip from "@/components/ui/Tooltip/Tooltip";
import styles from "./LighthouseScores.module.css";
import { ReactElement } from "react";

type Tier = "good" | "average" | "poor";
type MetricKey = "fcp" | "lcp" | "tbt" | "cls" | "speedIndex";

interface LighthouseMetric {
  label: string;
  fullLabel: string;
  value: string;
  tier: Tier;
}

export interface LighthouseScoresProps {
  title?: ReactElement;
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo?: number;
  fcp?: number;
  lcp?: number;
  tbt?: number;
  cls?: number;
  speedIndex?: number;
  className?: string;
}

const TIER_CLASS: Partial<Record<Tier, string>> = {
  good: styles.good,
  poor: styles.poor,
};

// Seuils officiels Lighthouse/Core Web Vitals (plus bas = meilleur, sauf scores %).
const METRIC_DEFINITIONS: {
  key: MetricKey;
  label: string;
  fullLabel: string;
  format: (value: number) => string;
  good: number;
  average: number;
}[] = [
  {
    key: "fcp",
    label: "FCP",
    fullLabel: "First Contentful Paint",
    format: formatSeconds,
    good: 1.8,
    average: 3,
  },
  {
    key: "lcp",
    label: "LCP",
    fullLabel: "Largest Contentful Paint",
    format: formatSeconds,
    good: 2.5,
    average: 4,
  },
  {
    key: "tbt",
    label: "TBT",
    fullLabel: "Total Blocking Time",
    format: (v) => `${v} ms`,
    good: 200,
    average: 600,
  },
  {
    key: "cls",
    label: "CLS",
    fullLabel: "Cumulative Layout Shift",
    format: String,
    good: 0.1,
    average: 0.25,
  },
  {
    key: "speedIndex",
    label: "SI",
    fullLabel: "Speed Index",
    format: formatSeconds,
    good: 3.4,
    average: 5.8,
  },
];

function getTier(value: number, goodTier: number, averageTier: number): Tier {
  const higherIsBetter = goodTier > averageTier;
  const isGood = higherIsBetter ? value >= goodTier : value <= goodTier;
  const isAverage = higherIsBetter
    ? value >= averageTier
    : value <= averageTier;
  if (isGood) return "good";
  if (isAverage) return "average";
  return "poor";
}

function formatSeconds(value: number): string {
  return `${value.toLocaleString("fr", { minimumFractionDigits: 1 })} s`;
}

export default function LighthouseScores({
  title,
  performance,
  accessibility,
  bestPractices,
  seo,
  fcp,
  lcp,
  tbt,
  cls,
  speedIndex,
  className,
}: LighthouseScoresProps) {
  const scores = [
    { label: "Performance", value: performance },
    { label: "Accessibilité", value: accessibility },
    { label: "Bonnes pratiques", value: bestPractices },
    ...(seo !== undefined ? [{ label: "SEO", value: seo }] : []),
  ];

  const metricValues: Record<MetricKey, number | undefined> = {
    fcp,
    lcp,
    tbt,
    cls,
    speedIndex,
  };

  const metrics: LighthouseMetric[] = METRIC_DEFINITIONS.flatMap(
    ({ key, label, fullLabel, format, good, average }) => {
      const value = metricValues[key];
      if (value == null) return [];
      return [
        {
          label,
          fullLabel,
          value: format(value),
          tier: getTier(value, good, average),
        },
      ];
    },
  );

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(" ")}>
      {title && <div className={styles.title}>{title}</div>}
      <ul className={styles.scores}>
        {scores.map(({ label, value }) => (
          <li
            key={label}
            className={[styles.gauge, TIER_CLASS[getTier(value, 90, 50)]]
              .filter(Boolean)
              .join(" ")}
            // Runtime score feeds the conic-gradient sweep; not a design token.
            style={{ "--value": value } as React.CSSProperties}
          >
            <div className={styles.ring} aria-hidden="true" />
            <span className={styles.value}>{value}</span>
            <span className={styles.label}>{label}</span>
          </li>
        ))}
      </ul>

      {metrics.length > 0 ? (
        <ul className={styles.metrics}>
          {metrics.map(({ label, fullLabel, value, tier }) => (
            <li key={label} className={styles.metric}>
              <span className={styles.metricLabelRow}>
                <b className={styles.metricLabel}>{label}</b>
                <Tooltip label={fullLabel} />
              </span>
              <span
                className={[styles.metricValue, TIER_CLASS[tier]]
                  .filter(Boolean)
                  .join(" ")}
              >
                {value}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
