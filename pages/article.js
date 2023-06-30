import Breadcrumb_banner from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Contact_us_today from "@/components/contact_us_today";
import Custom_nav from "@/components/nav";
import Article_body from "@/article/article_body";
import { get_request } from "@/assets/js/utils/services";

export const getServerSideProps = async (context) => {
  let navs = await get_request("categories");
  let article = await get_request(`article/${context.query._id}`);

  return { props: { navs, article } };
};

const Article = ({ navs, article }) => {
  return (
    <div className="blog-page">
      <div id="main-wrapper">
        <Custom_nav page="article" navs={navs} />
        <div className="clearfix"></div>
        <Breadcrumb_banner page="Article" title={article?.title} no_gray />

        <Article_body article={article} />

        <Contact_us_today />

        <Footer navs={navs} />
      </div>
    </div>
  );
};

export default Article;
