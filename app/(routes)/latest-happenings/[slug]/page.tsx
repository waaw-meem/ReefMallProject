// "use client"

import Banner from "@/app/component/Common/Banner"
import Breadcrumb from "@/app/component/Common/Breadcrumb"
import { getApiData } from "@/app/utilities/function"
import TwoColumnDescription from "@/app/component/Common/TwoColumnDescription"
import RelatedEvent from "@/app/component/LatestHappeningDetail/RelatedEvent"



export async function generateMetadata(param: any) {
    const resp = await getApiData("event-detail", param.params.slug);
    const data = resp?.data?.attributes;
    return {
        title: data?.seo?.metaTitle,
        description: data?.seo?.metaDescription,
        alternates: {
            canonical: data?.seo?.canonicalURL,
        },
    };
}

const LatestHappeningDetail = async (params: any) => {
    const getEventDetail = await getApiData('event-detail', params?.params?.slug);
    const event = getEventDetail?.data?.attributes;

    const getGeneralData = await getApiData("general");
    const general = getGeneralData?.data?.attributes;


    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        event?.seo?.structuredData ? event?.seo?.structuredData : ""
                    ),
                }}
            />
            <Banner
                title={event?.title}
                src={event?.desktopImg?.data?.attributes?.url}
                mobileSrc={event?.mobileImg?.data?.attributes?.url}
            />
            <Breadcrumb />
            <TwoColumnDescription
                img={event?.introductionImg?.data?.attributes?.url}
                title={event?.title}
                richText={event?.richTextCopy}
                id={getEventDetail?.data?.id}
                reverse={true}
                ctaText={general?.reserveNowBtnText}
            />
            <RelatedEvent detailId={getEventDetail?.data?.id} category={event?.event_categories} />
        </>
    )
}

export default LatestHappeningDetail