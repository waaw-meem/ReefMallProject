import style from "./Checkbox.module.scss";

const RadioButton = (props: any) => {
  return (
    <label htmlFor={props.value} className={`${style["radio"]}`}>
      <div className={style["inputWrapper"]}>
        <input
          ref={props.ref}
          name={props.name}
          id={props.value}
          type="radio"
          aria-label={props.label}
          onChange={() => props.onChange(props.value)}
          value={props.value}
          {...props}
          className={`${style.radioInput} ${props.classCustom}`}
        />
      {props?.label && <p>{props.label}</p>}
      </div>
    </label>
  );
};

export default RadioButton;
