import Banner from '@/app/component/Common/Banner'
import Breadcrumb from '@/app/component/Common/Breadcrumb'
import LatestOfferSlider from '@/app/component/Common/LatestOfferSlider'
import LatestOpeningSection from '@/app/component/Common/LatestOpeningSection'
import Stores from '@/app/component/Common/Stores'
import { getApiData } from '@/app/utilities/function'
import React from 'react'

export async function generateMetadata() {
  const resp = await getApiData("eat");
  const data = resp?.data?.attributes;


  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    alternates: {
      canonical: data?.seo?.canonicalURL,
    },
  };
}

const Eat = async () => {
  const eatpageData = await getApiData('eat')
  const eatData = eatpageData?.data?.attributes

  const categoryData = await getApiData("eatBrandCategory");
  const categories = categoryData?.data;

  const latestOffers = await getApiData("latest-offers-eat");

  const latestOpeningEat = await getApiData("eatLatestBrands")

  const getGeneralData = await getApiData("general");
  const general = getGeneralData?.data?.attributes;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            eatData?.seo?.structuredData ? eatData?.seo?.structuredData : ""
          ),
        }}
      />
      <Banner
        title={eatData?.banner?.title}
        src={eatData?.banner?.desktopImg?.data?.attributes?.url}
        mobileSrc={eatData?.banner?.mobileImg?.data?.attributes?.url}
      />
      <Breadcrumb />
      <LatestOfferSlider
        title={general?.offerTitle}
        subTitle={general?.offerSubtitle}
        data={latestOffers.data} category="eat" />
      <Stores
        category="eat"
        title={eatData?.exploreSection?.title}
        subTitle={eatData?.exploreSection?.subtitle}
        ctaLink={eatData?.exploreSection?.links?.ctaLink}
        ctaText={eatData?.exploreSection?.links?.ctaText}
        data={categories}
      />
      <LatestOpeningSection
        title={eatData?.latestSection?.title}
        subTitle={eatData?.latestSection?.subtitle}
        ctaText={eatData?.latestSection?.links?.ctaText}
        ctaLink={eatData?.latestSection?.links?.ctaLink}
        data={latestOpeningEat?.data}
        category={"eat"}
      />
    </>
  )
}

export default Eat
