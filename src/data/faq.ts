import { CONTACT, HOURS } from '~/data/contact';
import { PRICES, formatPrice } from '~/data/pricing';

export interface FaqItem {
  question: string;
  /** Answer as HTML (rendered on the page; tags are stripped for the FAQPage structured data). */
  answer: string;
}

const priceOf = (name: string) => formatPrice(PRICES.find((p) => p.name === name)?.price ?? 0);
const minPrice = formatPrice(Math.min(...PRICES.map((p) => p.price)));
const openDays = HOURS.filter((h) => h.opens)
  .map((h) => `${h.label} ${h.opens}–${h.closes}`)
  .join(', ');

export const FAQ: FaqItem[] = [
  {
    question: 'Co je dentální hygiena a proč ji podstoupit?',
    answer:
      'Dentální hygiena je profesionální péče o zuby a dásně: odstranění zubního kamene a plaku, leštění, fluoridace a instruktáž, jak o chrup správně pečovat doma. Pravidelná hygiena pomáhá předcházet zubnímu kazu, zánětům dásní a parodontitidě.',
  },
  {
    question: 'Jak často bych měl/a na dentální hygienu chodit?',
    answer:
      'Většině pacientů doporučujeme pravidelnou hygienu přibližně jednou za půl roku. Pacientům s fixními rovnátky nebo Invisalign doporučujeme interval 3 měsíce. Přesný interval vždy nastavíme individuálně podle stavu Vašich zubů a dásní.',
  },
  {
    question: 'Bolí dentální hygiena?',
    answer:
      'Zakládáme si na šetrném přístupu bez stresu. Ošetření přizpůsobíme Vaší citlivosti a tempu, a pokud je Vám cokoli nepříjemné, stačí říct — domluvíme se, jak postupovat.',
  },
  {
    question: 'Jak dlouho ošetření trvá?',
    answer:
      'Vstupní dentální hygiena trvá do 60 minut, pravidelná návštěva do 6 měsíců od poslední hygieny zpravidla do 30 minut. Délku ostatních ošetření najdete u jednotlivých položek v <a href="/#priceList">ceníku</a>.',
  },
  {
    question: 'Kolik dentální hygiena stojí?',
    answer: `Ceny začínají na ${minPrice}. Vstupní dentální hygiena stojí ${priceOf('Vstupní dentální hygiena')}, opakovaná návštěva do 6 měsíců ${priceOf('Opakovaná návštěva (do 6 měsíců)')}. Kompletní přehled najdete v <a href="/#priceList">ceníku</a>. Konkrétní postup ošetření si vždy odsouhlasíme předem.`,
  },
  {
    question: 'Hradí dentální hygienu zdravotní pojišťovna?',
    answer:
      'Dentální hygiena se hradí přímo v ordinaci. Některé zdravotní pojišťovny však na ni přispívají v rámci svých preventivních programů — podmínky a výši příspěvku doporučujeme ověřit u Vaší pojišťovny.',
  },
  {
    question: 'Potřebuji k objednání doporučení od zubaře?',
    answer: 'Ne, objednat se můžete přímo — online, telefonicky nebo e-mailem.',
  },
  {
    question: 'Jak se mohu objednat?',
    answer: `Nejrychleji přes náš <a href="${CONTACT.bookingUrl}" target="_blank" rel="noopener noreferrer">online rezervační systém</a>. Případně nám zavolejte na <a href="${CONTACT.phoneHref}">${CONTACT.phone}</a> nebo napište na <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>.`,
  },
  {
    question: 'Ošetřujete i děti?',
    answer: `Ano. Nabízíme šetrné čištění a nácvik péče pro děti do 12 let (${priceOf('Dentální hygiena pro mladší děti')}) a dentální hygienu pro mládež od 12 do 18 let (${priceOf('Dentální hygiena pro mládež')}).`,
  },
  {
    question: 'Mám rovnátka. Mohu přijít na dentální hygienu?',
    answer: `Ano, pacientům s fixními rovnátky i Invisalign se věnujeme — u rovnátek je důkladná hygiena obzvlášť důležitá. Doporučujeme interval 3 měsíce, cena je ${priceOf('Ortodontičtí pacienti s fixními rovnátky/invisalign')}.`,
  },
  {
    question: 'Jak mohu zaplatit?',
    answer: 'Platbu přijímáme v hotovosti nebo QR kódem.',
  },
  {
    question: 'Kde ordinaci najdu a mohu u vás zaparkovat?',
    answer: `Najdete nás ve ${CONTACT.building}, ${CONTACT.street}, ${CONTACT.postalCode} ${CONTACT.cityDistrict}. Parkování je zdarma, přístup je bezbariérový a zastávka MHD je 5 minut pěšky. Ordinační doba: ${openDays}.`,
  },
];
