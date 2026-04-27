import BigCategory from "@/components/home/BigCategory";
import CategorySection from "@/components/home/CategorySection";
import FeatureGrid from "@/components/home/FeatureGrid";
import HomeHero from "@/components/home/HomeHero";
import InfoSlider from "@/components/home/InfoSlider";
import ReviewSection from "@/components/home/ReviewSection";
import SubscribeSection from "@/components/home/Subscribe";

export default function Home() {
  return (
    <div className=" space-y-7">
      <HomeHero/>
      <CategorySection/>
      <div className="h-px w-full bg-foreground/50"></div>
      <ReviewSection/>
      <BigCategory/>
      <InfoSlider/>
      <div className="h-px w-full bg-foreground/50"></div>
      <SubscribeSection/>
      <FeatureGrid/>
    </div>
  );
}
