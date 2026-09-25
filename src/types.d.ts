import type { ImageProps } from '~/utils/images-optimization';

export interface MetaData {
  title?: string;
  ignoreTitleTemplate?: boolean;

  canonical?: string;

  robots?: MetaDataRobots;

  description?: string;

  openGraph?: MetaDataOpenGraph;
  twitter?: MetaDataTwitter;
}

export interface MetaDataRobots {
  index?: boolean;
  follow?: boolean;
}

export interface MetaDataImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface MetaDataOpenGraph {
  url?: string;
  siteName?: string;
  images?: Array<MetaDataImage>;
  locale?: string;
  type?: string;
}

export interface MetaDataTwitter {
  handle?: string;
  site?: string;
  cardType?: string;
}

export interface Widget {
  id?: string;
}

export interface Item {
  title?: string;
  description?: string;
  icon?: string;
  classes?: Record<string, string>;
}

export interface CallToAction {
  variant?: 'primary' | 'secondary';
  text?: string;
  href?: string;
  target?: string;
}

// COMPONENTS
export interface ItemGrid {
  items?: Array<Item>;
  defaultIcon?: string;
  classes?: Record<string, string>;
}

// WIDGETS
export interface Hero extends Widget {
  title?: string;
  subtitle?: string;
  actions?: Array<CallToAction>;
}

export interface Content extends Widget {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: Array<Item>;
  image?: ImageProps;
  isReversed?: boolean;
  isAfterContent?: boolean;
}
