import { jsPDF } from 'jspdf';
import { CompanySettings, Quotation } from '../types';
import { formatRupiah } from './utils';

export function downloadQuotationPDF(quotation: Quotation, settings: CompanySettings): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  // Header Banner
  doc.setFillColor(24, 24, 27); // Dark Charcoal #18181B
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Gold accent bar
  doc.setFillColor(184, 142, 47); // Gold #B88E2F
  doc.rect(0, 28, pageWidth, 2, 'F');

  // Company Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(settings.companyName.toUpperCase(), margin, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(212, 212, 216);
  doc.text('PERABOT & INTERIOR ARCHITECTURAL CONTRACTOR', margin, 20);

  // Document Title Top Right
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('OFFICIAL QUOTATION', pageWidth - margin, 14, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(228, 194, 114);
  doc.text(quotation.quotationNumber, pageWidth - margin, 20, { align: 'right' });

  y = 38;

  // Company & Customer Meta Info (2 columns)
  doc.setTextColor(82, 82, 91);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('DITERBITKAN OLEH:', margin, y);
  doc.text('DITUJUKAN KEPADA:', pageWidth / 2 + 5, y);

  y += 5;
  doc.setTextColor(24, 24, 27);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.text('PT KREATIF INDO KREASI MEBEL', margin, y);
  doc.text(quotation.customerName.toUpperCase(), pageWidth / 2 + 5, y);

  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(63, 63, 70);

  // Left column (Company address)
  doc.text(`${settings.address}`, margin, y);
  // Right column (Client company)
  if (quotation.companyName) {
    doc.text(`Perusahaan: ${quotation.companyName}`, pageWidth / 2 + 5, y);
  } else {
    doc.text('Pelanggan Residensial / Perorangan', pageWidth / 2 + 5, y);
  }

  y += 4;
  doc.text(`${settings.city} - ${settings.phone}`, margin, y);
  doc.text(`WhatsApp: ${quotation.whatsappNumber}`, pageWidth / 2 + 5, y);

  y += 4;
  doc.text(`Email: ${settings.email}`, margin, y);
  doc.text(`Email: ${quotation.email || '-'}`, pageWidth / 2 + 5, y);

  y += 4;
  if (quotation.address) {
    doc.text(`Lokasi Proyek: ${quotation.address.slice(0, 48)}...`, pageWidth / 2 + 5, y);
  }

  y += 8;

  // Dates bar
  doc.setFillColor(244, 244, 245);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFontSize(8);
  doc.setTextColor(39, 39, 42);
  doc.setFont('helvetica', 'bold');
  doc.text(`Tanggal Penawaran: ${quotation.createdAt}`, margin + 3, y + 4.8);
  doc.text(`Berlaku Hingga: ${quotation.validUntil}`, margin + 65, y + 4.8);
  doc.text(`Status: ${quotation.status}`, pageWidth - margin - 3, y + 4.8, { align: 'right' });

  y += 12;

  // Items Table Header
  doc.setFillColor(39, 39, 42);
  doc.rect(margin, y, contentWidth, 7.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);

  doc.text('NO', margin + 3, y + 5);
  doc.text('ITEM PRODUK & SPESIFIKASI', margin + 14, y + 5);
  doc.text('QTY', margin + 110, y + 5, { align: 'center' });
  doc.text('HARGA SATUAN', margin + 145, y + 5, { align: 'right' });
  doc.text('SUBTOTAL', pageWidth - margin - 3, y + 5, { align: 'right' });

  y += 7.5;

  // Items Rows
  doc.setTextColor(24, 24, 27);
  doc.setFont('helvetica', 'normal');

  quotation.items.forEach((item, index) => {
    // Alternating row background
    if (index % 2 === 1) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, y, contentWidth, 11, 'F');
    }

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(String(index + 1), margin + 4, y + 4.5);

    doc.setFont('helvetica', 'bold');
    doc.text(item.productName.slice(0, 52), margin + 14, y + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(113, 113, 122);
    const specDetails = [
      item.materialSpec ? `Mat: ${item.materialSpec}` : '',
      item.dimensions ? `Dim: ${item.dimensions}` : '',
      item.customNotes ? `Catatan: ${item.customNotes}` : '',
    ]
      .filter(Boolean)
      .join(' | ');

    if (specDetails) {
      doc.text(specDetails.slice(0, 68), margin + 14, y + 8.5);
    }

    doc.setTextColor(24, 24, 27);
    doc.setFontSize(8);
    doc.text(`${item.quantity} Unit`, margin + 110, y + 4.5, { align: 'center' });
    doc.text(item.unitPrice > 0 ? formatRupiah(item.unitPrice) : 'By Quote', margin + 145, y + 4.5, { align: 'right' });
    doc.setFont('helvetica', 'bold');
    doc.text(item.unitPrice > 0 ? formatRupiah(item.unitPrice * item.quantity) : 'TBD', pageWidth - margin - 3, y + 4.5, {
      align: 'right',
    });

    y += 11;
  });

  // Table bottom border
  doc.setDrawColor(228, 228, 231);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  // Calculation Breakdown
  const calcX = margin + 100;
  const valX = pageWidth - margin - 3;
  doc.setFontSize(8.5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(82, 82, 91);
  doc.text('Subtotal Produk:', calcX, y);
  doc.setTextColor(24, 24, 27);
  doc.text(formatRupiah(quotation.subtotal), valX, y, { align: 'right' });
  y += 5;

  if (quotation.discount > 0) {
    doc.setTextColor(180, 83, 9);
    doc.text('Potongan Diskon Proyek:', calcX, y);
    doc.text(`- ${formatRupiah(quotation.discount)}`, valX, y, { align: 'right' });
    y += 5;
  }

  if (quotation.additionalCost > 0) {
    doc.setTextColor(82, 82, 91);
    doc.text('Biaya Instalasi & Setting Lapangan:', calcX, y);
    doc.setTextColor(24, 24, 27);
    doc.text(formatRupiah(quotation.additionalCost), valX, y, { align: 'right' });
    y += 5;
  }

  if (quotation.shippingCost > 0) {
    doc.setTextColor(82, 82, 91);
    doc.text('Pengiriman Armada Khusus:', calcX, y);
    doc.setTextColor(24, 24, 27);
    doc.text(formatRupiah(quotation.shippingCost), valX, y, { align: 'right' });
    y += 5;
  }

  // Grand Total Box
  doc.setFillColor(24, 24, 27);
  doc.rect(calcX - 5, y, contentWidth - 95, 9, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('TOTAL INVESTASI:', calcX, y + 6);
  doc.setTextColor(228, 194, 114);
  doc.text(formatRupiah(quotation.totalAmount), valX, y + 6, { align: 'right' });

  y += 16;

  // Notes and Terms Box
  doc.setFillColor(248, 248, 248);
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'F');
  doc.setDrawColor(228, 228, 231);
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'D');

  doc.setFontSize(7.5);
  doc.setTextColor(39, 39, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('SYARAT & KETENTUAN PENAWARAN (TERMS OF SERVICE):', margin + 4, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(82, 82, 91);
  doc.text(`1. ${quotation.terms}`, margin + 4, y + 9.5);
  doc.text(`2. Pembayaran resmi ditransfer ke Rekening ${settings.bankAccount.bankName}: ${settings.bankAccount.accountNumber} a.n. ${settings.bankAccount.accountHolder}.`, margin + 4, y + 14);
  doc.text('3. Garansi konstruksi dan hardware berlaku selama 1 (satu) tahun penuh sejak tanggal serah terima pekerjaan.', margin + 4, y + 18.5);
  doc.text('4. Perubahan dimensi atau spesifikasi di luar dokumen ini setelah produksi berjalan dapat menimbulkan penyesuaian biaya.', margin + 4, y + 23);

  y += 32;

  // Signature / Approval Block
  doc.setFontSize(8);
  doc.setTextColor(39, 39, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('Hormat Kami,', margin + 15, y);
  doc.text('Disetujui Oleh Klien,', pageWidth - margin - 45, y);

  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(113, 113, 122);
  doc.text('PT KREATIF INDO KREASI MEBEL', margin + 15, y);
  doc.text(quotation.companyName || quotation.customerName, pageWidth - margin - 45, y);

  // Digital stamp text placeholder
  y += 16;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(24, 24, 27);
  doc.text('Budi Prakoso / Rina K.', margin + 15, y);
  doc.text('( ........................................ )', pageWidth - margin - 45, y);

  y += 4;
  doc.setFontSize(7.5);
  doc.setTextColor(113, 113, 122);
  doc.setFont('helvetica', 'normal');
  doc.text('Project & Commercial Division', margin + 15, y);
  doc.text('Tanda Tangan & Cap Perusahaan', pageWidth - margin - 45, y);

  // Footer Note
  doc.setFontSize(7);
  doc.setTextColor(161, 161, 170);
  doc.text(`Dokumen resmi ini di-generate secara otomatis oleh Sistem Quotation Kreatifindo. Hak cipta dilindungi.`, pageWidth / 2, 290, {
    align: 'center',
  });

  doc.save(`${quotation.quotationNumber}_Kreatifindo_Penawaran.pdf`);
}
