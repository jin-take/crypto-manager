export type UpdateAddressParams = {
    id: string;
};

export type UpdateAddressBody = {
    symbol: string;
    network: string;
    label: string;
    address: string;
    type: number;
    memo?: string;
    is_active?: number;
};
