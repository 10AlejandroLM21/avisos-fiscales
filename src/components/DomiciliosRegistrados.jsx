import React, { useMemo, useState } from "react";
import {
    Search,
    SlidersHorizontal,
    ChevronDown,
    MapPin,
    CalendarDays,
    Eye,
    FileText,
    X
} from "lucide-react";

export default function DomiciliosRegistrados({ className }) {
    const establecimientos = [
        {
            id: 1,
            nombreComercial: "ABARROTES LA ECONÓMICA",
            domicilio: "Av. Universidad 120, Col. Centro",
            distrito: "Centro",
            fechaAlta: "15/01/2026",
            obligaciones: [
                "Impuesto al Valor Agregado",
                "Impuesto Sobre la Renta",
            ]
        },
        {
            id: 2,
            nombreComercial: "RESTAURANTE EL SABOR OAXAQUEÑO",
            domicilio: "Calz. Porfirio Díaz 315, Col. Reforma",
            distrito: "Centro",
            fechaAlta: "28/02/2026",
            obligaciones: [
                "Impuesto al Valor Agregado",
                "Impuesto Sobre la Renta",
                "Impuesto Especial sobre Producción y Servicios",
            ]
        }
    ];
    const [establecimientoObligaciones, setEstablecimientoObligaciones] = useState(null);
    const [filtros, setFiltros] = useState({
        nombreComercial: "",
        domicilio: "",
        fechaAlta: "",
        distrito: ""
    });

    const [orden, setOrden] = useState({
        campo: null,
        direccion: "asc"
    });

    const cambiarFiltro = (campo, valor) => {
        setFiltros((prev) => ({
            ...prev,
            [campo]: valor
        }));
    };

    const ordenarPor = (campo) => {
        setOrden((prev) => ({
            campo,
            direccion:
                prev.campo === campo && prev.direccion === "asc"
                    ? "desc"
                    : "asc"
        }));
    };

    const establecimientosFiltrados = establecimientos
        .filter((establecimiento) => {

            const nombre = establecimiento.nombreComercial
                .toLowerCase()
                .includes(filtros.nombreComercial.toLowerCase());

            const domicilio = establecimiento.domicilio
                .toLowerCase()
                .includes(filtros.domicilio.toLowerCase());

            const fecha = establecimiento.fechaAlta
                .toLowerCase()
                .includes(filtros.fechaAlta.toLowerCase());

            const distrito = establecimiento.distrito
                .toLowerCase()
                .includes(filtros.distrito.toLowerCase());

            return nombre && domicilio && fecha && distrito;
        })
        .sort((a, b) => {

            if (!orden.campo) return 0;

            let valorA = a[orden.campo];
            let valorB = b[orden.campo];

            if (orden.campo === "fechaAlta") {
                const [diaA, mesA, anioA] = valorA.split("/");
                const [diaB, mesB, anioB] = valorB.split("/");

                valorA = new Date(anioA, mesA - 1, diaA);
                valorB = new Date(anioB, mesB - 1, diaB);
            } else {
                valorA = valorA.toLowerCase();
                valorB = valorB.toLowerCase();
            }

            if (valorA < valorB) {
                return orden.direccion === "asc" ? -1 : 1;
            }

            if (valorA > valorB) {
                return orden.direccion === "asc" ? 1 : -1;
            }

            return 0;
        });
    const [busqueda, setBusqueda] = useState("");
    const [filtroEstatus, setFiltroEstatus] = useState("TODOS");
    const [filtroFecha, setFiltroFecha] = useState("TODOS");



    // const establecimientosFiltrados = useMemo(() => {

    //     return establecimientos.filter((establecimiento) => {

    //         const texto = busqueda.toLowerCase();

    //         const coincideBusqueda =
    //             establecimiento.nombreComercial
    //                 .toLowerCase()
    //                 .includes(texto) ||
    //             establecimiento.domicilio
    //                 .toLowerCase()
    //                 .includes(texto);

    //         const coincideEstatus =
    //             filtroEstatus === "TODOS" ||
    //             establecimiento.estatus === filtroEstatus;

    //         return coincideBusqueda && coincideEstatus;
    //     });

    // }, [busqueda, filtroEstatus]);

    return (
        <div className={`w-full mt-4 ${className}`}>

            {/* TABLA */}
            <div className="
                            bg-white
                            border border-slate-100
                            rounded-2xl
                            shadow-sm
                          
                        ">

                {/* ENCABEZADOS */}
                <div className="
    grid
    md:grid-cols-[1.3fr_2fr_1fr_1.5fr_1fr_1fr]
    gap-4 md:gap-6
    px-6 py-5
    border-b border-slate-100
    last:border-b-0
    hover:bg-slate-50
    transition-colors
">

                    {/* NOMBRE COMERCIAL */}
                    <div>
                        <button
                            type="button"
                            onClick={() => ordenarPor("nombreComercial")}
                            className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-semibold
                    text-slate-500
                    uppercase
                    hover:text-sky-700
                "
                        >
                            Nombre comercial

                            {orden.campo === "nombreComercial" && (
                                orden.direccion === "asc"
                                    ? <ChevronUp size={14} />
                                    : <ChevronDown size={14} />
                            )}
                        </button>

                        <div className="relative mt-2">
                            <Search
                                size={15}
                                className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                    "
                            />

                            <input
                                type="text"
                                value={filtros.nombreComercial}
                                onChange={(e) =>
                                    cambiarFiltro(
                                        "nombreComercial",
                                        e.target.value
                                    )
                                }
                                placeholder="Buscar..."
                                className="
                        w-full
                        h-9
                        pl-9
                        pr-3
                        text-xs
                        bg-white
                        border
                        border-slate-200
                        rounded-lg
                        outline-none
                        focus:ring-2
                        focus:ring-sky-500
                    "
                            />
                        </div>
                    </div>

                    {/* DOMICILIO */}
                    <div>
                        <button
                            type="button"
                            onClick={() => ordenarPor("domicilio")}
                            className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-semibold
                    text-slate-500
                    uppercase
                    hover:text-sky-700
                "
                        >
                            Domicilio

                            {orden.campo === "domicilio" && (
                                orden.direccion === "asc"
                                    ? <ChevronUp size={14} />
                                    : <ChevronDown size={14} />
                            )}
                        </button>

                        <div className="relative mt-2">
                            <Search
                                size={15}
                                className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                    "
                            />

                            <input
                                type="text"
                                value={filtros.domicilio}
                                onChange={(e) =>
                                    cambiarFiltro(
                                        "domicilio",
                                        e.target.value
                                    )
                                }
                                placeholder="Buscar..."
                                className="
                        w-full
                        h-9
                        pl-9
                        pr-3
                        text-xs
                        bg-white
                        border
                        border-slate-200
                        rounded-lg
                        outline-none
                        focus:ring-2
                        focus:ring-sky-500
                    "
                            />
                        </div>
                    </div>

                    {/* DISTRITO */}
                    <div>
                        <button
                            type="button"
                            onClick={() => ordenarPor("distrito")}
                            className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-semibold
                    text-slate-500
                    uppercase
                    hover:text-sky-700
                "
                        >
                            Distrito

                            {orden.campo === "distrito" && (
                                orden.direccion === "asc"
                                    ? <ChevronUp size={14} />
                                    : <ChevronDown size={14} />
                            )}
                        </button>

                        <div className="relative mt-2">
                            <Search
                                size={15}
                                className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                    "
                            />

                            <input
                                type="text"
                                value={filtros.distrito}
                                onChange={(e) =>
                                    cambiarFiltro(
                                        "distrito",
                                        e.target.value
                                    )
                                }
                                placeholder="Buscar..."
                                className="
                        w-full
                        h-9
                        pl-9
                        pr-3
                        text-xs
                        bg-white
                        border
                        border-slate-200
                        rounded-lg
                        outline-none
                        focus:ring-2
                        focus:ring-sky-500
                    "
                            />
                        </div>
                    </div>

                    {/* OBLIGACIONES */}
                    <div className="">
                        <button
                            type="button"
                            onClick={() => ordenarPor("distrito")}
                            className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-semibold
                    text-slate-500
                    uppercase
                    hover:text-sky-700
                "
                        >
                            Obligaciones

                            {orden.campo === "distrito" && (
                                orden.direccion === "asc"
                                    ? <ChevronUp size={14} />
                                    : <ChevronDown size={14} />
                            )}
                        </button>

                        <div className="relative mt-2">
                            <Search
                                size={15}
                                className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                    "
                            />

                            <input
                                type="text"
                                value={filtros.distrito}
                                onChange={(e) =>
                                    cambiarFiltro(
                                        "distrito",
                                        e.target.value
                                    )
                                }
                                placeholder="Buscar..."
                                className="
                        w-full
                        h-9
                        pl-9
                        pr-3
                        text-xs
                        bg-white
                        border
                        border-slate-200
                        rounded-lg
                        outline-none
                        focus:ring-2
                        focus:ring-sky-500
                    "
                            />
                        </div>
                    </div>

                    {/* FECHA DE ALTA */}
                    <div>
                        <button
                            type="button"
                            onClick={() => ordenarPor("fechaAlta")}
                            className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-semibold
                    text-slate-500
                    uppercase
                    hover:text-sky-700
                "
                        >
                            Fecha de alta

                            {orden.campo === "fechaAlta" && (
                                orden.direccion === "asc"
                                    ? <ChevronUp size={14} />
                                    : <ChevronDown size={14} />
                            )}
                        </button>

                        <div className="relative mt-2">
                            <Search
                                size={15}
                                className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                    "
                            />

                            <input
                                type="text"
                                value={filtros.fechaAlta}
                                onChange={(e) =>
                                    cambiarFiltro(
                                        "fechaAlta",
                                        e.target.value
                                    )
                                }
                                placeholder="Buscar..."
                                className="
                        w-full
                        h-9
                        pl-9
                        pr-3
                        text-xs
                        bg-white
                        border
                        border-slate-200
                        rounded-lg
                        outline-none
                        focus:ring-2
                        focus:ring-sky-500
                    "
                            />
                        </div>
                    </div>

                    {/* VER DOMICILIO*/}
                    <div className="flex items-center justify-center">
                        <span className="
                                text-xs
                                font-semibold
                                text-slate-500
                                uppercase
                                
                            ">
                            Ver domicilio
                        </span>
                    </div>

                </div>

                {/* REGISTROS */}
                {establecimientosFiltrados.length > 0 ? (

                    establecimientosFiltrados.map((establecimiento) => (
                        <div
                            key={establecimiento.id}
                            className="
    grid
    md:grid-cols-[1.3fr_2fr_1fr_1.5fr_1fr_1fr]
    gap-4 md:gap-6
    px-6 py-5
    border-b border-slate-100
    last:border-b-0
    hover:bg-slate-50
    transition-colors
"
                        >

                            {/* NOMBRE */}
                            <div className="flex flex-col justify-center">
                                <span className="
                        font-semibold
                        text-slate-800
                    ">
                                    {establecimiento.nombreComercial}
                                </span>
                            </div>

                            {/* DOMICILIO */}
                            <div className="flex items-start gap-2">

                                <MapPin
                                    size={17}
                                    className="
                            text-slate-400
                            mt-0.5
                            shrink-0
                        "
                                />

                                <span className="
                        text-sm
                        text-slate-600
                        leading-6
                    ">
                                    {establecimiento.domicilio}
                                </span>

                            </div>

                            {/* DISTRITO */}
                            <div className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-slate-600
                ">

                                <CalendarDays
                                    size={17}
                                    className="text-slate-400"
                                />

                                <span>
                                    {establecimiento.distrito}
                                </span>

                            </div>

                            {/* OBLIGACIONES */}
                            <div className="relative flex items-center group">

                                <button
                                    type="button"
                                    className="
            inline-flex
            items-center
            gap-2
            px-3
            py-2
            rounded-lg
            bg-sky-50
            border border-sky-100
            text-sky-700
            text-xs
            font-medium
            whitespace-nowrap
            hover:bg-sky-100
            transition-colors
        "
                                >
                                    <FileText size={15} />

                                    {establecimiento.obligaciones.length}{" "}
                                    {establecimiento.obligaciones.length === 1
                                        ? "obligación"
                                        : "obligaciones"}
                                </button>

                                {/* TOOLTIP */}
                                <div
                                    className="
            absolute
            z-50
            top-full
            left-0
            mt-2
            w-80
            p-4
            bg-white
            border
            border-slate-200
            rounded-xl
            shadow-xl

            opacity-0
            invisible
            translate-y-1

            group-hover:opacity-100
            group-hover:visible
            group-hover:translate-y-0

            transition-all
            duration-200
            ease-out
        "
                                >
                                    <p className="text-sm font-semibold text-slate-700 mb-3">
                                        Obligaciones fiscales
                                    </p>

                                    <div className="flex flex-col gap-2">
                                        {establecimiento.obligaciones.map(
                                            (obligacion, index) => (
                                                <span
                                                    key={index}
                                                    className="
                            inline-flex
                            items-center
                            px-3
                            py-2
                            rounded-lg
                            bg-sky-50
                            border border-sky-100
                            text-sky-700
                            text-xs
                            font-medium
                        "
                                                >
                                                    {obligacion}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>

                            </div>

                            {/* FECHA */}
                            <div className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-slate-600
                ">

                                <CalendarDays
                                    size={17}
                                    className="text-slate-400"
                                />

                                <span>
                                    {establecimiento.fechaAlta}
                                </span>

                            </div>

                            {/* VER DOMICILIO */}
                            <div className="flex items-center justify-center">

                                <button
                                    type="button"
                                    onClick={() => verDomicilio(establecimiento)}
                                    className="
            inline-flex
            items-center
            gap-2
            px-3
            py-2
            rounded-full
            text-sm
            font-medium
            text-sky-700
            bg-sky-100
            hover:bg-sky-100
            transition-colors
        "
                                >
                                    <Eye size={17} />
                                    Ver domicilio
                                </button>

                            </div>

                        </div>

                    ))

                ) : (

                    <div className="
            px-6
            py-12
            text-center
            text-sm
            text-slate-500
        ">
                        No se encontraron establecimientos.
                    </div>

                )}

            </div>

            {/* RESULTADOS */}
            <div className="
                flex
                items-center
                justify-between
                mt-4
                text-sm
                text-slate-500
            ">
                <span>
                    {establecimientosFiltrados.length} establecimientos encontrados
                </span>

                <div className="flex items-center gap-2">
                    <SlidersHorizontal size={16} />
                    <span>
                        Filtros aplicados
                    </span>
                </div>
            </div>

        </div>

    );
}