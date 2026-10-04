export interface CityDeliveryInfo {
  name: string;
  region: 'Karachi' | 'Islamabad/Rawalpindi' | 'KPK' | 'Punjab' | 'Sindh' | 'Balochistan' | 'AJK/GB' | 'Other';
  fee: number;
  estimatedDelivery: string;
  courier: string;
}

export const DELIVERY_ZONES: CityDeliveryInfo[] = [
  // 1. Karachi (Local Hub - Rs. 150)
  {
    name: 'Karachi (All Areas / Malir / DHA / Gulshan)',
    region: 'Karachi',
    fee: 150,
    estimatedDelivery: '24 - 48 Hours (Local Express Rider)',
    courier: 'Suddais Local Courier Rider'
  },

  // 2. Islamabad & Rawalpindi (Rs. 250)
  {
    name: 'Islamabad (Federal Capital)',
    region: 'Islamabad/Rawalpindi',
    fee: 250,
    estimatedDelivery: '2 - 3 Days (Express Courier)',
    courier: 'TCS / Leopards Express'
  },
  {
    name: 'Rawalpindi (Twin City)',
    region: 'Islamabad/Rawalpindi',
    fee: 250,
    estimatedDelivery: '2 - 3 Days (Express Courier)',
    courier: 'TCS / Leopards Express'
  },

  // 3. KPK - Khyber Pakhtunkhwa (Rs. 300)
  {
    name: 'Peshawar (KPK)',
    region: 'KPK',
    fee: 300,
    estimatedDelivery: '3 - 4 Days (Overland Air/Ground)',
    courier: 'TCS / Trax Express'
  },
  {
    name: 'Mardan (KPK)',
    region: 'KPK',
    fee: 300,
    estimatedDelivery: '3 - 4 Days (Overland Air/Ground)',
    courier: 'TCS / Trax Express'
  },
  {
    name: 'Abbottabad (KPK)',
    region: 'KPK',
    fee: 300,
    estimatedDelivery: '3 - 4 Days (Overland Air/Ground)',
    courier: 'TCS / Trax Express'
  },
  {
    name: 'Swat / Mingora (KPK)',
    region: 'KPK',
    fee: 300,
    estimatedDelivery: '3 - 5 Days (Overland Air/Ground)',
    courier: 'Trax / Leopards Courier'
  },
  {
    name: 'Kohat (KPK)',
    region: 'KPK',
    fee: 300,
    estimatedDelivery: '3 - 4 Days (Overland Air/Ground)',
    courier: 'TCS / Trax Express'
  },
  {
    name: 'D.I. Khan (KPK)',
    region: 'KPK',
    fee: 300,
    estimatedDelivery: '3 - 5 Days (Overland Air/Ground)',
    courier: 'TCS / Trax Express'
  },
  {
    name: 'Haripur (KPK)',
    region: 'KPK',
    fee: 300,
    estimatedDelivery: '3 - 4 Days (Overland Air/Ground)',
    courier: 'TCS / Trax Express'
  },
  {
    name: 'Other KPK Cities / Towns',
    region: 'KPK',
    fee: 300,
    estimatedDelivery: '3 - 5 Days (Overland Air/Ground)',
    courier: 'TCS / Trax Express'
  },

  // 4. Punjab (Rs. 250)
  {
    name: 'Lahore (Punjab)',
    region: 'Punjab',
    fee: 250,
    estimatedDelivery: '2 - 3 Days (Express Courier)',
    courier: 'TCS / Leopards / Call Courier'
  },
  {
    name: 'Faisalabad (Punjab)',
    region: 'Punjab',
    fee: 250,
    estimatedDelivery: '2 - 3 Days (Express Courier)',
    courier: 'TCS / Leopards / Call Courier'
  },
  {
    name: 'Multan (Punjab)',
    region: 'Punjab',
    fee: 250,
    estimatedDelivery: '2 - 3 Days (Express Courier)',
    courier: 'TCS / Leopards / Call Courier'
  },
  {
    name: 'Gujranwala (Punjab)',
    region: 'Punjab',
    fee: 250,
    estimatedDelivery: '2 - 3 Days (Express Courier)',
    courier: 'TCS / Leopards / Call Courier'
  },
  {
    name: 'Sialkot (Punjab)',
    region: 'Punjab',
    fee: 250,
    estimatedDelivery: '2 - 3 Days (Express Courier)',
    courier: 'TCS / Leopards / Call Courier'
  },
  {
    name: 'Bahawalpur (Punjab)',
    region: 'Punjab',
    fee: 250,
    estimatedDelivery: '2 - 4 Days (Express Courier)',
    courier: 'TCS / Leopards / Call Courier'
  },
  {
    name: 'Sargodha (Punjab)',
    region: 'Punjab',
    fee: 250,
    estimatedDelivery: '2 - 3 Days (Express Courier)',
    courier: 'TCS / Leopards / Call Courier'
  },
  {
    name: 'Gujrat (Punjab)',
    region: 'Punjab',
    fee: 250,
    estimatedDelivery: '2 - 3 Days (Express Courier)',
    courier: 'TCS / Leopards / Call Courier'
  },
  {
    name: 'Rahim Yar Khan (Punjab)',
    region: 'Punjab',
    fee: 250,
    estimatedDelivery: '2 - 4 Days (Express Courier)',
    courier: 'TCS / Leopards / Call Courier'
  },
  {
    name: 'Sahiwal / Okara (Punjab)',
    region: 'Punjab',
    fee: 250,
    estimatedDelivery: '2 - 3 Days (Express Courier)',
    courier: 'TCS / Leopards / Call Courier'
  },

  // 5. Sindh - Outside Karachi (Rs. 200)
  {
    name: 'Hyderabad (Sindh)',
    region: 'Sindh',
    fee: 200,
    estimatedDelivery: '1 - 2 Days (Express Courier)',
    courier: 'TCS / Leopards Express'
  },
  {
    name: 'Sukkur (Sindh)',
    region: 'Sindh',
    fee: 200,
    estimatedDelivery: '2 - 3 Days (Express Courier)',
    courier: 'TCS / Leopards Express'
  },
  {
    name: 'Larkana (Sindh)',
    region: 'Sindh',
    fee: 200,
    estimatedDelivery: '2 - 3 Days (Express Courier)',
    courier: 'TCS / Leopards Express'
  },
  {
    name: 'Mirpurkhas / Nawabshah (Sindh)',
    region: 'Sindh',
    fee: 200,
    estimatedDelivery: '2 - 3 Days (Express Courier)',
    courier: 'TCS / Leopards Express'
  },

  // 6. Balochistan (Rs. 350)
  {
    name: 'Quetta (Balochistan)',
    region: 'Balochistan',
    fee: 350,
    estimatedDelivery: '3 - 5 Days (Air/Overland Express)',
    courier: 'TCS / Leopards Courier'
  },
  {
    name: 'Gwadar / Turbat / Khuzdar (Balochistan)',
    region: 'Balochistan',
    fee: 350,
    estimatedDelivery: '4 - 6 Days (Air/Overland Express)',
    courier: 'TCS / Leopards Courier'
  },

  // 7. Azad Kashmir & Gilgit-Baltistan (Rs. 350)
  {
    name: 'Muzaffarabad / Mirpur (AJK)',
    region: 'AJK/GB',
    fee: 350,
    estimatedDelivery: '3 - 5 Days (Express Courier)',
    courier: 'TCS / Trax Express'
  },
  {
    name: 'Gilgit / Skardu (GB)',
    region: 'AJK/GB',
    fee: 350,
    estimatedDelivery: '4 - 6 Days (Express Courier)',
    courier: 'TCS / Trax Express'
  },

  // 8. Other / Rural Town
  {
    name: 'Other City / Town in Pakistan',
    region: 'Other',
    fee: 250,
    estimatedDelivery: '3 - 5 Days (Nationwide Courier)',
    courier: 'TCS / Leopards Express'
  }
];

export const FREE_DELIVERY_THRESHOLD = 5000;

export function getCityDeliveryInfo(cityName: string): CityDeliveryInfo {
  const found = DELIVERY_ZONES.find((z) => z.name === cityName);
  if (found) return found;

  // Partial match fallback
  const lower = cityName.toLowerCase();
  if (lower.includes('karachi')) {
    return DELIVERY_ZONES[0];
  } else if (lower.includes('islamabad') || lower.includes('rawalpindi')) {
    return DELIVERY_ZONES[1];
  } else if (
    lower.includes('peshawar') ||
    lower.includes('mardan') ||
    lower.includes('kpk') ||
    lower.includes('abbottabad') ||
    lower.includes('swat')
  ) {
    return DELIVERY_ZONES[3];
  } else if (lower.includes('quetta') || lower.includes('balochistan') || lower.includes('gwadar')) {
    return DELIVERY_ZONES[DELIVERY_ZONES.length - 4];
  } else if (lower.includes('hyderabad') || lower.includes('sukkur') || lower.includes('sindh')) {
    return DELIVERY_ZONES[DELIVERY_ZONES.length - 6];
  }

  return DELIVERY_ZONES[DELIVERY_ZONES.length - 1];
}

export function calculateDeliveryFee(
  cityName: string,
  subtotal: number,
  coupon?: string | null
): number {
  if (subtotal >= FREE_DELIVERY_THRESHOLD || coupon === 'FREESHIP') {
    return 0;
  }
  const info = getCityDeliveryInfo(cityName);
  return info.fee;
}
