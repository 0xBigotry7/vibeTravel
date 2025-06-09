"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <div style={{ padding: 40, textAlign: 'center' }}>
          <h2>Something went wrong!</h2>
          <pre style={{ color: 'red' }}>{error.message}</pre>
          <button onClick={() => reset()}>Try again</button>
        </div>
      </body>
    </html>
  );
} 