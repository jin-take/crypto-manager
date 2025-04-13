export interface Address {
    id: number;
    label: string;
    address: string;
    symbol: string;
    network: string;
    type: number;
    memo?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface AddressType {
    id: number;
    label: string;
    type: number;
}