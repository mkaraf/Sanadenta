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
  mapsQuery: 'Zdravotní středisko POLIMAL, Zahradní 973, 763 02 Zlín 4',
  bookingUrl: 'https://hygessa.cz/booking/sanadenta',
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
