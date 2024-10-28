import Banner from '@/app/component/Common/Banner'
import Breadcrumb from '@/app/component/Common/Breadcrumb'
import React from 'react'
import CuisinesListing from '@/app/component/CuisinesListing/CuisinesListing'
import { getApiData } from '@/app/utilities/function'


export async function generateMetadata() {
  const resp = await getApiData("cuisines");
  const data = resp?.data?.attributes;


  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    alternates: {
      canonical: data?.seo?.canonicalURL,
    },
  };
}

const Cuisines = async () => {

  const brands = await getApiData("eatBrands");
  const getCuisine = await getApiData("cuisines")
  const getCuisineCategory =  await getApiData("cuisines-category")
  const cuisines = getCuisine?.data?.attributes;
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            cuisines?.seo?.structuredData ? cuisines?.seo?.structuredData : ""
          ),
        }}
      />
      <Banner
        title={cuisines?.banner?.title}
        src={cuisines?.banner?.desktopImg?.data?.attributes?.url}
        mobileSrc={cuisines?.banner?.mobileImg?.data?.attributes?.url}
      />
      <Breadcrumb />
      <CuisinesListing
        title={cuisines?.title}
        subtitle={cuisines?.subtitle}
        sortHeading="Sort & Filter"
        cuisineData={brands.data}
        categories={getCuisineCategory?.data}
        totalBrandsCount={brands?.meta?.pagination?.total}
      />
    </>
  )
}

export default Cuisines
