import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <main>{children}</main>
    </div>
  );
}
