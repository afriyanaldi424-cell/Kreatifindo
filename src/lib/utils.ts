import { CompanySettings, Product, Quotation } from '../types';

export function formatRupiah(amount: number): string {
  if (amount === 0 || isNaN(amount)) return 'Rp 0';
  return 'Rp ' + amount.toLocaleString('id-ID');
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function cleanPhone(phone?: string): string {
  if (!phone) return '6281290008888';
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  }
  return cleaned;
}

export function generateProductWhatsAppLink(product: Product, whatsappNumber?: string): string {
  const phone = cleanPhone(whatsappNumber);
  const text = `Halo Kreatifindo, saya tertarik dengan produk:\n*${product.name}* (Kategori: ${product.category}).\nSaya ingin menanyakan detail spesifikasi, ketersediaan, dan penawaran harganya.\n\nLink produk: ${window.location.origin}/#/produk/${product.slug}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function generateQuotationWhatsAppLink(quotation: Quotation, whatsappNumber?: string): string {
  const phone = cleanPhone(whatsappNumber);
  const text = `Halo tim Kreatifindo, saya ingin menanyakan status dan tindak lanjut penawaran saya dengan nomor registrasi *${quotation.quotationNumber}* atas nama *${quotation.customerName}* (${quotation.companyName || 'Pribadi'}). Mohon informasinya. Terima kasih!`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function generateGeneralWhatsAppLink(whatsappNumber?: string, context?: string): string {
  const phone = cleanPhone(whatsappNumber);
  const text = context 
    ? `Halo Kreatifindo, saya ingin konsultasi mengenai ${context}.` 
    : 'Halo Kreatifindo, saya ingin berkonsultasi mengenai kebutuhan perabot & interior.';
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function isBusinessOpen(openingHoursWeekday?: string): boolean {
  try {
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday, 6 is Saturday
    if (day === 0) return false; // Sunday closed
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentMin = hour * 60 + minute;

    if (day >= 1 && day <= 5) {
      // Mon-Fri: 08:30 - 18:00
      return currentMin >= 8 * 60 + 30 && currentMin <= 18 * 60;
    } else if (day === 6) {
      // Sat: 09:00 - 16:00
      return currentMin >= 9 * 60 && currentMin <= 16 * 60;
    }
    return false;
  } catch {
    return true;
  }
}
