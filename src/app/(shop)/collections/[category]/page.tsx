import ProductCollection from "@/components/collections/ProductCollection";
import FeatureGrid from "@/components/home/FeatureGrid";
import SubscribeSection from "@/components/home/Subscribe";
import { products } from "@/lib/constants";
import { notFound, redirect } from "next/navigation";

// "all" is intentionally excluded — it lives at /collections (no segment)
const validCategories = ["men", "women", "kids"] as const;
type Category = (typeof validCategories)[number];

// Next.js 15: params is a Promise
type PageProps = {
  params: Promise<{ category: string }>;
};

async function getProductsByCategory(category: Category) {
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params; // ✅ await params
  const lower = category.toLowerCase();

  if (!validCategories.includes(lower as Category)) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${lower.charAt(0).toUpperCase() + lower.slice(1)} Collection`,
    description: `Browse ${lower} products in our collection.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params; //  await params
  const lower = category.toLowerCase();

  // /collections/all → redirect to /collections
  if (lower === "all") redirect("/collections");

  // Any other invalid segment → 404
  if (!validCategories.includes(lower as Category)) notFound();

  const filteredProducts = await getProductsByCategory(lower as Category);

  return (
    <div className="space-y-10">
      <ProductCollection
        initialCategory={lower as Category}
        initialProducts={filteredProducts}
      />
      <SubscribeSection />
      <FeatureGrid />
    </div>
  );
}