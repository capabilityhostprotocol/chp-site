import { ImageResponse } from 'next/og';

/**
 * Shared OG/social card — extends the design language off-site. Dark field,
 * concept-cyan accent, the evidence-chain signature motif, and the wordmark.
 * Uses the default ImageResponse font (satori) for build reliability; the card
 * design carries the brand. Satori is flexbox-only with inline styles.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

const FIELD = '#05070a';
const CYAN = '#28d9f2';
const ZINC400 = '#a1a1aa';
const ZINC500 = '#71717a';
const ZINC100 = '#f4f4f5';
const BORDER = 'rgba(209,213,219,0.16)';

function ChainBlock({ hash }: { hash: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        border: `1px solid ${CYAN}66`,
        borderRadius: 10,
        background: 'rgba(17,24,39,0.6)',
        padding: '14px 16px',
        width: 150,
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 15,
          color: ZINC500,
          fontFamily: 'monospace',
        }}
      >
        evt
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 18,
          color: CYAN,
          fontFamily: 'monospace',
        }}
      >
        #{hash}
      </div>
    </div>
  );
}

function ChainLink() {
  return (
    <div
      style={{
        display: 'flex',
        width: 26,
        height: 2,
        background: CYAN,
        opacity: 0.6,
        margin: '0 6px',
      }}
    />
  );
}

export function ogCard({
  title,
  eyebrow = 'Capability Host Protocol',
}: {
  title: string;
  eyebrow?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: FIELD,
          padding: 72,
          position: 'relative',
        }}
      >
        {/* top accent line */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 6,
            background: CYAN,
          }}
        />

        {/* wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              width: 26,
              height: 26,
              border: `2px solid ${CYAN}`,
              transform: 'rotate(45deg)',
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              letterSpacing: 4,
              color: ZINC400,
              fontFamily: 'monospace',
            }}
          >
            CAPABILITY HOST PROTOCOL
          </div>
        </div>

        {/* title block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              letterSpacing: 3,
              color: CYAN,
              fontFamily: 'monospace',
              textTransform: 'uppercase',
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: title.length > 60 ? 58 : 72,
              fontWeight: 700,
              color: ZINC100,
              lineHeight: 1.05,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        {/* evidence-chain motif + domain */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ChainBlock hash="a3f1" />
              <ChainLink />
              <ChainBlock hash="9c7e" />
              <ChainLink />
              <ChainBlock hash="1d04" />
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 17,
                color: ZINC500,
                fontFamily: 'monospace',
              }}
            >
              tamper-evident evidence · replayable by correlation
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 20,
              color: ZINC400,
              fontFamily: 'monospace',
              borderTop: `1px solid ${BORDER}`,
              paddingTop: 12,
            }}
          >
            capabilityhostprotocol.com
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
