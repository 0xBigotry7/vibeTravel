"use client";
import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle');
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const name = nameRef.current?.value || '';
    const email = emailRef.current?.value || '';
    const message = messageRef.current?.value || '';
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });
    if (res.ok) {
      setStatus('success');
      if (nameRef.current) nameRef.current.value = '';
      if (emailRef.current) emailRef.current.value = '';
      if (messageRef.current) messageRef.current.value = '';
    } else {
      setStatus('error');
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Input
          type="text"
          placeholder="Your name"
          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
          ref={nameRef}
          required
        />
      </div>
      <div>
        <Input
          type="email"
          placeholder="Your email"
          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
          ref={emailRef}
          required
        />
      </div>
      <div>
        <Textarea
          placeholder="Your message"
          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 min-h-[120px]"
          ref={messageRef}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </Button>
      {status === 'success' && <p className="text-green-400 text-sm mt-2">Thank you! Your message has been received.</p>}
      {status === 'error' && <p className="text-red-400 text-sm mt-2">Something went wrong. Please try again.</p>}
    </form>
  );
} 