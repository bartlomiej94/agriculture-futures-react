export type Category = { 
    id: string
    name: string
}

export type Index = {
    id: string
    name: string
    categoryId: string
}

export type MarketObject = {
    id: string
    name: string
    icon: string
    price: number
    change: number
    volume: number
    type: string
    category: string
};