import Banner from '@/app/component/Common/Banner'
import BrandDetailComponent from '@/app/component/BrandDetail'
import Breadcrumb from '@/app/component/Common/Breadcrumb'
import React from 'react'
import { getApiData } from '@/app/utilities/function'
import TwoColumnDescription from '@/app/component/Common/TwoColumnDescription'
import TwoColumnContact from '@/app/component/Common/TwoColumnContact'
import Gallery from '@/app/component/Common/Gallery'
import VideoSection from '@/app/component/BrandDetail/Video'
import LatestOfferSlider from '@/app/component/Common/LatestOfferSlider'
import NotFound from '@/app/not-found'



export async function generateMetadata(param: any) {
  const resp = await getApiData("brand-detail", param.params.name);
  const data = resp?.data?.attributes;
  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    alternates: {
      canonical: data?.seo?.canonicalURL,
    },
  };
}

const EatBrandDetail = async (param: any) => {

  const getBrandDetail = await getApiData('brand-detail', param?.params?.name);

  const brandDetail = getBrandDetail?.data

  const getGeneralData = await getApiData("general");
  const general = getGeneralData?.data?.attributes;

  console.log(brandDetail)


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBrandDetail?.data?.attributes?.seo?.structuredData ? getBrandDetail?.data?.attributes?.seo?.structuredData : ""
          ),
        }}
      />
      {getBrandDetail?.data !== null ?
        <>
          <Banner
            title={brandDetail?.attributes?.title}
            src={brandDetail?.attributes?.desktopImgUrl}
            mobileSrc={brandDetail?.attributes?.mobileImgUrl}
          />
          <Breadcrumb />
          <TwoColumnDescription
            data={brandDetail?.attributes?.brand_categories?.data}
            logo={brandDetail?.attributes?.logoUrl}
            richText={brandDetail?.attributes?.richTextCopy}
            img={brandDetail?.attributes?.introductionImgUrl}
          />
          <TwoColumnContact
            img={brandDetail?.attributes?.brandInfoImgUrl}
            email={brandDetail?.attributes?.email}
            phone={brandDetail?.attributes?.phone}
            businessHour={brandDetail?.attributes?.businessHours}
          />
          <Gallery
            title={brandDetail?.attributes?.brandGalleryDetails?.title}
            data={brandDetail?.attributes?.brandGalleryDetails?.brandImages}
          />
          {brandDetail?.attributes?.videoSection?.videoLink &&
            <VideoSection
              title={brandDetail?.attributes?.videoSection?.title}
              desc={brandDetail?.attributes?.videoSection?.desc}
              videoLink={brandDetail?.attributes?.videoSection?.videoLink}
              thumbnail={brandDetail?.attributes?.videoSection?.thumbnailUrl}
            />
          }
          <LatestOfferSlider
            title={general?.offerTitle}
            subTitle={general?.offerSubtitle}
            data={brandDetail?.attributes?.brand_offers?.data} />
        </>
        :
        <NotFound />
      }
    </>

  )
}

export default EatBrandDetail