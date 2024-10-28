import Banner from '@/app/component/Common/Banner'
import Breadcrumb from '@/app/component/Common/Breadcrumb'
import GiftCardComponent from '@/app/component/GiftCardComponent'
import InformationPolicyComponent from '@/app/component/InformationPolicyComponent'
import React from 'react'
import { getApiData } from '@/app/utilities/function'


export async function generateMetadata() {
  const resp = await getApiData("giftCardPage");
  const data = resp?.data?.attributes;


  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    alternates: {
      canonical: data?.seo?.canonicalURL,
    },
  };
}

const GiftCard = async () => {

  const giftCardPage = await getApiData('giftCardPage')
  const pagedata = giftCardPage?.data?.attributes

  const giftCards = await getApiData('cards')
  const giftCardsData = giftCards?.data

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pagedata?.seo?.structuredData ? pagedata?.seo?.structuredData : ""
          ),
        }}
      />
      <Banner
        title={pagedata?.banner?.title}
        src={pagedata?.banner?.desktopImg?.data?.attributes?.url}
        mobileSrc={pagedata?.banner?.mobileImg?.data?.attributes?.url}
      />
      <Breadcrumb />
      <GiftCardComponent title={pagedata?.headingSection?.title} subTitle={pagedata?.headingSection?.desc} tabs={pagedata?.tabs} data={giftCardsData} />
      <InformationPolicyComponent points={pagedata?.richTextCopy} />
    </>
  )
}

export default GiftCard