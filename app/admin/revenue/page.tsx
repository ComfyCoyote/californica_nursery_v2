import getOrders from '@/utils/square/api/getOrders';
import RevenueDashboard, { DashboardOrder, MonthlyDataPoint } from '@/components/admin/revenue/revenue-dashboard';
import { categoryBreakdown } from '@/components/admin/revenue/sample-data';
import { Square } from 'square';

function buildMonthSlots(): MonthlyDataPoint[] {
    const now = new Date();
    const slots: MonthlyDataPoint[] = [];
    for (let i = 10; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        slots.push({
            month: d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
            revenue: 0,
            itemsSold: 0,
        });
    }
    return slots;
}

function monthLabel(date: string) {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
}

function pctChange(current: number, previous: number) {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
}

function formatOrder(o: Square.Order) {
    return {
        id: o.id ?? '',
        createdAt: o.createdAt ?? '',
        state: o.state ?? 'OPEN',
        totalAmount: Number(o.totalMoney?.amount ?? 0),
        lineItems: (o.lineItems ?? []).map(li => ({
            name: li.name ?? '',
            quantity: li.quantity ?? '1',
            baseAmount: Number(li.basePriceMoney?.amount ?? 0),
        }))
    };
}

export default async function RevenuePage() {
    const now = new Date();
    const startAt = new Date(now.getFullYear(), 0, 1).toISOString();
    const rawOrders = await getOrders({ startAt });

    const orders: DashboardOrder[] = rawOrders.map(o => formatOrder(o));

    // Monthly revenue slots
    const slots = buildMonthSlots();
    orders.filter(o => o.state !== 'CANCELED' && o.createdAt).forEach(o => {
        const label = monthLabel(o.createdAt);
        const slot = slots.find(s => s.month === label);
        if (slot) {
            slot.revenue += o.totalAmount;
            slot.itemsSold += o.lineItems.reduce((sum, li) => sum + parseInt(li.quantity || '1'), 0);
        }
    });
    const monthlyRevenue = slots;

    // Top-level totals
    const yearRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const avgOrderValue = orders.length ? yearRevenue / orders.length : 0;
    const canceledCount = orders.filter(o => o.state === 'CANCELED').length;

    // Current vs last month revenue
    const currentMonthSlot = monthlyRevenue[monthlyRevenue.length - 1];
    const lastMonthSlot    = monthlyRevenue[monthlyRevenue.length - 2];
    const currentMonthRevenue = currentMonthSlot?.revenue ?? 0;
    const lastMonthRevenue    = lastMonthSlot?.revenue ?? 0;
    const revenueChange = pctChange(currentMonthRevenue, lastMonthRevenue);

    // Items sold
    const activeOrders = orders.filter(o => o.state !== 'CANCELED' && o.createdAt);

    const itemsForMonth = (label: string) =>
        activeOrders
            .filter(o => monthLabel(o.createdAt) === label)
            .reduce((sum, o) => sum + o.lineItems.reduce((s, li) => s + parseInt(li.quantity || '1'), 0), 0);

    const currentMonthItems = itemsForMonth(currentMonthSlot?.month ?? '');
    const lastMonthItems    = itemsForMonth(lastMonthSlot?.month ?? '');
    const itemsChange = pctChange(currentMonthItems, lastMonthItems);

    // Vendor distribution
    const vendorDistribution = currentMonthRevenue * 0.12;

    // Top product (most units sold all time)
    const allTimeTotals: Record<string, number> = {};
    const currentMonthItemMap: Record<string, number> = {};
    const lastMonthItemMap: Record<string, number> = {};

    activeOrders.forEach(o => {
        const label = monthLabel(o.createdAt);
        o.lineItems.forEach(li => {
            const qty = parseInt(li.quantity || '1');
            allTimeTotals[li.name] = (allTimeTotals[li.name] ?? 0) + qty;
            if (label === currentMonthSlot?.month) currentMonthItemMap[li.name] = (currentMonthItemMap[li.name] ?? 0) + qty;
            if (label === lastMonthSlot?.month)    lastMonthItemMap[li.name]    = (lastMonthItemMap[li.name]    ?? 0) + qty;
        });
    });

    const topProductEntry = Object.entries(allTimeTotals).sort((a, b) => b[1] - a[1])[0];
    const topProduct = topProductEntry ? { name: topProductEntry[0], qty: topProductEntry[1] } : null;

    // Hot product (largest unit increase vs last month)
    const allNames = new Set([...Object.keys(currentMonthItemMap), ...Object.keys(lastMonthItemMap)]);
    let hotProduct: { name: string; increase: number } | null = null;
    allNames.forEach(name => {
        const increase = (currentMonthItemMap[name] ?? 0) - (lastMonthItemMap[name] ?? 0);
        if (!hotProduct || increase > hotProduct.increase) hotProduct = { name, increase };
    });

    return (
        <RevenueDashboard
            orders={orders}
            monthlyRevenue={monthlyRevenue}
            categoryBreakdown={categoryBreakdown}
            yearRevenue={yearRevenue}
            avgOrderValue={avgOrderValue}
            canceledCount={canceledCount}
            currentMonthRevenue={currentMonthRevenue}
            revenueChange={revenueChange}
            currentMonthItems={currentMonthItems}
            lastMonthItems={lastMonthItems}
            itemsChange={itemsChange}
            vendorDistribution={vendorDistribution}
            topProduct={topProduct}
            hotProduct={hotProduct}
        />
    );
}
