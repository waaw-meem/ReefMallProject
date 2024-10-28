import React, { Fragment } from 'react'
import Checkbox from './Checkbox'
import { Controller } from 'react-hook-form'

const CheckboxGroup = (props: any) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <>
          {props.options.map((option: any, index: number) => (
            <Fragment key={index}>
              <Checkbox
                i={index}
                field={field}
                value={option.id}
                label={option.name}
                bold={props.bold}
                exclass={props.exclass}
                icon={props.icon}
                filterCheckbox={props.filterCheckbox}
                forget={props.forget}
              />
            </Fragment>
          ))}
        </>
      )}
    />
  )
}

export default CheckboxGroup
