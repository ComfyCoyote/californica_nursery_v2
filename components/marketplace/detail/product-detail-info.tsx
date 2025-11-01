import React from 'react';
import { Plant } from '@/utils/interfaces/product/plant';
import { Seed } from '@/utils/interfaces/product/seed';
import { Merch } from '@/utils/interfaces/product/merch';


interface ProductDetailInfoPropTypes {
    item: Plant | Seed | Merch;
    type: string;
    pageColor: string;
}

const ProductDetailInfo: React.FC<ProductDetailInfoPropTypes> = ({ item, type, pageColor }) => {
    
    return (
        <React.Fragment>
            <div className="flex flex-col items-start gap-7">
                <div className={`flex flex-col items-start bg-${pageColor}`}>
                    <h2 className="font-bold text-2xl text-black">
                        {item?.formatName ?? ''}
                    </h2>
                    <p className="italic text-black">
                        {'scientificName' in item && item.scientificName}
                    </p>
                </div>
                <p className="text-black">{item.description}</p>
                { 'plantAttributes' in item && (
                    <div className="flex flex-col items-start space-y-1">
                        <div className="flex space-x-2">
                            <span className="font-medium text-black">LIFE CYCLE:</span>
                            <span className="text-black">{item.plantAttributes?.lifeCycle?.join(', ')}</span>
                        </div>
                        <div className="flex space-x-2">
                            <span className="font-medium text-black">PLANT TYPE:</span>
                            <span className="text-black">{item.plantAttributes?.plantType?.join(', ')}</span>
                        </div>
                        <div className="flex space-x-2">
                            <span className="font-medium text-black">GROWTH:</span>
                            <span className="text-black">{item.plantAttributes?.growthForm?.join(', ')}</span>
                        </div>
                        <div className="flex space-x-2">
                            <span className="font-medium text-black">DORMANCY:</span>
                            <span className="text-black">{item.plantAttributes?.dormancy?.join(', ')}</span>
                        </div>
                        <div className="flex space-x-2">
                            <span className="font-medium text-black">SOIL MOISTURE:</span>
                            <span className="text-black">{item.plantAttributes?.soilMoisture?.join(', ')}</span>
                        </div>
                        <div className="flex space-x-2">
                            <span className="font-medium text-black">ECOSYSTEMS:</span>
                            <span className="text-black">{item.plantAttributes?.ecosystems?.join(', ')}</span>
                        </div>
                        <div className="flex space-x-2">
                            <span className="font-medium text-black">FLOWER COLOR:</span>
                            <span className="text-black">{item.plantAttributes?.flowerColor?.join(', ')}</span>
                        </div>
                        <div className="flex space-x-2">
                            <span className="font-medium text-black">DIFFICULTY:</span>
                            <span className="text-black">{item.plantAttributes?.difficulty?.join(', ')}</span>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );

};

export default ProductDetailInfo;
