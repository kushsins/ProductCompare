import { createContext, useContext, useState, useEffect } from "react";
import type { CarProduct } from "./config/types";

const STORAGE_KEY = "compareCars";
const MAX_COMPARE = 3;

type CompareContextType = {
    compared: CarProduct[];
    addProduct: (product: CarProduct) => void;
    removeProduct: (id: number) => void;
    clear: () => void;
    inCompare: (id: number) => boolean;
};

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
    const [compared, setCompared] = useState<CarProduct[]>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    const parsed: any = JSON.parse(stored);
                    if (Array.isArray(parsed)) {
                        return parsed.filter(
                            (item) =>
                                item &&
                                typeof item.id === "number" &&
                                typeof item.name === "string"
                        ) as CarProduct[];
                    }
                } catch { }
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(compared.slice(0, MAX_COMPARE))
        );
    }, [compared]);

    const addProduct = (product: CarProduct) => {
        setCompared((prev) => {
            if (
                prev.length >= MAX_COMPARE ||
                prev.some((p) => p.id === product.id)
            ) {
                return prev;
            }
            return [...prev, product];
        });
    };

    const removeProduct = (id: number) =>
        setCompared((prev) => prev.filter((p) => p.id !== id));

    const clear = () => setCompared([]);

    const inCompare = (id: number) => compared.some((p) => p.id === id);

    return (
        <CompareContext.Provider
            value={{ compared, addProduct, removeProduct, clear, inCompare }}
        >
            {children}
        </CompareContext.Provider>
    );
}

export const useCompare = () => {
    const ctx = useContext(CompareContext);
    if (!ctx) {
        throw new Error("useCompare must be used within CompareProvider");
    }
    return ctx;
};
