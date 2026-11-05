'use client';
import { useState } from 'react';
import c from './Chapters.module.scss';

export default function CopyEmail({ email }: { email: string }) {
  const [ok, setOk] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(email); } catch { /* clipboard blocked: still show state */ }
    setOk(true); setTimeout(() => setOk(false), 1600);
  };
  return (
    <button className={c.copy} onClick={copy} aria-label={`Copy email address ${email}`}>
      <span>{email}</span><span className={c.tag} aria-live="polite">{ok ? 'Copied' : 'Click to copy'}</span>
    </button>
  );
}
