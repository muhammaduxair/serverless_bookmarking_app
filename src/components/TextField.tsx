import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#fff",
    },
    "& label": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-input": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#fff",
        borderWidth: 2,
        color: "#fff",
        borderRadius: 10,
      },
      "&:hover fieldset": {
        borderColor: "#fff",
        borderWidth: 2,
        color: "#fff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fff",
        borderWidth: 2,
        color: "#fff",
      },
    },
  },
})(TextField);

interface InputFieldINT {
  label: string;
  className?: string;
  style?: React.CSSProperties;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value?: String;
}

export default function TextInputField(props: InputFieldINT) {
  return (
    <CssTextField
      variant="outlined"
      id="custom-css-outlined-input"
      label={props.label}
      fullWidth
      style={props.style}
      className={props.className}
      autoComplete="off"
      onChange={props.handleChange && props.handleChange}
      value={props.value && props.value}
    />
  );
}
