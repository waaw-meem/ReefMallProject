import React, { useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'
import style from "./index.module.scss"

const InputPhone = (props: any) => {
  const [isreadonly, setisreadonly] = useState(props.editEnable)
  const handleClick = () => {
    setisreadonly(!isreadonly)
  }
  return (
    <div className={'input-container'}>
      <div className={'input-wrapper'}>
        <Controller
          name={props.name}
          control={props.control}
          render={({ field: { value, onChange } }) => {
            return (
              <>
                {props.label ? <div className={`${style.label}`} >{props.inputLabel}</div> : ""}
                <PhoneInput
                  value={value}
                  countryCodeEditable={false}
                  onChange={(e) => {
                    console.log('eeee', e)
                    e && onChange(e)
                    props.onChange && props.onChange(e)
                  }}
                  placeholder={props.placeholder}
                  country={'ae'}
                  inputProps={{ className: 'input phone-flag' }}
                  buttonClass={'flag-button'}
                  disabled={props.editEnable ? isreadonly : props.readOnly}
                />
                {props.editEnable && isreadonly && (
                  <button
                    type={'button'}
                    className="editBtn"
                    onClick={handleClick}
                  >
                    Edit
                  </button>
                )}
              </>
            )
          }}
        />
        <div className={'cut'}></div>
        <label className={'placeholder'}>{props.placeholder}</label>
      </div>
    </div>
  )
}


export default InputPhone