// Tailwind v4-optimized Home.jsx
import { useState, useEffect, useContext} from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import SubscribeSection from "../../pages/User/SubscribeSection.jsx";
import MarketplaceHero from "./MarketPlacehero";
import CategorySection from "./CategorySection.jsx";
import TrendingSection from "./TrendingSection.jsx";
import RecommendationSection from "./RecommendationSection.jsx";
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

      {/* RECOMMENDATIONS */}
     <RecommendationSection/>

      {/* NEWSLETTER */}
      <SubscribeSection />
    </>
  );
};

export default Home;
