import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export const twClassMerge = (...input: classNames.ArgumentArray) =>
  twMerge(classNames(input));
