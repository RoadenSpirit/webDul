import { chromium } from 'playwright';
import { test, expect } from '@playwright/test';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

test('verificación de carrusel y botones', async ({ page }) => {
  // Navegar al sitio
  await page.goto('https://dulceria-el-lider.vercel.app');
  await page.waitForLoadState('networkidle');

  // Verificar que las cards estén presentes (al menos un botón Comprar Ahora)
  const buyNowBtn = await page.locator('.buy-now-btn').first();
  await expect(buyNowBtn).toBeVisible();

  // Verificar que el drawer del carrito esté inicialmente cerrado
  const cartDrawer = page.locator('#cart-drawer');
  await expect(cartDrawer).not.toHaveClass('open');

  // Abrir el carrito usando el ícono del carrito flotante
  const floatingCartBtn = page.locator('#floating-cart-btn');
  await floatingCartBtn.click();

  // El drawer debería estar ahora abierto
  await expect(cartDrawer).toHaveClass('open');

  // En el carrito, debe haber un precio visible (algún subtotal o total)
  const totalDisplay = page.locator('#cart-total-display');
  await expect(totalDisplay).toBeVisible();

  // Cerrar el carrito
  await cartDrawer.locator('.close-btn').click();
  await expect(cartDrawer).not.toHaveClass('open');

  // Verificar que el ícono flotante del carrito aún funciona
  await floatingCartBtn.click();
  await expect(cartDrawer).toHaveClass('open');
  await cartDrawer.locator('.close-btn').click();
});
