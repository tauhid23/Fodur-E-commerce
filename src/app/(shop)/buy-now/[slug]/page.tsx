// import BuyNow from "@/components/buyNow/BuyNow";
import BuyNoww from "@/components/buyNow/BuyNoww";
import { products } from "@/lib/constants";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const { slug } = await Promise.resolve(params);

  const product = products.find((p) => p.slug === slug);

  if (!product) return notFound();

  return <BuyNoww product={product} />;
}