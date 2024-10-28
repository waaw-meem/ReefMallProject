import style from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";

type cardProps = {
  resp: any;
  category: any;
  small: boolean;
};

const CategoryCard = ({ resp, category, small }: cardProps) => {
  const img = resp?.listingImg?.data?.attributes?.url;

  return (
    <Link
      href={`/${category?.toLowerCase()}/categories/${resp?.slug}`}
      className={`${style.linkWrapepr}`}
    >
      <div className={`${small ? style.smallCard : ""} ${style.slideWrapper}`}>
        <div className={style.slide}>
          <Image
            className={style.mainImage}
            src={img}
            alt="apparel"
            width={720}
            height={530}
          />
          <div className={style.textWrapper}>
            <h3 className={`h3 ${style.title}`}>{resp?.title}</h3>
            <div className={`${style.buttonWrapper}`}>
              <div className={`${style.linkWrapepr}`}>
                <div className={style.buttonText}>Explore</div>
                <Image
                  src={"/assets/svg/right-arrow.svg"}
                  alt="arrow"
                  width={15}
                  height={16.13}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
