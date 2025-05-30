"use client";

import { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessageContent] = useState(''); // Renamed to avoid conflict with SubscribeForm's message
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("New contact message:", { name, email, message });
    setStatusMessage(`Thank you for your message, ${name}! We will get back to you soon.`);
    setName('');
    setEmail('');
    setMessageContent('');
    // Optionally, clear message after a few seconds
    setTimeout(() => setStatusMessage(''), 5000);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Input
          type="text"
          placeholder="Your name"
          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Input
          type="email"
          placeholder="Your email"
          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Textarea
          placeholder="Your message"
          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 min-h-[120px]"
          value={message}
          onChange={(e) => setMessageContent(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600">
        Send Message
      </Button>
      {statusMessage && <p className="text-sm text-green-500 mt-2">{statusMessage}</p>}
    </form>
  );
}
