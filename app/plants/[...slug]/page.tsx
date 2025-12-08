import ProductDetailView from "@/components/marketplace/detail/product-detail-view";
import getProducts from "@/utils/square/api/getProducts";

export default async function Page({params}: {params: Promise<{ slug: string }>}) {
    const { slug } = await params
    const [id, formatName] = slug
    const productList = await getProducts('PLANT')
    const item = productList?.find((item) => item.id === id)

    if(item){
        return <ProductDetailView item={item} type="plant" pageColor="lime"/>
    }
}