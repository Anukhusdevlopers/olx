import React, { useState, useRef, useEffect } from 'react';

const Mobiles = () => {

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedDamage, setSelectedDamage] = useState('');
    const [selectedNetwork, setSelectedNetwork] = useState('');
    const [selectedCharger, setSelectedCharger] = useState('');
    const [selectedReceipt, setSelectedReceipt] = useState('');
    const [selectedBox, setSelectedBox] = useState('');
    const [driven, setDriven] = useState('');

    const handleDrivenChange = (e) => {
        setDriven(e.target.value.slice(0, 6));  // Limit to 6 characters
    };

    const models = {
        'iPhone': ['15Pro', '11Pro'],
        'Samsung': ['S24', 'S25'],
        'Redmi': ['10', '8'],
        'Oppo': ['A59', 'A79']
    };


    return (
        <>


            {/* Conditionally render the Model input if a brand is selected */}


            <label className='text-md text-[#002f34]'>Brand*</label> <br />
            <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                required
                className='border-[1px] text-sm md:text-xl text-[#333] w-full md:w-[60%] p-2 rounded-md border-[rgba(88,123,125,0.8)] mb-4'
            >
                <option value=""></option>
                <option value="iPhone">iPhone</option>
                <option value="Samsung">SamSung</option>
                <option value="Redmi">Redmi</option>
                <option value="Oppo">Oppo</option>
                {/* Add more brands as needed */}
            </select>
            <br />
            {selectedBrand && (
                <>
                    <label className='text-md text-[#002f34]'>Model*</label> <br />
                    <select
                        required
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
            <label className='text-md text-[#002f34]'>Year*</label> <br />
            <input
                required
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                className='border-[1px] text-sm md:text-xl p-2 w-full md:w-[60%] rounded-md border-[rgba(88,123,125,0.8)] mb-4'

            />
            <br />
            <label className='text-md text-[#002f34]'>Physical Condition</label>
            <div className='w-full md:w-[60%] flex flex-wrap gap-3 mb-4'>
                {['Superb | No Damage', 'Good | Minor Damage', 'Fair | Major Damage', 'Poor | Screen Damage'].map(damage => (
                    <div
                        key={damage}
                        onClick={() => setSelectedDamage(damage)}
                        className={`box py-1 px-4 text-[#002f34] border-[1px] cursor-pointer rounded-sm border-[#8d8f8f] ${selectedDamage === damage ? 'bg-[#91f2ed]  border-[#002f34]' : ''}`}
                    >
                        {damage}
                    </div>
                ))}
            </div>

            <label className='text-md text-[#002f34]'>Installed RAM Size*</label> <br />
            <select
                required
                className='border-[1px] text-sm md:text-xl text-[#333] w-full md:w-[60%] p-2 rounded-md border-[rgba(88,123,125,0.8)] mb-4'
            >
                <option value=""></option>
                <option value="Upto 2GB">Upto 2GB</option>
                <option value="4GB">4GB</option>
                <option value="6GB">6GB</option>
                <option value="8GB">8GB</option>
                {/* Add more options as needed */}
            </select>
            <br />
            <label className='text-md text-[#002f34]'>Storage Capacity*</label> <br />
            <select
                required
                className='border-[1px] text-sm md:text-xl text-[#333] w-full md:w-[60%] p-2 rounded-md border-[rgba(88,123,125,0.8)] mb-4'
            >
                <option value=""></option>
                <option value="Upto 3.9GB">Upto 3.9GB</option>
                <option value="4GB">4GB</option>
                <option value="8GB">8GB</option>
                <option value="16GB">16GB</option>
                {/* Add more options as needed */}
            </select>
            <br />
            <label className='text-md text-[#002f34]'>Network*</label>
            <div className='w-full md:w-[60%] flex flex-wrap gap-3 mb-4'>
                {['2G', '3G', '4G', '5G'].map(network => (
                    <div
                        key={network}
                        onClick={() => setSelectedNetwork(network)}
                        className={`box cursor-pointer py-1 px-4 text-[#002f34] border-[1px] rounded-sm border-[#8d8f8f] ${selectedNetwork === network ? 'bg-[#91f2ed]' : ''}`}
                    >
                        {network}
                    </div>
                ))}
            </div>

            <label className='text-md text-[#002f34]'>Charger*</label>
            <div className='w-full md:w-[60%] flex flex-wrap gap-3 mb-4'>
                {['Available', 'Not Available'].map(status => (
                    <div
                        key={status}
                        onClick={() => setSelectedCharger(status)}
                        className={`box py-1 cursor-pointer px-4 text-[#002f34] border-[1px] rounded-sm border-[#8d8f8f] ${selectedCharger === status ? 'bg-[#91f2ed]' : ''}`}
                    >
                        {status}
                    </div>
                ))}
            </div>

            <label className='text-md text-[#002f34]'>Original Receipt*</label>
            <div className='w-full md:w-[60%] flex flex-wrap gap-3 mb-4'>
                {['Available', 'Not Available'].map(status => (
                    <div
                        key={status}
                        onClick={() => setSelectedReceipt(status)}
                        className={`box py-1 cursor-pointer px-4 text-[#002f34] border-[1px] rounded-sm border-[#8d8f8f] ${selectedReceipt === status ? 'bg-[#91f2ed]' : ''}`}
                    >
                        {status}
                    </div>
                ))}
            </div>

            <label className='text-md text-[#002f34]'>Box with IMEI*</label>
            <div className='w-full md:w-[60%] flex flex-wrap gap-3 mb-4'>
                {['Available', 'Not Available'].map(status => (
                    <div
                        key={status}
                        onClick={() => setSelectedBox(status)}
                        className={`box py-1 cursor-pointer px-4 text-[#002f34] border-[1px] rounded-sm border-[#8d8f8f] ${selectedBox === status ? 'bg-[#91f2ed]' : ''}`}
                    >
                        {status}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Mobiles