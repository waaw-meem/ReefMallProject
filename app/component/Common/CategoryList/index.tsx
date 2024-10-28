import Image from "next/image";
import CategoryCard from "../CategoryCard";
import Heading from "../Heading";
import style from "./index.module.scss";

type categoryListProps = {
  category: any;
  title: string;
  subTitle: string;
  data: any;
};

const CategoryList = ({ category, title, subTitle, data }: categoryListProps) => {

  const filterByTitle = data?.sort((item: any, b: any) => item?.attributes?.title.localeCompare(b?.attributes?.title));

  return (
    <section className={style.categoryList}>
      <Image
        className={style.bgStores}
        width={1920}
        height={1060}
        src={"/assets/images/shop/stores-bg.png"}
        alt="stores"
      />

      <div className="container">
        <div className={style.headingSection}>
          <Heading
            color=""
            title={title}
            subTitle={subTitle}
            width={"longText"}
          />
        </div>
        <div className={style.listWrapper}>
          <div className="custom-row">
            {filterByTitle?.map((item: any, index: number) => {
              return (
                <div
                  className="col_12 col_xl_4 col_lg_6 col_md_6 mb-2"
                  key={index}>
                  <CategoryCard
                    small={true}
                    category={category}
                    resp={item?.attributes}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
