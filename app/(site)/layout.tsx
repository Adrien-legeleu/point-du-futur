import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden">
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
