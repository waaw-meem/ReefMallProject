import  Rating from '../../../../../node_modules/react-rating'
import { Controller } from 'react-hook-form'
import style from "./index.module.scss"
import Image from 'next/image'


const RatingInput = ( props: any) => {
    return (
        <div className={`input-container`}>
            <div className={`input-wrapper ${style.inputContainer} ${style[props.class]}`}>
                <Controller
                    name={props.name}
                    control={props.control}
                    render={({ field: { value, onChange } }) => {
                        return (
                            <>
                                <Rating
                                    className={`${style.empty} ${style.full} ${props.class === "ratingReview" ? style.class : ""}`}
                                    emptySymbol={<Image alt="ratting" src="/assets/svg/star-gray.svg" width={21} height={21} className="icon" />}
                                    fullSymbol={<Image alt="ratting" src="/assets/svg/star.svg" width={21} height={21} className="icon" />}
                                    onChange={(e) => {
                                        onChange(e)
                                        props.onChange && props.onChange(e)
                                    }}

                                    readonly={props.readonly}
                                />


                            </>
                        )
                    }}
                />

                {props.class === "ratingReview" ? <h5 className={style.reviewTitle}>Review:</h5> : ""}

            </div>
        </div>
    )
}

export default RatingInput
