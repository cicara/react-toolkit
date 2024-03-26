import { isNil } from "lodash-es";

export class SearchParams extends URLSearchParams {
  public getInt(key: string, defaultValue: number): number;
  public getInt(key: string, defaultValue?: number): number | undefined;
  public getInt(key: string, defaultValue: number): number | undefined {
    return SearchParams.getInt(this, key, defaultValue);
  }

  public getUint(key: string, defaultValue: number): number;
  public getUint(key: string, defaultValue?: number): number | undefined;
  public getUint(key: string, defaultValue: number): number | undefined {
    return SearchParams.getUint(this, key, defaultValue);
  }

  public getString(key: string, defaultValue: string): string;
  public getString(key: string, defaultValue?: string): string | undefined;
  public getString(key: string, defaultValue: string): string | undefined {
    return SearchParams.getString(this, key, defaultValue);
  }

  public getBoolean(key: string, defaultValue: boolean = false): boolean {
    return SearchParams.getBoolean(this, key, defaultValue);
  }

  public setValue(key: string, value: any) {
    return SearchParams.setValue(this, key, value);
  }

  static getInt(searchParams: URLSearchParams, key: string, defaultValue: number): number;
  static getInt(searchParams: URLSearchParams, key: string, defaultValue?: number): number | undefined;
  static getInt(searchParams: URLSearchParams, key: string, defaultValue?: number): number | undefined {
    const v = searchParams.get(key);
    if (!v) {
      return defaultValue;
    }
    const iv = Number.parseInt(v);
    if (Number.isNaN(iv)) {
      return defaultValue;
    }
    return iv;
  }

  static getUint(searchParams: URLSearchParams, key: string, defaultValue: number): number;
  static getUint(searchParams: URLSearchParams, key: string, defaultValue?: number): number | undefined;
  static getUint(searchParams: URLSearchParams, key: string, defaultValue?: number): number | undefined {
    const v = this.getInt(searchParams, key, defaultValue);
    if (v !== undefined && v < 0) {
      return defaultValue;
    }
    return v;
  }

  static getString(searchParams: URLSearchParams, key: string, defaultValue: string): string;
  static getString(searchParams: URLSearchParams, key: string, defaultValue?: string): string | undefined;
  static getString(searchParams: URLSearchParams, key: string, defaultValue?: string): string | undefined {
    const v = searchParams.get(key);
    if (v === null || v === "") {
      return defaultValue;
    }
    return v;
  }

  static getBoolean(searchParams: URLSearchParams, key: string, defaultValue: boolean = false): boolean {
    const v = searchParams.get(key);
    if (v === null) {
      return defaultValue;
    }
    return v !== "false";
  }

  static setValue(searchParams: URLSearchParams, key: string, value: any) {
    if (isNil(value) || value === "") {
      searchParams.delete(key);
      return;
    }
    if (Array.isArray(value)) {
      searchParams.delete(key);
      value.forEach((val) => {
        searchParams.append(key, val);
      });
    } else {
      searchParams.set(key, value);
    }
  }
}
