import Breadcrumb_banner from "@/components/breadcrumb";
import { get_request } from "@/assets/js/utils/services";
import Custom_nav from "@/components/nav";
import Section_header from "@/components/section_header";
import Calculator_details from "@/components/calculator_details";
import { useRouter } from "next/router";
import Footer from "@/components/footer";

export const getServerSideProps = async (context) => {
  let calculator = await get_request(
    `calculator/calculators~${context.query._id}`
  );
  let categories = await get_request("categories");
  return { props: { categories, calculator } };
};

const Calculator = ({ calculator, categories }) => {
  let { query } = useRouter();
  let calc_title = query.calculator.replace(/%20/g, " ");

  return (
    <div>
      <Custom_nav navs={categories} />
      <Breadcrumb_banner title={calc_title} page="Calculator" />

      <section className="gray">
        <div className="container">
          <Section_header
            title={calc_title}
            description={`Specific calculation to ${calc_title || "-"}`}
          />

          <Calculator_details calculator={calculator} categories={categories} />
        </div>
      </section>
      <Footer navs={categories} />
    </div>
  );
};

export default Calculator;
