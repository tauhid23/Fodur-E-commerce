import ProductCollection from "@/components/collections/ProductCollection";
import FeatureGrid from "@/components/home/FeatureGrid";
import SubscribeSection from "@/components/home/Subscribe";

export default function CollectionsPage() {
  return (
    <div className="space-y-10">
      <ProductCollection />
      <SubscribeSection/>
      <FeatureGrid/>
    </div>
  );
}