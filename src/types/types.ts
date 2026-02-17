import type { TFunction } from "i18next";

export type Translator = {
  t: TFunction;
};

export type NavItem = {
  path: string;
  skip?: boolean;
  key?: string;
};

export type ValidationHandler = (value: string | undefined) => boolean;
export type ValidationContext = {
  valid: (value: boolean) => void;
  validations: Array<{
    message?: string | undefined;
    validate: ValidationHandler;
  }>;
};

export type ValueBunlde<some> = {
    value?: some
    setValue: (value: some | undefined) => void
}
