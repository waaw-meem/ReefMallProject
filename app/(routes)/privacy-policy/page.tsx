import Banner from '@/app/component/Common/Banner'
import Breadcrumb from '@/app/component/Common/Breadcrumb'
import PrivacyPolicyPage from '@/app/component/PrivacyPolicy'
import { getApiData } from '@/app/utilities/function'
import React from 'react'


export async function generateMetadata() {
  const resp = await getApiData("privacy-policy");
  const data = resp?.data?.attributes;


  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    alternates: {
      canonical: data?.seo?.canonicalURL,
    },
  };
}

const PrivacyPolicy = async () => {
  const privacyPolicyData = await getApiData('privacy-policy')
  const pageData = privacyPolicyData?.data?.attributes
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
      <PrivacyPolicyPage desc={pageData?.richTextCopy} />
    </>
  )
}

export default PrivacyPolicy
