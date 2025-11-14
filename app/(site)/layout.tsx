import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
