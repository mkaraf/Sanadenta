import { SITE } from 'astrowind:config';

const trimSlash = (s: string) => s.replace(/^\/+|\/+$/g, '');

const BASE_PATHNAME = SITE.base || '/';

const createPath = (...params: string[]) => {
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
  return '/' + paths + (SITE.trailingSlash && paths ? '/' : '');
};

/** Absolute URL for a path, following the site's trailing-slash setting. */
export const getCanonical = (path = ''): string | URL => {
  const url = String(new URL(path, SITE.site));
  if (SITE.trailingSlash == false && path && url.endsWith('/')) {
    return url.slice(0, -1);
  } else if (SITE.trailingSlash == true && path && !url.endsWith('/')) {
    return url + '/';
  }
  return url;
};

/** Root-relative link to the homepage (respects the configured base path). */
export const getHomePermalink = (): string => createPath(BASE_PATHNAME);

/** Root-relative path to a file in public/ (respects the configured base path). */
export const getAsset = (path: string): string =>
  '/' +
  [BASE_PATHNAME, path]
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
