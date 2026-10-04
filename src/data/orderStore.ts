import { OrderRecord, RiderStatus } from '../types';
import { IMPERIAL_VALLEY_IMG, KHAMRAH_IMG, NINE_PM_IMG, DEHN_ATTAR_IMG } from './images';

const STORAGE_KEY = 'suddais_order_history';
export const ORDER_UPDATE_EVENT = 'suddais_order_updated';

// Realistic sample orders for first-time dashboard preview
export const INITIAL_SEED_ORDERS: OrderRecord[] = [
  {
    id: 'SUD-482910',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 mins ago
    customer: {
      fullName: 'Hamza Tariq',
      phone: '0300-8274619',
      whatsappPhone: '0300-8274619',
      city: 'Karachi (All Areas / Malir / DHA / Gulshan)',
      address: 'House # 45, Street 12, Gulshan-e-Iqbal Block 13-D, Karachi',
      paymentMethod: 'cod'
    },
    items: [
      {
        id: 'perfume-imperial-valley-50 ML (Full Bottle)',
        productId: 'perfume-imperial-valley',
        nameUr: 'امپیریل ویلی پرفیوم',
        nameEn: 'Gissah Imperial Valley - 50 ML',
        category: 'perfume',
        image: IMPERIAL_VALLEY_IMG,
        selectedSize: '50 ML (Full Bottle)',
        unitPrice: 3000,
        quantity: 1
      }
    ],
    subtotal: 3000,
    discount: 0,
    deliveryFee: 150,
    total: 3150,
    rider: {
      status: 'confirmed',
      statusUr: 'نیا آرڈر تصدیق شدہ',
      riderName: 'Muhammad Bilal (Dispatch)',
      riderPhone: '0318-2187575',
      vehicleNo: 'KHI-7892',
      courier: 'Suddais Local Courier Rider',
      trackingNo: 'SC-8819203',
      estimatedDelivery: '24 - 48 Hours',
      currentLocation: 'Malir Central Hub'
    }
  },
  {
    id: 'SUD-391847',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    customer: {
      fullName: 'Zubair Khan',
      phone: '0333-9182746',
      whatsappPhone: '0333-9182746',
      city: 'Peshawar (KPK)',
      address: 'Shop # 8, Saddar Road, Near Cantt Plaza, Peshawar, KPK',
      paymentMethod: 'cod'
    },
    items: [
      {
        id: 'perfume-9pm-style-50 ML',
        productId: 'perfume-9pm-style',
        nameUr: 'نائن پی ایم ریبل پرفیوم',
        nameEn: 'Afnan 9 PM Rebel - 50 ML',
        category: 'perfume',
        image: NINE_PM_IMG,
        selectedSize: '50 ML',
        unitPrice: 2800,
        quantity: 1
      },
      {
        id: 'attar-royal-mirage-12 ML',
        productId: 'attar-royal-mirage',
        nameUr: 'رائل میراج عطر',
        nameEn: 'Royal Mirage Attar - 12 ML',
        category: 'attar',
        image: DEHN_ATTAR_IMG,
        selectedSize: '12 ML',
        unitPrice: 1400,
        quantity: 1
      }
    ],
    subtotal: 4200,
    discount: 0,
    deliveryFee: 300,
    total: 4500,
    rider: {
      status: 'packing',
      statusUr: 'پیکنگ مکمل / کارٹن تیار',
      riderName: 'Farhan Ali (Logistics)',
      riderPhone: '0318-2187575',
      vehicleNo: 'TCS-Cargo-39',
      courier: 'TCS / Trax Express',
      trackingNo: 'TRAX-8921849',
      estimatedDelivery: '3 - 4 Days',
      currentLocation: 'Packed in Presentation Box'
    }
  },
  {
    id: 'SUD-281902',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // yesterday
    customer: {
      fullName: 'Usman Ghani',
      phone: '0312-5544332',
      whatsappPhone: '0312-5544332',
      city: 'Islamabad (Federal Capital)',
      address: 'Flat 4B, Sector F-10/3, Islamabad',
      paymentMethod: 'cod'
    },
    items: [
      {
        id: 'perfume-khamrah-luxury-50 ML',
        productId: 'perfume-khamrah-luxury',
        nameUr: 'خمرہ لطافہ پرفیوم',
        nameEn: 'Lattafa Khamrah - 50 ML',
        category: 'perfume',
        image: KHAMRAH_IMG,
        selectedSize: '50 ML',
        unitPrice: 3200,
        quantity: 1
      }
    ],
    subtotal: 3200,
    discount: 0,
    deliveryFee: 250,
    total: 3450,
    rider: {
      status: 'dispatched',
      statusUr: 'گاڑی / کوریئر کے حوالے (Dispatched)',
      riderName: 'TCS Dispatch Vehicle # 91',
      riderPhone: '0318-2187575',
      vehicleNo: 'TCS-Air-718',
      courier: 'TCS Express Hub',
      trackingNo: 'TCS-771928491',
      estimatedDelivery: '2 - 3 Days',
      currentLocation: 'In Transit to Islamabad Hub'
    }
  }
];

export function getStoredOrders(): OrderRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_ORDERS));
      return INITIAL_SEED_ORDERS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_ORDERS));
    return INITIAL_SEED_ORDERS;
  } catch (err) {
    console.error(err);
    return INITIAL_SEED_ORDERS;
  }
}

export function saveOrderToStore(order: OrderRecord): void {
  try {
    const current = getStoredOrders();
    const updated = [order, ...current.filter((o) => o.id !== order.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(ORDER_UPDATE_EVENT));
  } catch (err) {
    console.error(err);
  }
}

export function updateOrderStatusInStore(
  orderId: string,
  newStatus: RiderStatus['status'],
  statusDetails?: Partial<RiderStatus>
): OrderRecord[] {
  try {
    const current = getStoredOrders();
    const statusUrMap: Record<string, string> = {
      confirmed: 'آرڈر تصدیق شدہ (New)',
      packing: 'پیکنگ مکمل (Packed)',
      dispatched: 'گاڑی / کوریئر کے پاس (Dispatched)',
      out_for_delivery: 'رائیڈر کسٹمر کی طرف روانہ (Out for Delivery)',
      delivered: 'پارسل ڈیلیور ہو گیا - رقم وصول (Delivered & Done)',
      cancelled: 'آرڈر منسوخ (Cancelled)'
    };

    const updated = current.map((order) => {
      if (order.id !== orderId) return order;

      const updatedRider: RiderStatus = {
        ...order.rider,
        status: newStatus,
        statusUr: statusUrMap[newStatus] || newStatus,
        ...(statusDetails || {})
      };

      return {
        ...order,
        rider: updatedRider
      };
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(ORDER_UPDATE_EVENT));
    return updated;
  } catch (err) {
    console.error(err);
    return getStoredOrders();
  }
}
