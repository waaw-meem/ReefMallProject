import { Controller } from 'react-hook-form'

const InputField = (props: any) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { value, onChange } }) => {
        return (
          <>
          <span>{props.label}</span>
            <input
              value={value}
              type={props.type}
              placeholder={props.placeholder}
              className={`input`}
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

export default InputField
