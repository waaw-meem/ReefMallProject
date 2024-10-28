import React from 'react'
import style from "./index.module.scss"
import { TailSpin } from 'react-loader-spinner'

const LoadingComponent = () => {
    return (
        <section className={style.loadingSection}>
            <TailSpin
                visible={true}
                height={"80"}
                width={"80"}
                color={"#A064A5"}
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass="spinner-wrapper"
            />
        </section>
    )
}

export default LoadingComponent