import style from "./index.module.scss"

type headingProps = {
  subTitle?: string
  title?: string,
  width?: any,
  color?: string,
  isCenter?: boolean,
  isParagraph?: boolean
}
const Heading = ({ subTitle, title, width, color, isCenter }: headingProps) => {
  return (
    <div className={`${style.heading} ${width === 'longText' ? style.longText : ""} ${width === "shortText" ? style.shortText : ""} ${color ? style[`${color}`] : ""} ${isCenter ? style.centered : ""}`}>
      <h6 className={`h6 fw-500 ${subTitle ? "" : style.subTitle}`}>{subTitle}</h6>
      <h2 className="h2 fw-500">{title}</h2>
    </div>
  )
}

export default Heading