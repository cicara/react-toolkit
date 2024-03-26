import { throttle, type ThrottleSettings } from "lodash-es";
import { useMemo } from "react";

export function useThrottleCallback(callback: any, wait?: number, options?: ThrottleSettings) {
  return useMemo(() => throttle(callback, wait, options), [callback, options, wait]);
}
