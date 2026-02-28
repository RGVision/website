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
                        className="px-5 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 border border-border bg-card text-muted-foreground data-[state=active]:bg-gold-gradient data-[state=active]:text-primary-foreground data-[state=active]:border-primary data-[state=active]:shadow-gold hover:text-foreground hover:border-white/15"
                    >
                        {cat.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}
