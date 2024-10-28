import Banner from '@/app/component/Common/Banner'
import Breadcrumb from '@/app/component/Common/Breadcrumb'
import SubCategory from '@/app/component/SubCategory'
import NotFound from '@/app/not-found'
import { getApiData } from '@/app/utilities/function'
import React from 'react'



export async function generateMetadata(param: any) {
    const resp = await getApiData("category-detail", param.params.slug);
    const data = resp?.data?.attributes;
    return {
        title: data?.seo?.metaTitle,
        description: data?.seo?.metaDescription,
        alternates: {
            canonical: data?.seo?.canonicalURL,
        },
    };
}


const CategoryDetail = async (params: any) => {

    const getBrands = await getApiData("category-detail", params?.params?.slug);
    const brands = getBrands?.data?.attributes?.brands?.data;


    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        getBrands?.data?.attributes?.seo?.structuredData ? getBrands?.data?.attributes?.seo?.structuredData : ""
                    ),
                }}
            />
            {getBrands?.data !== null ?
                <>
                    <Banner
                        title={getBrands?.data?.attributes?.storeTitle}
                        src={getBrands?.data?.attributes?.desktopImg?.data?.attributes?.url}
                        mobileSrc={getBrands?.data?.attributes?.mobileImg?.data?.attributes?.url}
                    />
                    <Breadcrumb />
                    <SubCategory
                        category="eat"
                        data={brands}
                        title={getBrands?.data?.attributes?.storeTitle}
                        subTitle={getBrands?.data?.attributes?.storeSubtitle}
                    />
                </>
                :
                <NotFound />
            }
        </>
    )
}

export default CategoryDetail