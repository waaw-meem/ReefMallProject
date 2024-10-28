import React from 'react'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import DropDownImg from '../../../../../public/assets/svg/close-circle.svg'
import SvgComp from '../../SvgComp'

const DropdownIndicator = () => {
  return (
    <>
      <SvgComp src={DropDownImg.src} />
    </>
  )
}

const SelectField = (props: any) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { value, onChange, onBlur } }) => {
        return (
          <Select
            options={props.options}
            components={{ DropdownIndicator }}
            placeholder={props.label}
            onChange={(options) => onChange(options)}
            onBlur={onBlur}
            value={value}
            defaultValue={value}
            isDisabled={props.disabled ? true : false}
            isClearable={props.clearable ? true : false}
            isSearchable={props.search ? true : false}
            className="custom__select"
            classNamePrefix="custom__select"
            styles={{
              control: (val, state) => ({
                ...val,
                minHeight: '4em',
                borderColor: 'transparent',
                borderBottomColor: 'var(--color-blackcol)',
                borderBottomWidth: '2px',
                '&:hover': {
                  borderBottomColor: 'var(--color-primarycol)',
                },
              }),
              valueContainer: (vcontain) => ({
                ...vcontain,
                fontSize: '1.125em',
                textTransform: 'capitalize',
                color: 'var(--color-primarycol)',
                padding: '0',
              }),
              singleValue: (scontain) => ({
                ...scontain,
                color: 'var(--color-primarycol)',
              }),

              indicatorSeparator: (icontain) => ({
                ...icontain,
                backgroundColor: 'transparent',
              }),
              dropdownIndicator: (dcontain) => ({
                ...dcontain,
              }),
              option: (vcontain, state) => ({
                ...vcontain,
                textTransform: 'capitalize',
                color: state.isFocused
                  ? 'var(--color-whitecol)'
                  : 'var(--color-graycol2)',
                backgroundColor: state.isFocused
                  ? 'var(--color-primarycol)'
                  : 'var(--color-whitecol)',
              }),
              menu: (styles) => ({
                ...styles,
                zIndex: 99,
                minHeight: 'auto',
              }),
              placeholder: (place) => ({
                ...place,
                color: 'var(--color-graycol)',
              }),
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary: 'transparent',
                primary50: 'var(--color-primarycol)',
                primary25: 'var(--color-primarycol)',
              },
            })}
          />
        )
      }}
    />
  )
}

export default SelectField
