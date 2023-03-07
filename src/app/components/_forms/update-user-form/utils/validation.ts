import { AbstractControl, ValidatorFn } from '@angular/forms';


export const startsWith07: ValidatorFn = (control: AbstractControl) => {
  const value = control.value;
  return value && value.startsWith("07")
    ? null
    : { startsWith07: true };
};
