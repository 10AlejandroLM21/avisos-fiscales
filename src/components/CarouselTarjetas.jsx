import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CarouselTarjetas({

    elementos = [],
    tarjetasPorPagina = 3,
    renderItem

}) {

    const [pagina, setPagina] = useState(0);

    const totalPaginas = Math.ceil(
        elementos.length / tarjetasPorPagina
    );

    const visibles = elementos.slice(
        pagina * tarjetasPorPagina,
        pagina * tarjetasPorPagina + tarjetasPorPagina
    );

    return (

        <div className="relative overflow-hidden">

            {/* Flecha izquierda */}

            <button

                type="button"

                disabled={pagina === 0}

                onClick={() => setPagina(p => p - 1)}

                className={`
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    z-50

                    h-12
                    w-12

                    rounded-full
                    border
                    bg-white/95
                    backdrop-blur-sm
                    shadow-xl

                    flex
                    items-center
                    justify-center

                    transition-all

                    ${pagina === 0
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-sky-50 hover:scale-105"
                    }
                `}
            >

                <ChevronLeft size={22} />

            </button>

            {/* Tarjetas */}

            <div className="grid grid-cols-3 gap-6 px-12 items-stretch">

                {visibles.map((item, index) => (

                    <div
                        key={item.id ?? index}
                        className="h-full flex"
                    >

                        {renderItem(item)}

                    </div>

                ))}

                {/* Completa la fila cuando falten tarjetas */}

                {Array.from({
                    length: tarjetasPorPagina - visibles.length
                }).map((_, index) => (

                    <div
                        key={`empty-${index}`}
                    />

                ))}

            </div>

            {/* Flecha derecha */}

            <button

                type="button"

                disabled={pagina >= totalPaginas - 1}

                onClick={() => setPagina(p => p + 1)}

                className={`
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    z-50

                    h-12
                    w-12

                    rounded-full
                    border
                    bg-white/95
                    backdrop-blur-sm
                    shadow-xl

                    flex
                    items-center
                    justify-center

                    transition-all

                    ${pagina >= totalPaginas - 1
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-sky-50 hover:scale-105"
                    }
                `}
            >

                <ChevronRight size={22} />

            </button>

            {/* Indicadores */}

            {totalPaginas > 1 && (

                <div className="flex justify-center items-center gap-3 mt-8">

                    {Array.from({ length: totalPaginas }).map((_, index) => (

                        <button

                            key={index}

                            type="button"

                            onClick={() => setPagina(index)}

                            className={`
                                transition-all duration-300 rounded-full

                                ${pagina === index

                                    ? "w-8 h-3 bg-sky-600"

                                    : "w-3 h-3 bg-slate-300 hover:bg-slate-400"

                                }
                            `}

                        />

                    ))}

                </div>

            )}

        </div>

    );

}