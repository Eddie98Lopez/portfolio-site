"use client";

import { Ticker } from "motion-plus/react";
import { useScroll, useTransform } from "motion/react";

const lines = [
  { text: "UX", reverse: false },
  { text: "DESIGN", reverse: true },
  { text: "SOFTWARE", reverse: false },
  { text: "ENGINEERING", reverse: true },
];

export default function ScrollTextLines() {
  const { scrollY } = useScroll();

  const offset1 = useTransform(() => scrollY.get() * 0.5);
  const offset2 = useTransform(() => scrollY.get() * -0.7);
  const offset3 = useTransform(() => scrollY.get() * 0.6);
  const offset4 = useTransform(() => scrollY.get() * -0.8);

  const offsets = [offset1, offset2, offset3, offset4];

  return (
    <div id="example">
      <section className="text-section">
        {lines.map((line, index) => (
          <Ticker
            key={line.text}
            className={`ticker-line ticker-${index}`}
            items={[
              <span key="solid" className="text-solid text-display-small">
                {line.text}
              </span>,
              <span key="outline" className="text-outline text-display-small">
                {line.text}
              </span>,
            ]}
            offset={offsets[index]}
          />
        ))}
      </section>

      <StyleSheet />
    </div>
  );
}

/**
 * ==============   Styles   ================
 */

function StyleSheet() {
  return (
    <style>{`
            #example {
                width: 100%;
                overflow: hidden;
            }

            .intro,
            .outro {
                height: 50vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .intro p,
            .outro p {
                font-size: 18px;
                color: var(--white);
                opacity: 0.5;
            }

            .text-section {
                display: flex;
                flex-direction: column;
                width: 100%;
            }

            .ticker-line span {
                font-size: clamp(48px, 12vw, 120px);
                text-transform: uppercase;
                padding: 0 20px;
            }

            .text-solid {
                color: var(--white);
            }

            .text-outline {
                color: transparent;
                -webkit-text-stroke: 2px black;
                opacity: 0.4;
            }

            @media (max-width: 600px) {
                .text-outline {
                    -webkit-text-stroke: 1px var(--white);
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .ticker-line {
                    animation: none !important;
                }
            }
        `}</style>
  );
}
