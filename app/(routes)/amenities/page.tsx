import AmenitiesComp from "@/app/component/AmenitiesComp";
import Banner from "@/app/component/Common/Banner";
import { getApiData } from "@/app/utilities/function";



export async function generateMetadata() {
  const resp = await getApiData("amenities");
  const data = resp?.data?.attributes;


  return {
    title: data?.seo?.metaTitle,
    description: data?.seo?.metaDescription,
    alternates: {
      canonical: data?.seo?.canonicalURL,
    },
  };
}

const services = async () => {
  const data = await getApiData("amenities");
  const amenities = data?.data?.attributes

  return (
    <>
     <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            amenities?.seo?.structuredData ? amenities?.seo?.structuredData : ""
          ),
        }}
      />
      <Banner
        title={amenities?.banner?.title}
        src={amenities?.banner?.desktopImg?.data?.attributes?.url}
        mobileSrc={amenities?.banner?.mobileImg?.data?.attributes?.url}
      />
      <AmenitiesComp
        richText={amenities?.richTextCopy}
        title={amenities?.headings?.title}
        subTitle={amenities?.headings?.desc}
        data={amenities?.services}
      />
    </>
  );
};

export default services;
