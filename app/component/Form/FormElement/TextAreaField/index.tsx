import React from 'react'
import style from './textarea-field.module.scss'
import { Controller } from 'react-hook-form'

const TextAreaField = (props: any) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { value, onChange } }) => {
        return (
          <div>
            {props.label ? <div className={`${style.label} ${style[props.customClass]}`}>{props.inputLabel}</div> : ""}
            <div
              className={`${style['input-container']}  ${style[props.class ? props.class : '']
                } input-container text-container`}
            >
              <div className={`${style['input-wrapper']} `}>

                <textarea
                  value={value}
                  placeholder={props.placeholder}
                  className={`${style['input']} ${style[props.class ? props.class : '']
                    } ${style[props.customClass]} ${props.bottomLabel ? style.bottomText : ""}`}
                  readOnly={props.readOnly}
                  rows={props.rows}
                  cols={props.col}
                  onChange={(e) => {
                    onChange(e)
                    props.onChange && props.onChange(e)
                  }}

                />
                <div className={`${style['cut']}`}></div>
                <div className={style.bottomLabel}>{props.bottomLabel}</div>
                
                {/* <label className={`${style['placeholder']}`}>
                {props.placeholder}
                {props.req ? (
                  <>
                    <span className="required"> *</span>
                  </>
                ) : (
                  ''
                )}
              </label> */}
              </div>
            </div>
          </div>

        )
      }}
    />
  )
}

export default TextAreaField
