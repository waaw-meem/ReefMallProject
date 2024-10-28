import style from "./index.module.scss"
import Image from 'next/image'
import Link from 'next/link' // Ensure you import Link

type bannerProps = {
    title: any,
    src: any,
    mobileSrc: any
}

const Banner = ({ title, src, mobileSrc }: bannerProps) => {
    return (
        <div className={style.bannerSlide}>
            <div className={style.lightGredBackground} />
            <div className={style.desktopImg}>
               {src && <Image
                    src={src}
                    alt={"hero-banner"}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />}
            </div>

            <div className={style.mobImg}>
                {mobileSrc && <Image
                    src={mobileSrc}
                    alt={"hero-banner"}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />}
            </div>
            <div className="container">
                <div className={style.sliderTextWrapper}>
                    <h1 className="h1 fw-500">{title}</h1>
                </div>
            </div>
            {/* <div className={style.fixedWrapper}>
                <Link href='#'>
                    <Image src={"/assets/images/cuisines/whatsapp.png"} width={60} height={60} alt="whatsapp icon" className={style.whatsappIcon} />
                </Link>
                <Link href='#' className={style.iconWrapper}>
                    <Image src={"/assets/svg/hicon.svg"} width={24} height={24} alt="categories icon" className={style.icon} />
                </Link>
            </div> */}
        </div>
    )
}

export default Banner
