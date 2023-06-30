import Padder from "@/components/padder";
import { get_request } from "@/assets/js/utils/services";
import Footer from "@/components/footer";
import Hero_banner from "@/components/hero_banner";
import Custom_nav from "@/components/nav";
import Recent_articles from "@/components/recent_articles";
import Top_calculators from "@/components/top_calculators";

export const getServerSideProps = async () => {
  let categories = await get_request("categories");
  let calculators = await get_request("top_calculators/all");

  return { props: { categories, calculators } };
};

const Home = function ({ categories, calculators }) {
  return (
    <div>
      <Custom_nav navs={categories} />
      <Padder />

      <Hero_banner />

      <Top_calculators calculators={calculators} categories={categories} />

      <Recent_articles />

      <Footer navs={categories} />
    </div>
  );
};

export default Home;
