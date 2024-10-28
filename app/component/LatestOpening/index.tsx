import React from 'react'
import Heading from '../Common/Heading'
import style from "./index.module.scss"
import BrandCard from '../Common/BrandCard';

type latestOpeningProps = {
    brands?: any;
    title: string
    subTitle: string
};

const LatestOpeningsSection = ({ brands, title, subTitle }: latestOpeningProps) => {
    const filterByTitle = brands?.sort((item: any, b: any) => item?.attributes?.title.localeCompare(b?.attributes?.title));

    return (
        <section className='section'>
            <div className="container">
                <div className="custom-row">
                    <div className="col_12 col_xl_6 col_md_6">
                        <Heading title={title} subTitle={subTitle} />
                    </div>
                </div>
                <div className={`custom-row ${style.rowCustom}`}>
                    {filterByTitle?.length > 0
                        ? filterByTitle?.map((resp: any, index: number) => {

                            const destructData = {
                                img: resp?.attributes?.brandInfoImgUrl,
                                logo: resp?.attributes?.logoUrl,
                                type: resp?.attributes?.type,
                                slug: resp?.attributes?.slug,
                                subCategory: resp?.attributes?.brand_categories?.data[0]?.attributes?.slug
                            }
                            return (
                                <div key={index} className="col_12 col_xl_3 col_lg_6 col_md_6">
                                    <BrandCard
                                        {...destructData}
                                    />
                                </div>
                            );
                        })
                        :
                        <h6>
                            No Brands Found
                        </h6>
                    }
                </div>
            </div>
        </section>
    )
}

export default LatestOpeningsSection