import { HOMEPAGE_FAQS } from '../lib/content';
import SectionHeader from './SectionHeader';
import SectionShell from './SectionShell';

export default function HomepageFAQ() {
  return (
    <SectionShell width="narrow" padding="compact">
      <SectionHeader
        eyebrow="Common objections"
        title="Questions a protocol has to answer early."
        className="mb-8 md:block"
      />
      <div className="divide-y divide-zinc-800 border-y border-zinc-800">
        {HOMEPAGE_FAQS.map((faq) => (
          <div
            key={faq.question}
            className="grid gap-3 py-5 md:grid-cols-[0.75fr_1fr]"
          >
            <h3 className="text-sm font-semibold text-zinc-100">
              {faq.question}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-400">{faq.answer}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
