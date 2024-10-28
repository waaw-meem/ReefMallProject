import React, {Fragment} from "react";
import RadioButton from "./RadioButton";
import {Controller} from "react-hook-form";

const RadioGroup = (props: any) => {
  const {name, control, init, options} = props;

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={init}
      render={({field: {onChange, ...prop}}) => (
        <>
          {options.map((option: any, index: number) => (
            <Fragment key={index}>
              <RadioButton  
                {...prop}
                value={option.id}
                label={option.name}
                onChange={(e: any) => { onChange(e); props.onChange && props.onChange(e) }}
              />
            </Fragment>
          ))}
        </>
      )}
    />
  );
};

export default RadioGroup;
