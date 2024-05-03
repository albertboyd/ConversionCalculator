import React, {FC, useState} from 'react'

interface IDropDownOption {
    label: String,
    value: String
}

interface IDropDownOptions {
    label: String,
    options: IDropDownOption[],
    callback: (val: String) => void
}

const DropDown: FC<IDropDownOptions> = ({ label, options, callback }) => {
    const [data, setData] = useState<String>(label)
    const [state, setState] = useState<Boolean>(false)

    const handleClick = () => {
        setState(!state)
    }

    const handleOptionClick = (val: String) => {
        setData(val)
        handleClick()
        callback(val)
    }

    return (
        <div className='h-full w-full flex flex-col items-center justify-center cursor-pointer border border-gray-300 rounded-md overflow-hidden'>
            <div 
            onClick={handleClick}
            className='h-full w-full bg-white flex items-center justify-start p-4 text-xs text-gray-400 font-normal capitalize'>{data}</div>
        
            <div className={`${state ? "flex" : "hidden"} bg-white max-h-36 h-auto w-full flex-col items-start justify-start shadow-lg position absolute top-full left-0 z-40 overflow-y-auto`}>
                {
                    options.map((option, id) => {
                        return (
                            <p 
                            key={id}
                            onClick={() => handleOptionClick(option.value)}
                            className='w-full py-2 px-3 text-xs text-gray-500 font-normal hover:bg-gray-50 transition-all duration-300'>{option.label}</p>
                        )
                    })
                }                
            </div>
        </div>
    )
}

export default DropDown