export interface PriceItem {
  category: string;
  name: string;
  specification: string;
  duration: string;
  price: string;
}

export const PRICES: PriceItem[] = [
  {
    category: 'Vstupní ošetření',
    name: 'Vstupní dentální hygiena',
    specification: 'Pro nové pacienty a po době delší než 2 roky od poslední návštěvy.',
    duration: 'Do 60 min',
    price: '1 950 Kč',
  },
  {
    category: 'Pravidelná péče',
    name: 'Opakovaná návštěva (do 6 měsíců)',
    specification: 'Interval do 6 měsíců od poslední návštěvy.',
    duration: 'Do 30 min',
    price: '1 500 Kč',
  },
  {
    category: 'Pravidelná péče',
    name: 'Opakovaná návštěva (po 6 až 24 měsících)',
    specification: 'Náročnější ošetření, po více než 6 měsících od poslední návštěvy.',
    duration: 'Do 60 min',
    price: '1 800 Kč',
  },
  {
    category: 'Pravidelná péče',
    name: 'Dentální hygiena pro mládež',
    specification: 'Individuální instruktáž a čištění pro věk 12 až 18 let.',
    duration: 'Do 45 min',
    price: '1 350 Kč',
  },
  {
    category: 'Pravidelná péče',
    name: 'Dentální hygiena pro mladší děti',
    specification: 'Šetrné čištění a nácvik péče pro děti do 12 let.',
    duration: 'Do 30 min',
    price: '1 050 Kč',
  },
  {
    category: 'Pravidelná péče',
    name: 'Ortodontičtí pacienti s fixními rovnátky/invisalign',
    specification: 'Interval každé 3 měsíce.',
    duration: 'Do 30 min',
    price: '1 050 Kč',
  },
];
