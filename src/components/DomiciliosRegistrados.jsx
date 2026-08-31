import React, { useMemo, useState } from "react";
import {
    Search,
    SlidersHorizontal,
    ChevronDown,
    MapPin,
    CalendarDays,
    Eye
} from "lucide-react";

export default function DomiciliosRegistrados() {
    const establecimientos = [
        {
            id: 1,
            nombreComercial: "ABARROTES LA ECONÓMICA",
            domicilio: "Av. Universidad 120, Col. Centro, Oaxaca de Juárez, Oaxaca, C.P. 68000",
            fechaAlta: "15/01/2026",
            estatus: "VIGENTE"
        },
        {
            id: 2,
            nombreComercial: "RESTAURANTE EL SABOR OAXAQUEÑO",
            domicilio: "Calz. Porfirio Díaz 315, Col. Reforma, Oaxaca de Juárez, Oaxaca, C.P. 68050",
            fechaAlta: "28/02/2026",
            estatus: "VIGENTE"
        },
        {
            id: 3,
            nombreComercial: "HOTEL CASA OAXACA",
            domicilio: "Calle García Vigil 407, Col. Centro, Oaxaca de Juárez, Oaxaca, C.P. 68000",
            fechaAlta: "10/03/2025",
            estatus: "NO VIGENTE"
        },
        {
            id: 4,
            nombreComercial: "SERVICIOS INTEGRALES DEL SUR",
            domicilio: "Calle Reforma 215, Col. Reforma, Oaxaca de Juárez, Oaxaca, C.P. 68050",
            fechaAlta: "05/06/2026",
            estatus: "VIGENTE"
        }
    ];
    const [filtros, setFiltros] = useState({
        nombreComercial: "",
        domicilio: "",
        fechaAlta: ""
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

            return nombre && domicilio && fecha;
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
        <div className="w-full">

            {/* ENCABEZADO */}


            {/* TABLA */}
            <div className="
    bg-white
    border border-slate-100
    rounded-2xl
    shadow-sm
    overflow-hidden
">

                {/* ENCABEZADOS */}
                <div className="
    hidden md:grid
    grid-cols-[1.3fr_2fr_1fr_1fr]
    gap-6
    px-6 py-4
    bg-slate-50
    border-b border-slate-100
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

                    <div>
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
        md:grid-cols-[1.3fr_2fr_1fr_1fr]
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
                            <div className="flex items-center">

                                <button
                                    type="button"
                                    onClick={() => verDomicilio(establecimiento)}
                                    className="
            inline-flex
            items-center
            gap-2
            px-3
            py-2
            rounded-lg
            text-sm
            font-medium
            text-sky-700
            bg-sky-50
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