import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'actionspeak | signin',
  description: 'Connect with customers via actionspeak',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
