import {
  Grid2x2,
  Pill,
  Syringe,
  Citrus,
  Droplet,
  HeartPulse,
  Leaf,
} from "lucide-react";
import clsx from "clsx";
import { Category, CategoryIconKey } from "@/types/billing";

interface CategoryTabsProps {
  categories: Category[];
  activeCategoryId: string;
  onSelect: (id: string) => void;
}

const ICONS: Record<CategoryIconKey, JSX.Element> = {
  all: <Grid2x2 size={20} />,
  painRelief: <Pill size={20} />,
  antibiotics: <Syringe size={20} />,
  vitamins: <Citrus size={20} />,
  diabetes: <Droplet size={20} />,
  cardiac: <HeartPulse size={20} />,
  ayurvedic: <Leaf size={20} />,
};

export function CategoryTabs({ categories, activeCategoryId, onSelect }: CategoryTabsProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-section-title text-text-primary">Top Categories</h2>
        <a href="/inventory?view=categories" className="text-caption font-medium text-primary hover:underline">
          View All
        </a>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {categories.map((c) => {
          const isActive = c.id === activeCategoryId;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={clsx(
                "flex flex-col items-center gap-1.5 rounded-md border px-2 py-3 text-caption font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-border bg-surface text-text-secondary hover:border-primary/50"
              )}
            >
              {ICONS[c.icon]}
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
