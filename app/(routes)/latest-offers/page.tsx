import Banner from '@/app/component/Common/Banner'
import Breadcrumb from '@/app/component/Common/Breadcrumb'
import Offers from '@/app/component/Offers'
import { getApiData } from '@/app/utilities/function'
import React from 'react'



export async function generateMetadata() {
    const resp = await getApiData("offers-page");
    const data = resp?.data?.attributes;


    return {
        title: data?.seo?.metaTitle,
        description: data?.seo?.metaDescription,
        alternates: {
            canonical: data?.seo?.canonicalURL,
        },
    };
}

const LatestOffer = async () => {

    const offers = await getApiData("offers");
    const getOfferPage = await getApiData("offers-page");

    const offersPage = getOfferPage?.data?.attributes;
    console.log(offers.data,"offers")

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        offersPage?.seo?.structuredData ? offersPage?.seo?.structuredData : ""
                    ),
                }}
            />
            <Banner
                title={offersPage?.banner?.title}
                src={offersPage?.banner?.desktopImg?.data?.attributes?.url}
                mobileSrc={offersPage?.banner?.mobileImg?.data?.attributes?.url}
            />
            <Breadcrumb />
            <Offers
                title={offersPage?.banner?.title}
                ctaText={offersPage?.ctaText}
                data={offers?.data} />
        </>
    )
}

export default LatestOffer
