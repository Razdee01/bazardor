import AllProducts from "@/components/AllProducts";
import Hero from "@/components/Hero";
import Marque from "@/components/Marque";
import PriceDecreased from "@/components/PriceDecreased";
import PriceIncreased from "@/components/PriceIncreased";


export default function Home() {
  return (
    <div>
      <Marque></Marque>
      <Hero></Hero>
      <PriceIncreased></PriceIncreased>
      <PriceDecreased></PriceDecreased>
      <AllProducts></AllProducts>
    </div>
  );
}
