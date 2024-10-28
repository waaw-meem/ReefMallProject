'use client'
import React, { useEffect } from 'react'
import style from "./index.module.scss"
import Heading from '../../Common/Heading'
import Image from 'next/image'
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";



type videoProps = {
    title?: string
    desc?: string
    videoLink?: string
    thumbnail?: string
}

const VideoSection = ({ desc, thumbnail, title, videoLink }: videoProps) => {

    useEffect(() => {
        Fancybox.bind('[data-fancybox="video"]', {
            closeButton: true,
        });
    }, []);
    // const embedUrl = videoLink?.replace("watch?v=", "embed/");

    return (
        <section className={`section`}>
            <div className="container">
                <div className={style.headingWrapper}>
                    <Heading title={title} />
                    <div className={`brand-detail-video ${style.videoWrapper}`}>
                        {thumbnail && <Image
                            src={thumbnail}
                            className={style.imgStyle}
                            width={877}
                            height={530} alt="img" />}
                        {videoLink &&
                            <div className={style.playWraper}>
                                <p className={`p bold-font ${style.title}`}>Play Video</p>
                                <div className={style.line}></div>
                                <div className={style.playIcon} data-fancybox="video" data-src={videoLink}>
                                    <Image
                                        src={'/assets/svg/play-icon.svg'}
                                        alt='video'
                                        priority={true}
                                        width={91}
                                        height={91}
                                    />
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VideoSection

{/* <iframe width="90%" height="100%"
src={`${videoLink}?poster=${thumbnail}`}
>
</iframe> */}