'use client';
import { PoseCategory } from '@/lib/poses';

interface CategoryTabsProps {
  categories: PoseCategory[];
  active: PoseCategory;
  onSelect: (cat: PoseCategory) => void;
}

export function CategoryTabs({ categories, active, onSelect }: CategoryTabsProps) {
  return (
    <div className="flex overflow-x-auto no-scrollbar space-x-3 px-6 py-2 pointer-events-auto shadow-inner w-full snap-x">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`whitespace-nowrap px-5 py-2 rounded-full text-[13px] tracking-wide font-medium transition-all duration-200 snap-center ${
            active === cat 
              ? 'bg-white text-black shadow-md scale-105' 
              : 'bg-white/10 text-white/90 hover:bg-white/20'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
