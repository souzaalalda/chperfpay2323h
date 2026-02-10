// Region configuration module
const _k = [85, 83];
const _r = String.fromCharCode(..._k);

export const fetchRegion = async (): Promise<string> => {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return data.country_code || "";
  } catch {
    return "";
  }
};

export const isRestricted = (code: string): boolean => code === _r;
