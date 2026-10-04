import { Product } from '../types';
import { HERO_BANNER_IMG, BLUE_PERFUME_IMG, DEHN_ATTAR_IMG } from './images';

export const DEALS_DATA: Product[] = [
  {
    id: 'deal-suddais-5pcs-set',
    nameUr: 'سدیس کلیکشن - 5 پیس اسپرے پرفیوم سیٹ (5 ML ہر ایک)',
    nameEn: 'Suddais Collection - 5 Pcs Spray Perfume Set (5 ML Each)',
    taglineUr: 'سدیس کلیکشن کے 5 ٹاپ ریٹڈ پریمیم اسپرے پرفیومز کا تحفہ باکس',
    taglineEn: 'Set of 5 Premium Spray Perfumes. Long-Lasting & Ideal for Gifting',
    category: 'deals',
    price: 1500,
    originalPrice: 2200,
    discountPercentage: 32,
    rating: 5.0,
    reviewsCount: 12,
    image: HERO_BANNER_IMG,
    inStock: true,
    featured: true,
    isDeal: true,
    badgeUr: 'اسپیشل کومبو (Special Combo)',
    badgeEn: 'Special Combo',
    descriptionUr: 'سدیس کلیکشن کا سب سے مقبول 5 پیس منی اسپرے پرفیوم سیٹ۔ اس میں ہمارے بہترین پرفیومز شامل ہیں، جیب میں رکھنے اور تحفہ دینے کے لیے بے مثال۔',
    descriptionEn: 'Set of 5 premium spray perfumes (5 ML each). Exceptional long-lasting performance, compact travel size and ideal presentation for gifting.',
    bundleItemsUr: [
      '5x پریمیم اسپرے پرفیومز (5 ML ہر ایک شیشی)',
      'امپیریل ویلی، 9 PM اسٹائل، خمرہ، رائل میراج، اور بخور',
      'خوبصورت پریمیم پریزنٹیشن گفٹ باکس'
    ],
    bundleItemsEn: [
      '5x Premium Spray Perfumes (5 ML Each)',
      'Imperial Valley, 9 PM Style, Khamrah, Royal Mirage & Bakhoor',
      'Elegant Presentation Travel Gift Box'
    ],
    notes: {
      top: [{ ur: 'سٹرس، سیب و دارچینی', en: 'Citrus, Apple & Cinnamon' }],
      heart: [{ ur: 'بخور، عود و چنبیلی', en: 'Bukhoor, Oud & Jasmine' }],
      base: [{ ur: 'ونیلا، عنبر و کستوری', en: 'Vanilla, Amber & Musk' }]
    },
    specs: {
      sillage: 'Strong',
      sillageUr: 'مضبوط اور خوشگوار',
      longevity: '18-24 Hours',
      longevityUr: '18 سے 24 گھنٹے',
      season: 'All Seasons / Gifting',
      seasonUr: 'ہر موسم اور تحفہ',
      concentration: 'Set of 5 Sprays (25 ML Total)',
      concentrationUr: '5 پرفیومز کا مکمل سیٹ',
      gender: 'Unisex',
      genderUr: 'سب کے لیے'
    },
    variants: [
      { size: '5 پیس مکمل سیٹ (5 ML ہر ایک)', price: 1500, inStock: true }
    ]
  },
  {
    id: 'deal-ramadan-jummah-box',
    nameUr: 'شاہی جمعہ و عید گفٹ باکس (سدیس سپیشل)',
    nameEn: 'Royal Jummah & Eid Luxury Presentation Box',
    taglineUr: 'امپیریل ویلی پرفیوم + رائل میراج عطر + سمر کمفرٹ ٹوپی',
    taglineEn: 'Imperial Valley (50ml) + Royal Mirage (12ml) + Comfort Cap in Gift Box',
    category: 'deals',
    price: 4800,
    originalPrice: 6200,
    discountPercentage: 23,
    rating: 5.0,
    reviewsCount: 78,
    image: HERO_BANNER_IMG,
    inStock: true,
    featured: true,
    isDeal: true,
    badgeUr: 'بڑی بچت - 23٪ رعایت',
    badgeEn: 'Mega Deal 23% OFF',
    descriptionUr: 'سدیس کلیکشن کا فلیگ شپ بنڈل! اس میں امپیریل ویلی پرفیوم (50ml)، رائل میراج عطر (12ml)، اور پریمیم سمر کمفرٹ ٹوپی شامل ہے، جو گفٹ باکس میں محفوظ ہے۔',
    descriptionEn: 'The ultimate luxury bundle featuring our top-tier perfume, sunnah attar oil, and prayer cap.',
    bundleItemsUr: [
      '1x امپیریل ویلی پرفیوم (50ml - قیمت 3,000 روپے)',
      '1x رائل میراج عطر (12ml - قیمت 1,400 روپے)',
      '1x پریمیم سمر کمفرٹ نماز ٹوپی (قیمت 800 روپے)',
      'مفت ہوم ڈیلیوری پورے پاکستان میں'
    ],
    bundleItemsEn: [
      '1x Imperial Valley Perfume (50ml)',
      '1x Royal Mirage Attar (12ml)',
      '1x Premium Summer Comfort Cap',
      'Free Delivery across all cities of Pakistan'
    ],
    variants: [
      { size: 'فل باکس سیٹ (میڈیم 22")', price: 4800, inStock: true },
      { size: 'فل باکس سیٹ (لارج 22.5")', price: 4800, inStock: true }
    ]
  },
  {
    id: 'deal-attar-trio-suddais',
    nameUr: 'تھری اسٹار عطر بنڈل: بلو سی + بخور + امیر العود',
    nameEn: 'Three Star Attar Trio: Blue Sea + Bakhoor + Ameer Al Oud',
    taglineUr: 'تین سب سے مقبول عطر ایک ساتھ رعایتی قیمت پر (کل 36ml)',
    taglineEn: 'Three Best-Selling 12 ML Attars in One Special Value Pack',
    category: 'deals',
    price: 3200,
    originalPrice: 3600,
    discountPercentage: 11,
    rating: 4.9,
    reviewsCount: 65,
    image: DEHN_ATTAR_IMG,
    inStock: true,
    isDeal: true,
    badgeUr: 'مقبول عطر بنڈل',
    badgeEn: 'Popular Trio',
    descriptionUr: 'سدیس کلیکشن کے تین سب سے زیادہ پسند کیے جانے والے عطر: بلو سی (تازہ ایکوا)، بخور (عربی دھونی)، اور امیر العود (شاہی لکڑی)۔',
    descriptionEn: 'Our top 3 essential everyday attars covering fresh aquatic, spiritual incense, and royal agarwood.',
    bundleItemsUr: [
      '1x بلو سی عطر (12ml)',
      '1x بخور عطر (12ml)',
      '1x امیر العود عطر (12ml)'
    ],
    bundleItemsEn: [
      '1x Blue Sea Attar (12ml)',
      '1x Bakhoor Attar (12ml)',
      '1x Ameer Al Oud Attar (12ml)'
    ],
    variants: [
      { size: '3 عطر بنڈل سیٹ (3 x 12ml)', price: 3200, inStock: true }
    ]
  },
  {
    id: 'deal-perfume-duo-party',
    nameUr: 'ڈو پرفیوم آفر: نائن پی ایم + خمرہ (50ml + 50ml)',
    nameEn: 'Party & Winter Duo: 9 PM Style + Khamrah (50ml Each)',
    taglineUr: 'سردیوں اور رات کی تقریبات کی دو سب سے دلکش اور طاقتور خوشبوئیں',
    taglineEn: 'Two Phenomenal Long-Lasting Evening Powerhouses (100ml Total)',
    category: 'deals',
    price: 4500,
    originalPrice: 5000,
    discountPercentage: 10,
    rating: 5.0,
    reviewsCount: 54,
    image: BLUE_PERFUME_IMG,
    inStock: true,
    isDeal: true,
    badgeUr: 'پارٹی ڈو',
    badgeEn: 'Evening Duo',
    descriptionUr: 'نائن پی ایم اسٹائل اور خمرہ پرفیوم کی جوڑی۔ دونوں خوشبوئیں اپنی بے پناہ پائیداری اور میٹھی گرمائش کی وجہ سے پہچانی جاتی ہیں۔',
    descriptionEn: 'Two viral favorite perfumes paired together for winter warmth and unforgettable party projection.',
    bundleItemsUr: [
      '1x نائن پی ایم اسٹائل پرفیوم (50ml)',
      '1x خمرہ پرفیوم (50ml)',
      'مفت گفٹ باکس'
    ],
    bundleItemsEn: [
      '1x 9 PM Style Perfume (50ml)',
      '1x Khamrah Perfume (50ml)',
      'Complimentary Gift Box'
    ],
    variants: [
      { size: '2 پرفیوم سیٹ (کل 100ml)', price: 4500, inStock: true }
    ]
  }
];
