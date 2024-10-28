import Link from 'next/link'
import style from "./index.module.scss"

type linkProps = {
  title?: any,
  color?: string,
  link?: any
  target?: string
  type?: string
  buttonType?: any,
  hover?: string,
  func?: () => void,
  transparent?: boolean
  isDisabled?:boolean
}
const AnchorButton = ({ title, color, link, target, type, buttonType, hover, func = () => { }, transparent = false,isDisabled }: linkProps) => {
  return (
    <>
      {type === 'button' ? (
        <button
        disabled={isDisabled}
          className={`${color ? style[color] : style.green} ${hover ? style[hover] : ""} ${transparent ? style.transparent : ""}`}
          type={buttonType || 'button'}
          onClick={() => func ? func() : null}>
          <span className={style.text}>
            {title}
          </span>
        </button>
      ) : (
        <Link target={target || '_parent'} href={link} className={`${color ? style[color] : style.green} ${hover ? style[hover] : ""} ${transparent ? style.transparent : ""}`}>
          <span className={style.textWrapper}>
            {title}
          </span>
        </Link>
      )}
    </>
  )
}


export default AnchorButton
