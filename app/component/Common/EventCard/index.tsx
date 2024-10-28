import Image from "next/image";
import style from "./index.module.scss";
import Link from "next/link";
import moment from "moment";

type eventProps = {
  img: string;
  title: string;
  desc: string;
  date: string;
  ctaLink: string;
  isSmall?: boolean
};

const EventCard = ({ ctaLink, date, desc, img, title, isSmall }: eventProps) => {
  const formatedDate = moment(date).format("MMM DD, YYYY")
  return (
    <div className={`${style.eventCard} ${isSmall ? style.smallCard : ""}`}>
      <Link href={`/latest-happenings/${ctaLink}`}>
        <div className={style.ImgWrapper}>
          <Image src={img} alt={title?title:"image"} height={385} width={570} />
        </div>
        <div className={style.textWrapper}>
          <p className={style.date}>{formatedDate}</p>
          <h4 className={`${style.title} line-clamp-2`}>{title}</h4>
          <p className={`line-clamp-3 ${style.desc}`}>{desc}</p>
          <Link
            className={style.linkWrapper}
            href={`/latest-happenings/${ctaLink}`}
          >
            {"Read More"}
            <Image
              className={style.arrow}
              src="/assets/svg/right-nav-arrow.svg"
              alt="arrow"
              height={19.43}
              width={19.43}
            />
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
