import { Product } from '../types';
import { PRODUCTS } from './products';

const PRODUCTS_STORAGE_KEY = 'suddais_catalog_products';
export const PRODUCT_UPDATE_EVENT = 'suddais_products_updated';

/**
 * Retrieves the live products catalog.
 * Uses localStorage if available, otherwise initializes with default catalog.
 */
export function getStoredProducts(): Product[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(PRODUCTS));
      return PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(PRODUCTS));
    return PRODUCTS;
  } catch (err) {
    console.error('Error loading products from store:', err);
    return PRODUCTS;
  }
}

/**
 * Updates a product in the catalog (price, stock, image, discount, etc.)
 */
export function updateProductInStore(updatedProduct: Product): Product[] {
  try {
    const current = getStoredProducts();
    const index = current.findIndex((p) => p.id === updatedProduct.id);
    let updated: Product[];

    if (index >= 0) {
      updated = [...current];
      updated[index] = updatedProduct;
    } else {
      updated = [updatedProduct, ...current];
    }

    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(PRODUCT_UPDATE_EVENT));
    return updated;
  } catch (err) {
    console.error('Error updating product in store:', err);
    return getStoredProducts();
  }
}

/**
 * Adds a new product or deal
 */
export function addProductToStore(newProduct: Product): Product[] {
  try {
    const current = getStoredProducts();
    const updated = [newProduct, ...current];
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(PRODUCT_UPDATE_EVENT));
    return updated;
  } catch (err) {
    console.error('Error adding product to store:', err);
    return getStoredProducts();
  }
}

/**
 * Deletes a product from the catalog
 */
export function deleteProductFromStore(productId: string): Product[] {
  try {
    const current = getStoredProducts();
    const updated = current.filter((p) => p.id !== productId);
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(PRODUCT_UPDATE_EVENT));
    return updated;
  } catch (err) {
    console.error('Error deleting product from store:', err);
    return getStoredProducts();
  }
}

/**
 * Resets the catalog back to factory defaults
 */
export function resetProductsToDefault(): Product[] {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(PRODUCTS));
    window.dispatchEvent(new Event(PRODUCT_UPDATE_EVENT));
    return PRODUCTS;
  } catch (err) {
    console.error('Error resetting products:', err);
    return PRODUCTS;
  }
}
