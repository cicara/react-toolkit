import { debounce, type DebounceSettings } from "lodash-es";
import { useMemo } from "react";

export function useDebounceCallback<T extends (...args: any) => any>(
  callback: T,
  wait?: number,
  options?: DebounceSettings
) {
  return useMemo(() => debounce(callback, wait, options), [callback, options, wait]);
}
