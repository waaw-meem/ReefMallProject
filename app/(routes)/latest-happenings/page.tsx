import Banner from "@/app/component/Common/Banner"
import Breadcrumb from "@/app/component/Common/Breadcrumb"
import LatestOfferSlider from "@/app/component/Common/LatestOfferSlider"
import EventsComponent from "@/app/component/LatestHappenings/EventsComponent"
import { getApiData } from "@/app/utilities/function"



export async function generateMetadata() {
    const resp = await getApiData("latest-happenings");
    const data = resp?.data?.attributes;


    return {
        title: data?.seo?.metaTitle,
        description: data?.seo?.metaDescription,
        alternates: {
            canonical: data?.seo?.canonicalURL,
        },
    };
}

const LatestHappening = async () => {
    const getLatestHappening = await getApiData('latest-happening');
    const getOffers = await getApiData('offer');
    const getEvents = await getApiData("event-by-date");

    const latestHappening = getLatestHappening?.data?.attributes;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        latestHappening?.seo?.structuredData ? latestHappening?.seo?.structuredData : ""
                    ),
                }}
            />
            <Banner
                title={latestHappening?.banner?.title}
                src={latestHappening?.banner?.desktopImg?.data?.attributes?.url}
                mobileSrc={latestHappening?.banner?.mobileImg?.data?.attributes?.url}
            />
            <Breadcrumb />
            <LatestOfferSlider title={latestHappening?.offerSubtitle} subTitle={latestHappening?.offerTitle} data={getOffers?.data} />
            {/* <TwoColumnDescription
                img={latestHappening?.eventReserveSection?.img?.data?.attributes?.url}
                richText={latestHappening?.eventReserveSection?.richTextCopy}
                ctaLink={latestHappening?.eventReserveSection?.links?.ctaLink}
                ctaText={latestHappening?.eventReserveSection?.links?.ctaText}
                title={latestHappening?.eventReserveSection?.title}
            /> */}
            {getEvents?.data?.length > 0 &&
                <EventsComponent
                    title={latestHappening?.eventsHeadingSection?.title}
                    subTitle={latestHappening?.eventsHeadingSection?.desc}
                    data={getEvents?.data} />
            }
        </>
    )
}

export default LatestHappening