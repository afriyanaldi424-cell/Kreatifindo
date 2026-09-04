import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CategoryGrid: React.FC = () => {
  const { categories, navigate } = useApp();

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#B88E2F] font-sans">
              Katalog Lengkap
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Kategori Perabot & Interior
            </h2>
          </div>
          <p className="text-sm text-stone-500 font-sans max-w-md">
            Pilihan furnitur individual, set ruang kerja, perabot hunian, hingga kebutuhan fit-out custom skala besar.
          </p>
        </div>

        {/* 4x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`#/katalog?cat=${cat.slug}`)}
              className="group relative rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 aspect-4/3 cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300"
            >
              {/* Background Photography */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all" />

              {/* Text Information Overlay */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                <div className="flex justify-end">
                  <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#B88E2F] group-hover:text-white transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-white group-hover:text-[#D4AF37] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-stone-300 line-clamp-2 mt-1 font-sans opacity-90">
                    {cat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
