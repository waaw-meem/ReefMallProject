import Banner from "@/app/component/Common/Banner"
import Breadcrumb from "@/app/component/Common/Breadcrumb"
import ServicesComponent from "@/app/component/ServicesComponent"
import { getApiData } from "@/app/utilities/function"



export async function generateMetadata() {
    const resp = await getApiData("services");
    const data = resp?.data?.attributes;


    return {
        title: data?.seo?.metaTitle,
        description: data?.seo?.metaDescription,
        alternates: {
            canonical: data?.seo?.canonicalURL,
        },
    };
}

const Services = async () => {

    const servicePage = await getApiData('services')
    const servicePageData = servicePage?.data?.attributes

    const serviceCard = await getApiData('service-card')
    const serviceCardData = serviceCard?.data

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        servicePageData?.seo?.structuredData ? servicePageData?.seo?.structuredData : ""
                    ),
                }}
            />
            <Banner
                title={servicePageData?.banner?.title}
                src={servicePageData?.banner?.desktopImg?.data?.attributes?.url}
                mobileSrc={servicePageData?.banner?.mobileImg?.data?.attributes?.url}
            />
            <Breadcrumb />
            <ServicesComponent
                title={servicePageData?.headings?.title}
                desc={servicePageData?.headings?.desc}
                data={serviceCardData}
            />
        </>
    )
}

export default Services