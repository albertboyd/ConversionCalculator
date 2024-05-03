"use client";

import React, { FC, useState, useEffect, ChangeEvent } from "react";

import Image from "next/image";

// components
import DropDown from "@/components/DropDown"


// types and interfaces
type ConversionFunction = (value: number) => number;

interface ConversionType {
  [targetUnit: string]: ConversionFunction;
}

interface Conversions {
  [type: string]: {
    [unit: string]: ConversionType;
  };
}

interface IDropDownOption {
  label: String,
  value: String
}

const Home: FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [conversionUnit, setConversionUnit] = useState<String>("");
  const [inputUnit, setInputUnit] = useState<String>("");
  const [targetUnit, setTargetUnit] = useState<String>("");
  const [studentResponse, setStudentResponse] = useState<string>("");
  const [result, setResult] = useState<String>("");
  const [correctAnswer, setCorrectAnswer] = useState<String>("");

  const [inputUnitDataStructure, setInputUnitDataStructure] = useState<IDropDownOption[]>([])
  const [targetUnitDataStructure, setTargtUnitDataStructure] = useState<IDropDownOption[]>([])

  // data structures
  const temperatureDataStructure = [
    {
      label: "Celsius",
      value: "celsius"
    },
    {
      label: "Kelvin",
      value: "kelvin"
    },
    {
      label: "Fahrenheit",
      value: "fahrenheit"
    },
    {
      label: "Rankine",
      value: "rankine"
    }
  ]

  const volumeDataStructure = [
    {
      label: "Liter",
      value: "liter"
    },
    {
      label: "Gallon",
      value: "gallon"
    },
    {
      label: "Tablespoon",
      value: "tablespoon"
    },
    {
      label: "Cubic Inch",
      value: "cubic-inch"
    },
    {
      label: "Cubic Foot",
      value: "cubic-foot"
    },
    {
      label: "Cup",
      value: "cup"
    }
  ]

  // form change event handler functions
  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value))
  }

  const handleConversionUnitChange = (val: String) => {
    setConversionUnit(val)
  }

  const handleInputUnitChange = (val: String) => {
    setInputUnit(val)
  }

  const handleTargetUnitChange = (val: String) => {
    setTargetUnit(val)
  }

  const handleStudentResponseChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStudentResponse(e.target.value)
  }

  // utils functions
  const handleConvert = () => {
    const lowerConversionUnit = conversionUnit.toLowerCase();
    const lowerInputUnit = inputUnit.toLowerCase();
    const lowerTargetUnit = targetUnit.toLowerCase();

    const conversions: Conversions = {
      temperature: {
        celsius: {
          kelvin: (value: number) => value + 273.15,
          fahrenheit: (value: number) => (value * 9) / 5 + 32,
          rankine: (value: number) => (value + 273.15) * (9 / 5),
        },
        kelvin: {
          celsius: (value: number) => value - 273.15,
          fahrenheit: (value: number) => (value * 9) / 5 - 459.67,
          rankine: (value: number) => value * 1.8,
        },
        fahrenheit: {
          celsius: (value: number) => ((value - 32) * 5) / 9,
          kelvin: (value: number) => ((value + 459.67) * 5) / 9,
          rankine: (value: number) => value + 459.67,
        },
        rankine: {
          celsius: (value: number) => ((value - 491.67) * 5) / 9,
          kelvin: (value: number) => value * (5 / 9),
          fahrenheit: (value: number) => value - 459.67,
        },
      },
      volume: {
        liter: {
          tablespoon: (value: number) => value * 67.628,
          "cubic-inch": (value: number) => value * 61.024,
          cup: (value: number) => value * 4.2268,
          "cubic-foot": (value: number) => value * 0.035315,
          gallon: (value: number) => value * 0.26417,
        },
        tablespoon: {
          liter: (value: number) => value * 0.014787,
          "cubic-inch": (value: number) => value * 1.1082,
          cup: (value: number) => value * 0.0625,
          "cubic-foot": (value: number) => value * 0.00052219,
          gallon: (value: number) => value * 0.0039063,
        },
        "cubic-inch": {
          liter: (value: number) => value * 0.016387,
          tablespoon: (value: number) => value * 0.901,
          cup: (value: number) => value * 0.069264,
          "cubic-foot": (value: number) => value * 0.0005787,
          gallon: (value: number) => value * 0.004329,
        },
        cup: {
          liter: (value: number) => value * 0.23659,
          tablespoon: (value: number) => value * 16,
          "cubic-inch": (value: number) => value * 14.4375,
          "cubic-foot": (value: number) => value * 0.008355,
          gallon: (value: number) => value * 0.0625,
        },
        "cubic-foot": {
          liter: (value: number) => value * 28.317,
          tablespoon: (value: number) => value * 1915,
          "cubic-inch": (value: number) => value * 1728,
          cup: (value: number) => value * 119.69,
          gallon: (value: number) => value * 7.4805,
        },
        gallon: {
          liter: (value: number) => value * 3.7854,
          tablespoon: (value: number) => value * 256,
          "cubic-inch": (value: number) => value * 231,
          cup: (value: number) => value * 16,
          "cubic-foot": (value: number) => value * 0.13368,
        },
      },
    };

    if (
      !conversions[lowerConversionUnit] ||
      !conversions[lowerConversionUnit][lowerInputUnit] ||
      !conversions[lowerConversionUnit][lowerInputUnit][lowerTargetUnit]
    ) {
      setResult("Invalid");
      return;
    }

    if (isNaN(Number(studentResponse))) {
      setResult("Invalid student response");
      return;
    }

    const roundedInputValue = Math.round(inputValue * 10) / 10;
    const roundedStudentResponse = Math.round(Number(studentResponse) * 10) / 10;

    const convertedValue =
      conversions[lowerConversionUnit][lowerInputUnit][lowerTargetUnit](
        roundedInputValue,
      );

    const roundedConvertedValue = Math.round(convertedValue * 10) / 10

    if (Math.abs(roundedConvertedValue - roundedStudentResponse) < 0.1) {
      setCorrectAnswer("")
      setResult("Correct");
    } else {
      setResult("Incorrect");
      setCorrectAnswer(`Correct answer is ${roundedConvertedValue}`)
    }
  };

  useEffect(() => {
    if (conversionUnit === "temperature") {
      setInputUnitDataStructure(temperatureDataStructure)
      setTargtUnitDataStructure(temperatureDataStructure)
    }
    else if (conversionUnit === "volume") {
      setInputUnitDataStructure(volumeDataStructure)
      setTargtUnitDataStructure(volumeDataStructure)
    }
  }, [conversionUnit])

  return (
    <section className="min-h-screen md:h-screen w-full bg-gradient-to-r from-[#70b080] to-[#447f80] flex flex-col items-center justify-start md:justify-center space-y-5 overflow-hidden">
      <header className="h-auto w-11/12 md:w-8/12 mx-auto text-white text-3xl md:text-4xl font-bold pt-5 md:py-0">Convertif.</header>

      <div className="h-auto w-full md:w-8/12 bg-gray-100 mx-auto flex flex-col items-start justify-center md:rounded-2xl p-3 space-y-5">
        <section className="h-auto w-full bg-white rounded-xl p-7 flex flex-col items-center justify-center space-y-10">
          {/* timer */}
          <div className="h-auto w-full flex items-center justify-between">
            <div className="h-auto w-auto flex items-center justify-end space-x-2">
              <div className="h-10 w-10 rounded-full bg-white overflow-hidden position relative">
                <Image src="/assets/images/avatar.jpg" fill className="h-full w-full object-cover" alt="" />
              </div>
              <div className="h-auto w-auto flex flex-col items-start justify-start space-y-0">
                <h3 className="font-medium text-sm">John Doe</h3>
                <p className="text-xs text-gray-400">Science Teacher</p>
              </div>
            </div>

            <button 
            onClick={handleConvert}
            className="py-2 px-5 text-white text-sm font-medium rounded-md bg-green-600 hover:bg-green-800 transition-all duration-700">Submit</button>
          </div>

          <div className="h-auto w-full flex flex-col-reverse md:flex-row items-center justify-between">
            <div className="h-auto w-full md:w-3/5 flex flex-col items-start justify-start">
              <h2 className="text-md text-black font-semibold">Unit Converstion Calculator</h2>
              <p className="text-xs font-normal text-gray-400 mt-1">Use this form to grade the student&lsquo;s response sheet</p>

              <div className="h-auto w-full grid grid-cols-2 gap-3 mt-5">
                {/* Input Value */}
                <div className="h-auto w-full overflow-hidden position relative flex flex-col items-start justify-start space-y-1">
                  <label htmlFor="inputValue" className="text-xs font-medium text-gray-500">Input Value</label>
                  <input 
                  value={inputValue}
                  onChange={handleInputValueChange}
                  type="text" 
                  id="inputValue"
                  name="inputValue"
                  placeholder="Input Value" 
                  maxLength={5} 
                  className="h-12 w-full placeholder:text-xs placeholder:text-gray-400 focus:outline-none text-xs text-gray-500 px-3 border border-gray-300 rounded-md" 
                  required
                  />
                </div>

                {/* Conversion Unit */}
                <div className="h-auto w-full position relative flex flex-col items-start justify-start space-y-1">
                  <label htmlFor="conversionUnit" className="text-xs font-medium text-gray-500">Conversion Unit</label>
                
                  <div className="h-12 w-full position relative">
                    <DropDown 
                    callback={handleConversionUnitChange}
                    label = "Choose Conversion Unit"
                    options={[
                      {
                        label: "Temperature",
                        value: "temperature",
                      },
                      {
                        label: "Volume",
                        value: "volume"
                      }
                    ]} />
                  </div>
                </div>

                {/* Input Unit */}
                <div className="h-auto w-full position relative flex flex-col items-start justify-start space-y-1">
                  <label htmlFor="inputUnit" className="text-xs font-medium text-gray-500">Input Unit</label>
                
                  <div className="h-12 w-full position relative">
                  <DropDown 
                    callback={handleInputUnitChange}
                    label = "Choose Input Unit"
                    options={inputUnitDataStructure} />
                  </div>
                </div>

                {/* Target Unit */}
                <div className="h-auto w-full position relative flex flex-col items-start justify-start space-y-1">
                  <label htmlFor="targetUnit" className="text-xs font-medium text-gray-500">Target Unit</label>
                
                  <div className="h-12 w-full position relative">
                    <DropDown
                    callback={handleTargetUnitChange}
                    label = "Choose Target Unit"
                    options={targetUnitDataStructure} />
                  </div>
                </div>

                {/* Student Response */}
                <div className="h-auto w-full overflow-hidden position relative flex flex-col items-start justify-start space-y-1 col-span-2">
                  <label htmlFor="inputValue" className="text-xs font-medium text-gray-500">Student Response</label>
                  <input 
                  value={studentResponse}
                  onChange={handleStudentResponseChange}
                  type="text" 
                  id="studentResponse"
                  name="studentResponse"
                  placeholder="Student Response" 
                  maxLength={5} 
                  className="h-12 w-full placeholder:text-xs placeholder:text-gray-400 focus:outline-none text-xs text-gray-500 px-3 border border-gray-300 rounded-md" 
                  required
                  />
                </div>
              </div>
            </div>
            <div className="h-auto w-full md:w-1/2 flex items-center justify-center mb-10 md:mb-0">
             {result.length > 0 ? (
               <div className={`h-52 w-52 md:h-72 md:w-72 rounded-full border-2 ${result.toLocaleLowerCase() === "correct" ? "border-green-500" : "border-red-500"} flex flex-col items-center justify-center space-y-2`}>
               <p className={`w-3/5 text-center text-3xl ${result.toLocaleLowerCase() === "correct" ? "text-green-500" : "text-red-500"} font-light capitalize`}>{result}</p>
               <p className="text-xs font-normal text-gray-400">{correctAnswer}</p>
             </div>
             ) : (<div className="h-52 w-52 md:h-72 md:w-72 rounded-full border-2 border-gray-100 flex items-center justify-center">
              <p className="w-3/5 md:w-4/5 text-center text-xl md:text-3xl text-gray-300 font-light capitalize">Your results will show here</p>
             </div>)}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Home;
