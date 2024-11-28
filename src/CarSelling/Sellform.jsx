import React, { useState, useRef, useEffect } from 'react';
import Cars from './Cars';
import Mobiles from './Mobiles'
import Bikes from './Bikes'

const Sellform = ({ togglefn, selectedItem, selectedCategory }) => {



    // Common States
    const [selectedImages, setSelectedImages] = useState([]);
    const fileInputRef = useRef(null);
    const [adTitle, setAdTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [location, setLocation] = useState('list');

    const City = {
        'Punjab': ['Chandigarh', 'Ludhiyana'],
        'Assam': ['Diapur'],
        'Goa': ['Panaji'],
        'Uttar Pradesh': ['Lucknow', 'Agra', 'Ayodhya', 'Jhansi']
    }


    const [coverPhotoIndex, setCoverPhotoIndex] = useState(null);

    // Handlers
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setSelectedImages(prev => [...prev, ...imageUrls].slice(0, 20)); // Limit to 20 images
    };

    const handleAdTitleChange = (e) => {
        setAdTitle(e.target.value.slice(0, 70));  // Limit to 70 characters
    };


    const handleDescriptionChange = (e) => {
        setDescription(e.target.value.slice(0, 4096));  // Limit to 4096 characters
    };

    const openFile = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        // Cleanup object URLs to avoid memory leaks
        return () => {
            selectedImages.forEach(image => URL.revokeObjectURL(image));
        };
    }, [selectedImages]);

    // Conditional Rendering Function
    const renderCategoryForm = () => {
        switch (selectedItem) {
            case 'Cars':
                return <Cars />;
            case 'Mobiles':
                return <Mobiles />;
            case 'Bikes':
                return <Bikes />;

            default:
                return null;
        }
    };

    return (
        <div className="page min-h-[100vh] w-full">
            <div className="topstrip h-[10vh] shadow-md w-full bg-[#f7f8f9] py-6 px-5 flex">
                <i onClick={togglefn} className="cursor-pointer text-2xl ri-arrow-left-line"></i>
                <h4 className='font-medium  visible ml-6  text-lg md:hidden md:text-2xl text-[#002f34] text-center'>POST YOUR AD</h4>
            </div>
            <div className="form_Sct min-h-[50vh] p-0 md:p-4 flex flex-col items-center">
                <h4 className='font-bold hidden md:visible md:flex text-2xl md:text-2xl text-[#002f34] text-center'>POST YOUR AD</h4>
                <div className="form_cnct w-full md:w-[80vw] lg:w-[60vw] border-[1px] rounded-md mt-0 md:mt-4 border-gray-300 mb-10 p-4 md:p-6">

                    <h2 className='text-lg md:text-xl text-[#002f34] font-bold mb-5'>SELECTED CATEGORY</h2>
                    <div className='flex flex-row justify-between md:justify-start'>
                        <p className='text-[14px] text-[#657071] cursor-pointer'>
                            {selectedItem || 'Cars'}  / {selectedCategory || 'Cars'}

                        </p>
                        <span
                            className='text-[14px] text-[#002f34] font-bold border-b-2 ml-2 border-[#002f34] cursor-pointer'
                            onClick={togglefn}
                        >
                            Change
                        </span>
                    </div>
                    <hr className='my-8' />

                    <h2 className='text-lg md:text-xl text-[#002f34] font-bold mb-2 uppercase'>Include some details</h2>



                    {renderCategoryForm()}

                    <br />
                    <label className='text-md text-[#002f34]'>Ad title*</label> <br />
                    <input
                        value={adTitle}
                        onChange={handleAdTitleChange}
                        required
                        type="text"
                        className='border-[1px] text-sm md:text-xl p-2 w-full md:w-[60%] rounded-md border-[rgba(88,123,125,0.8)]'

                    />
                    <p className='mb-4 text-[12px] text-[rgba(88,123,125,0.8)] flex justify-between w-full md:w-[60%]'>
                        <span>Mention the key features of your item (e.g., brand, model, age, type)</span>
                        <span>{adTitle.length}/70</span>
                    </p>

                    <label className='text-md text-[#002f34]'>Description*</label> <br />
                    <textarea
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                        rows={5}
                        className='border-[1px] text-sm md:text-xl p-2 w-full md:w-[60%] rounded-md border-[rgba(88,123,125,0.8)]'

                    ></textarea>
                    <p className='mb-4 text-[12px] text-[rgba(88,123,125,0.8)] flex justify-between w-full md:w-[60%]'>
                        <span>Include condition, features, and reason for selling</span>
                        <span>{description.length}/4096</span>
                    </p>

                    <hr className='my-8' />

                    <h2 className='text-lg md:text-xl text-[#002f34] font-bold mb-2 uppercase'>Set a price</h2>
                    <label className='text-md text-[#002f34]'>Price*</label> <br />
                    <div className="relative mb-4">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">₹</span>
                        <input
                            required
                            type="number"
                            min="0"
                            className="border-[1px] text-sm md:text-xl p-2 pl-6 w-full md:w-[60%] rounded-md border-[rgba(88,123,125,0.8)]"

                        />
                    </div>

                    <hr className='my-8' />

                    <h2 className='text-lg md:text-xl text-[#002f34] font-bold mb-2 uppercase'>Upload up to 20 photos</h2>
                    <div className='w-full md:w-[60%] flex flex-wrap gap-3 mb-4'>
                        {selectedImages.map((imgSrc, index) => (
                            <div key={index} className="relative box">
                                {/* Image with "Cover Photo" tag for the first image */}
                                <img
                                    src={imgSrc}
                                    alt={`Selected ${index}`}
                                    className="w-[115px] h-[115px] object-cover rounded-sm border-[#8d8f8f]"
                                />
                                {index === 0 && (
                                    <span className="absolute top-16 left-6 bg-[#3ce4f7] text-[#002f34]  text-sm font-bold px-4 py-1 rounded-br-sm">
                                        Cover
                                    </span>
                                )}
                                <button
                                    onClick={() => {
                                        setSelectedImages(prev => prev.filter((_, i) => i !== index));
                                    }}
                                    className="absolute top-0 right-0 text-3xl bg-[#002f34a2] text-white  w-8 h-8 flex items-center justify-center"
                                >
                                    &times;
                                </button>

                            </div>
                        ))}

                        {selectedImages.length < 20 && (
                            <div onClick={openFile} className="box cursor-pointer py-4 px-[10.5px] w-28 flex flex-col items-center text-ce4 text-[#002f34] border-[2px] rounded-sm border-[#0b0b0b]">
                                <i className="text-3xl ri-camera-ai-line text-center"></i>
                                <p className='text-sm'>Add Photo</p>
                            </div>
                        )}
                        {[...Array(20 - selectedImages.length - 1)].map((_, index) => (
                            <div
                                key={index}
                                onClick={openFile}
                                className="box cursor-pointer h-28 py-10 px-10 w-28 text-[#002f34] border-[1px] rounded-sm border-[#8d8f8f]"
                            >
                                <i className="text-3xl ri-camera-ai-line text-gray-400"></i>
                            </div>
                        ))}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                        />
                    </div>

                    <hr className='my-8' />



                    <div className="mb-4">
                        <h2 className="text-lg md:text-xl text-[#002f34] font-bold mb-2 uppercase">
                            Confirm your location
                        </h2>
                        <div className="flex items-center mb-4  w-full md:w-[60%] mt-4">
                            <span onClick={() => setLocation('list')} className={`text-md text-[#002f34] pb-2 cursor-pointer   mr-8 w-1/2 text-center ${location == 'list' ? 'border-b-4 font-bold  border-[#002f34]' : 'border-b-[2px] font-medium'} `}>List</span>
                            <span onClick={() => setLocation('current')} className={`text-md text-[#002f34] pb-2 cursor-pointer  w-1/2 text-center ${location == 'current' ? 'border-b-4 font-bold border-[#002f34]' : 'border-b-[2px] font-medium'}`}>Current Location</span>
                        </div>

                        {
                            location == 'list' && (
                                <>
                                    <label className="text-md text-[#002f34] block mb-2">State*</label>
                                    <select
                                        required
                                        value={selectedState}
                                        onChange={(e) => setSelectedState(e.target.value)}
                                        className="border-[1px] text-sm md:text-xl text-[#333] w-full md:w-[60%] p-2 rounded-md border-[rgba(88,123,125,0.8)] mb-2"
                                    >
                                        <option value=""></option>
                                        <option value="Punjab">Punjab</option>
                                        <option value="Assam">Assam</option>
                                        <option value="Goa">Goa</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        {/* Add more states as needed */}
                                    </select>
                                    {
                                        selectedState && (
                                            <>
                                                <label className="text-md text-[#002f34] block mb-2">City*</label>
                                                <select
                                                    required
                                                    value={selectedCity}
                                                    onChange={(e) => setSelectedCity(e.target.value)}
                                                    className="border-[1px] mb-4 text-sm md:text-xl text-[#333] w-full md:w-[60%] p-2 rounded-md border-[rgba(88,123,125,0.8)] "
                                                >
                                                    <option value=""></option>
                                                    {City[selectedState]?.map((city) => (
                                                        <option key={city} value={city}>{city}</option>
                                                    ))}
                                                    {/* Add more states as needed */}
                                                </select>
                                            </>
                                        )
                                    }

                                    {
                                        selectedCity && (
                                            <>
                                                <label className="text-md text-[#002f34] block mb-2">Neighbourhood*</label>
                                                <select
                                                    required
                                                    className="border-[1px] text-sm md:text-xl text-[#333] w-full md:w-[60%] p-2 rounded-md border-[rgba(88,123,125,0.8)] mb-4"
                                                >
                                                    <option value=""></option>
                                                    <option value="">Charbagh</option>
                                                    <option>Gomti Nagar</option>
                                                    {/* Add more states as needed */}
                                                </select>
                                            </>
                                        )
                                    }
                                </>
                            )
                        }


                        {
                            location == 'current' && (
                                <>
                                    <div className='w-full md:w-[60%] py-3 flex p-2 justify-between border-b-[2px] text-md items-center'><span className='text-gray-400'>State</span> <span className='text-[#002f34]'>Uttar Pradesh</span></div>
                                    <div className='w-full md:w-[60%] py-3 flex p-2 justify-between border-b-[2px] text-md items-center'><span className='text-gray-400'>City</span> <span className='text-[#002f34]'>Lucknow</span></div>
                                    <div className='w-full md:w-[60%] py-3 flex p-2 justify-between  text-md items-center'><span className='text-gray-400'>Neighbourhood</span> <span className='text-[#002f34]'>Obligue</span></div>
                                </>
                            )
                        }

                    </div>



                    <hr className='my-8' />

                    <h2 className='text-lg md:text-xl text-[#002f34] font-bold mb-2 uppercase'>Review your details</h2>
                    <div className='relative mt-4 flex w-full md:w-[60%] '>
                        <div
                            onClick={openFile}
                            className='cursor-pointer h-20 w-24 rounded-[50%] bg-violet-800 flex justify-center items-center'
                        >
                            <span className='text-4xl text-white'>R</span>
                        </div>
                        <div className='ml-4 w-full'>
                            <label className='text-md text-[#002f34]'>Name*</label> <br />
                            <input
                                required
                                type="text"
                                className='border-[1px] text-sm md:text-xl p-2 w-full rounded-md border-[rgba(88,123,125,0.8)]'

                            />
                        </div>
                    </div>

                    <h2 className='text-md text-[#002f34] font-bold mb-2 uppercase my-5'>Let's verify your account</h2>
                    <p className='text-md text-[#002f34] mb-4 w-full md:w-[60%]'>
                        We will send you a confirmation code by SMS on the next step.
                    </p>
                    <label className='text-md text-[#002f34]'>Mobile Phone Number*</label> <br />
                    <div className="relative mb-4">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">+91</span>
                        <input
                            required
                            type="tel"
                            pattern="[0-9]{10}"
                            className="border-[1px] text-sm md:text-xl p-2 pl-8 w-full md:w-[60%] rounded-md border-[rgba(88,123,125,0.8)]"

                        />
                    </div>

                    <hr className='my-8' />

                    <button
                        type="submit"
                        className='mx-5 mb-8 bg-gray-300 text-gray-500 font-bold px-3 py-3 rounded-sm hover:bg-gray-400 transition'
                    >
                        Post now
                    </button>
                </div>
            </div>
            <div className="footer h-20 w-full bg-[#002f34]"></div>
        </div>
    );
};

export default Sellform;


