import React from 'react'
import style from './textarea-field.module.scss'
import { Controller } from 'react-hook-form'

const TextareaField = (props: any) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { value, onChange } }) => {
        return (
          <>
          <span>{props.label}</span>
          <textarea
            value={value}
            placeholder={props.placeholder}
            className={`input textArea`}
            onChange={(e) => {
              onChange(e)
              props.onChange && props.onChange(e)
            }}
            />
            </>
        )
      }}
    />
  )
}

export default TextareaField
