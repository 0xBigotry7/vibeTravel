import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>404 - Page Not Found</h2>
      <Link href="/">Go Home</Link>
    </div>
  );
} 