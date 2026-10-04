import { Product } from '../types';
import { OUD_PERFUME_IMG, BLUE_PERFUME_IMG, AMBER_PERFUME_IMG } from './images';

export const PERFUMES_DATA: Product[] = [
  {
    id: 'perfume-imperial-valley',
    nameUr: 'امپیریل ویلی پرفیوم (50ml)',
    nameEn: 'Imperial Valley Perfume - 50 ML',
    taglineUr: 'سدیس کلیکشن کا سب سے مقبول پریمیم ڈیزائنر اسپرے پرفیوم',
    taglineEn: 'Luxury Designer Style Imperial Valley Spray Perfume',
    category: 'perfume',
    price: 3000,
    originalPrice: 3800,
    discountPercentage: 21,
    rating: 4.8,
    reviewsCount: 41,
    image: BLUE_PERFUME_IMG,
    inStock: true,
    featured: true,
    badgeUr: 'سب سے مقبول (POPULAR)',
    badgeEn: 'POPULAR',
    descriptionUr: 'سدیس کلیکشن کا شاہکار امپیریل ویلی پرفیوم۔ تازہ جڑی بوٹیاں، سٹرس پھل اور لکڑی کی خوشبو کا لازوال شاہکار جو سارا دن مہکتا رہتا ہے۔',
    descriptionEn: 'High concentration luxury spray perfume with majestic sillage, combining crisp Italian bergamot, leather, dry herbs, and golden ambergris.',
    notes: {
      top: [{ ur: 'اطالوی برگاموٹ و دوانا', en: 'Italian Bergamot & Davana' }, { ur: 'گلابی مرچ', en: 'Pink Pepper' }],
      heart: [{ ur: 'روزماری و عود رال', en: 'Rosemary & Agarwood' }, { ur: 'سفید چمڑا', en: 'White Leather' }],
      base: [{ ur: 'عنبر گرے', en: 'Grey Ambergris' }, { ur: 'ویٹیور جڑیں', en: 'Haitian Vetiver' }]
    },
    specs: {
      sillage: 'Intense',
      sillageUr: 'انتہائی شاندار اور دور تک جانے والا پھیلاؤ',
      longevity: '20-24 Hours',
      longevityUr: '20 سے 24 گھنٹے کپڑوں پر محفوظ',
      season: 'All Seasons',
      seasonUr: 'ہر موسم اور تقریبات کے لیے',
      concentration: 'Eau De Parfum (50 ML)',
      concentrationUr: 'ہائی کونسنٹریشن ای او ڈی پرفیوم (50ml)',
      gender: 'Unisex',
      genderUr: 'مرد و خواتین'
    },
    variants: [
      { size: '50 ML (Full Bottle)', price: 3000, originalPrice: 3800, inStock: true }
    ]
  },
  {
    id: 'perfume-9pm-style',
    nameUr: 'نائن پی ایم اسٹائل پرفیوم (50ml)',
    nameEn: '9 PM Style Perfume - 50 ML',
    taglineUr: 'ونیلا، میٹھے سیب اور دارچینی کی مسحور کن پارٹی خوشبو',
    taglineEn: 'Sweet Vanilla, Apple & Cinnamon Evening Party Scent',
    category: 'perfume',
    price: 3000,
    originalPrice: 3700,
    discountPercentage: 19,
    rating: 5.0,
    reviewsCount: 110,
    image: AMBER_PERFUME_IMG,
    inStock: true,
    featured: true,
    badgeUr: 'ٹاپ ریٹڈ (TOP RATED)',
    badgeEn: 'TOP RATED',
    descriptionUr: 'شام کی محافل اور پارٹیوں کا بے تاج بادشاہ! سیب، دارچینی، لیوینڈر اور میٹھی ونیلا کا ایسا جادو جو سب کو متوجہ کر لے۔',
    descriptionEn: 'Sweet, addictive, long-lasting bubblegum vanilla and warm spiced apple evening party powerhouse.',
    notes: {
      top: [{ ur: 'سیب و دارچینی', en: 'Crisp Apple & Cinnamon' }, { ur: 'برگاموٹ', en: 'Bergamot' }],
      heart: [{ ur: 'لیوینڈر و نارنگی پھول', en: 'Lavender & Orange Blossom' }, { ur: 'کنول', en: 'Lily of Valley' }],
      base: [{ ur: 'بوربن ونیلا', en: 'Bourbon Vanilla' }, { ur: 'ٹونکا بین و عنبر', en: 'Tonka Bean & Amber' }]
    },
    specs: {
      sillage: 'Intense',
      sillageUr: 'کمرے کو مہکا دینے والا',
      longevity: '18-24 Hours',
      longevityUr: '18 سے 24 گھنٹے',
      season: 'Evening & Winter',
      seasonUr: 'شام اور سردیوں کی محافل',
      concentration: 'Eau De Parfum (50 ML)',
      concentrationUr: 'ای او ڈی پرفیوم (50 ML)',
      gender: 'Men / Unisex',
      genderUr: 'مردانہ و یونی سیکس'
    },
    variants: [
      { size: '50 ML (اسپرے بوتل)', price: 3000, inStock: true }
    ]
  },
  {
    id: 'perfume-khamrah-luxury',
    nameUr: 'خمرہ پرفیوم (50ml)',
    nameEn: 'Khamrah Perfume - 50 ML',
    taglineUr: 'دارچینی، کھجور کی مٹھاس، پرالین اور قیمتی ونیلا کی گرمائش',
    taglineEn: 'Warm Cinnamon, Dates, Praline & Gourmand Luxury',
    category: 'perfume',
    price: 2000,
    originalPrice: 2600,
    discountPercentage: 23,
    rating: 4.8,
    reviewsCount: 35,
    image: AMBER_PERFUME_IMG,
    inStock: true,
    featured: true,
    badgeUr: 'شاہی ذائقہ دار',
    badgeEn: 'Gourmand Luxury',
    descriptionUr: 'شیریں دارچینی، جائے فل، کھجور اور پرالین کا گرم اور دلکش احساس۔ سردیوں کی سب سے زیادہ بکنے والی خوشبو۔',
    descriptionEn: 'Opulent warm spicy gourmand opening with nutmeg and cinnamon settling into rich praline, dates, and smoky vanilla.',
    notes: {
      top: [{ ur: 'دارچینی و جائفل', en: 'Cinnamon & Nutmeg' }, { ur: 'برگاموٹ', en: 'Bergamot' }],
      heart: [{ ur: 'کھجور و پرالین', en: 'Dates Accord & Praline' }, { ur: 'ٹیوبروز', en: 'Tuberose' }],
      base: [{ ur: 'ونیلا و ٹونکا', en: 'Vanilla & Tonka Bean' }, { ur: 'عنبر لکڑی', en: 'Amberwood' }]
    },
    specs: {
      sillage: 'Strong',
      sillageUr: 'گرم اور پرکشش',
      longevity: '18-22 Hours',
      longevityUr: '18 سے 22 گھنٹے',
      season: 'Winter & Festive',
      seasonUr: 'سردیاں اور تقریبات',
      concentration: 'Eau De Parfum (50 ML)',
      concentrationUr: 'ای او ڈی پرفیوم (50 ML)',
      gender: 'Unisex',
      genderUr: 'یکساں موزوں'
    },
    variants: [
      { size: '50 ML', price: 2000, inStock: true }
    ]
  },
  {
    id: 'perfume-white-musk-spray',
    nameUr: 'وائٹ مسک اسپرے پرفیوم (50ml)',
    nameEn: 'White Musk Spray Perfume - 50 ML',
    taglineUr: '50ml خوبصورت وائٹ مسک اسپرے، طہارت اور پاکیزگی کا احساس',
    taglineEn: '50 ML Elegant White Musk Spray for Purity & Freshness',
    category: 'perfume',
    price: 3000,
    originalPrice: 3800,
    discountPercentage: 21,
    rating: 4.9,
    reviewsCount: 60,
    image: BLUE_PERFUME_IMG,
    inStock: true,
    featured: false,
    badgeUr: 'طہارت و نفاست',
    badgeEn: 'Pure Clean',
    descriptionUr: 'انتہائی شفاف، ملائم اور پاکیزہ سفید کستوری کا اسپرے جو روزمرہ نماز، آفس اور طہارت کے لیے سب سے بہترین ہے۔',
    descriptionEn: 'Soft, powdery, crystal-clean white musk crafted for daily refinement and long-lasting freshness.',
    notes: {
      top: [{ ur: 'سفید کنول و للی', en: 'White Lily & Lotus' }, { ur: 'شبنم', en: 'Morning Dew' }],
      heart: [{ ur: 'خالص سفید کستوری', en: 'Pure White Musk' }, { ur: 'چنبیلی', en: 'White Jasmine' }],
      base: [{ ur: 'کشمیر لکڑی', en: 'Cashmere Wood' }, { ur: 'پاؤڈری صندل', en: 'Powdery Sandal' }]
    },
    specs: {
      sillage: 'Moderate',
      sillageUr: 'ملائم اور پرسکون',
      longevity: '16-20 Hours',
      longevityUr: '16 سے 20 گھنٹے',
      season: 'All Seasons / Daily',
      seasonUr: 'سارا سال اور روزمرہ',
      concentration: 'Eau De Parfum (50 ML)',
      concentrationUr: 'ای او ڈی پرفیوم (50 ML)',
      gender: 'Unisex',
      genderUr: 'مرد و خواتین'
    },
    variants: [
      { size: '50 ML', price: 3000, inStock: true }
    ]
  },
  {
    id: 'perfume-bakhoor-spray',
    nameUr: 'بخور اسپرے پرفیوم (50ml)',
    nameEn: 'Bakhoor Spray Perfume - 50 ML',
    taglineUr: 'عربی بخور، لکڑی کے سلگتے ہوئے کوئلوں اور عنبر کی معطر دھونی',
    taglineEn: '50 ML High Concentration Bakhoor Spray Perfume',
    category: 'perfume',
    price: 2000,
    originalPrice: 2500,
    discountPercentage: 20,
    rating: 4.9,
    reviewsCount: 72,
    image: OUD_PERFUME_IMG,
    inStock: true,
    featured: false,
    badgeUr: 'عربی بخور',
    badgeEn: 'Arabian Incense',
    descriptionUr: '50ml ہائی کونسنٹریشن بخور اسپرے پرفیوم۔ عرب گھرانوں اور مساجد کی مخصوص پاکیزہ دھونی کی خوشبو جو کپڑوں پر بس جاتی ہے۔',
    descriptionEn: 'Authentic rich Arabian bukhoor incense notes blended with sandalwood and royal amber.',
    notes: {
      top: [{ ur: 'لوبان و الائچی', en: 'Frankincense & Cardamom' }, { ur: 'زعفران', en: 'Saffron' }],
      heart: [{ ur: 'سلگتا ہوا بخور', en: 'Smoky Bukhoor Resin' }, { ur: 'گلاب شامی', en: 'Syrian Rose' }],
      base: [{ ur: 'صندل کی لکڑی', en: 'Sandalwood' }, { ur: 'سیاہ عنبر', en: 'Black Amber' }]
    },
    specs: {
      sillage: 'Intense',
      sillageUr: 'گہرا اور باوقار',
      longevity: '20-24 Hours',
      longevityUr: '20 سے 24 گھنٹے',
      season: 'All Seasons / Worship',
      seasonUr: 'سارا سال اور مجالس',
      concentration: 'Eau De Parfum (50 ML)',
      concentrationUr: 'ای او ڈی پرفیوم (50 ML)',
      gender: 'Unisex',
      genderUr: 'مرد و خواتین'
    },
    variants: [
      { size: '50 ML', price: 2000, inStock: true }
    ]
  },
  {
    id: 'perfume-royal-mirage-spray',
    nameUr: 'رائل میراج اسپرے پرفیوم (50ml)',
    nameEn: 'Royal Mirage Perfume - 50 ML',
    taglineUr: 'کلاسک ترش و تیز مصالحہ جات اور دیرپا مردانہ وقار',
    taglineEn: '50 ML Royal Mirage Intense Spray Perfume',
    category: 'perfume',
    price: 2800,
    originalPrice: 3500,
    discountPercentage: 20,
    rating: 4.7,
    reviewsCount: 29,
    image: BLUE_PERFUME_IMG,
    inStock: true,
    featured: false,
    badgeUr: 'کلاسک سدا بہار',
    badgeEn: 'Classic Legend',
    descriptionUr: '50ml رائل میراج انٹینس اسپرے پرفیوم۔ کلاسک تازہ مصالحہ دار اور پرکشش خوشبو جو دہائیوں سے دلوں پر راج کر رہی ہے۔',
    descriptionEn: 'The iconic timeless fresh spicy gentleman aroma with brisk bergamot, carnation, and moss.',
    notes: {
      top: [{ ur: 'برگاموٹ و لیمن', en: 'Bergamot & Lemon' }, { ur: 'کلاری سیج', en: 'Clary Sage' }],
      heart: [{ ur: 'قرنفل و دارچینی', en: 'Carnation & Cinnamon' }, { ur: 'جائفل', en: 'Nutmeg' }],
      base: [{ ur: 'اوک ماس و صندل', en: 'Oakmoss & Sandal' }, { ur: 'ویٹیور', en: 'Vetiver' }]
    },
    specs: {
      sillage: 'Strong',
      sillageUr: 'مضبوط اور دور تک پہنچنے والا',
      longevity: '16-18 Hours',
      longevityUr: '16 سے 18 گھنٹے',
      season: 'All Seasons',
      seasonUr: 'سارا سال اور دفتری استعمال',
      concentration: 'Eau De Parfum (50 ML)',
      concentrationUr: 'ای او ڈی پرفیوم (50 ML)',
      gender: 'Men / Unisex',
      genderUr: 'مردانہ کلاسک'
    },
    variants: [
      { size: '50 ML', price: 2800, inStock: true }
    ]
  },
  {
    id: 'perfume-havoc-spray',
    nameUr: 'ہیوک کلاسک اسپرے پرفیوم',
    nameEn: 'Havoc Spray Perfume (Original)',
    taglineUr: 'مشہورِ زمانہ ہیوک، تیز ترش سٹرس اور دل موہ لینے والی تاثراتی خوشبو',
    taglineEn: 'Classic Havoc Iconic Long-Lasting Scent',
    category: 'perfume',
    price: 1700,
    originalPrice: 2200,
    discountPercentage: 22,
    rating: 5.0,
    reviewsCount: 94,
    image: BLUE_PERFUME_IMG,
    inStock: true,
    featured: false,
    badgeUr: 'سدا بہار یادگار',
    badgeEn: 'Nostalgic Classic',
    descriptionUr: 'اصلی ہیوک اسپرے پرفیوم۔ کلاسک اور دلکش جھونکے جو محفل میں فوری طور پر پہچانے جاتے ہیں۔ پائیدار اور تازہ۔',
    descriptionEn: 'Vintage classic fresh musk and floral green notes that bring back beloved nostalgic memories.',
    notes: {
      top: [{ ur: 'تازہ الڈیہائڈز و لیمن', en: 'Fresh Aldehydes & Citrus' }, { ur: 'سبز گھاس', en: 'Green Notes' }],
      heart: [{ ur: 'چنبیلی و گلاب', en: 'Jasmine & Rose' }, { ur: 'کستوری رال', en: 'Floral Heart' }],
      base: [{ ur: 'صندل و دیودار', en: 'Sandalwood & Cedar' }, { ur: 'کستوری', en: 'Sensual Musk' }]
    },
    specs: {
      sillage: 'Strong',
      sillageUr: 'تیز اور نمایاں',
      longevity: '14-16 Hours',
      longevityUr: '14 سے 16 گھنٹے',
      season: 'All Seasons',
      seasonUr: 'روزمرہ اور تقریبات',
      concentration: 'Spray Perfume',
      concentrationUr: 'پریمیم اسپرے پرفیوم',
      gender: 'Unisex',
      genderUr: 'سب کے لیے'
    },
    variants: [
      { size: 'فل بوتل اسپرے', price: 1700, inStock: true }
    ]
  },
  {
    id: 'perfume-royal-oud-suddais',
    nameUr: 'شاہی عود رائل پرفیوم (سدیس سپیشل)',
    nameEn: 'Oud Royale Extrait de Parfum',
    taglineUr: 'شاہی کمبوڈین عود اور عنبر کا 24 گھنٹے دیرپا فلیگ شپ پرفیوم',
    taglineEn: 'Royal Cambodian Agarwood with Smoked Amber',
    category: 'perfume',
    price: 4950,
    originalPrice: 6500,
    discountPercentage: 24,
    rating: 4.9,
    reviewsCount: 184,
    image: OUD_PERFUME_IMG,
    inStock: true,
    featured: true,
    badgeUr: 'شاہی بیسٹ سیلر',
    badgeEn: 'Bestseller',
    descriptionUr: 'خالص کمبوڈین عود، کستوری اور عنبر کے نایاب تیلوں سے تیار کردہ شاہکار خوشبو جو 24 سے 36 گھنٹے کپڑوں پر قائم رہتی ہے۔',
    descriptionEn: 'Aged Cambodian agarwood, royal ambergris, damask rose and wild musk with immense projection.',
    notes: {
      top: [{ ur: 'زعفران کشمیری', en: 'Kashmiri Saffron' }, { ur: 'برگاموٹ اطالوی', en: 'Calabrian Bergamot' }],
      heart: [{ ur: 'خالص کمبوڈین عود', en: 'Cambodian Oud' }, { ur: 'دمشقی گلاب', en: 'Damask Rose' }],
      base: [{ ur: 'شاہی عنبر', en: 'Royal Amber' }, { ur: 'سیاہ کستوری', en: 'Velvet Musk' }]
    },
    specs: {
      sillage: 'Intense',
      sillageUr: 'انتہائی طاقتور اور دور رس پھیلاؤ',
      longevity: '24-36 Hours',
      longevityUr: '24 سے 36 گھنٹے پائیدار',
      season: 'Winter & Festive',
      seasonUr: 'سردیاں اور تقریبات',
      concentration: 'Extrait de Parfum (30%)',
      concentrationUr: 'ایکسٹریٹ ڈی پرفیوم (30 فیصد خالص عطر)',
      gender: 'Unisex',
      genderUr: 'مرد و خواتین'
    },
    variants: [
      { size: '50ml', price: 4950, originalPrice: 6500, inStock: true },
      { size: '100ml', price: 8200, originalPrice: 10500, inStock: true }
    ]
  },
  {
    id: 'perfume-bleu-royale-suddais',
    nameUr: 'بلو رائل فریش ایکوا پرفیوم (50ml)',
    nameEn: 'Bleu Royale Eau De Parfum',
    taglineUr: 'سمندری لہروں، لیموں اور دیودار کی روح پرور تازگی',
    taglineEn: 'Mediterranean Aquatic Marine & Crisp Citrus',
    category: 'perfume',
    price: 3950,
    originalPrice: 4900,
    discountPercentage: 19,
    rating: 4.8,
    reviewsCount: 142,
    image: BLUE_PERFUME_IMG,
    inStock: true,
    featured: true,
    badgeUr: 'گرمیوں کا خاص تحفہ',
    badgeEn: 'Summer Fresh',
    descriptionUr: 'بحیرہ روم کی ٹھنڈی ہواؤں اور اطالوی لیمن کا متحرک جھونکا جو سارا دن تروتازہ رکھتا ہے۔',
    descriptionEn: 'Crisp sea salt, Italian bergamot, mint, cedarwood, and ambergris engineered for warm weather.',
    notes: {
      top: [{ ur: 'بحری نمکیات و پودینہ', en: 'Sea Salt & Mint' }, { ur: 'اطالوی لیمن', en: 'Italian Lemon' }],
      heart: [{ ur: 'سمندری کائی', en: 'Marine Accord' }, { ur: 'لیونڈر پھول', en: 'French Lavender' }],
      base: [{ ur: 'دیودار لکڑی', en: 'Atlas Cedar' }, { ur: 'سفید عنبر', en: 'White Ambergris' }]
    },
    specs: {
      sillage: 'Strong',
      sillageUr: 'خوشگوار اور مسحور کن جھونکے',
      longevity: '14-16 Hours',
      longevityUr: '14 سے 16 گھنٹے',
      season: 'Summer & Daily Wear',
      seasonUr: 'موسم گرما اور دفتری استعمال',
      concentration: 'Eau De Parfum (22%)',
      concentrationUr: 'ای او ڈی پرفیوم (22%)',
      gender: 'Men / Unisex',
      genderUr: 'مردانہ و یونی سیکس'
    },
    variants: [
      { size: '50ml', price: 3950, inStock: true },
      { size: '100ml', price: 6800, inStock: true }
    ]
  },
  {
    id: 'perfume-amber-gold-suddais',
    nameUr: 'عنبر گولڈ شاہانہ پرفیوم (50ml)',
    nameEn: 'Amber Gold Extrait de Parfum',
    taglineUr: 'شہد کی گرمائش، میٹھی ونیلا اور سنہری عنبر کی چمک',
    taglineEn: 'Sun-Drenched Honey Amber & Bourbon Vanilla',
    category: 'perfume',
    price: 4600,
    originalPrice: 5800,
    discountPercentage: 21,
    rating: 4.9,
    reviewsCount: 119,
    image: AMBER_PERFUME_IMG,
    inStock: true,
    featured: true,
    badgeUr: 'پریمیم انتخاب',
    badgeEn: 'Luxury Selection',
    descriptionUr: 'شہد اور قدرتی رال کا طلسماتی مرکب جو محفل میں سب کی توجہ اپنی طرف کھینچ لیتا ہے۔',
    descriptionEn: 'Opulent warm honeyed amber layered over bourbon vanilla, tonka bean, and exotic spices.',
    notes: {
      top: [{ ur: 'شہد کی مٹھاس', en: 'Wild Honey' }, { ur: 'الائچی دیسی', en: 'Cardamom Pods' }],
      heart: [{ ur: 'سنہری عنبر', en: 'Golden Amber' }, { ur: 'ٹونکا بین', en: 'Tonka Bean' }],
      base: [{ ur: 'مداغاسکر ونیلا', en: 'Madagascan Vanilla' }, { ur: 'چندن کی لکڑی', en: 'Sandalwood' }]
    },
    specs: {
      sillage: 'Intense',
      sillageUr: 'بھرپور اور دور تک محسوس ہونے والا',
      longevity: '20-24 Hours',
      longevityUr: '20 سے 24 گھنٹے',
      season: 'Winter & Evenings',
      seasonUr: 'سردیاں اور شام کی تقریبات',
      concentration: 'Extrait de Parfum (28%)',
      concentrationUr: 'ایکسٹریٹ ڈی پرفیوم (28%)',
      gender: 'Unisex',
      genderUr: 'یکساں موزوں'
    },
    variants: [
      { size: '50ml', price: 4600, inStock: true }
    ]
  }
];
