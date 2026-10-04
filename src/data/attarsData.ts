import { Product } from '../types';
import { DEHN_ATTAR_IMG, WHITE_MUSK_IMG } from './images';

export const ATTARS_DATA: Product[] = [
  {
    id: 'attar-royal-mirage',
    nameUr: 'رائل میراج عطر (12ml)',
    nameEn: 'Royal Mirage Attar - 12 ML',
    taglineUr: 'کلاسک تازہ مصالحہ دار اور پرکشش خوشبو، زبردست پھیلاؤ کے ساتھ',
    taglineEn: 'Classic Fresh Spicy Fragrance with Massive Projection',
    category: 'attar',
    price: 1400,
    originalPrice: 1700,
    discountPercentage: 18,
    rating: 5.0,
    reviewsCount: 89,
    image: DEHN_ATTAR_IMG,
    inStock: true,
    featured: true,
    badgeUr: 'بیسٹ سیلر (BEST SELLER)',
    badgeEn: 'BEST SELLER',
    descriptionUr: 'سدیس کلیکشن کا سب سے زیادہ بکنے والا عطر! کلاسک تازہ مصالحہ دار نوٹس اور صندل کی دیرپا بیس جو کپڑوں پر سارا دن برقرار رہتی ہے۔',
    descriptionEn: 'Legendary fresh spicy aroma with bergamot, carnation, clover, and rich woody undertones.',
    notes: {
      top: [{ ur: 'برگاموٹ و لیمن', en: 'Fresh Bergamot' }, { ur: 'سیج بوٹی', en: 'Clary Sage' }],
      heart: [{ ur: 'لونگ و جائفل', en: 'Nutmeg & Clove' }, { ur: 'قرنفل پھول', en: 'Carnation' }],
      base: [{ ur: 'اوک ماس', en: 'Oakmoss' }, { ur: 'چندن کی لکڑی', en: 'Sandalwood Base' }]
    },
    specs: {
      sillage: 'Intense',
      sillageUr: 'انتہائی تیز اور دیرپا پھیلاؤ',
      longevity: '24-36 Hours',
      longevityUr: '24 سے 36 گھنٹے پائیدار',
      season: 'All Seasons',
      seasonUr: 'سارا سال اور محافل',
      concentration: '100% Pure Attar (12 ML)',
      concentrationUr: '100 فیصد خالص روغنی عطر (12ml)',
      gender: 'Men / Unisex',
      genderUr: 'مردانہ کلاسک'
    },
    variants: [
      { size: '12 ML (ایک تولہ شیشی)', price: 1400, inStock: true }
    ]
  },
  {
    id: 'attar-blue-sea',
    nameUr: 'بلو سی عطر (12ml)',
    nameEn: 'Blue Sea Attar - 12 ML',
    taglineUr: 'سمندری لہروں، لیموں اور ٹھنڈے پانی کی دل موہ لینے والی تازگی',
    taglineEn: 'Fresh, Oceanic Aquatic Fragrance with Long Projection',
    category: 'attar',
    price: 1200,
    originalPrice: 1350,
    discountPercentage: 10,
    rating: 4.9,
    reviewsCount: 42,
    image: WHITE_MUSK_IMG,
    inStock: true,
    featured: true,
    badgeUr: '10٪ رعایت (10% OFF)',
    badgeEn: '10% OFF',
    descriptionUr: 'تازہ سمندری لہروں اور پودینے کی روح پرور خوشبو۔ گرمیوں کے موسم اور روزانہ دفتری استعمال کے لیے سب سے بہترین اور فرحت بخش عطر۔',
    descriptionEn: 'Vibrant aquatic marine essence with cool sea breeze, citrus zest, and breezy white musk.',
    notes: {
      top: [{ ur: 'سمندری نمکیات و پودینہ', en: 'Sea Breeze & Mint' }, { ur: 'اطالوی لیمن', en: 'Italian Lemon' }],
      heart: [{ ur: 'آبی کائی', en: 'Marine Moss' }, { ur: 'لیونڈر پھول', en: 'French Lavender' }],
      base: [{ ur: 'دیودار لکڑی', en: 'Cedarwood' }, { ur: 'سفید عنبر', en: 'White Ambergris' }]
    },
    specs: {
      sillage: 'Strong',
      sillageUr: 'تازہ اور چمکتا ہوا ہالہ',
      longevity: '18-24 Hours',
      longevityUr: '18 سے 24 گھنٹے',
      season: 'Summer Peak & Daily',
      seasonUr: 'موسم گرما اور روزمرہ',
      concentration: '100% Pure Attar (12 ML)',
      concentrationUr: 'خالص الکحل سے پاک عطر',
      gender: 'Unisex',
      genderUr: 'سب کے لیے'
    },
    variants: [
      { size: '12 ML (1 Tola)', price: 1200, inStock: true }
    ]
  },
  {
    id: 'attar-oud-ul-lail',
    nameUr: 'عود اللیل عطر (12ml)',
    nameEn: 'Oud Ul Lail Attar - 12 ML',
    taglineUr: 'تاریک رات کی پراسرار اور گہری عود کی شاہانہ خوشبو',
    taglineEn: 'Deep, Mysterious Night-Time Oudh Fragrance',
    category: 'attar',
    price: 1200,
    originalPrice: 1400,
    discountPercentage: 15,
    rating: 5.0,
    reviewsCount: 50,
    image: DEHN_ATTAR_IMG,
    inStock: true,
    featured: true,
    badgeUr: '15٪ رعایت (15% OFF)',
    badgeEn: '15% OFF',
    descriptionUr: 'رات کی محافل اور سردیوں کا شاہکار۔ گہرا عود، کستوری اور عنبر کا طلسماتی امتزاج جو ہر کسی کو مسحور کر دیتا ہے۔',
    descriptionEn: 'Intense nocturnal agarwood infused with wild night florals, dark amber, and resinous woods.',
    notes: {
      top: [{ ur: 'کالی مرچ و الائچی', en: 'Black Pepper & Cardamom' }, { ur: 'زعفران', en: 'Saffron' }],
      heart: [{ ur: 'گہرا عود', en: 'Dark Agarwood' }, { ur: 'دمشقی گلاب', en: 'Damask Rose' }],
      base: [{ ur: 'شاہی عنبر', en: 'Royal Amber' }, { ur: 'سیاہ کستوری', en: 'Velvet Musk' }]
    },
    specs: {
      sillage: 'Intense',
      sillageUr: 'انتہائی باوقار اور گہرا',
      longevity: '24-36 Hours',
      longevityUr: '24 سے 36 گھنٹے',
      season: 'Winter & Evenings',
      seasonUr: 'سردیاں اور رات کی تقریبات',
      concentration: '100% Pure Attar',
      concentrationUr: 'خالص روغنی عطر (12ml)',
      gender: 'Unisex',
      genderUr: 'مرد و خواتین'
    },
    variants: [
      { size: '12 ML', price: 1200, inStock: true }
    ]
  },
  {
    id: 'attar-bakhoor-pure',
    nameUr: 'بخور عطر (12ml)',
    nameEn: 'Bakhoor Attar - 12 ML',
    taglineUr: 'عربی بخور اور لکڑی کے سلگتے کوئلوں کی معطر اور پاکیزہ دھونی',
    taglineEn: 'Warm, Smoky Oriental Incense Note Attar',
    category: 'attar',
    price: 1200,
    originalPrice: 1500,
    discountPercentage: 20,
    rating: 4.9,
    reviewsCount: 64,
    image: DEHN_ATTAR_IMG,
    inStock: true,
    featured: true,
    badgeUr: 'ہاٹ سیلر (HOT)',
    badgeEn: 'HOT',
    descriptionUr: 'روایتی عربی بخور کی دھونی کی مخصوص خوشبو۔ عبادت، جمعہ اور محافلِ ذکر کے لیے سب سے پسندیدہ پاکیزہ عطر۔',
    descriptionEn: 'Warm, resinous, smoky oriental bukhoor notes balanced with pure sandalwood and sweet amber.',
    notes: {
      top: [{ ur: 'عمانی لوبان', en: 'Omani Frankincense' }, { ur: 'الائچی', en: 'Cardamom' }],
      heart: [{ ur: 'سلگتا ہوا بخور', en: 'Bukhoor Smoke' }, { ur: 'گلاب کی پتیاں', en: 'Rose Petals' }],
      base: [{ ur: 'صندل کی لکڑی', en: 'Sandalwood Base' }, { ur: 'عنبر خام', en: 'Raw Amber' }]
    },
    specs: {
      sillage: 'Strong',
      sillageUr: 'پاکیزہ اور معطر',
      longevity: '24 Hours+',
      longevityUr: '24 گھنٹے سے زائد',
      season: 'All Seasons',
      seasonUr: 'سارا سال اور جمعہ',
      concentration: '100% Pure Attar',
      concentrationUr: 'الکحل سے پاک عطر (12ml)',
      gender: 'Unisex',
      genderUr: 'سب کے لیے'
    },
    variants: [
      { size: '12 ML', price: 1200, inStock: true }
    ]
  },
  {
    id: 'attar-majmuaa-traditional',
    nameUr: 'مجموعہ عطر (12ml)',
    nameEn: 'Majmuaa Attar - 12 ML',
    taglineUr: 'خس، کیوڑا، گلاب اور مٹی کے عطر کا روایتی کلاسک اور پاکیزہ سنگم',
    taglineEn: 'Classic Traditional Floral and Woody Attar Blend',
    category: 'attar',
    price: 1200,
    originalPrice: 1450,
    rating: 5.0,
    reviewsCount: 38,
    image: DEHN_ATTAR_IMG,
    inStock: true,
    featured: false,
    badgeUr: 'روایتی کلاسک',
    badgeEn: 'Classic Heritage',
    descriptionUr: 'برصغیر پاک و ہند کا صدیوں پرانا کلاسک مجموعہ عطر۔ خس کی ٹھنڈک اور پھولوں کی مٹھاس کا متوازن اور پرسکون امتزاج۔',
    descriptionEn: 'Timeless masterpiece harmony of vetiver root, kewra flowers, rosewater, and baked earth.',
    notes: {
      top: [{ ur: 'کیوڑا و گلاب', en: 'Kewra & Rose' }, { ur: 'پودینہ', en: 'Wild Mint' }],
      heart: [{ ur: 'سبز خس', en: 'Green Vetiver' }, { ur: 'مٹی کا عطر', en: 'Baked Earth' }],
      base: [{ ur: 'صندل میسور', en: 'Mysore Sandal' }, { ur: 'کستوری', en: 'Traditional Musk' }]
    },
    specs: {
      sillage: 'Strong',
      sillageUr: 'ٹھنڈا اور باوقار',
      longevity: '18-24 Hours',
      longevityUr: '18 سے 24 گھنٹے',
      season: 'Summer & Jummah',
      seasonUr: 'گرمیوں اور نمازِ جمعہ',
      concentration: '100% Pure Attar',
      concentrationUr: '100٪ خالص روغنی عطر',
      gender: 'Unisex',
      genderUr: 'سب کے لیے'
    },
    variants: [
      { size: '12 ML', price: 1200, inStock: true }
    ]
  },
  {
    id: 'attar-ameer-al-oud',
    nameUr: 'امیر العود عطر (12ml)',
    nameEn: 'Ameer Al Oud Attar - 12 ML',
    taglineUr: 'شاہی عود، میٹھی ونیلا اور کستوری کا مشرقی امراء والا انداز',
    taglineEn: 'Rich, Oriental Agarwood Fragrance for Royalty',
    category: 'attar',
    price: 1200,
    originalPrice: 1500,
    rating: 4.8,
    reviewsCount: 25,
    image: DEHN_ATTAR_IMG,
    inStock: true,
    featured: false,
    badgeUr: 'شاہی امراء',
    badgeEn: 'Royal Agarwood',
    descriptionUr: 'امیر العود عطر۔ لکڑی کے قیمتی ٹکڑوں اور شکر آمیز ونیلا کی پرکشش ملاوٹ جو شخصیت کو پروقار اور پرکشش بنا دیتی ہے۔',
    descriptionEn: 'Sweet smoky oriental agarwood touched with caramel sugar, vanilla bean, and labdanum.',
    notes: {
      top: [{ ur: 'شیریں ونیلا', en: 'Sweet Vanilla' }, { ur: 'الائچی', en: 'Cardamom' }],
      heart: [{ ur: 'خالص عود کی لکڑی', en: 'Aged Agarwood' }, { ur: 'شوگر براؤن', en: 'Brown Sugar' }],
      base: [{ ur: 'چندن کی لکڑی', en: 'Sandalwood' }, { ur: 'عنبر رال', en: 'Amber Resin' }]
    },
    specs: {
      sillage: 'Strong',
      sillageUr: 'شیریں اور نمایاں',
      longevity: '20-24 Hours',
      longevityUr: '20 سے 24 گھنٹے',
      season: 'All Seasons',
      seasonUr: 'سارا سال',
      concentration: '100% Pure Attar',
      concentrationUr: 'خالص روغنی عطر (12ml)',
      gender: 'Unisex',
      genderUr: 'مرد و خواتین'
    },
    variants: [
      { size: '12 ML', price: 1200, inStock: true }
    ]
  },
  {
    id: 'attar-romantic-coffee',
    nameUr: 'رومانٹک کافی عطر (12ml)',
    nameEn: 'Romantic Coffee Attar - 12 ML',
    taglineUr: 'بھنی ہوئی کافی کی دلکش مہک، ڈارک چاکلیٹ اور میٹھی ونیلا کا اچھوتا سنگم',
    taglineEn: 'Unique Gourmet Coffee & Dark Chocolate Fragrance Blend',
    category: 'attar',
    price: 2400,
    originalPrice: 3000,
    discountPercentage: 20,
    rating: 4.7,
    reviewsCount: 18,
    image: DEHN_ATTAR_IMG,
    inStock: true,
    featured: true,
    badgeUr: 'منفرد گورمے',
    badgeEn: 'Gourmet Coffee',
    descriptionUr: 'پاکستان میں پہلی بار: تازہ کافی بینز، ڈارک چاکلیٹ اور کیریمل کا نایاب گورمے عطر۔ کافی کے شوقین افراد کے لیے مسحور کن تحفہ۔',
    descriptionEn: 'Sensual roasted arabica coffee beans folded into dark chocolate truffle and warm bourbon vanilla.',
    notes: {
      top: [{ ur: 'بھنی ہوئی کافی بینز', en: 'Roasted Coffee Beans' }, { ur: 'دارچینی', en: 'Cinnamon' }],
      heart: [{ ur: 'ڈارک چاکلیٹ', en: 'Dark Chocolate' }, { ur: 'کیریمل', en: 'Salted Caramel' }],
      base: [{ ur: 'بوربن ونیلا', en: 'Bourbon Vanilla' }, { ur: 'صندل کی لکڑی', en: 'Blonde Woods' }]
    },
    specs: {
      sillage: 'Strong',
      sillageUr: 'انتہائی پرکشش اور دل موہ لینے والا',
      longevity: '20-24 Hours',
      longevityUr: '20 سے 24 گھنٹے',
      season: 'Winter & Evenings',
      seasonUr: 'سردیاں اور شامیں',
      concentration: '100% Pure Attar Oil',
      concentrationUr: 'خالص روغنی عطر (12ml)',
      gender: 'Unisex',
      genderUr: 'یکساں موزوں'
    },
    variants: [
      { size: '12 ML', price: 2400, inStock: true }
    ]
  },
  {
    id: 'attar-white-oudh-pure',
    nameUr: 'وائٹ عود عطر (12ml)',
    nameEn: 'White Oudh Attar - 12 ML',
    taglineUr: 'ملائم، شفاف اور پرسکون سفید لکڑی کی پرشکوہ پاکیزہ خوشبو',
    taglineEn: 'Soft, Clean, Luxurious White Agarwood Fragrance',
    category: 'attar',
    price: 1400,
    originalPrice: 1750,
    discountPercentage: 20,
    rating: 4.9,
    reviewsCount: 33,
    image: WHITE_MUSK_IMG,
    inStock: true,
    featured: false,
    badgeUr: 'ملائم و شفاف',
    badgeEn: 'Soft White Oud',
    descriptionUr: 'روایتی سیاہ عود سے مختلف ایک نرم، سفید، ملائم اور پاکیزہ خوشبو جو سر پر بھاری نہیں لگتی بلکہ مسلسل فرحت کا احساس دلاتی ہے۔',
    descriptionEn: 'Smooth, approachable white agarwood paired with delicate amber crystals and sheer cashmere.',
    notes: {
      top: [{ ur: 'سفید گلاب', en: 'White Rose' }, { ur: 'برگاموٹ', en: 'Bergamot' }],
      heart: [{ ur: 'خالص سفید عود', en: 'Soft White Oudh' }, { ur: 'صندل کی چھال', en: 'Sandalwood Bark' }],
      base: [{ ur: 'سفید کستوری', en: 'White Musk' }, { ur: 'عنبرین', en: 'Amber Crystals' }]
    },
    specs: {
      sillage: 'Moderate',
      sillageUr: 'پرسکون اور مہذب',
      longevity: '18-22 Hours',
      longevityUr: '18 سے 22 گھنٹے',
      season: 'All Seasons',
      seasonUr: 'سارا سال',
      concentration: '100% Pure Attar',
      concentrationUr: 'خالص عطر (12ml)',
      gender: 'Unisex',
      genderUr: 'سب کے لیے'
    },
    variants: [
      { size: '12 ML', price: 1400, inStock: true }
    ]
  },
  {
    id: 'attar-dirham-arabic',
    nameUr: 'درہم عطر (12ml)',
    nameEn: 'Dirham Attar - 12 ML',
    taglineUr: 'دبئی کی مشہورِ زمانہ سٹرس، لیوینڈر اور صندل کی متحرک خوشبو',
    taglineEn: 'Popular Arabic Citrus, Floral & Woody Blend',
    category: 'attar',
    price: 1200,
    originalPrice: 1400,
    rating: 4.9,
    reviewsCount: 45,
    image: WHITE_MUSK_IMG,
    inStock: true,
    featured: false,
    badgeUr: 'دبئی کلاسک',
    badgeEn: 'Dubai Classic',
    descriptionUr: 'درہم عطر عرب دنیا اور پاکستان کا سب سے مقبول روزمرہ عطر۔ ترش لیمن، لیوینڈر اور چندن کی متحرک تازگی۔',
    descriptionEn: 'Brisk bergamot, lemon, cardamom, and soft lavender settling into cedarwood and vetiver.',
    notes: {
      top: [{ ur: 'برگاموٹ و لیمن', en: 'Bergamot & Lemon' }, { ur: 'الائچی', en: 'Cardamom' }],
      heart: [{ ur: 'لیوینڈر و چنبیلی', en: 'Lavender & Jasmine' }, { ur: 'گلاب', en: 'Rose' }],
      base: [{ ur: 'صندل و دیودار', en: 'Sandalwood & Cedar' }, { ur: 'ویٹیور', en: 'Vetiver' }]
    },
    specs: {
      sillage: 'Strong',
      sillageUr: 'تازہ اور متحرک',
      longevity: '16-20 Hours',
      longevityUr: '16 سے 20 گھنٹے',
      season: 'All Seasons / Office',
      seasonUr: 'دفتری اور روزانہ استعمال',
      concentration: '100% Pure Attar',
      concentrationUr: 'خالص عطر (12ml)',
      gender: 'Men / Unisex',
      genderUr: 'مردانہ و یونی سیکس'
    },
    variants: [
      { size: '12 ML', price: 1200, inStock: true }
    ]
  },
  {
    id: 'attar-zam-zam-pure',
    nameUr: 'زم زم عطر (12ml)',
    nameEn: 'Zam Zam Attar - 12 ML',
    taglineUr: 'طہارت، پاکیزگی اور روح پرور سفید پھولوں کی متبرک خوشبو',
    taglineEn: 'Spiritual, Fresh, Clean Floral Fragrance',
    category: 'attar',
    price: 1250,
    originalPrice: 1500,
    rating: 4.8,
    reviewsCount: 22,
    image: WHITE_MUSK_IMG,
    inStock: true,
    featured: false,
    badgeUr: 'روحانی پاکیزگی',
    badgeEn: 'Spiritual Floral',
    descriptionUr: 'زم زم عطر پاکیزگی اور سکون کا نمونہ ہے۔ ہلکے سفید پھولوں، شبنم اور صندل کا متبرک احساس دلانے والا عطر۔',
    descriptionEn: 'Sacred, delicate floral notes bathed in crisp morning water and serene white woods.',
    notes: {
      top: [{ ur: 'آبی پھول و شبنم', en: 'Lotus Petals & Dew' }, { ur: 'سبز پتے', en: 'Fresh Leaves' }],
      heart: [{ ur: 'سفید چنبیلی', en: 'Arabian Jasmine' }, { ur: 'موتیا', en: 'Motia' }],
      base: [{ ur: 'سفید صندل', en: 'White Sandalwood' }, { ur: 'سفید مشک', en: 'Pure Musk' }]
    },
    specs: {
      sillage: 'Moderate',
      sillageUr: 'نہایت پاکیزہ اور لطیف',
      longevity: '16-18 Hours',
      longevityUr: '16 سے 18 گھنٹے',
      season: 'All Seasons / Worship',
      seasonUr: 'عبادت اور روزمرہ',
      concentration: '100% Pure Attar',
      concentrationUr: 'خالص روغنی عطر (12ml)',
      gender: 'Unisex',
      genderUr: 'سب کے لیے'
    },
    variants: [
      { size: '12 ML', price: 1250, inStock: true }
    ]
  },
  {
    id: 'attar-office-for-men',
    nameUr: 'آفس فار مین عطر (12ml)',
    nameEn: 'Office For Men Attar - 12 ML',
    taglineUr: 'مہذب، دھیما اور باوقار عطر جو دفتر میں سب کو بھلا لگے',
    taglineEn: 'Fresh, Subtle, Professional Daily Office Wear Fragrance',
    category: 'attar',
    price: 1200,
    originalPrice: 1400,
    rating: 4.8,
    reviewsCount: 31,
    image: WHITE_MUSK_IMG,
    inStock: true,
    featured: false,
    badgeUr: 'پیشہ ورانہ وقار',
    badgeEn: 'Office Professional',
    descriptionUr: 'دفتر، میٹنگز اور روزمرہ کام کے لیے بنایا گیا عطر جو نہ زیادہ تیز ہے اور نہ گلے کو لگتا ہے بلکہ سارا دن ایک باوقار ہالہ رکھتا ہے۔',
    descriptionEn: 'Clean crisp woody aromatic blend designed for the corporate workspace and business boardroom.',
    notes: {
      top: [{ ur: 'امبروکسن و برگاموٹ', en: 'Ambroxan & Bergamot' }, { ur: 'ادرک', en: 'Fresh Ginger' }],
      heart: [{ ur: 'سیج و جیرانیم', en: 'Clary Sage & Geranium' }, { ur: 'آئرس', en: 'Orris' }],
      base: [{ ur: 'دیودار و چندن', en: 'Cedar & Sandalwood' }, { ur: 'صاف کستوری', en: 'Clean Musk' }]
    },
    specs: {
      sillage: 'Moderate',
      sillageUr: 'مہذب اور پرسکون',
      longevity: '16-18 Hours',
      longevityUr: '16 سے 18 گھنٹے',
      season: 'Daily Office',
      seasonUr: 'روزانہ دفتری استعمال',
      concentration: '100% Pure Attar',
      concentrationUr: 'خالص عطر (12ml)',
      gender: 'Men',
      genderUr: 'مردانہ'
    },
    variants: [
      { size: '12 ML', price: 1200, inStock: true }
    ]
  },
  {
    id: 'attar-hina-pure',
    nameUr: 'حناء عطر (12ml)',
    nameEn: 'Hina Attar - 12 ML',
    taglineUr: 'روایتی مہندی کے پھولوں اور جڑی بوٹیوں کی گرم اور پرانی یادیں تازہ کرنے والی خوشبو',
    taglineEn: 'Traditional Warm Henna Herbal Attar',
    category: 'attar',
    price: 1200,
    originalPrice: 1450,
    rating: 4.7,
    reviewsCount: 19,
    image: DEHN_ATTAR_IMG,
    inStock: true,
    featured: false,
    badgeUr: 'قدیم دیسی نسخہ',
    badgeEn: 'Traditional Henna',
    descriptionUr: 'مہندی کے پھولوں کی مخصوص روایتی مہک جو دل اور دماغ کو سکون دیتی ہے۔ سردیوں اور شادی بیاہ کے مواقع پر بے حد پسندیدہ۔',
    descriptionEn: 'Traditional herbal henna flower distillation slow-cooked with warm Indian spices.',
    notes: {
      top: [{ ur: 'مہندی کے تازہ پھول', en: 'Henna Blossom' }, { ur: 'دارچینی', en: 'Cinnamon' }],
      heart: [{ ur: 'جڑی بوٹیاں و الائچی', en: 'Secret Herbs & Cardamom' }, { ur: 'زعفران', en: 'Saffron' }],
      base: [{ ur: 'صندل کی لکڑی', en: 'Sandalwood Base' }, { ur: 'کستوری', en: 'Warm Musk' }]
    },
    specs: {
      sillage: 'Strong',
      sillageUr: 'گرم اور خوشگوار',
      longevity: '20-24 Hours',
      longevityUr: '20 سے 24 گھنٹے',
      season: 'Winter & Festive',
      seasonUr: 'سردیاں اور شادی بیاہ',
      concentration: '100% Pure Attar',
      concentrationUr: 'خالص روغنی عطر (12ml)',
      gender: 'Unisex',
      genderUr: 'سب کے لیے'
    },
    variants: [
      { size: '12 ML', price: 1200, inStock: true }
    ]
  },
  {
    id: 'attar-aseel-super',
    nameUr: 'اصیل سپر عطر (12ml)',
    nameEn: 'Aseel Super Attar - 12 ML',
    taglineUr: 'تیز ترش مصالحہ دار اور پرکشش مشرقی عود و عنبر کا شاہکار',
    taglineEn: 'Rich Oriental Spicy Attar with Majestic Projection',
    category: 'attar',
    price: 1600,
    originalPrice: 1950,
    rating: 4.8,
    reviewsCount: 27,
    image: DEHN_ATTAR_IMG,
    inStock: true,
    featured: false,
    badgeUr: 'سپر کوالٹی',
    badgeEn: 'Super Concentrated',
    descriptionUr: 'اصیل سپر عطر۔ پائیداری اور پھیلاؤ کے حوالے سے بے مثال۔ مشرقی مصالحہ جات اور عود کا ایسا مرکب جو بار بار داد وصول کرواتا ہے۔',
    descriptionEn: 'Spicy, rich, aromatic oriental attar that creates a bold, unforgettable signature trail.',
    notes: {
      top: [{ ur: 'سرخ گلاب و زعفران', en: 'Red Rose & Saffron' }, { ur: 'دھنیا بیج', en: 'Coriander' }],
      heart: [{ ur: 'مشرقی مصالحہ', en: 'Oriental Spices' }, { ur: 'عود کی لکڑی', en: 'Oud Wood' }],
      base: [{ ur: 'عنبر و صندل', en: 'Amber & Sandalwood' }, { ur: 'کستوری', en: 'Musk' }]
    },
    specs: {
      sillage: 'Intense',
      sillageUr: 'انتہائی تیز اور دیرپا',
      longevity: '24-36 Hours',
      longevityUr: '24 سے 36 گھنٹے',
      season: 'All Seasons',
      seasonUr: 'ہر موسم اور تقریبات',
      concentration: '100% Pure Attar',
      concentrationUr: 'خالص روغنی عطر (12ml)',
      gender: 'Men / Unisex',
      genderUr: 'مردانہ باوقار'
    },
    variants: [
      { size: '12 ML', price: 1600, inStock: true }
    ]
  },
  {
    id: 'attar-musk-ul-hind',
    nameUr: 'مشک الہند عطر (12ml)',
    nameEn: 'Musk Ul Hind Attar - 12 ML',
    taglineUr: 'خالص روایتی ہندی کستوری اور صندل کا گہرا اور پاکیزہ تاثر',
    taglineEn: 'Authentic Indian Oriental Musk with Deep Velvety Projection',
    category: 'attar',
    price: 1200,
    originalPrice: 1500,
    discountPercentage: 20,
    rating: 5.0,
    reviewsCount: 55,
    image: DEHN_ATTAR_IMG,
    inStock: true,
    featured: false,
    badgeUr: 'اصلی ہندی کستوری',
    badgeEn: 'Authentic Musk',
    descriptionUr: 'قدیم ہندی کستوری کا نایاب نچوڑ۔ نرم، مخملی اور دل کو چھو لینے والی خوشبو جو کپڑوں میں بس جاتی ہے۔',
    descriptionEn: 'Traditional dark Indian musk aged to perfection, offering a warm comforting embrace.',
    notes: {
      top: [{ ur: 'شیریں مصالحہ', en: 'Sweet Spices' }, { ur: 'گلاب کی نمی', en: 'Rose Petals' }],
      heart: [{ ur: 'اصلی ہندی کستوری', en: 'Pure Indian Musk' }, { ur: 'عنبر خام', en: 'Amber' }],
      base: [{ ur: 'میسور چندن', en: 'Mysore Sandal' }, { ur: 'لوبان', en: 'Frankincense' }]
    },
    specs: {
      sillage: 'Strong',
      sillageUr: 'گہرا اور پاکیزہ',
      longevity: '24-30 Hours',
      longevityUr: '24 سے 30 گھنٹے',
      season: 'All Seasons',
      seasonUr: 'سارا سال اور عبادت',
      concentration: '100% Pure Attar',
      concentrationUr: 'خالص عطر (12ml)',
      gender: 'Unisex',
      genderUr: 'سب کے لیے'
    },
    variants: [
      { size: '12 ML', price: 1200, inStock: true }
    ]
  }
];
