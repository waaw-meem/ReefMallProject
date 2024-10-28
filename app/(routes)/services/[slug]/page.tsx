import Banner from "@/app/component/Common/Banner";
import Breadcrumb from "@/app/component/Common/Breadcrumb";
import TwoColumnContact from "@/app/component/Common/TwoColumnContact";
import TwoColumnDescription from "@/app/component/Common/TwoColumnDescription";
import LatestOffers from "@/app/component/Homepage/LatestOffers";
import { getApiData } from "@/app/utilities/function";
import React from "react";

export async function generateMetadata(param: any) {
  const resp = await getApiData("serviceCard-detail", param.params.slug);
  const data = resp?.data?.attributes;
  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    alternates: {
      canonical: data?.seo?.canonicalURL,
    },
  };
}

const SingleService = async (params: any) => {
  const servicePage = await getApiData("services");
  const servicePageData = servicePage?.data?.attributes;

  const getGeneralData = await getApiData("general");
  const general = getGeneralData?.data?.attributes;

  const singleServiceCard = await getApiData(
    "serviceCard-detail",
    params.params.slug
  );
  const singleCard = singleServiceCard?.data?.attributes;

  console.log(singleCard,"police")

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            singleCard?.seo?.structuredData ? singleCard?.seo?.structuredData : ""
          ),
        }}
      />
      <Banner
        title={singleCard?.title}
        src={singleCard?.desktopImg?.data?.attributes?.url}
        mobileSrc={singleCard?.mobileImg?.data?.attributes?.url}
      />
      <Breadcrumb />
      <TwoColumnDescription
        title={singleCard?.title}
        richText={singleCard?.richTextCopy}
        img={singleCard?.img?.data?.attributes?.url}
      />
      <LatestOffers
        title={general?.offerTitle}
        subTitle={general?.offerSubtitle}
        data={singleCard?.brand_offers?.data}
      />
      <TwoColumnContact
        img={singleCard?.introductionImg?.data?.attributes?.url}
        email={singleCard?.email}
        phone={singleCard?.phone}
        businessHour={singleCard?.operationalHours}
      />
    </>
  );
};

export default SingleService;
