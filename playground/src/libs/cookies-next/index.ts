import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';

type OptionsType = Parameters<typeof setCookie>[2];

export const TOKEN_NAMES_LIST = {
  token: 'token',
  refreshToken: 'refreshToken',
};

export const clientCookies = (ctx?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
  const defaluts: OptionsType = { path: '/', httpOnly: false, secure: true, res: ctx?.res, req: ctx?.req };

  return {
    set: (key: string, value: string, options?: OptionsType) => setCookie(key, value, { ...defaluts, ...options }),
    delete: (key: string, options?: OptionsType) => deleteCookie(key, { ...defaluts, ...options }),
    token: {
      set: (value: string) => setCookie(TOKEN_NAMES_LIST.token, value, { ...defaluts, maxAge: 60 * 60 * 24 }),
      value: String(getCookie(TOKEN_NAMES_LIST.token)),
    },
    refreshToken: {
      set: (value: string) =>
        setCookie(TOKEN_NAMES_LIST.refreshToken, value, { ...defaluts, maxAge: 60 * 60 * 24 * 14 }),
      value: String(getCookie(TOKEN_NAMES_LIST.refreshToken)),
    },
  };
};
