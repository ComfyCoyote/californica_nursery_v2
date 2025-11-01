'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import type { AdminItem } from '@/utils/interfaces/admin/adminItem';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AdminItemEditProps {
  item: AdminItem;
  open: boolean;
  onClose: () => void;
}

const AdminItemEdit: React.FC<AdminItemEditProps> = ({ item, open, onClose }) => {
  const [loading, setLoading] = useState(false);

  const updateItem = async (item: AdminItem) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/updateItemImages", item);
      
      if (response.data.status !== 200) {
        toast.error(response.data.message || 'An error occurred', {
          position: "top-right",
          autoClose: 9000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success('Successfully updated website images', {
          position: "top-right",
          autoClose: 9000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error('Failed to update item', {
        position: "top-right",
        autoClose: 9000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-black">{item.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg mb-3 text-black">Square Images</h4>
              <div className="flex flex-wrap gap-3">
                {item.imageUrls.map((url) => (
                  <div key={url} className="relative h-[300px] w-[150px] overflow-hidden rounded">
                    <Image 
                      src={url} 
                      alt="No Image available" 
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-3 text-black">Website Images</h4>
              <div className="flex flex-wrap gap-3">
                {item.images.map((id) => (
                  <div key={id} className="relative h-[300px] w-[150px] overflow-hidden rounded">
                    <Image
                      src={`https://d4ixhj8jfp690.cloudfront.net/${item.id}_${id}.webp`}
                      alt="No Image available"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex flex-row-reverse gap-3">
          <button
            type="button"
            onClick={() => updateItem(item)}
            disabled={loading}
            className={`inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Updating...' : 'Update Item'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminItemEdit;
