import { Product } from '../types';
import { PERFUMES_DATA } from './perfumesData';
import { ATTARS_DATA } from './attarsData';
import { TOPIS_DATA } from './topisData';
import { DEALS_DATA } from './dealsData';

export {
  HERO_BANNER_IMG,
  OUD_PERFUME_IMG,
  DEHN_ATTAR_IMG,
  EMBD_TOPI_IMG,
  BLUE_PERFUME_IMG,
  AMBER_PERFUME_IMG,
  WHITE_MUSK_IMG,
  CAPS_COLLECTION_IMG
} from './images';

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
    code: 'FREESHIP',
    titleUr: '5000 روپے سے زائد پر مفت ترسیل',
    titleEn: 'FREE SHIPPING OVER RS. 5000',
    descUr: 'سدیس کلیکشن کی طرف سے 5000 روپے سے زائد کی خریداری پر پورے پاکستان میں مفت ڈیلیوری۔',
    descEn: 'Enjoy zero courier charges on every order above Rs. 5000 nationwide.',
    discount: 0,
    tagUr: 'مفت ترسیل',
    tagEn: 'FREE SHIPPING'
  },
  {
    id: 'deal-2',
    code: 'SUDDAIS10',
    titleUr: 'سدیس کلیکشن 10٪ رعایت',
    titleEn: 'Suddais Collection 10% Flat OFF',
    descUr: 'کوڈ "SUDDAIS10" استعمال کریں اور کسی بھی آرڈر پر فوری 10 فیصد کی بچت حاصل کریں۔',
    descEn: 'Apply coupon code SUDDAIS10 at checkout to receive 10% instant discount.',
    discount: 10,
    tagUr: 'اسپیشل کوڈ',
    tagEn: 'Special Voucher'
  },
  {
    id: 'deal-3',
    code: 'COMBO5',
    titleUr: '5 پیس اسپرے سیٹ صرف 1500',
    titleEn: '5 Pcs Spray Combo Just Rs. 1500',
    descUr: 'سدیس کلیکشن کے 5 منی اسپرے پرفیومز (5ml) کا پورا گفٹ سیٹ صرف 1500 روپے میں۔',
    descEn: '5-piece travel spray perfume gift set in presentation box.',
    discount: 15,
    tagUr: 'بڑی بچت',
    tagEn: 'Mega Combo'
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
