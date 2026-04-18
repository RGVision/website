"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Category } from "@/data/categories";

interface Props {
    categories: Category[];
    activeCategory: string;
    onCategoryChange: (id: string) => void;
}

export default function CategoryTabs({ categories, activeCategory, onCategoryChange }: Props) {
    return (
        <Tabs value={activeCategory} onValueChange={onCategoryChange} className="mb-8">
            <TabsList className="bg-transparent h-auto flex-wrap gap-3 p-0 justify-start">
                {categories.map((cat) => (
                    <TabsTrigger
                        key={cat.id}
                        value={cat.id}
                        className="px-6 py-3 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all duration-300 border border-border bg-white text-navy/70 data-[state=active]:bg-navy data-[state=active]:text-white data-[state=active]:border-navy data-[state=active]:shadow-lg hover:text-navy hover:border-navy/30"
                    >
                        {cat.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}
