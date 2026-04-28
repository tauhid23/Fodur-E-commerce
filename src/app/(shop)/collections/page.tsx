import ProductCollection from "@/components/collections/ProductCollection";
import FeatureGrid from "@/components/home/FeatureGrid";
import SubscribeSection from "@/components/home/Subscribe";
import { products } from "@/lib/constants";

export const metadata = {
  title: "All Collections",
  description: "Browse all products in our collection.",
};

export default async function CollectionsPage() {
  return (
    <div className="space-y-10">
      <ProductCollection
        initialCategory="all"
        initialProducts={products} 
      />
      <SubscribeSection />
      <FeatureGrid />
    </div>
  );
}