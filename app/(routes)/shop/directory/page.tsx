import Banner from "@/app/component/Common/Banner";
import Breadcrumb from "@/app/component/Common/Breadcrumb";
import DirectorySection from "@/app/component/Directory";
import { getApiData } from "@/app/utilities/function";
import React from "react";


export async function generateMetadata() {
  const resp = await getApiData("directory");
  const data = resp?.data?.attributes;


  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    alternates: {
      canonical: data?.seo?.canonicalURL,
    },
  };
}

const Directory = async () => {
  const brandsData = await getApiData("brands");
  const brands = brandsData?.data;
  const getDirectory = await getApiData("directory");
  const directory = getDirectory?.data?.attributes

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            directory?.seo?.structuredData ? directory?.seo?.structuredData : ""
          ),
        }}
      />
      <Banner
        title={directory?.banner?.title}
        src={directory?.banner?.desktopImg?.data?.attributes?.url}
        mobileSrc={directory?.banner?.mobileImg?.data?.attributes?.url}
      />
      <Breadcrumb />
      <DirectorySection
        title={directory?.headings?.title}
        subTitle={directory?.headings?.desc}
        data={brands} />
    </>
  );
};

export default Directory;
