import Banner from "@/app/component/Common/Banner"
import Breadcrumb from "@/app/component/Common/Breadcrumb"
import CategoryList from "@/app/component/Common/CategoryList"
import { getApiData } from "@/app/utilities/function"


export async function generateMetadata() {
  const resp = await getApiData("eatCategoryPage");
  const data = resp?.data?.attributes;


  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    alternates: {
      canonical: data?.seo?.canonicalURL,
    },
  };
}

const EatCategory = async () => {
  const eatCategoryData = await getApiData('eatCategoryPage')
  const pageData = eatCategoryData?.data?.attributes

  const categories = await getApiData('eatBrandCategory')
  const categoriesData = categories?.data

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
        category={"eat"}
        title={pageData?.exploreTitle}
        subTitle={pageData?.exploreSubtitle}
        data={categoriesData}
      />
    </>
  )
}

export default EatCategory