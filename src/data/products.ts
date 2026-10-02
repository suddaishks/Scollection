import { Product } from '../types';
import { PERFUMES_DATA } from './perfumesData';
import { ATTARS_DATA } from './attarsData';
import { TOPIS_DATA } from './topisData';
import { DEALS_DATA } from './dealsData';

export const HERO_BANNER_IMG = '/src/assets/images/hero_perfume_attar_topi_1790930694602.jpg';
export const OUD_PERFUME_IMG = '/src/assets/images/product_royal_oud_perfume_1790930708365.jpg';
export const DEHN_ATTAR_IMG = '/src/assets/images/product_dehn_al_oud_attar_1790930721382.jpg';
export const EMBD_TOPI_IMG = '/src/assets/images/product_luxury_embroidered_topi_1790930733235.jpg';
export const BLUE_PERFUME_IMG = '/src/assets/images/product_french_blue_perfume_1790931733661.jpg';
export const AMBER_PERFUME_IMG = '/src/assets/images/product_amber_gold_perfume_1790931751652.jpg';
export const WHITE_MUSK_IMG = '/src/assets/images/product_white_musk_attar_1790931765997.jpg';
export const CAPS_COLLECTION_IMG = '/src/assets/images/product_sindhi_afghan_caps_1790931778385.jpg';

// Comprehensive catalog containing 20 Perfumes, 20 Attars, 12 Topis, and 8 Deals = 60 Products
export const PRODUCTS: Product[] = [
  ...DEALS_DATA,
  ...PERFUMES_DATA,
  ...ATTARS_DATA,
  ...TOPIS_DATA
];

export const SPECIAL_DEALS = [
  {
    id: 'deal-1',
    code: 'JUMMAH15',
    titleUr: 'جمعہ و عید اسپیشل 15٪ رعایت',
    titleEn: 'Jummah & Eid 15% Flat Discount',
    descUr: 'کوڈ "JUMMAH15" استعمال کریں اور کسی بھی آرڈر پر فوری 15 فیصد کی بچت حاصل کریں۔',
    descEn: 'Apply coupon code JUMMAH15 at checkout to receive 15% instant discount.',
    discount: 15,
    tagUr: 'محدود وقت کی آفر',
    tagEn: 'Limited Period'
  },
  {
    id: 'deal-2',
    code: 'FREESHIP',
    titleUr: '3000 روپے سے زائد پر مفت ڈیلیوری',
    titleEn: 'Free Delivery Over PKR 3,000',
    descUr: 'پورے پاکستان کے تمام شہروں میں تیز رفتار ڈیلیوری 2 سے 3 دن میں بالکل مفت۔',
    descEn: 'Enjoy zero courier charges on every order above PKR 3,000 nationwide.',
    discount: 0,
    tagUr: 'پورے پاکستان میں',
    tagEn: 'Nationwide Courier'
  },
  {
    id: 'deal-3',
    code: 'BUY2GET1',
    titleUr: '2 عطر خریدیں 1 ٹوپی مفت پائیں',
    titleEn: 'Buy Any 2 Attars, Get Free Cap',
    descUr: 'دو عطر کی خریداری پر ہم آپ کو بھیجیں گے ایک دیدہ زیب نماز ٹوپی بالکل مفت۔',
    descEn: 'Add any 2 attars to your order and we will pack an embroidered cap inside.',
    discount: 10,
    tagUr: 'خصوصی تحفہ',
    tagEn: 'Free Gift Inside'
  }
];

export const PAKISTAN_CITIES = [
  'کراچی (Karachi)',
  'لاہور (Lahore)',
  'اسلام آباد (Islamabad)',
  'راولپنڈی (Rawalpindi)',
  'فیصل آباد (Faisalabad)',
  'ملتان (Multan)',
  'پشاور (Peshawar)',
  'کوئٹہ (Quetta)',
  'سیالکوٹ (Sialkot)',
  'گوجرانوالہ (Gujranwala)',
  'حیدرآباد (Hyderabad)',
  'بہاولپور (Bahawalpur)',
  'سرگودھا (Sargodha)',
  'سکھر (Sukkur)',
  'ایبٹ آباد (Abbottabad)',
  'مردان (Mardan)',
  'گجرات (Gujrat)',
  'دیگر شہر / قصبہ (Other City/Town)'
];
