import { Product } from '../types';
import { EMBD_TOPI_IMG, CAPS_COLLECTION_IMG } from './images';

export const TOPIS_DATA: Product[] = [
  {
    id: 'topi-summer-comfort-suddais',
    nameUr: 'پریمیم سمر کمفرٹ نماز ٹوپی',
    nameEn: 'Premium Summer Comfort Cap',
    taglineUr: 'سدیس کلیکشن کی نرم، ہوادار، پریمیم کوالٹی اسلامی نماز ٹوپی',
    taglineEn: 'Breathable, Soft, High Quality Islamic Cap for Summer & Daily Prayer',
    category: 'topi',
    price: 800,
    originalPrice: 1100,
    discountPercentage: 27,
    rating: 4.9,
    reviewsCount: 40,
    image: CAPS_COLLECTION_IMG,
    inStock: true,
    featured: true,
    badgeUr: 'گرمیوں کی خاص پسند',
    badgeEn: 'Summer Comfort',
    descriptionUr: 'سدیس کلیکشن کی خاص پریمیم سمر کمفرٹ ٹوپی۔ 100 فیصد نرم سوتی کپڑے پر نفیس ہوادار جالی دار کڑھائی جو سر پر ٹھنڈک اور آرام دیتی ہے۔ سجدے میں انتہائی آرام دہ۔',
    descriptionEn: 'Breathable, soft, high quality Islamic cap designed for long prayer sessions and hot summer days. Folds easily into your pocket.',
    topiSpecs: {
      materialUr: '100٪ مصری نرم قدرتی کاٹن (پسینہ جذب کرنے والا)',
      materialEn: '100% Breathable Combed Cotton with Micro-Ventilation',
      craftUr: 'ہاتھ کی باریک جیومیٹرک کڑھائی',
      craftEn: 'Fine Geometric Relief Needlework',
      originUr: 'سدیس کلیکشن ملیر، کراچی',
      originEn: 'Suddais Collection, Malir, Karachi',
      careUr: 'ہاتھ یا مشین میں دھلائی کے قابل',
      careEn: 'Hand or machine washable'
    },
    variants: [
      { size: '21.5 انچ (سمال)', price: 800, inStock: true },
      { size: '22 انچ (میڈیم)', price: 800, inStock: true },
      { size: '22.5 انچ (لارج)', price: 800, inStock: true },
      { size: '23 انچ (ایکس ایل)', price: 800, inStock: true }
    ]
  },
  {
    id: 'topi-omani-royal-velvet',
    nameUr: 'شاہی عمانی زری کڑھائی مخمل ٹوپی',
    nameEn: 'Royal Omani Embroidered Velvet Cap',
    taglineUr: 'خالص مخمل پر ہاتھ سے بنی نفیس سنہری زری و ہیرے تراش ڈیزائن',
    taglineEn: 'Master Hand-Embroidered Velvet Ceremonial Prayer Cap',
    category: 'topi',
    price: 1850,
    originalPrice: 2400,
    discountPercentage: 23,
    rating: 4.8,
    reviewsCount: 96,
    image: EMBD_TOPI_IMG,
    inStock: true,
    featured: true,
    badgeUr: 'دستکاری ماسٹر پیس',
    badgeEn: 'Handmade Craft',
    descriptionUr: 'اعلیٰ کوالٹی کے شاہی مخمل کپڑے پر خالص سنہری اور نقرئی زری دھاگے سے کڑھائی کی گئی ہے۔ عمانی شاہی انداز اور سر پر انتہائی آرام دہ۔',
    descriptionEn: 'Exquisitely hand-stitched on premium plush velvet featuring traditional royal Omani geometric floral motifs.',
    topiSpecs: {
      materialUr: 'خالص شاہی مخمل بمع کاٹن استر',
      materialEn: 'Pure High-Density Velvet with Soft Breathable Cotton Lining',
      craftUr: 'ہاتھ کی باریک زری اور ریشم کڑھائی',
      craftEn: 'Traditional Hand Needle Zari & Silk Threadwork',
      originUr: 'عمانی روایتی ڈیزائن',
      originEn: 'Omani Heritage Silhouette',
      careUr: 'صرف ڈرائی کلین',
      careEn: 'Dry clean only'
    },
    variants: [
      { size: '21.5 انچ (چھوٹا)', price: 1850, inStock: true },
      { size: '22 انچ (درمیانہ)', price: 1850, inStock: true },
      { size: '22.5 انچ (بڑا)', price: 1850, inStock: true },
      { size: '23 انچ (ایکس ایل)', price: 1850, inStock: true }
    ]
  },
  {
    id: 'topi-turkish-fez-classic',
    nameUr: 'ترکش فیز کلاسک ریڈ ٹوپی (ترک شاہانہ انداز)',
    nameEn: 'Classic Ottoman Turkish Fez Cap',
    taglineUr: 'خالص بھیڑ کے اون سے بنی مستند سرخ ترک ٹوپی بمع سیاہ زلفی پھندنا',
    taglineEn: 'Authentic 100% Wool Felt Ottoman Fez with Black Silk Tassel',
    category: 'topi',
    price: 2200,
    originalPrice: 2800,
    discountPercentage: 21,
    rating: 4.9,
    reviewsCount: 64,
    image: EMBD_TOPI_IMG,
    inStock: true,
    featured: true,
    badgeUr: 'عثمانی روایت',
    badgeEn: 'Ottoman Heritage',
    descriptionUr: 'استنبول کی تاریخی ورکشاپس کے طرز پر خالص اون کے فیلٹ سے بنی شاہی ترک فیز ٹوپی۔ اس پر لگا اصلی ریشمی پھندنا عثمانی دور کے شکوہ کی یاد دلاتا ہے۔',
    descriptionEn: 'Rigid structured wool felt crafted with the classic tall cylindrical silhouette and supple silk tassel.',
    topiSpecs: {
      materialUr: '100٪ قدرتی اون کا فیلٹ (پائیدار اور مضبوط ساخت)',
      materialEn: '100% Natural Pressed Wool Felt with Black Twisted Silk Tassel',
      craftUr: 'روایتی استنبولی فیلٹ مولڈنگ',
      craftEn: 'Traditional Mold-Blocked Ottoman Heritage Craft',
      originUr: 'عثمانی تاریخی ڈیزائن',
      originEn: 'Historical Ottoman Style',
      careUr: 'برش سے صفائی، پانی سے پرہیز کریں',
      careEn: 'Dry brush clean only'
    },
    variants: [
      { size: '21.5 انچ', price: 2200, inStock: true },
      { size: '22 انچ', price: 2200, inStock: true },
      { size: '22.5 انچ', price: 2200, inStock: true },
      { size: '23 انچ', price: 2200, inStock: true }
    ]
  },
  {
    id: 'topi-afghan-qaraquli-black',
    nameUr: 'افغان روایتی قراقلی ٹوپی (شاہی بلیک فر)',
    nameEn: 'Authentic Afghan Qaraquli Astrakan Cap',
    taglineUr: 'اصلی قراقلی فر، شاہانہ وقار اور تاریخی اسلامی قیادت کا نشان',
    taglineEn: 'Genuine Astrakan Fur Cap with Satin Lining',
    category: 'topi',
    price: 4500,
    originalPrice: 5800,
    discountPercentage: 22,
    rating: 5.0,
    reviewsCount: 58,
    image: CAPS_COLLECTION_IMG,
    inStock: true,
    featured: true,
    badgeUr: 'قائدانہ وقار',
    badgeEn: 'Presidential Astrakan',
    descriptionUr: 'اصلی گھنگریالے سیاہ فر سے تیار کی گئی مستند قراقلی ٹوپی جو قائدِ اعظم محمد علی جناح اور مشرقِ وسطیٰ کے اکابرین کی پہچان رہی ہے۔',
    descriptionEn: 'Hand-tailored authentic curled Astrakan sheep fur with a double-folded peak and royal silk satin lining.',
    topiSpecs: {
      materialUr: 'خالص قدرتی قراقلی فر بمع شاہی ساٹن استر',
      materialEn: '100% Natural Qaraquli Astrakan Fur with Silk Lining',
      craftUr: 'کابل و پشاور کے استاد کاریگروں کی دستکاری',
      craftEn: 'Master Artisan Hand-Molded Heritage Craft',
      originUr: 'افغان و پشاور تاریخی خطہ',
      originEn: 'Kabul & Peshawar Artisan Guild',
      careUr: 'صرف پروفیشنل فر کلیننگ',
      careEn: 'Specialized fur dry clean only'
    },
    variants: [
      { size: '21.5 انچ', price: 4500, inStock: true },
      { size: '22 انچ', price: 4500, inStock: true },
      { size: '22.5 انچ', price: 4500, inStock: true },
      { size: '23 انچ', price: 4500, inStock: true }
    ]
  },
  {
    id: 'topi-white-sunnah-crochet',
    nameUr: 'سفید خالص سوتی جالی دار نماز ٹوپی',
    nameEn: 'Pure White Cotton Hand-Crochet Sunnah Cap',
    taglineUr: '100٪ قدرتی سوتی دھاگہ، ہوادار جالی اور سارا دن سر پر ٹھنڈک',
    taglineEn: '100% Breathable Egyptian Cotton Hand-Knit Cap',
    category: 'topi',
    price: 650,
    originalPrice: 900,
    rating: 4.9,
    reviewsCount: 210,
    image: CAPS_COLLECTION_IMG,
    inStock: true,
    badgeUr: 'روزمرہ نماز کی پسند',
    badgeEn: 'Daily Prayer Favorite',
    descriptionUr: 'ہاتھ سے بنی سوتی جالی دار سفید ٹوپی جو سر پر اتنی ہلکی ہے کہ محسوس بھی نہیں ہوتی۔ سجدے میں انتہائی آرام دہ۔',
    descriptionEn: 'Lightweight, ultra-breathable open-weave cotton cap that folds easily into pocket.',
    topiSpecs: {
      materialUr: '100٪ مصری قدرتی سوتی دھاگہ',
      materialEn: '100% Pure Egyptian Combed Cotton',
      craftUr: 'ہاتھ کی باریک کروشیا بنائی',
      craftEn: 'Fine Hand Crochet Weave',
      originUr: 'پاکستان',
      originEn: 'Pakistan',
      careUr: 'ہاتھ یا مشین میں دھونے کے قابل',
      careEn: 'Machine or hand washable'
    },
    variants: [
      { size: 'فری سائز (لچکدار)', price: 650, inStock: true }
    ]
  },
  {
    id: 'topi-sindhi-mirrorwork-ajrak',
    nameUr: 'سندھی دستکاری شیشہ و زری ٹوپی',
    nameEn: 'Sindhi Handcrafted Mirrorwork Cap',
    taglineUr: 'اصلی شیشہ کاری، روایتی جیومیٹرک کڑھائی اور محرابی پیشانی',
    taglineEn: 'Traditional Sindhi Mirror-Work & Geometric Embroidery',
    category: 'topi',
    price: 1650,
    originalPrice: 2200,
    rating: 4.8,
    reviewsCount: 79,
    image: CAPS_COLLECTION_IMG,
    inStock: true,
    badgeUr: 'ثقافتی ورثہ',
    badgeEn: 'Sindhi Cultural Art',
    descriptionUr: 'سندھ کے دیہی علاقوں کے ہنرمند دستکاروں کی بنائی گئی خوبصورت شیشہ کاری اور رنگین ریشمی دھاگوں سے مرصع تاریخی ٹوپی۔',
    descriptionEn: 'Intricate micro-mirror hand-embroidery featuring the famous Sindhi arched front cut.',
    topiSpecs: {
      materialUr: 'مضبوط کاٹن کینوس پر شیشے اور ریشم کا کام',
      materialEn: 'Pure Cotton Base with Hand-Set Tiny Mirrors and Silk Thread',
      craftUr: 'تھرپارکر و ہالہ کی روایتی دستکاری',
      craftEn: 'Traditional Tharparkar Needlecraft',
      originUr: 'سندھ، پاکستان',
      originEn: 'Sindh, Pakistan',
      careUr: 'ہاتھ سے نرمی کے ساتھ صفائی',
      careEn: 'Gentle hand wipe only'
    },
    variants: [
      { size: '21.5 انچ', price: 1650, inStock: true },
      { size: '22 انچ', price: 1650, inStock: true },
      { size: '22.5 انچ', price: 1650, inStock: true },
      { size: '23 انچ', price: 1650, inStock: true }
    ]
  }
];
