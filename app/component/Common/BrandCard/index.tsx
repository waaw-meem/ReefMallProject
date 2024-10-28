import Image from "next/image";
import style from "./index.module.scss";
import Link from "next/link";

type brandProps = {
  logo: string;
  img: string;
  type: any;
  slug: any;
  category?: any;
  subCategory?: any;
};

const BrandCard = ({ logo, img, type, slug, subCategory }: brandProps) => {
  return (
    <div className={style.slide}>
      {img && img.includes('http') &&
        <Image
          className={style.bgImage}
          width={420}
          height={420}
          alt="title"
          src={img}
        />}
      <Link
        href={`/${type?.toLowerCase()}/categories/${subCategory}/${slug}`}
        className={style.brandLink}
      >
        {logo && logo.includes("http") && (
          <Image src={logo} alt={"logo"} width={226} height={226} />
        )}
      </Link>
    </div>
  );
};

export default BrandCard;
