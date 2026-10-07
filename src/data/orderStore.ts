import { OrderRecord, RiderStatus } from '../types';
import { IMPERIAL_VALLEY_IMG, KHAMRAH_IMG, NINE_PM_IMG, DEHN_ATTAR_IMG, EMBD_TOPI_IMG } from './images';

const STORAGE_KEY = 'suddais_order_history';
const SEQ_STORAGE_KEY = 'suddais_order_seq_counter';
export const ORDER_UPDATE_EVENT = 'suddais_order_updated';

/**
 * Generates the next sequential order ID and tracking number starting from 010101.
 * e.g. First: SC-010101 / TRK-010101, then SC-010102, SC-010103, etc.
 */
export function getNextOrderSequence(): { orderId: string; trackingNo: string; seqNumber: string } {
  try {
    const raw = localStorage.getItem(SEQ_STORAGE_KEY);
    let num = raw ? parseInt(raw, 10) : 10107; // Start past seed orders (010101 to 010106)
    if (isNaN(num) || num < 10101) num = 10107;

    const seqStr = num < 100000 ? `0${num}` : `${num}`;
    localStorage.setItem(SEQ_STORAGE_KEY, (num + 1).toString());

    return {
      orderId: `SC-${seqStr}`,
      trackingNo: `TRK-${seqStr}`,
      seqNumber: seqStr
    };
  } catch (err) {
    console.error(err);
    return {
      orderId: 'SC-010107',
      trackingNo: 'TRK-010107',
      seqNumber: '010107'
    };
  }
}

// Realistic seed orders using the user's requested 010101 series
export const INITIAL_SEED_ORDERS: OrderRecord[] = [
  {
    id: 'SC-010104',
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(), // 25 mins ago
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
      statusUr: 'نیا آرڈر تصدیق شدہ (New)',
      riderName: 'Muhammad Bilal (Dispatch)',
      riderPhone: '0318-2187575',
      vehicleNo: 'KHI-7892',
      courier: 'Suddais Local Courier Rider',
      trackingNo: 'TRK-010104',
      estimatedDelivery: '24 - 48 Hours',
      currentLocation: 'Malir Central Hub'
    }
  },
  {
    id: 'SC-010103',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
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
      statusUr: 'پیکنگ مکمل (Packed in Box)',
      riderName: 'Farhan Ali (Logistics)',
      riderPhone: '0318-2187575',
      vehicleNo: 'TCS-Van-88',
      courier: 'TCS Express',
      trackingNo: 'TRK-010103',
      estimatedDelivery: '3 - 4 Days',
      currentLocation: 'Packed in Presentation Box'
    }
  },
  {
    id: 'SC-010102',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    customer: {
      fullName: 'Usman Ghani',
      phone: '0321-4455667',
      whatsappPhone: '0321-4455667',
      city: 'Islamabad / Rawalpindi',
      address: 'House # 19, Street 4, Sector F-10/2, Islamabad',
      paymentMethod: 'cod'
    },
    items: [
      {
        id: 'perfume-khamrah-50 ML (Full Bottle)',
        productId: 'perfume-khamrah-lattafa',
        nameUr: 'خمرہ لطافہ پرفیوم',
        nameEn: 'Lattafa Khamrah - 50 ML',
        category: 'perfume',
        image: KHAMRAH_IMG,
        selectedSize: '50 ML (Full Bottle)',
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
      statusUr: 'گاڑی / کوریئر کے پاس (Dispatched)',
      riderName: 'TCS Cargo Team',
      riderPhone: '0318-2187575',
      vehicleNo: 'ISB-Cargo-21',
      courier: 'TCS Express (Nationwide)',
      trackingNo: 'TRK-010102',
      estimatedDelivery: '2 - 3 Days',
      currentLocation: 'In Transit on Delivery Vehicle'
    }
  },
  {
    id: 'SC-010101',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), // Yesterday
    customer: {
      fullName: 'Sheikh Abdul Rehman',
      phone: '0301-7788990',
      whatsappPhone: '0301-7788990',
      city: 'Karachi (Malir / Airport)',
      address: 'Bungalow # 12-A, Malir Cantt, Karachi',
      paymentMethod: 'cod'
    },
    items: [
      {
        id: 'topi-omani-gold-22.5 inches',
        productId: 'topi-omani-gold',
        nameUr: 'عمانی دستی کڑھائی ٹوپی',
        nameEn: 'Handmade Omani Gold Royal Kufi',
        category: 'topi',
        image: EMBD_TOPI_IMG,
        selectedSize: '22.5 inches',
        unitPrice: 1200,
        quantity: 2
      }
    ],
    subtotal: 2400,
    discount: 0,
    deliveryFee: 150,
    total: 2550,
    rider: {
      status: 'delivered',
      statusUr: 'کوریئر ڈن - رقم وصول (Delivered)',
      riderName: 'Kashif Mehmood',
      riderPhone: '0318-2187575',
      vehicleNo: 'KHI-6712',
      courier: 'Suddais Local Courier Rider',
      trackingNo: 'TRK-010101',
      estimatedDelivery: 'Delivered',
      currentLocation: 'Delivered to Customer. Cash Received.'
    }
  },
  {
    id: 'SC-010105',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    customer: {
      fullName: 'Kamran Siddiqui',
      phone: '0345-2233445',
      whatsappPhone: '0345-2233445',
      city: 'Lahore (Punjab)',
      address: 'Main Boulevard, Gulberg III, Lahore',
      paymentMethod: 'cod'
    },
    items: [
      {
        id: 'perfume-imperial-valley-30 ML',
        productId: 'perfume-imperial-valley',
        nameUr: 'امپیریل ویلی پرفیوم',
        nameEn: 'Gissah Imperial Valley - 30 ML',
        category: 'perfume',
        image: IMPERIAL_VALLEY_IMG,
        selectedSize: '30 ML',
        unitPrice: 2000,
        quantity: 1
      }
    ],
    subtotal: 2000,
    discount: 0,
    deliveryFee: 250,
    total: 2250,
    rider: {
      status: 'cancelled',
      statusUr: 'منسوخ (Cancelled by Customer)',
      riderName: 'Dispatch Desk',
      riderPhone: '0318-2187575',
      vehicleNo: 'N/A',
      courier: 'Cancelled',
      trackingNo: 'TRK-010105',
      estimatedDelivery: 'Cancelled',
      currentLocation: 'Order cancelled by customer before dispatch'
    },
    cancellationReason: 'customer',
    cancelledAt: new Date(Date.now() - 1000 * 60 * 60 * 17).toISOString()
  },
  {
    id: 'SC-010106',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    customer: {
      fullName: 'Asif Mehmood',
      phone: '0312-3344556',
      whatsappPhone: '0312-3344556',
      city: 'Quetta (Balochistan)',
      address: 'Zarghoon Road, Quetta',
      paymentMethod: 'cod'
    },
    items: [
      {
        id: 'attar-royal-mirage-6 ML',
        productId: 'attar-royal-mirage',
        nameUr: 'رائل میراج عطر',
        nameEn: 'Royal Mirage Attar - 6 ML',
        category: 'attar',
        image: DEHN_ATTAR_IMG,
        selectedSize: '6 ML',
        unitPrice: 800,
        quantity: 1
      }
    ],
    subtotal: 800,
    discount: 0,
    deliveryFee: 350,
    total: 1150,
    rider: {
      status: 'cancelled',
      statusUr: 'منسوخ (Cancelled by Store)',
      riderName: 'Suddais Ahmed',
      riderPhone: '0318-2187575',
      vehicleNo: 'N/A',
      courier: 'Cancelled',
      trackingNo: 'TRK-010106',
      estimatedDelivery: 'Cancelled',
      currentLocation: 'Item out of stock / cancelled by store owner'
    },
    cancellationReason: 'owner',
    cancelledAt: new Date(Date.now() - 1000 * 60 * 60 * 29).toISOString()
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
  statusDetails?: Partial<RiderStatus>,
  cancellationReason?: 'customer' | 'owner' | string
): OrderRecord[] {
  try {
    const current = getStoredOrders();
    const statusUrMap: Record<string, string> = {
      confirmed: 'آرڈر تصدیق شدہ (New)',
      packing: 'پیکنگ مکمل (Packed in Box)',
      dispatched: 'گاڑی / کوریئر کے پاس (Dispatched)',
      out_for_delivery: 'رائیڈر کسٹمر کی طرف روانہ (Out for Delivery)',
      delivered: 'پارسل ڈیلیور ہو گیا - رقم وصول (Delivered & Done)',
      cancelled: cancellationReason === 'customer'
        ? 'منسوخ (Cancelled by Customer)'
        : 'منسوخ (Cancelled by Store Owner)'
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
        rider: updatedRider,
        ...(newStatus === 'cancelled' ? {
          cancellationReason: cancellationReason || 'owner',
          cancelledAt: new Date().toISOString()
        } : {})
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
