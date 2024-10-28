'use client'
import React from 'react'
import InputField from '../FormElements/InputField'
import TextareaField from '../FormElements/TextareaField'
import SelectField from '../FormElements/SelectField'
import DateField from '../FormElements/DateField'

const FormGroup = (props: any) => {
  const { item, control, errors } = props

  return (
    <>
      {item.type == 'input' && (
        <div
          className={`form-group ${errors[`${item.name}`] ? 'border-red' : ''}`}
        >
          <InputField
            name={item.name}
            control={control}
            placeholder={item.placeholder || ''}
            type={item.inputtype || ''}
            class={item.exclass || ''}
            req={item.req}
            label={item.inputLabel}
          />
          {errors[`${item.name}`] && (
            <span className="error">{errors[`${item.name}`]?.message}</span>
          )}
        </div>
      )}
      {item.type == 'select' && (
        <div
          className={`form-group ${errors[`${item.name}`] ? 'border-red' : ''
            } `}
        >
          <SelectField
            name={item.name}
            control={control}
            label={item.label}
            placeholder={item.placeholder || ''}
            static={item.static}
            options={item.options.map((x: any) => ({
              label: x.name,
              value: x.id,
            }))}
            exclass={item.exclass}
            noborder={item.noborder}
            error={item.errors}
          />
          {errors[`${item.name}`] && (
            <span className="error">{errors[`${item.name}`]?.message}</span>
          )}
        </div>
      )}
      {item.type == 'textarea' && (
        <div
          className={`form-group ${item.customClass === "fullwidth" ? "form-group-lg" : ""} ${errors[`${item.name}`] ? 'border-red' : ''} `}
        >
          <TextareaField
            name={item.name}
            control={control}
            placeholder={item.placeholder || ''}
            class={item.exclass || ''}
            req={item.req}
            label={item.inputLabel}
          />
          {errors[`${item.name}`] && (
            <span className="error">{errors[`${item.name}`]?.message}</span>
          )}
        </div>
      )}
      {item.type == "date" && (
        <div
          className={`form-group ${errors[`${item.name}`] ? "border-red" : ""
            }`}
        >
          <DateField
            name={item.name}
            control={control}
            placeholder={item.placeholder || ""}
            label={item.label}
            class={item.exclass || ""}
            onChange={item.onChange}
            isTime={item.time}
            inputLabel={item.inputLabel}
            rangePicker={item.rangePicker}
          />
          {errors[`${item.name}`] && (
            <span className="error">{errors[`${item.name}`]?.message}</span>
          )}
        </div>
      )}
    </>
  )
}

export default FormGroup
