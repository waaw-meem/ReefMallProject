import Banner from "@/app/component/Common/Banner";
import Breadcrumb from "@/app/component/Common/Breadcrumb";
import React from "react";
import TwoColumnDescription from "@/app/component/Common/TwoColumnDescription";
import { getApiData } from "@/app/utilities/function";

export async function generateMetadata(param: any) {
  const resp = await getApiData("offer-detail", param.params.slug);
  const data = resp?.data?.attributes;
  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    alternates: {
      canonical: data?.seo?.canonicalURL,
    },
  };
}

const OfferDetail = async (params: any) => {
  const getOfferDetail = await getApiData("offer-detail", params?.params?.slug);

  const offerData = getOfferDetail?.data?.attributes;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            offerData?.seo?.structuredData ? offerData?.seo?.structuredData : ""
          ),
        }}
      />
      <Banner
        title={offerData?.title}
        src={offerData?.desktopImgUrl}
        mobileSrc={offerData?.mobileImgUrl}
      />
      <Breadcrumb />
      <TwoColumnDescription
        logo={offerData?.brand?.data?.attributes?.logoUrl}
        richText={offerData?.richTextCopy}
        img={offerData?.mainImgUrl}
      />
    </>
  );
};

export default OfferDetail;
