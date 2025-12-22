import SubscribeSection from "../../pages/User/SubscribeSection.jsx";
import MarketplaceHero from "./MarketPlacehero";
import CategorySection from "./CategorySection.jsx";
import TrendingSection from "./TrendingSection.jsx";
import { Separator } from "@radix-ui/react-separator";

const Home = () => {
  
  return (
    <>
      {/* HERO SECTION */}

      <MarketplaceHero/>

      {/* CATEGORY SECTION */}

      <CategorySection/>

      <Separator className="my-8 md:my-16"/>

      {/* TRENDING PRODUCTS */}
     <TrendingSection/>

      {/* NEWSLETTER */}
      <SubscribeSection />
    </>
  );
};

export default Home;
