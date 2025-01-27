import Cookies from "js-cookie";

export const setCookie = (key: string, value: string) => [
  Cookies.set(key, value, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  }),
];

export const getCookie = (key: string) => {
  return Cookies.get(key);
};

export const removeCookie = (key: string) => {
  Cookies.remove(key);
};
