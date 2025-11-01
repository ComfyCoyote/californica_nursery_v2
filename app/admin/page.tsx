import AdminItemList from "@/components/admin/admin-item-list"
import { getProducts } from "@/utils/square/api/getProducts"
import type { AdminItem } from "@/utils/interfaces/admin/adminItem"

export default async function Page(){
    const plants = await getProducts('PLANT') ?? []
    const seeds = await getProducts('SEED') ?? []
    const merch = await getProducts('MERCH') ?? []

    const adminItems = [...plants, ...seeds, ...merch].map((item) => ({
        id: item.id,
        name: item.name,
        images: item.images,
        imageUrls: item.imageUrls,
    } as AdminItem))

    return (
        <AdminItemList items={adminItems} />
    )
}