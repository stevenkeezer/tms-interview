import React, { memo, forwardRef, Ref } from "react";
import Input from "./";

interface PhoneInputProps {
  name: string;
  value: string;
  label: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const formatPhoneNumber = (inputValue: string): string => {
  const digitsOnly = inputValue?.replace(/\D/g, "");
  const firstThreeDigits = digitsOnly?.slice(0, 3);
  const nextThreeDigits = digitsOnly?.slice(3, 6);
  const lastFourDigits = digitsOnly?.slice(6, 10);

  let formattedPhoneNumber = "";

  if (digitsOnly?.length > 6) {
    formattedPhoneNumber = `(${firstThreeDigits}) ${nextThreeDigits}-`;
  } else if (digitsOnly?.length > 3) {
    formattedPhoneNumber = `(${firstThreeDigits}) ${nextThreeDigits}`;
  } else if (digitsOnly?.length > 0) {
    formattedPhoneNumber = `(${firstThreeDigits}`;
  }

  formattedPhoneNumber += lastFourDigits;

  return formattedPhoneNumber;
};

const PhoneInput = forwardRef<Ref<any>, PhoneInputProps>((props, ref) => {
  const { name = "", value = "", onChange, label = "", ...rest } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedValue = formatPhoneNumber(value);

    if (onChange) {
      onChange({
        target: {
          name,
          value: formattedValue.replace(/\D/g, "").slice(0, 10),
        },
      } as any);
    }
  };

  const inputProps = {
    ...rest,
    onChange: handleChange as (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void,
  };

  return (
    <Input
      ref={ref}
      name={name}
      value={formatPhoneNumber(value)}
      {...inputProps}
    />
  );
});

export default memo(PhoneInput);
