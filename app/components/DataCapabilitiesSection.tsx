import { RAG_EXAMPLE } from '../lib/content';

const FEATURES = [
  {
    title: 'Vector Retrieval',
    body: 'User-supplied embedding function — any provider. InMemoryVectorRetrievalCapability for dev, SQLiteVectorRetrievalCapability for prod. Every query emits retrieval_started/completed evidence.',
    exports: ['InMemoryVectorRetrievalCapability', 'SQLiteVectorRetrievalCapability'],
  },
  {
    title: 'Text Ingestion',
    body: 'SQLiteIngestionCapability stores documents with provenance. Shares documents.sqlite with vector retrieval — ingest once, query both. Keyword search included.',
    exports: ['SQLiteIngestionCapability', 'InMemoryTextIngestionCapability'],
  },
  {
    title: 'Knowledge Graph',
    body: 'SQLiteKnowledgeGraph stores entities and relations with evidence for every write. Queryable by entity type, relation, and property. InMemory backend for testing.',
    exports: ['SQLiteKnowledgeGraph', 'InMemoryKnowledgeGraph'],
  },
];

export default function DataCapabilitiesSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-14 border-t border-zinc-800/60">
      <p className="eyebrow tracking-widest mb-3">Data Capabilities</p>
      <h2 className="text-lg font-semibold text-zinc-100 mb-2">
        Governed RAG, search, and knowledge management.
      </h2>
      <p className="text-sm text-zinc-400 mb-10 max-w-2xl leading-relaxed">
        Vector retrieval, text ingestion, transformation, and knowledge graph capabilities
        share the same SQLite file and emit evidence on every operation. Every RAG query is
        replayable by correlation ID.
      </p>

      <div className="grid md:grid-cols-3 gap-5 mb-10">
        {FEATURES.map((f) => (
          <div key={f.title} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-zinc-200 mb-2">{f.title}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed mb-3">{f.body}</p>
            <div className="flex flex-wrap gap-1.5">
              {f.exports.map((exp) => (
                <span
                  key={exp}
                  className="font-mono text-xs text-zinc-500 bg-zinc-800/60 rounded px-1.5 py-0.5"
                >
                  {exp}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="ml-2 font-mono text-xs text-zinc-600">governed RAG</span>
        </div>
        <pre className="p-5 font-mono text-sm text-zinc-300 overflow-x-auto leading-relaxed">
          <code>{RAG_EXAMPLE}</code>
        </pre>
      </div>
    </section>
  );
}
