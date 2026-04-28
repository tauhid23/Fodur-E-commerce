import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import UpperBanner from "@/components/layout/UpperBanner";

interface ShopLayoutProps {
  children: React.ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <UpperBanner/>
      <Navbar />
      <main className="flex-1 ">
        {children}
      </main>
      <Footer />
    </div>
  );
}
