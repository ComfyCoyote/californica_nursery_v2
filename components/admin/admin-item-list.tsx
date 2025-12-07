'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import AdminItemEdit from './admin-item-edit';
import type { AdminItem } from '@/utils/interfaces/admin/adminItem';

interface ItemListProps {
  items: AdminItem[];
}


const AdminItemList: React.FC<ItemListProps> = ({ items }) => {

    const [openModal, setOpenModal] = useState(false);
    const [item, setItem] = useState<AdminItem>({id: "", name: "", images: [], squareImageUrls: [], imageUrls: []});

    const selectItem = (item: AdminItem) => {
        setItem(item);
        setOpenModal(true);
    };

    return (
        <div className="flex flex-col items-center w-full p-4">
            <AdminItemEdit open={openModal} item={item} onClose={() => { setOpenModal(false)}}/>
            {items.map((item) => (
                <div
                    key={item.id}
                    onClick={() => selectItem(item)}
                    className="flex flex-row items-center justify-between w-full border border-gray-200 rounded-lg overflow-hidden p-2 shadow-sm mb-2 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all"
                >
                    <Image src={item.imageUrls[0]} alt={item.name} width={200} height={300} />
                    <p className="mt-2 text-lg font-bold mr-52">
                        {item.name}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default AdminItemList;
