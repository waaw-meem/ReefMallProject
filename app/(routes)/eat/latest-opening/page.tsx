import Banner from '@/app/component/Common/Banner'
import Breadcrumb from '@/app/component/Common/Breadcrumb'
import LatestOpeningsSection from '@/app/component/LatestOpening'
import { getApiData } from '@/app/utilities/function'
import React from 'react'


export async function generateMetadata() {
    const resp = await getApiData("latest-opening-eat-page");
    const data = resp?.data?.attributes;


    return {
        title: data?.seo?.metaTitle,
        description: data?.seo?.metaDescription,
        alternates: {
            canonical: data?.seo?.canonicalURL,
        },
    };
}


const LatestOpenings = async () => {

    const brands = await getApiData("eatLatestBrands");
    const getPageData = await getApiData("latest-opening-eat-page")
    const latestOpening = getPageData?.data?.attributes;


    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        latestOpening?.seo?.structuredData ? latestOpening?.seo?.structuredData : ""
                    ),
                }}
            />
            <Banner
                title={latestOpening?.banner?.title}
                src={latestOpening?.banner?.desktopImg?.data?.attributes?.url}
                mobileSrc={latestOpening?.banner?.mobileImg?.data?.attributes?.url}
            />
            <Breadcrumb />
            <LatestOpeningsSection
                brands={brands?.data}
                title={latestOpening?.latestSubtitle}
                subTitle={latestOpening?.latestTitle}
            />
        </>
    )
}

export default LatestOpenings