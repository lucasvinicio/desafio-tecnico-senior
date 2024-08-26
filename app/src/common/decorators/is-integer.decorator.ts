import { IsNumber } from "class-validator";

export interface IsIntegerOptions {
  field: string;
}

export const IsInteger = (options: IsIntegerOptions) => IsNumber({
  maxDecimalPlaces: 0,
  allowInfinity: false,
  allowNaN: false,
}, {
  message: `O campo ${options.field} deve ser um número inteiro.`,
});
