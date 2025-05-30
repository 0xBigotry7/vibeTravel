"use client";

import { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SubscribeForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("New subscription:", { name, email });
    setMessage(`Thank you for subscribing, ${name}!`);
    setName('');
    setEmail('');
    // Optionally, clear message after a few seconds
    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Input
          type="text"
          placeholder="Your name"
          className="border-slate-200"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Input
          type="email"
          placeholder="Your email"
          className="border-slate-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600">
        Subscribe to Beehiiv Blog
      </Button>
      {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
    </form>
  );
}
