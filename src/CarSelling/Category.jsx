import React, { useState, useEffect } from 'react';
import { FaCar, FaMobileAlt, FaMotorcycle, FaCouch, FaTshirt, FaBook } from 'react-icons/fa';
import Sellform from './Sellform';
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const [selectedItem, setSelectedItem] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [toggle, setToggle] = useState(false);
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [isSmallDevice, setIsSmallDevice] = useState(false); // State to track screen size

    // Effect hook to detect screen size changes
    useEffect(() => {
        const checkDeviceSize = () => {
            // Check if the device is small (less than 768px)
            setIsSmallDevice(window.innerWidth < 768);
        };

        // Check screen size on mount
        checkDeviceSize();

        // Add event listener for resizing
        window.addEventListener('resize', checkDeviceSize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', checkDeviceSize);
        };
    }, []);

    const categoryToggle = () => {
        if (isSmallDevice) {
            setCategoryVisible(!categoryVisible);
        }
    };

    const items = [
        { name: 'Cars', icon: <FaCar /> },
        { name: 'Mobiles', icon: <FaMobileAlt /> },
        { name: 'Bikes', icon: <FaMotorcycle /> },
        { name: 'Furniture', icon: <FaCouch /> },
        { name: 'Fashion', icon: <FaTshirt /> },
        { name: 'Books', icon: <FaBook /> },
        { name: 'Jobs', icon: <FaBook /> }
    ];

    const subCategory = {
        'Cars': ['Cars'],
        'Mobiles': ['Mobile Phones', 'Tablet'],
        'Bikes': ['Motorcycles', 'Scooters'],
        'Furniture': ['Sofas', 'Beds', 'Chairs'],
        'Fashion': ['Men', 'Women', 'Kids'],
        'Books': ['Books'],
        'Jobs': ['Private Job'],
    };

    const togglefn = () => {
        setToggle(!toggle); // Toggle the form visibility
    };

    const handleSubCategoryClick = (subItem) => {
        setSelectedCategory(subItem);
        setToggle(true); // Open the form when subcategory is selected
    };

    return (
        <>
            {toggle && <Sellform togglefn={togglefn} selectedItem={selectedItem} selectedCategory={selectedCategory} />}

            {!toggle && (
                <div className="page min-h-screen w-full flex flex-col">
                    {
                        !categoryVisible && (
                            <>
                                <div className="topstrip h-[10vh] shadow-md w-full bg-[#f7f8f9] py-6 px-5 flex">
                                    <i onClick={togglefn} className="cursor-pointer text-2xl ri-arrow-left-line"></i>
                                    <h4 className='font-medium visible ml-6 text-lg md:hidden md:text-2xl text-[#002f34] text-center'>POST YOUR AD</h4>
                                </div>
                                <div className="form_Sct flex-1 md:p-4 flex flex-col items-center p-0">
                                    <h4 className="font-bold hidden md:visible md:flex text-2xl md:text-2xl text-[#002f34] text-center mb-4">POST YOUR AD</h4>

                                    <div className="form_cnct w-full  md:w-[90vw] lg:w-[60vw] border rounded-md mt-0 md:mt-4 border-gray-300 mb-10 py-4 md:py-6">
                                        <h1 className="text-lg uppercase md:text-lg text-[#002f34] font-semibold mb-5 px-6 text-center">Choose a Category</h1>

                                        <div className="w-full flex  md:flex-row md:border-t">
                                            {/* Category List */}
                                            <div className="category lg:1/2  flex-wrap md:w-1/2 md:border-b  md:border-r flex justify-center">
                                                {items.map((item, idx) => (
                                                    <div
                                                        key={idx}
                                                        onClick={() => { setSelectedItem(item.name);categoryToggle(); }}
                                                        className={`p-3 flex w-36 h-36  md:h-auto   md:w-full lg:w-full items-center justify-center md:justify-between cursor-pointer border ${selectedItem === item.name ? 'bg-gray-200 text-black' : ''}`}
                                                    >
                                                        <span className="flex flex-col md:flex-row items-center gap-3">
                                                            <span className="text-2xl text-[#002f34]">{item.icon}</span>
                                                            <span className="text-md text-[#002f34]">{item.name}</span>
                                                        </span>
                                                        <span className="">
                                                            <i className="text-3xl lg:visible md:visible hidden md:flex  text-gray-400 ri-arrow-right-s-line"></i>
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Subcategory List */}
                                            <div className="subcategory w-0 md:w-1/2">
                                                {selectedItem && (
                                                    <div className="flex flex-col md:w-full w-0">
                                                        {subCategory[selectedItem]?.map((subItem, idx) => (
                                                            <div
                                                                key={idx}
                                                                onClick={() => handleSubCategoryClick(subItem)}
                                                                className="px-6 hidden md:visible py-4 pt-5 md:flex items-center justify-between cursor-pointer border-b text-md text-gray-500"
                                                            >
                                                                {subItem}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }

                    {
                        categoryVisible && (
                            <div className=''>
                                <div className=" topstrip h-[10vh] shadow-md w-full bg-[#f7f8f9] py-6 px-5 flex">
                                    <i onClick={categoryToggle} className="cursor-pointer text-2xl ri-arrow-left-line"></i>
                                    <h4 className='font-medium visible ml-6 text-lg md:hidden md:text-2xl text-[#002f34] text-center'>{selectedItem}</h4>
                                </div>
                                <div className=" min-h-[80vh] form_Sct flex-1 md:p-4 flex flex-col items-center p-0">
                                    <div className="form_cnct w-full  md:w-[90vw] lg:w-[60vw]  rounded-md mt-0 md:mt-4 border-gray-300 mb-10 py-4 md:py-6">
                                        {/* Subcategory List */}
                                        <div className="subcategory w-full">
                                            {selectedItem && (
                                                <div className="flex flex-col  w-full ">
                                                    {subCategory[selectedItem]?.map((subItem, idx) => (
                                                        <div
                                                            key={idx}
                                                            onClick={() => handleSubCategoryClick(subItem)}
                                                            className="px-6 w-10 visible md:hidden py-2 pt-2 flex items-center justify-between cursor-pointer  text-md text-gray-500"
                                                        >
                                                            {subItem}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className="footer h-20 w-full bg-[#002f34]"></div>
                </div>
            )}
        </>
    );
};

export default Category;
