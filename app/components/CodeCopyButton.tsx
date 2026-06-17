'use client';

import { useEffect, useRef, useState } from 'react';

type CodeCopyButtonProps = {
  code: string;
  label: string;
};

const copyTimeoutMs = 1000;

function copyWithTextareaFallback(code: string) {
  const textarea = document.createElement('textarea');

  textarea.value = code;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.width = '1px';
  textarea.style.height = '1px';
  textarea.style.opacity = '0';

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

async function copyWithClipboardApi(code: string) {
  if (!navigator.clipboard?.writeText) {
    return false;
  }

  let timeoutId: number | undefined;

  try {
    await Promise.race([
      navigator.clipboard.writeText(code),
      new Promise<never>((_, reject) => {
        timeoutId = window.setTimeout(() => {
          reject(new Error('clipboard-timeout'));
        }, copyTimeoutMs);
      }),
    ]);

    return true;
  } catch {
    return false;
  } finally {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
  }
}

export default function CodeCopyButton({ code, label }: CodeCopyButtonProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const resetTimerRef = useRef<number | null>(null);

  async function copyCode() {
    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
    }

    const didCopy =
      (await copyWithClipboardApi(code)) || copyWithTextareaFallback(code);

    setStatus(didCopy ? 'copied' : 'failed');
    resetTimerRef.current = window.setTimeout(
      () => setStatus('idle'),
      didCopy ? 1800 : 2200,
    );
  }

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const text =
    status === 'copied' ? 'Copied' : status === 'failed' ? 'Failed' : 'Copy';

  return (
    <button
      type="button"
      onClick={copyCode}
      className="min-h-8 rounded-md border border-[color:var(--color-border-subtle)] px-2.5 font-mono text-[11px] text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
      aria-label={`Copy ${label}`}
    >
      {text}
    </button>
  );
}
