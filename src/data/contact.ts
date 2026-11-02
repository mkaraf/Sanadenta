export const CONTACT = {
  phone: '+420 705 233 083',
  phoneHref: 'tel:+420705233083',
  email: 'info@sanadenta.cz',
  building: 'Zdravotní středisko POLIMAL',
  buildingUrl: 'https://www.poliklinika-malenovice.cz/',
  street: 'Zahradní 973',
  postalCode: '763 02',
  city: 'Zlín',
  cityDistrict: 'Zlín-Malenovice',
  region: 'Zlínský kraj',
  // Replace with the Google Business Profile place URL once the profile is verified.
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Zdravotní středisko POLIMAL, Zahradní 973, 763 02 Zlín 4')}`,
  bookingUrl: 'https://hygessa.cz/booking/sanadenta',
  instagramUrl: 'https://www.instagram.com/sanadenta_zlin/',
};

/** Contact form on /faq/ (handled by worker/index.ts). */
export const CONTACT_FORM = {
  endpoint: '/api/contact',
  // Public Cloudflare Turnstile site key (widget 'SanaDenta formulář'); its secret half is the
  // TURNSTILE_SECRET_KEY Worker secret.
  turnstileSiteKey: '0x4AAAAAAFGIBK_XdBJ052kv',
};

/** Legal operator of the clinic (shown in the footer, as required for a healthcare provider). */
export const PROVIDER = {
  name: 'Ing. Zuzana Saňáková, DiS.',
  ico: '29877083',
  type: 'Poskytovatel zdravotních služeb',
};

export interface OpeningHoursEntry {
  dayOfWeek: string[];
  label: string;
  shortLabel: string;
  opens: string | null;
  closes: string | null;
}

export const HOURS: OpeningHoursEntry[] = [
  {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    label: 'Pondělí – Čtvrtek',
    shortLabel: 'Po – Čt',
    opens: '07:30',
    closes: '15:00',
  },
  {
    dayOfWeek: ['Friday'],
    label: 'Pátek',
    shortLabel: 'Pá',
    opens: '07:30',
    closes: '14:00',
  },
  {
    dayOfWeek: ['Saturday', 'Sunday'],
    label: 'Sobota – Neděle',
    shortLabel: 'So – Ne',
    opens: null,
    closes: null,
  },
];
