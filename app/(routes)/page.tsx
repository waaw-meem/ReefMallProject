import React from 'react'
import HomeBanner from '../component/Homepage/HomeBanner'
import Brands from '../component/Homepage/Brands'
import LatestOffers from '../component/Homepage/LatestOffers'
import Services from '../component/Homepage/Services'
import Amenities from '../component/Homepage/Amenities'
import { getApiData } from '../utilities/function'
import Link from 'next/link'
import Image from 'next/image'

export async function generateMetadata() {
  const resp = await getApiData("home-page");
  const data = resp?.data?.attributes;


  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    alternates: {
      canonical: data?.seo?.canonicalURL,
    },
  };
}

const Homepage = async () => {
  const homePageData = await getApiData('home-page')
  const homeData = homePageData?.data?.attributes

  const brandsData = await getApiData('brands')
  const data = brandsData?.data

  const latestOffers = await getApiData('offer')
  const offerData = latestOffers?.data

  const serviceCardData = await getApiData('service-card')
  const serviceData = serviceCardData?.data;

  const getGeneralData = await getApiData("general");
  const general = getGeneralData?.data?.attributes;


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            homeData?.seo?.structuredData ? homeData?.seo?.structuredData : ""
          ),
        }}
      />
      <HomeBanner data={homeData?.banner} />
      <Brands
        title={homeData?.storeSection?.title}
        subTitle={homeData?.storeSection?.subtitle}
        ctaLink={homeData?.storeSection?.links?.ctaLink}
        ctaText={homeData?.storeSection?.links?.ctaText}
        ctaTarget={homeData?.storeSection?.links?.ctaTarget}
        data={homeData?.brands?.data}
      />
      <LatestOffers
        data={offerData}
        title={general?.offerTitle}
        subTitle={general?.offerSubtitle}
      />
      <Services
        title={homeData?.serviceSection?.title}
        subTitle={homeData?.serviceSection?.subtitle}
        ctaLink={homeData?.serviceSection?.links?.ctaLink}
        ctaText={homeData?.serviceSection?.links?.ctaText}
        ctaTarget={homeData?.serviceSection?.links?.ctaTarget}
        data={serviceData}
      />
      <Amenities
        title={homeData?.amenitiesSection?.title}
        subTitle={homeData?.amenitiesSection?.subtitle}
        ctaLink={homeData?.amenitiesSection?.links?.ctaLink}
        ctaText={homeData?.amenitiesSection?.links?.ctaText}
        ctaTarget={homeData?.amenitiesSection?.links?.ctaTarget}
        data={homeData?.amenities}
      />
      {/* <div className={"chat-wrapper"}>
        {general?.floatingComponent?.map((item: any, index: number) =>
          <Link href={item?.ctaLink} className={"chat-icon-wrapper"} key={index}>
            <Image src={item?.img?.data?.attributes?.url} width={60} height={60} alt="whatsapp icon" className={'whatsapp-icon'} />
          </Link>
        )}
      </div> */}
    </>
  )
}

export default Homepage