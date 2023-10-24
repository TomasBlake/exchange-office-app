import React, { ReactNode } from "react";
import {
  InputLabel,
  FormControl,
  Select as MuiSelect,
  MenuItem,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
} from "react-hook-form";

interface NumberInputProps<
  TFormData extends FieldValues = FieldValues,
  TItems extends {} = {},
  TName extends FieldPath<TFormData> = FieldPath<TFormData>,
  TContext = unknown
> {
  control: Control<TFormData, TContext>;
  errors: FieldErrors<TFormData>;
  name: TName;
  label: string;
  fullWidth?: boolean;
  items: Array<TItems>;
  mapProp: keyof TItems;
}

export const Select = <TFormData extends {}, TItems extends {}>({
  control,
  errors,
  name,
  label,
  fullWidth,
  items,
  mapProp,
}: NumberInputProps<TFormData, TItems>) => {
  if (!control) return null;

  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel id={`${name}-label`}>{label}:</InputLabel>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <MuiSelect
              {...field}
              labelId={`${name}-label`}
              label={label}
              error={!!errors[name as keyof FieldErrors<TFormData>]}
            >
              {items.map((itemData) => (
                <MenuItem
                  key={`${itemData[mapProp]}`}
                  value={itemData[mapProp] as string}
                >
                  {itemData[mapProp] as ReactNode}
                </MenuItem>
              ))}
            </MuiSelect>
          );
        }}
      />
    </FormControl>
  );
};
