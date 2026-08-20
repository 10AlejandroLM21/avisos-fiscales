import { ClipboardList } from "lucide-react";
import { useState } from "react";


export default function ObligacionesSuspender({
    title,
    description
}) {
    const [obligaciones, setObligaciones] = useState([
        {
            id: 1,
            clave: "nominas",
            nombre: "IMPUESTO SOBRE NÓMINAS",
            estatus: "Activo",
            requiereTrabajadores: false,
            actividades: [
                {
                    id: 1,
                    nombre: "Comercio",
                    porcentaje: 10,
                    trabajadoresTemporales: 5,
                    trabajadoresPermanentes: 15,
                    fechaOperaciones: "24/10/2026"
                },
                {
                    id: 2,
                    nombre: "Servicios",
                    porcentaje: 20,
                    trabajadoresTemporales: 3,
                    trabajadoresPermanentes: 10,
                    fechaOperaciones: "24/10/2026"
                },

            ],
            actividadesAgregadas: [],
            ejercicios: [
                {
                    anio: 2025,
                    periodos: [3, 4, 5, 6]
                },
                {
                    anio: 2026,
                    periodos: [1]
                }
            ]
        },
        {
            id: 2,
            clave: "hospedaje",
            nombre: "IMPUESTO SOBRE HOSPEDAJE",
            requiereTrabajadores: false,
            estatus: "Activo",
            actividades: [
                {
                    id: 3,
                    nombre: "Hotel",
                    porcentaje: 20,
                    fechaOperaciones: "24/10/2026"

                }
            ],
            actividadesAgregadas: [],
            ejercicios: [
                {
                    anio: 2025,
                    periodos: [1, 2, 3, 4, 5, 6]
                },
                {
                    anio: 2024,
                    periodos: [1, 2, 3, 4, 5, 6]
                },
                {
                    anio: 2023,
                    periodos: [1, 2, 3, 4, 5, 6]
                }
            ]
        },
        {
            id: 3,
            clave: "erogaciones",
            nombre: "IMPUESTO SOBRE EROGACIONES POR REMUNERACIONES AL TRABAJO PERSONAL",
            requiereTrabajadores: true,
            estatus: "Activo",
            actividades: [
                {
                    id: 1,
                    nombre: "Comercio",
                    porcentaje: 30,
                    trabajadoresTemporales: 5,
                    trabajadoresPermanentes: 15,
                    fechaOperaciones: "24/10/2026"
                },
                {
                    id: 2,
                    nombre: "Servicios",
                    porcentaje: 20,
                    trabajadoresTemporales: 3,
                    trabajadoresPermanentes: 10,
                    fechaOperaciones: "24/10/2026"
                }
            ],
            actividadesAgregadas: [],
            ejercicios: [
                {
                    anio: 2025,
                    periodos: [1, 2, 3, 4, 5, 6]
                },
                {
                    anio: 2024,
                    periodos: [1, 2, 3, 4, 5, 6]
                },
                {
                    anio: 2023,
                    periodos: [1, 2, 3, 4, 5, 6]
                }
            ]
        }
    ]);
    return (

        <div className="bg-white rounded-2xl shadow-sm mb-4">

            {/* Encabezado */}

            <div className="px-6 py-5">

                <div className="flex items-center gap-4">

                    <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center">

                        <ClipboardList
                            size={24}
                            className="text-amber-700"
                        />

                    </div>

                    <div>

                        <h2 className="text-xl font-semibold text-slate-800">

                            {title}

                        </h2>

                        <p className="text-sm text-slate-500 mt-1">

                            {description}
                        </p>

                    </div>

                </div>

            </div>

            {/* Tabla */}

            <div className="overflow-hidden rounded-xl p-4 bg-white">
                <div className="overflow-hidden rounded-xl ">
                    <table className="w-full border-collapse">

                        <thead>
                            <tr className="bg-slate-50">

                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-600">
                                    Obligación
                                </th>

                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-600">
                                    Actividad Económica
                                </th>

                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase text-slate-600 w-36">
                                    Porcentaje
                                </th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase text-slate-600 w-36">Trabajadores Temporales</th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase text-slate-600 w-36">Trabajadores Permanentes</th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase text-slate-600 w-36">
                                    Fecha de Inicio de Operaciones
                                </th>
                                <th className="px-5 py-3 text-center text-xs font-semibold uppercase text-slate-600 w-36">Estatus</th>


                            </tr>

                        </thead>

                        <tbody>

                            {obligaciones.map((obligacion) => (

                                obligacion.actividades.map((actividad, index) => (

                                    <tr key={`${obligacion.id}-${actividad.id}`} className="border-t border-slate-100 hover:bg-slate-200"
                                    >
                                        {index === 0 && (

                                            <td
                                                rowSpan={obligacion.actividades.length}
                                                className="
                                            px-5
                                            py-4
                                            align-top
                                            font-semibold
                                            text-slate-800
                                            bg-slate-200
                                            w-72
                                        "
                                            >

                                                {obligacion.nombre}

                                            </td>

                                        )}
                                        <td className="px-5 py-4 bg-white">

                                            {actividad.nombre}

                                        </td>

                                        <td className="px-5 py-4 text-center bg-white">

                                            <span className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">

                                                {actividad.porcentaje}

                                            </span>

                                        </td>



                                        {obligacion.clave === "erogaciones" ? (
                                            <>
                                                <td className="px-5 py-4 bg-white justify-center">
                                                    <div className="flex items-center justify-center h-full font-semibold text-slate-800">
                                                        <span className="inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700">
                                                            {actividad.trabajadoresTemporales ? actividad.trabajadoresTemporales : 0}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4 bg-white">
                                                    <div className="flex items-center justify-center h-full font-semibold text-slate-800">
                                                        <span className="inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700">
                                                            {actividad.TrabajadoresPermanentes ? actividad.TrabajadoresPermanentes : 0}
                                                        </span>
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-5 py-4 bg-white">
                                                    <div className="flex items-center justify-center h-full font-semibold text-slate-800">

                                                        <span className="inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700">
                                                            N/A
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4 bg-white">
                                                    <div className="flex items-center justify-center h-full font-semibold text-slate-800">
                                                        <span className="inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700">
                                                            N/A
                                                        </span>
                                                    </div>
                                                </td>
                                            </>
                                        )}


                                        <td className="px-5 py-4 bg-white">

                                            {actividad.fechaOperaciones}

                                        </td>

                                        {index === 0 && (
                                            <td
                                                rowSpan={obligacion.actividades.length}
                                                className="px-5 py-4 bg-sky-100/30 w-72 align-middle"
                                            >
                                                <div className="flex items-center justify-center h-full font-semibold text-slate-800">
                                                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                                                        {obligacion.estatus}

                                                    </span>
                                                </div>
                                            </td>
                                        )}


                                    </tr>

                                ))

                            ))}

                        </tbody>

                    </table>
                </div>
            </div>

        </div>

    );

}