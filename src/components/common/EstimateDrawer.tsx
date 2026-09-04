import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, MessageCircle, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatRupiah, cleanPhone } from '../../lib/utils';

export const EstimateDrawer: React.FC = () => {
  const {
    isEstimateDrawerOpen,
    setIsEstimateDrawerOpen,
    estimateCart,
    removeFromEstimateCart,
    updateEstimateCartQuantity,
    navigate,
    settings,
  } = useApp();

  if (!isEstimateDrawerOpen) return null;

  const totalItems = estimateCart.reduce((acc, it) => acc + it.quantity, 0);
  const pricedItemsTotal = estimateCart.reduce((acc, it) => {
    if (it.product.priceMode === 'SHOW_PRICE' && it.product.price > 0) {
      return acc + it.product.price * it.quantity;
    }
    return acc;
  }, 0);

  const hasQuoteItems = estimateCart.some((it) => it.product.priceMode === 'REQUEST_QUOTE' || it.product.price === 0);

  const handleProceedToQuotation = () => {
    setIsEstimateDrawerOpen(false);
    navigate('#/penawaran');
  };

  const handleConsultCartWhatsApp = () => {
    const phone = cleanPhone(settings.whatsapp);
    let itemsText = estimateCart
      .map((it, idx) => `${idx + 1}. ${it.product.name} (Qty: ${it.quantity})`)
      .join('\n');

    const text = `Halo Kreatifindo, saya memiliki daftar kebutuhan perabot berikut untuk penawaran proyek:\n\n${itemsText}\n\nMohon estimasi penawaran resmi dan ketersediaan produksinya. Terima kasih!`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsEstimateDrawerOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#B88E2F]" />
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-lg">Daftar Kebutuhan</h3>
                <p className="text-xs text-stone-500 font-sans">
                  {totalItems} item perabot disiapkan untuk penawaran
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEstimateDrawerOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {estimateCart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-stone-400">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-stone-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-800 text-base">Daftar Kebutuhan Masih Kosong</h4>
                  <p className="text-xs text-stone-500 max-w-xs mt-1">
                    Jelajahi katalog perabot kami dan klik "Minta Penawaran" untuk menyusun daftar kebutuhan proyek Anda.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsEstimateDrawerOpen(false);
                    navigate('#/katalog');
                  }}
                  className="mt-2 bg-[#18181B] text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Buka Katalog Digital
                </button>
              </div>
            ) : (
              estimateCart.map((item) => {
                const isShowPrice = item.product.priceMode === 'SHOW_PRICE' && item.product.price > 0;
                return (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-xl border border-stone-200 bg-white hover:border-stone-300 transition-all flex gap-3.5"
                  >
                    <img
                      src={item.product.mainImage}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg bg-stone-100 shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-stone-900 text-xs sm:text-sm line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromEstimateCart(item.product.id)}
                            className="text-stone-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-stone-500 font-sans mt-0.5">
                          {(item.product?.material || '').split('+')[0]}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                          <button
                            onClick={() => updateEstimateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-l cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateEstimateCartQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-r cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price display */}
                        <div className="text-right">
                          {isShowPrice ? (
                            <div>
                              <span className="text-xs font-bold text-stone-900 block">
                                {formatRupiah(item.product.price * item.quantity)}
                              </span>
                              <span className="text-[10px] text-stone-400 block">
                                @ {formatRupiah(item.product.price)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-[11px] font-semibold text-[#B88E2F] px-2 py-0.5 bg-[#B88E2F]/10 rounded">
                              Harga By Quotation
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Calculation & Actions */}
          {estimateCart.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between font-medium">
                  <span>Estimasi Subtotal ({totalItems} item):</span>
                  <span className="font-bold text-stone-900 text-sm">
                    {pricedItemsTotal > 0 ? formatRupiah(pricedItemsTotal) : 'By Quotation'}
                  </span>
                </div>
                {hasQuoteItems && (
                  <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
                    * Beberapa item memerlukan penyesuaian ukuran/spesifikasi khusus. Tim kami akan mengkalkulasi harga final pada lembar penawaran resmi.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleProceedToQuotation}
                  className="w-full bg-[#18181B] text-white hover:bg-stone-800 py-3 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-98"
                >
                  <span>Lanjut ke Form Penawaran Resmi</span>
                  <ArrowRight className="w-4 h-4 text-[#B88E2F]" />
                </button>

                <button
                  onClick={handleConsultCartWhatsApp}
                  className="w-full bg-[#25D366] text-white hover:bg-[#1EBE5D] py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Kirim Daftar Ini ke WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
