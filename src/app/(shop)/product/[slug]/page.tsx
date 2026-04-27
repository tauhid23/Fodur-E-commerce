// app/products/[slug]/page.tsx
import ProductDetails from "@/components/productDetails/ProductDetail";
import { notFound } from "next/navigation";
import { products } from "@/lib/constants";
import SubscribeSection from "@/components/home/Subscribe";
import FeatureGrid from "@/components/home/FeatureGrid";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-4">
    <ProductDetails product={product} />;
    <SubscribeSection/>
    <FeatureGrid/>
    </div>
  ) 
}