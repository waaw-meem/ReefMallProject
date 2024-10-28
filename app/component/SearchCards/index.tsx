import Image from "next/image";
import style from "./index.module.scss";
import Link from "next/link";

type tabProps = {
  tab: any;
  data?: any;
};

const SearchCard = ({ tab, data }: tabProps) => {
  console.log(data, "data");
  const show = true;
  return (
    <div className={style.tabBodyWrapper}>
      <div
        className={`${style.tabBody} ${tab === "brand" ? style.active : ""}`}
      >
        <div className="custom-row">
          {data?.["brand"].length > 0 ? (
            data?.["brand"]?.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className="col_12 col_xl_3 col_lg_6 col_md_6 mb-2"
                >
                  <Link
                    href={
                      item?.type == "Shop"
                        ? `/shop/categories/${item?.brand_categories?.[0]?.slug}/${item?.slug}`
                        : `/eat/categories/${item?.brand_categories?.[0]?.slug}/${item?.slug}`
                    }
                  >
                    <div className={`${style.cardWrapper} ${style.brandCard}`}>
                      <div className={style.imgWrapper}>
                        <Image
                          alt=""
                          src={item?.logoUrl}
                          width={870}
                          height={430}
                        />
                      </div>
                      <div className={style.textWrapper}>
                        <h1 className="h6">{item?.title}</h1>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="col_12 col_xl_12">
              <h5 className="text-center">No results found</h5>
            </div>
          )}
        </div>
      </div>
      <div
        className={`${style.tabBody} ${
          tab === "brand-offer" ? style.active : ""
        }`}
      >
        <div className="custom-row">
          {data?.["brand-offer"].length > 0 ? (
            data?.["brand-offer"]?.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className="col_12 col_xl_3 col_lg_6 col_md_6 mb-2"
                >
                  <Link href={`/latest-offers/${item?.slug}`}>
                    <div className={`${style.cardWrapper} ${style.brandCard}`}>
                      <div className={style.imgWrapper}>
                        <Image
                          alt=""
                          src={item?.mobileImgUrl}
                          width={870}
                          height={430}
                        />
                      </div>
                      <div className={style.textWrapper}>
                        <h1 className="h6">{item?.title}</h1>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="col_12 col_xl_12">
              <h5 className="text-center">No results found</h5>
            </div>
          )}
        </div>
      </div>
      <div
        className={`${style.tabBody} ${tab === "event" ? style.active : ""}`}
      >
        <div className="custom-row">
          {data?.["event"].length > 0 ? (
            data?.["event"]?.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className="col_12 col_xl_3 col_lg_6 col_md_6 mb-2"
                >
                  <Link href={`/latest-happenings/${item?.slug}`}>
                    <div className={`${style.cardWrapper} ${style.brandCard}`}>
                      <div className={style.imgWrapper}>
                        <Image
                          alt=""
                          src={item?.mobileImg?.url}
                          width={870}
                          height={430}
                        />
                      </div>
                      <div className={style.textWrapper}>
                        <h1 className="h6">{item?.title}</h1>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="col_12 col_xl_12">
              <h5 className="text-center">No results found</h5>
            </div>
          )}
        </div>
      </div>
      <div
        className={`${style.tabBody} ${
          tab === "service-card" ? style.active : ""
        }`}
      >
        <div className="custom-row">
          {data?.["service-card"].length > 0 ? (
            data?.["service-card"]?.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className="col_12 col_xl_3 col_lg_6 col_md_6 mb-2"
                >
                  <Link href={`/services/${item?.slug}`}>
                    <div className={`${style.cardWrapper} ${style.brandCard}`}>
                      <div className={style.imgWrapper}>
                        <Image
                          alt=""
                          src={item?.mobileImg?.url}
                          width={870}
                          height={430}
                        />
                      </div>
                      <div className={style.textWrapper}>
                        <h1 className="h6">{item?.title}</h1>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="col_12 col_xl_12">
              <h5 className="text-center">No results found</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
