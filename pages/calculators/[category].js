import { useRouter } from "next/router";
import Section_header from "@/components/section_header";
import Custom_nav from "@/components/nav";
import Footer from "@/components/footer";
import Cat_calcs from "@/components/cat_calcs";
import Breadcrumb_banner from "@/components/breadcrumb";
import { get_request, post_request } from "@/assets/js/utils/services";

export const getServerSideProps = async (context) => {
  let category = await get_request(`category/categories~${context.query._id}`);

  let categories = await get_request("categories");

  return { props: { categories, category } };
};

const Category = ({ categories, category }) => {
  let { query } = useRouter();
  let cat_title = query.category.replace(/%20/g, " ");

  return (
    <div>
      <Custom_nav page="category" navs={categories} />
      <Breadcrumb_banner title={cat_title} page="Calculator Categories" />
      <section className="gray">
        <div className="container">
          <Section_header
            title={cat_title}
            description={`Specific calculators to ${cat_title}`}
          />
          <Cat_calcs categories={categories} category={category} />
        </div>
      </section>
      <Footer navs={categories} />
    </div>
  );
};

export default Category;
