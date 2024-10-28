import LatestOfferSlider from "../../Common/LatestOfferSlider"
import style from "./index.module.scss"

type LatestOfferProps = {
  data?: any,
  title?: any
  subTitle?: any
}

const LatestOffers = ({ data, subTitle, title }: LatestOfferProps) => {
  return (
    <section className={style.latestOfferSection}>
      <LatestOfferSlider
        data={data}
        title={title}
        subTitle={subTitle}
      />
    </section>
  )
}

export default LatestOffers