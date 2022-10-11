import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const playersnamevalidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const playerOneName = control.get('playerOneName');
  const playerTwoName = control.get('playerTwoName');

  return playerOneName &&
    playerTwoName &&
    playerOneName.value != '' &&
    playerTwoName.value != '' &&
    playerTwoName.value == playerOneName.value
    ? { thesame: true }
    : null;
};
