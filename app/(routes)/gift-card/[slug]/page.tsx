import Banner from '@/app/component/Common/Banner';
import Breadcrumb from '@/app/component/Common/Breadcrumb';
import GiftCardDetail from '@/app/component/GiftCardDetail';
import { getApiData } from '@/app/utilities/function';



export async function generateMetadata(param: any) {
    const resp = await getApiData("giftCard-detail", param.params.slug);
    const data = resp?.data?.attributes;
    return {
        title: data?.seo?.metaTitle,
        description: data?.seo?.metaDescription,
        alternates: {
            canonical: data?.seo?.canonicalURL,
        },
    };
}


const SingleCard = async (params: any) => {

    const getGiftCardData = await getApiData('giftCard-detail', params.params.slug);
    const singleData = getGiftCardData?.data?.attributes;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        singleData?.seo?.structuredData ? singleData?.seo?.structuredData : ""
                    ),
                }}
            />
            <Banner
                title={singleData?.price}
                src={singleData?.desktopImg?.data?.attributes?.url}
                mobileSrc={singleData?.mobileImg?.data?.attributes?.url}
            />
            <Breadcrumb />
            <GiftCardDetail
                img={singleData?.img?.data?.attributes?.url}
                desc={singleData?.richTextCopy1}
                shortDesc={singleData?.richTextCopy2}
            />
        </>
    );
}

export default SingleCard;
