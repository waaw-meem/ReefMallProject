import Banner from "@/app/component/Common/Banner";
import Breadcrumb from "@/app/component/Common/Breadcrumb";
import CategoryList from "@/app/component/Common/CategoryList";
import { getApiData } from "@/app/utilities/function";
import { Metadata } from "next";


export async function generateMetadata() {
  const resp = await getApiData("shopCategoryPage");
  const data = resp?.data?.attributes;


  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    alternates: {
      canonical: data?.seo?.canonicalURL,
    },
  };
}

const ShopCategories = async () => {

  const data = await getApiData("shopCategoryPage");
  const pageData = data?.data?.attributes;

  const categoryData = await getApiData("ShopCategories");
  const categories = categoryData?.data;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageData?.seo?.structuredData ? pageData?.seo?.structuredData : ""
          ),
        }}
      />
      <Banner
        title={pageData?.banner?.title}
        src={pageData?.banner?.desktopImg?.data?.attributes?.url}
        mobileSrc={pageData?.banner?.mobileImg?.data?.attributes?.url}
      />
      <Breadcrumb />
      <CategoryList
        category={"shop"}
        title={pageData?.storeTitle}
        subTitle={pageData?.storeSubtitle}
        data={categories}
      />
    </>
  );
};

export default ShopCategories;
