'use client'

import Image from "next/image"
import BrandCard from "../Common/BrandCard"
import Empty from "../Common/Empty"
import Heading from "../Common/Heading"

import style from "./index.module.scss"
import { useState } from "react"
import LoadingComponent from "../Loading"

type subCategoryProps = {
    category?: any;
    data: any;
    title: string;
    subTitle: string;
}

const SubCategory = ({ category, data, title, subTitle }: subCategoryProps) => {
    const [state, setState] = useState({
        brands: data?.sort((item: any, b: any) => item?.attributes?.title.localeCompare(b?.attributes?.title)),
        loading: false
    })
    const filterByTitle = data?.sort((item: any, b: any) => item?.attributes?.title.localeCompare(b?.attributes?.title));


    const searchBrands = async (e: any) => {
        const title = e.target.value.toLowerCase();
        setState((prevState: any) => ({
            ...prevState,
            loading: true
        }))
        const searchBrand = filterByTitle?.filter((item: any) => item?.attributes?.title.toLowerCase().includes(title));
        setState((prevState: any) => ({
            ...prevState,
            brands: searchBrand,
            loading: false
        }))
    }

    return (
        <section className={style.subCatgorySection}>
            <div className={style.bgStores} >
                <Image width={1920} height={1060} src={'/assets/images/brand/brand-detail/brand-detail.png'} alt='stores' />
            </div>
            <div className="container">
                <div className={style.headingWrapper}>
                    <div className={style.headingContainer}>
                        <Heading title={title} subTitle={subTitle} width="longText" />
                    </div>
                    <div className={style.searchWrapper}>
                        <Image src="/assets/svg/search.svg" alt="search" width={14} height={15} />
                        <input type="text" placeholder="Search" onChange={(title:any) => searchBrands(title)} />
                    </div>

                </div>
                {!state.loading ?
                    <div className={style.brandList}>
                        {state.brands?.length > 0 ?
                            <div className="custom-row">
                                {state.brands?.map((item: any, index: number) => {
                                    const destructData = {
                                        img: item?.attributes?.introductionImgUrl,
                                        logo: item?.attributes?.logoUrl,
                                        type: item?.attributes?.type,
                                        slug: item?.attributes?.slug,
                                        subCategory: item?.attributes?.brand_categories?.data[0]?.attributes?.slug
                                    }
                                    return (
                                        <div className="col_12 col_xl_3 col_lg_6 col_md_6 mb-2" key={index}>
                                            <BrandCard {...destructData} category={category} />
                                        </div>
                                    )
                                })}

                            </div> :
                            <Empty />
                        }
                    </div>
                    :
                    <LoadingComponent />
                }

            </div>
        </section>
    )
}

export default SubCategory