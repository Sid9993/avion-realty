'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import ListingCard from "../listing/ListingCard";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const ExploreProperties = () => {
    const [listings, setListings] = useState([]);
    const [isActive, setIsActive] = useState('Apartment');
    const [currentIndex, setCurrentIndex] = useState(0);

    const { data = [], isLoading } = useSWR(`/api/offplans`, fetcher);

    useEffect(() => {
        setListings(data.filter(item => item.propertyType === 'Apartment'));
    }, [data])

    const handlePropertyType = (propertyType) => {
        setIsActive(propertyType);
        setListings(data.filter(item => item.propertyType === propertyType));
    }

    const handlePrev = () => {

        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);

        }

    }

    const handleNextSm = () => {

        if (currentIndex < listings.length - 1 ) {
            setCurrentIndex(currentIndex + 1);
        }
    }
    const handleNextMd = () => {

        if (currentIndex < listings.length - 2) {
            setCurrentIndex(currentIndex + 2);
        }
    }

    const handleNextLg = () => {

        if (currentIndex < listings.length - 4) {
            setCurrentIndex(currentIndex + 4);
        }
    }

    return (
        <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-center">EXPLORE LUXURY PROPERTIES</h2>
            {/*property types*/}
            <div className="flex justify-center px-3 text-sm gap-2 md:gap-12 my-6">
                <button onClick={() => handlePropertyType('Apartment')} className={`uppercase ${isActive === 'Apartment'? 'text-[#E4B649] underline' : ''}`}>Apartment</button>
                <button onClick={() => handlePropertyType('Villa')} className={`uppercase ${isActive === 'Villa' ? 'text-[#E4B649] underline' : ''}`}>Villa</button>
                <button onClick={() => handlePropertyType('Penthouse')} className={`uppercase ${isActive === 'Penthouse' ? 'text-[#E4B649] underline' : ''}`}>Penthouse</button>
                <button onClick={() => handlePropertyType('Townhouse')} className={`uppercase ${isActive === 'Townhouse' ? 'text-[#E4B649] underline' : ''}`}>Townhouse</button>
            </div>

            {isLoading && <h1 className="flex justify-center items-center h-36 text-center text-2xl font-semibold">Loading!</h1> }

            {
                listings?.length ? <>{/* sm device slieder */}
                <div className="md:hidden">
                    {
                        listings?.slice(currentIndex, currentIndex + 1).map(item => <ListingCard key={item._id} item={item} status={item.status} />)
                    }
                </div>
    
                {/* md device slider */}
                <div className="hidden md:grid grid-cols-2 lg:hidden gap-6">
                    {
                        listings?.slice(currentIndex, currentIndex + 2).map(item => <ListingCard key={item._id} item={item} status={item.status} />)
                    }
    
                </div>
                {/* lg device slider */}
                <div className="hidden lg:grid grid-cols-4 gap-6">
                    
                    {
                        listings?.slice(currentIndex, currentIndex + 4).map(item => <ListingCard key={item._id} item={item} status={item.status} />)
                    }
                </div>
    
                </> : !isLoading && <h1 className="flex justify-center items-center h-36 text-center text-2xl font-semibold">No Data!</h1>
            }

            
            {/* silde controller */}
            { listings.length &&
                <div className="flex justify-between items-center text-xs px-4 my-6">
                    {<button onClick={handlePrev} className={currentIndex < 1 && 'text-gray-500 cursor-not-allowed'}>PREV</button>}
    
                    {/* sm */}
                    <button onClick={handleNextSm} className={`md:hidden ${currentIndex == listings.length - 1 && 'text-gray-500 cursor-not-allowed'}`}>NEXT</button>

                    {/* md */}
                    <button onClick={handleNextMd} className={`hidden md:block lg:hidden ${currentIndex == listings.length - 2 && 'text-gray-500 cursor-not-allowed'}`}>NEXT</button>
                    {/* lg */}
    
                    <button onClick={handleNextLg} className={`hidden lg:block ${currentIndex == listings.length - 4 && 'text-gray-500 cursor-not-allowed'}`}>NEXT</button>
    
                </div>
            }

        </div>
    );
};

export default ExploreProperties;