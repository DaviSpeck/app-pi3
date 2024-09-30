import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "react-feather"

export default function Carousel({ children: slides, autoSlide = false, autoSlideInterval = 3000}) {
    const [curr, setCurr] = useState(0)

    const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
    const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

    useEffect(() => {
        if (!autoSlide) return
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, [])

    return (
        
        <div className="overflow-hidden relative">
            <div
                className="flex transition-transform ease-out duration-500 mt-8"
                style={{ transform: `translateX(-${curr * 100}%)`}}
            >
                {slides.map((slide:any, index:any) => (
                    <div key={index} className="w-full flex-shrink-0 h-auto items-center justify-center">
                        {slide}
                    </div>
                ))}
            </div>
            
            <div className="absolute inset-0 flex items-center justify-between">
                <button
                    onClick={prev}
                    className="p-1 rounded-full bg text-white bg-slate-500"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={next}
                    className="p-1 rounded-full text-white bg-slate-500"
                >
                <ChevronRight size={20} />
                </button>
            </div>

            <div className="absolute top-0 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {slides.map((_:any, i:any) => (
                    <div
                        className={`
                        transition-all w-3 h-3 bg-black rounded-full
                        ${curr === i ? "p-2" : "bg-opacity-50"}
                    `}
                    />
                    ))}
                </div>
            </div>
        </div>
    )
}