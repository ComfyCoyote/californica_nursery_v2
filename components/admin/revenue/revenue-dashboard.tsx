'use client'

import { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';

export interface DashboardOrder {
    id: string;
    createdAt: string;
    state: string;
    totalAmount: number;
    lineItems: {
        name: string;
        quantity: string;
        baseAmount: number;
    }[];
}

export interface MonthlyDataPoint {
    month: string;
    revenue: number;
    itemsSold: number;
}

interface CategoryDataPoint {
    category: string;
    amount: number;
    color: string;
}

interface Props {
    orders: DashboardOrder[];
    monthlyRevenue: MonthlyDataPoint[];
    categoryBreakdown: CategoryDataPoint[];
    yearRevenue: number;
    avgOrderValue: number;
    canceledCount: number;
    currentMonthRevenue: number;
    revenueChange: number;
    currentMonthItems: number;
    lastMonthItems: number;
    itemsChange: number;
    vendorDistribution: number;
    topProduct: { name: string; qty: number } | null;
    hotProduct: { name: string; increase: number } | null;
}

const fmt = (cents: number) => '$' + (Number((cents / 100).toFixed(2))).toLocaleString();

const MonthlyTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    const { revenue, itemsSold } = payload[0].payload as MonthlyDataPoint;
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-md text-sm">
            <p className="font-semibold text-gray-700 mb-1">{label}</p>
            <p className="text-gray-600">Revenue: {fmt(revenue)}</p>
            <p className="text-gray-600">Items sold: {itemsSold}</p>
        </div>
    );
};
const pct = (change: number) => `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;

const StatCard = ({ label, value, change, sub }: { label: string; value: string; change?: number; sub?: string }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-1 shadow-sm">
        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change !== undefined && (
            <p className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {change >= 0 ? '▲' : '▼'} {pct(Math.abs(change))} vs last month
            </p>
        )}
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
);

const PAGE_SIZE = 10;

export default function RevenueDashboard({
    orders,
    monthlyRevenue,
    categoryBreakdown,
    yearRevenue,
    avgOrderValue,
    canceledCount,
    currentMonthRevenue,
    revenueChange,
    currentMonthItems,
    lastMonthItems,
    itemsChange,
    vendorDistribution,
    topProduct,
    hotProduct,
}: Props) {
    const [page, setPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
    const pagedOrders = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Revenue</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <StatCard label="Total Revenue"   value={fmt(yearRevenue)} />
                <StatCard label="Total Orders"    value={String(orders.length)} />
                <StatCard label="Avg Order Value" value={fmt(avgOrderValue)} />
                <StatCard label="Canceled Orders" value={String(canceledCount)} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <StatCard label="This Month Revenue"  value={fmt(currentMonthRevenue)} change={revenueChange} />
                <StatCard label="Items Sold"          value={`${currentMonthItems} this mo. / ${lastMonthItems} last mo.`} change={itemsChange} />
                <StatCard label="Vendor Distribution" value={fmt(vendorDistribution)} sub="12% of this month's revenue" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-10">
                <StatCard
                    label="Top Product"
                    value={topProduct ? topProduct.name : '—'}
                    sub={topProduct ? `${topProduct.qty} units sold all time` : undefined}
                />
                <StatCard
                    label="Hot Product"
                    value={hotProduct ? hotProduct.name : '—'}
                    sub={hotProduct ? `+${hotProduct.increase} units vs last month` : undefined}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue</h2>
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={monthlyRevenue} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" tick={{ fontSize: 13 }} />
                            <YAxis tickFormatter={v => `$${(v / 100).toFixed(0)}`} tick={{ fontSize: 12 }} width={55} />
                            <Tooltip content={<MonthlyTooltip />} />
                            <Bar dataKey="revenue" fill="#4a5c2f" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">By Category</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryBreakdown}
                                dataKey="amount"
                                nameKey="category"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                labelLine={false}
                            >
                                {categoryBreakdown.map((entry) => (
                                    <Cell key={entry.category} fill={entry.color} />
                                ))}
                            </Pie>
                            <Legend />
                            <Tooltip formatter={(v) => fmt(v as number)} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
                </div>
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
                        <tr>
                            <th className="px-6 py-3 text-left">Order ID</th>
                            <th className="px-6 py-3 text-left">Date</th>
                            <th className="px-6 py-3 text-left">Items</th>
                            <th className="px-6 py-3 text-left">Status</th>
                            <th className="px-6 py-3 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {pagedOrders.map(order => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-mono text-gray-600">{order.id}</td>
                                <td className="px-6 py-4 text-gray-600">
                                    {order.createdAt
                                        ? new Date(order.createdAt).toLocaleDateString('en-US', {
                                            month: 'short', day: 'numeric', year: 'numeric',
                                          })
                                        : '—'}
                                </td>
                                <td className="px-6 py-4 text-gray-700">
                                    {order.lineItems.map(i => i.name).join(', ') || '—'}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                                        order.state === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                                        order.state === 'CANCELED'  ? 'bg-red-100 text-red-600'    :
                                                                       'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {order.state}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right font-semibold text-gray-900">
                                    {fmt(order.totalAmount)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <span>{orders.length} total orders</span>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            ← Prev
                        </button>
                        <span>Page {page} of {totalPages}</span>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Next →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
