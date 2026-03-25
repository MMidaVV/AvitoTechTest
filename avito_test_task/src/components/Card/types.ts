import type { ItemPreview } from "../../types/api";

export interface CardProps {
    item: ItemPreview,
    layout?: 'Appstore' | 'UnorderedList',
}