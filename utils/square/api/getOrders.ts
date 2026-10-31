import client from "./client";
import { Square } from "square";

export interface OrdersFilter {
    startAt?: string;
    endAt?: string;
    limit?: number;
}

export default async function getOrders(filter: OrdersFilter = {}) {
    const {
        startAt = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        endAt   = new Date().toISOString(),
        limit   = 100,
    } = filter;

    try {

        const request: Square.SearchOrdersRequest = {
            locationIds: ['L3C4J69QTRCAA'],
            limit,
            query: {
                filter: {
                    dateTimeFilter: {
                        createdAt: { startAt, endAt },
                    },
                    stateFilter: {
                        states: ['COMPLETED', 'CANCELED', 'OPEN'],
                    },
                    sourceFilter: {
                        sourceNames: ['Californica Nursery Website'],
                    },
                },
                sort: {
                    sortField: 'CREATED_AT',
                    sortOrder: 'DESC',
                },
                
            },
        };

        const allOrders: Square.Order[] = [];
        let cursor: string | undefined;

        do {
            const response: Square.SearchOrdersResponse = await client.orders.search({ ...request, cursor });
            allOrders.push(...(response.orders ?? []));
            cursor = response.cursor;
        } while (cursor);

        return allOrders;
    } catch (err) {
        console.error('[getOrders]', err);
        return [];
    }
}

