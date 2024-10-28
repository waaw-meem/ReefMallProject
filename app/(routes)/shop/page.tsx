import Banner from "@/app/component/Common/Banner";
import Breadcrumb from "@/app/component/Common/Breadcrumb";
import LatestOfferSlider from "@/app/component/Common/LatestOfferSlider";
import LatestOpeningSection from "@/app/component/Common/LatestOpeningSection";
import Stores from "@/app/component/Common/Stores";
import { getApiData } from "@/app/utilities/function";



export async function generateMetadata() {
  const resp = await getApiData("shop");
  const data = resp?.data?.attributes;


  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    alternates: {
      canonical: data?.seo?.canonicalURL,
    },
  };
}

const Shop = async () => {
  const data = await getApiData("shop");
  const shopData = data?.data?.attributes;

  const categoryData = await getApiData("ShopCategories");
  const categories = categoryData?.data;

  const latestOpeningShop = await getApiData("shopLatestBrands")

  const latestOffers = await getApiData("latest-offers-shop");

  const getGeneralData = await getApiData("general");
  const general = getGeneralData?.data?.attributes;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            shopData?.seo?.structuredData ? shopData?.seo?.structuredData : ""
          ),
        }}
      />
      <Banner
        title={shopData?.banner?.title}
        src={shopData?.banner?.desktopImg?.data?.attributes?.url}
        mobileSrc={shopData?.banner?.mobileImg?.data?.attributes?.url}
      />
      <Breadcrumb />
      <LatestOfferSlider
        title={general?.offerTitle}
        subTitle={general?.offerSubtitle}
        data={latestOffers?.data} category="shop" />
      <Stores
        category="shop"
        title={shopData?.exploreSection?.title}
        subTitle={shopData?.exploreSection?.subtitle}
        ctaLink={shopData?.exploreSection?.links?.ctaLink}
        ctaText={shopData?.exploreSection?.links?.ctaText}
        ctaTarget={shopData?.exploreSection?.links?.ctaTarget}
        data={categories}
      />
      <LatestOpeningSection
        title={shopData?.latestOpeningSection?.title}
        subTitle={shopData?.latestOpeningSection?.subtitle}
        ctaText={shopData?.latestOpeningSection?.links?.ctaText}
        ctaLink={shopData?.latestOpeningSection?.links?.ctaLink}
        ctaTarget={shopData?.latestOpeningSection?.links?.ctaTarget}
        data={latestOpeningShop?.data}
        category="shop"
      />
    </>
  );
};

export default Shop;
