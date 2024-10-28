import Banner from '@/app/component/Common/Banner'
import Breadcrumb from '@/app/component/Common/Breadcrumb'
import React from 'react'
import TwoColumnDescription from '@/app/component/Common/TwoColumnDescription'
import TwoColumnContact from '@/app/component/Common/TwoColumnContact'
import Gallery from '@/app/component/Common/Gallery'
import VideoSection from '@/app/component/BrandDetail/Video'
import LatestOfferSlider from '@/app/component/Common/LatestOfferSlider'
import { getApiData } from '@/app/utilities/function'
import moment from 'moment'
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

const BrandDetail = async (param: any) => {

  const getBrandDetail = await getApiData('brand-detail', param?.params?.name);

  const brandDetail = getBrandDetail?.data?.attributes;

  const getGeneralData = await getApiData("general");
  const general = getGeneralData?.data?.attributes;



  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            brandDetail?.seo?.structuredData ? brandDetail?.seo?.structuredData : ""
          ),
        }}
      />
      {getBrandDetail?.data !== null ?
        <>
          <Banner
            title={brandDetail?.title}
            src={brandDetail?.desktopImgUrl}
            mobileSrc={brandDetail?.mobileImgUrl}
          />
          <Breadcrumb />
          <TwoColumnDescription
            data={brandDetail?.brand_categories?.data}
            logo={brandDetail?.logoUrl}
            richText={brandDetail?.richTextCopy}
            img={brandDetail?.introductionImgUrl}
          />
          <TwoColumnContact
            img={brandDetail?.brandInfoImgUrl}
            email={brandDetail?.email}
            phone={brandDetail?.phone}
            businessHour={brandDetail?.businessHours}
            title={general?.brandInfoTitle}
            subTitle={general?.brandInfoSubtitle}
          />
          <Gallery
            title={brandDetail?.brandGalleryDetails?.title}
            subTitle={general?.gallerySubtitle}
            data={brandDetail?.brandGalleryDetails?.brandImages}
          />
          {brandDetail?.videoSection?.videoLink &&
            <VideoSection
              title={brandDetail?.videoSection?.title}
              desc={brandDetail?.videoSection?.desc}
              videoLink={brandDetail?.videoSection?.videoLink}
              thumbnail={brandDetail?.videoSection?.thumbnailUrl}
            />
          }
          <LatestOfferSlider
            title={general?.offerTitle}
            subTitle={general?.offerSubtitle}
            data={brandDetail?.brand_offers?.data} />
        </>
        :
        <NotFound />
      }
    </>
  )
}

export default BrandDetail