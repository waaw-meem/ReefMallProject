import Banner from '@/app/component/Common/Banner'
import Breadcrumb from '@/app/component/Common/Breadcrumb'
import FaqComponent from '@/app/component/Faq'
import React from 'react'
import { getApiData } from '@/app/utilities/function'


export async function generateMetadata() {
  const resp = await getApiData("faq");
  const data = resp?.data?.attributes;


  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    alternates: {
      canonical: data?.seo?.canonicalURL,
    },
  };
}


const FAQ = async () => {
  const faqPageData = await getApiData('faq')
  const faqData = faqPageData?.data?.attributes


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqData?.seo?.structuredData ? faqData?.seo?.structuredData : ""
          ),
        }}
      />
      <Banner
        title={faqData?.banner?.title}
        src={faqData?.banner?.desktopImg?.data?.attributes?.url}
        mobileSrc={faqData?.banner?.mobileImg?.data?.attributes?.url}
      />
      <Breadcrumb />
      <FaqComponent data={faqData?.faqs} />
    </>
  )
}

export default FAQ
