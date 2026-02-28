import { Category } from '@/types'

interface CategoryFilterProps {
    categories: Category[];
    activeCategory: Category;
    onSelect: (category: Category) => void;
    variant?: 'pills' | 'outline';
}

export function CategoryFilter({ categories, activeCategory, onSelect, variant = 'pills' }: CategoryFilterProps) {
    if (variant === 'outline') {
        return (
            <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-3 no-scrollbar">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => onSelect(cat)}
                        className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border shrink-0 ${activeCategory === cat
                            ? 'bg-fuchsia-500 border-fuchsia-500 text-white shadow-[0_0_20px_rgba(232,121,249,0.3)]'
                            : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        )
    }

    return (
        <div className="flex gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => onSelect(cat)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeCategory === cat
                        ? 'bg-white text-black'
                        : 'text-white/50 hover:text-white'
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    )
}
