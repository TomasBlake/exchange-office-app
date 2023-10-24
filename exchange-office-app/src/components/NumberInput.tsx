import React from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from "react-hook-form";

interface NumberInputProps<
  TFormData extends FieldValues = FieldValues,
  TName extends FieldPath<TFormData> = FieldPath<TFormData>,
  TContext = unknown
> {
  control: Control<TFormData, TContext>;
  errors: FieldErrors<TFormData>;
  name: TName;
  label: string;
  fullWidth?: boolean;
}

export const NumberInput = <TFormData extends {}>({
  control,
  errors,
  name,
  label,
  fullWidth,
}: NumberInputProps<TFormData>) => {
  if (!control) return null;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          variant="outlined"
          type="number"
          fullWidth={fullWidth}
          id={name}
          label={label}
          error={!!errors[name as keyof FieldErrors<TFormData>]}
        />
      )}
    />
  );
};
