export interface SquareLineItem {
    name: string;
    quantity: string;
    base_price_money: { amount: number; currency: string };
    category: 'PLANT' | 'SEED' | 'MERCH';
}

export interface SquareOrder {
    id: string;
    created_at: string;
    state: 'COMPLETED' | 'CANCELED' | 'OPEN';
    line_items: SquareLineItem[];
    total_money: { amount: number; currency: string };
}

export const sampleOrders: SquareOrder[] = [
    {
        id: 'SQ_ORDER_001',
        created_at: '2026-09-24T10:15:00Z',
        state: 'COMPLETED',
        total_money: { amount: 4800, currency: 'USD' },
        line_items: [
            { name: 'California Poppy', quantity: '2', base_price_money: { amount: 1800, currency: 'USD' }, category: 'PLANT' },
            { name: 'Native Wildflower Mix', quantity: '1', base_price_money: { amount: 1200, currency: 'USD' }, category: 'SEED' },
        ],
    },
    {
        id: 'SQ_ORDER_002',
        created_at: '2026-09-23T14:30:00Z',
        state: 'COMPLETED',
        total_money: { amount: 7200, currency: 'USD' },
        line_items: [
            { name: 'Toyon Shrub', quantity: '1', base_price_money: { amount: 4500, currency: 'USD' }, category: 'PLANT' },
            { name: 'Californica Tee', quantity: '1', base_price_money: { amount: 2700, currency: 'USD' }, category: 'MERCH' },
        ],
    },
    {
        id: 'SQ_ORDER_003',
        created_at: '2026-09-22T09:00:00Z',
        state: 'COMPLETED',
        total_money: { amount: 2400, currency: 'USD' },
        line_items: [
            { name: 'Chia Seeds', quantity: '3', base_price_money: { amount: 800, currency: 'USD' }, category: 'SEED' },
        ],
    },
    {
        id: 'SQ_ORDER_004',
        created_at: '2026-09-21T16:45:00Z',
        state: 'CANCELED',
        total_money: { amount: 3600, currency: 'USD' },
        line_items: [
            { name: 'Sage Plant', quantity: '2', base_price_money: { amount: 1800, currency: 'USD' }, category: 'PLANT' },
        ],
    },
    {
        id: 'SQ_ORDER_005',
        created_at: '2026-09-20T11:20:00Z',
        state: 'COMPLETED',
        total_money: { amount: 5400, currency: 'USD' },
        line_items: [
            { name: 'Buckwheat', quantity: '1', base_price_money: { amount: 2200, currency: 'USD' }, category: 'PLANT' },
            { name: 'Milkweed', quantity: '1', base_price_money: { amount: 1800, currency: 'USD' }, category: 'PLANT' },
            { name: 'Californica Tote', quantity: '1', base_price_money: { amount: 1400, currency: 'USD' }, category: 'MERCH' },
        ],
    },
    {
        id: 'SQ_ORDER_006',
        created_at: '2026-09-18T13:10:00Z',
        state: 'COMPLETED',
        total_money: { amount: 1800, currency: 'USD' },
        line_items: [
            { name: 'Blue Elderberry Seeds', quantity: '2', base_price_money: { amount: 900, currency: 'USD' }, category: 'SEED' },
        ],
    },
    {
        id: 'SQ_ORDER_007',
        created_at: '2026-09-15T10:00:00Z',
        state: 'COMPLETED',
        total_money: { amount: 9100, currency: 'USD' },
        line_items: [
            { name: 'Ceanothus Shrub', quantity: '2', base_price_money: { amount: 3800, currency: 'USD' }, category: 'PLANT' },
            { name: 'Californica Cap', quantity: '1', base_price_money: { amount: 1500, currency: 'USD' }, category: 'MERCH' },
        ],
    },
    {
        id: 'SQ_ORDER_008',
        created_at: '2026-09-10T15:30:00Z',
        state: 'COMPLETED',
        total_money: { amount: 3300, currency: 'USD' },
        line_items: [
            { name: 'Deerweed', quantity: '1', base_price_money: { amount: 1600, currency: 'USD' }, category: 'PLANT' },
            { name: 'Gumplant Seeds', quantity: '1', base_price_money: { amount: 1700, currency: 'USD' }, category: 'SEED' },
        ],
    },
];

export const monthlyRevenue = [
    { month: "Nov '25", revenue: 18400 },
    { month: "Dec '25", revenue: 22100 },
    { month: "Jan '26", revenue: 15800 },
    { month: "Feb '26", revenue: 19300 },
    { month: "Mar '26", revenue: 27600 },
    { month: "Apr '26", revenue: 31200 },
    { month: "May '26", revenue: 47800 },
    { month: "Jun '26", revenue: 52400 },
    { month: "Jul '26", revenue: 61000 },
    { month: "Aug '26", revenue: 58300 },
    { month: "Sep '26", revenue: 43700 },
];

export const categoryBreakdown = [
    { category: 'Plants', amount: 24600, color: '#b3e6b3' },
    { category: 'Seeds',  amount: 9800,  color: '#87ceeb' },
    { category: 'Merch',  amount: 9300,  color: '#c084fc' },
];
