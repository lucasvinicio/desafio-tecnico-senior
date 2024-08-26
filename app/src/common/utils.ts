import { isNumber } from "class-validator";

export const isValidNumberArray = (arr: number[] | any) => {
  if (!Array.isArray(arr)) {
    return false;
  }
  return arr.length > 0 && arr.every(value => isNumber(value));
}
