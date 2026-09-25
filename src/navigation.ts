import { getHomePermalink } from '~/utils/permalinks';
import { CONTACT } from '~/data/contact';

export const headerData = {
  links: [
    {
      text: 'O nás',
      href: `${getHomePermalink()}#aboutUs`,
    },
    {
      text: 'Náš tým',
      href: `${getHomePermalink()}#ourTeam`,
    },
    {
      text: 'Služby',
      href: `${getHomePermalink()}#services`,
    },
    {
      text: 'Ceník',
      href: `${getHomePermalink()}#priceList`,
    },
    {
      text: 'Kontakt',
      href: `${getHomePermalink()}#contact`,
    },
  ],
  socialLinks: [
    {
      ariaLabel: 'Instagram',
      icon: 'tabler:brand-instagram',
      href: CONTACT.instagramUrl,
    },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
  ],
};
