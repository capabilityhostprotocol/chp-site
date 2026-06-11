import { HOMEPAGE_FAQS } from '../lib/content';

export default function HomepageFAQ() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-14 border-t border-zinc-800/60">
      <div className="mb-8">
        <p className="font-mono text-xs text-zinc-500 uppercase mb-3">
          Common objections
        </p>
        <h2 className="text-lg font-semibold text-zinc-100">
          Questions a protocol has to answer early.
        </h2>
      </div>
      <div className="divide-y divide-zinc-800 border-y border-zinc-800">
        {HOMEPAGE_FAQS.map((faq) => (
          <div
            key={faq.question}
            className="grid gap-3 py-5 md:grid-cols-[0.75fr_1fr]"
          >
            <h3 className="text-sm font-semibold text-zinc-100">
              {faq.question}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
