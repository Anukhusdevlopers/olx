import React, { useState, useRef, useEffect } from 'react'; 


const Cars = () => {
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedFuel, setSelectedFuel] = useState('');
    const [selectedTransmission, setSelectedTransmission] = useState('');
    const [selectedOwner, setSelectedOwner] = useState('');
    const [driven, setDriven] = useState('');
    const [selectedModel, setSelectedModel] = useState(''); // State for selected model

    const handleDrivenChange = (e) => {
        setDriven(e.target.value.slice(0, 6));  // Limit to 6 characters
    };

    // Models for each brand
    const models = {
        'Maruti Suzuki': ['Jimmy', 'Fronx'],
        'Honda': ['Jazz', 'Accord'],
        'Tata': ['Punch', 'Bolt'],
        'Mahindra': ['XUV', 'Thar']
    };

    return (
        <>
            <label className='text-md text-[#002f34]'>Brand*</label> <br />
            <select
                required
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className='border-[1px] text-sm md:text-xl text-[#333] w-full md:w-[60%] p-2 rounded-md border-[rgba(88,123,125,0.8)] mb-4'
            >
                <option value=""></option>
                <option value="Maruti Suzuki">Maruti Suzuki</option>
                <option value="Honda">Honda</option>
                <option value="Tata">Tata</option>
                <option value="Mahindra">Mahindra</option>
                {/* Add more brands as needed */}
            </select>
            <br />

            {/* Conditionally render the Model input if a brand is selected */}
            {selectedBrand && (
                <>
                    <label className='text-md text-[#002f34]'>Model*</label> <br />
                    <select
                        required
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className='border-[1px] text-sm md:text-xl text-[#333] w-full md:w-[60%] p-2 rounded-md border-[rgba(88,123,125,0.8)] mb-4'
                    >
                        <option value=""></option>
                        {/* Render models based on the selected brand */}
                        {models[selectedBrand]?.map((model) => (
                            <option key={model} value={model}>{model}</option>
                        ))}
                    </select>
                </>
            )}

            <br />
            {/* Conditionally render the Variant input if a model is selected */}
            {selectedModel && (
                <>
                    <label className='text-md text-[#002f34]'>Variant*</label> <br />
                    <select
                        required
                        className='border-[1px] text-sm md:text-xl text-[#333] w-full md:w-[60%] p-2 rounded-md border-[rgba(88,123,125,0.8)] mb-4'
                    >
                        <option value=""></option>
                        <option value="Variant 1">1.5 N4</option>
                        <option value="Variant 2">1.4 N8</option>
                        <option value="Variant 3">1.5 N 10</option>
                        {/* Add more variants as needed */}
                    </select>
                </>
            )}

            <br />
            <label className='text-md text-[#002f34]'>Year*</label> <br />
            <input
                required
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                className='border-[1px] text-sm md:text-xl p-2 w-full md:w-[60%] rounded-md border-[rgba(88,123,125,0.8)] mb-4'
            />
            <br />
            <label className='text-md text-[#002f34]'>Fuel*</label>
            <div className='w-full md:w-[60%] flex flex-wrap gap-3 mb-4'>
                {['CNG & Hybrids', 'Diesel', 'Electric', 'LPG', 'Petrol'].map(fuel => (
                    <div
                        key={fuel}
                        onClick={() => setSelectedFuel(fuel)}
                        className={`box py-1 px-4 text-[#002f34] border-[1px] cursor-pointer rounded-sm border-[#8d8f8f] ${selectedFuel === fuel ? 'bg-[#91f2ed]  border-[#002f34]' : ''}`}
                    >
                        {fuel}
                    </div>
                ))}
            </div>

            <label className='text-md text-[#002f34]'>Transmission*</label>
            <div className='w-full md:w-[60%] flex flex-wrap gap-3 mb-4'>
                {['Automatic', 'Manual'].map(transmission => (
                    <div
                        key={transmission}
                        onClick={() => setSelectedTransmission(transmission)}
                        className={`box cursor-pointer py-1 px-4 text-[#002f34] border-[1px] rounded-sm border-[#8d8f8f] ${selectedTransmission === transmission ? 'bg-[#91f2ed]' : ''}`}
                    >
                        {transmission}
                    </div>
                ))}
            </div>

            <label className='text-md text-[#002f34]'>KM Driven*</label> <br />
            <input
                value={driven}
                onChange={handleDrivenChange}
                required
                type="number"
                className='border-[1px] text-sm md:text-xl p-2 w-full md:w-[60%] rounded-md border-[rgba(88,123,125,0.8)] '
            />
            <p className='mb-4 text-[12px] text-[rgba(88,123,125,0.8)] justify-end w-full md:w-[60%] flex'>{driven.length}/6</p>

            <label className='text-md text-[#002f34]'>No of Owners*</label>
            <div className='w-full md:w-[60%] flex flex-wrap gap-3 mb-4'>
                {['1st', '2nd', '3rd', '4th', '4+'].map(owner => (
                    <div
                        key={owner}
                        onClick={() => setSelectedOwner(owner)}
                        className={`box py-1 cursor-pointer px-4 text-[#002f34] border-[1px] rounded-sm border-[#8d8f8f] ${selectedOwner === owner ? 'bg-[#91f2ed]' : ''}`}
                    >
                        {owner}
                    </div>
                ))}
            </div>
        </>
    );
};


export default Cars