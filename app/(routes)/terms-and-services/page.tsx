import Banner from '@/app/component/Common/Banner'
import Breadcrumb from '@/app/component/Common/Breadcrumb'
import React from 'react'
import TermsAndServices from '@/app/component/TermsandServices'
import { getApiData } from '@/app/utilities/function'
import { Metadata } from "next";


export async function generateMetadata() {
  const resp = await getApiData("terms-and-services");
  const data = resp?.data?.attributes;


  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    alternates: {
      canonical: data?.seo?.canonicalURL,
    },
  };
}


const Terms = async () => {

  const termsAndServicesData = await getApiData('terms-and-services')
  const termsData = termsAndServicesData?.data?.attributes

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            termsData?.seo?.structuredData ? termsData?.seo?.structuredData : ""
          ),
        }}
      />
      <Banner
        title={termsData?.banner?.title}
        src={termsData?.banner?.desktopImg?.data?.attributes?.url}
        mobileSrc={termsData?.banner?.mobileImg?.data?.attributes?.url}
      />
      <Breadcrumb />
      <TermsAndServices desc={termsData?.richTextCopy} />
    </>
  )
}

export default Terms
