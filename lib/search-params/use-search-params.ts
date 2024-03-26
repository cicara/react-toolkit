import { useCallback, useMemo } from "react";
import type { URLSearchParamsInit } from "react-router-dom";
import { useSearchParams as _useSearchParams } from "react-router-dom";
import { SearchParams } from "./search-params";

export type SetSearchParams = (
  params: Record<
    string,
    string | number | boolean | undefined | null | Array<number | string | boolean | undefined | null>
  >
) => void;

export function useSearchParams(defaultInit?: URLSearchParamsInit): [SearchParams, SetSearchParams] {
  const [_searchParams, _setSearchParams] = _useSearchParams(defaultInit);

  const searchParams = useMemo(() => new SearchParams(_searchParams), [_searchParams]);

  const setSearchParams = useCallback<SetSearchParams>(
    (params) => {
      const searchParams = new SearchParams(window.location.search);
      Object.entries(params).forEach(([key, val]) => {
        searchParams.setValue(key, val);
      });
      _setSearchParams(searchParams, { replace: true });
    },
    [_setSearchParams]
  );

  return [searchParams, setSearchParams];
}
