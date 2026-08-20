import { useMemo, useState } from "react";
import CampoSelect from "./CampoSelect";
import CampoInput from "./CampoInput";
import CampoFecha from "./CampoFecha";
import {
    FileWarning,
    CircleAlert,
    ClipboardList
} from "lucide-react";


export default function ObligacionesPendientes() {
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
    const [obligacionSeleccionada, setObligacionSeleccionada] = useState(0);

    const obligacion = useMemo(
        () =>
            obligaciones.find(
                o => o.id === Number(obligacionSeleccionada)
            ),
        [obligacionSeleccionada]
    );

    return (

        <div className="bg-white rounded-2xl  shadow-sm">

            {/* Encabezado */}

            <div className="px-6 py-5 -b">

                <div className="flex items-center gap-4">

                    <div className="h-12 w-12 rounded-xl bg-red-100 flex items-center justify-center">

                        <ClipboardList
                            size={24}
                            className="text-red-700"
                        />

                    </div>

                    <div>

                        <h2 className="text-xl font-semibold text-slate-800">
                            Obligaciones Pendientes
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            Consulte los ejercicios y períodos pendientes de
                            cumplimiento correspondientes a la obligación seleccionada.
                        </p>

                    </div>

                </div>

            </div>

            {/* Selector */}

            <div className="p-5 -b">
                <CampoSelect etiqueta="Obligación Fiscal"
                    id="obligacionFiscal"
                    name="obligacionFiscal"
                    value={obligacionSeleccionada}
                    onChange={(e) => setObligacionSeleccionada(e.target.value)}
                    opciones={obligaciones.map(ob => ({
                        value: ob.id,
                        label: ob.nombre
                    }))} />
            </div>

            {/* Tabla */}
            <div className="p-5">

                <div className="overflow-hidden rounded-xl  -slate-200">

                    <table className="w-full -collapse">

                        <thead>

                            <tr className="bg-slate-100">

                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">

                                    Ejercicio

                                </th>

                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">

                                    Períodos NO CUMPLIDOS

                                </th>

                            </tr>

                        </thead>
                        <tbody>
                            {obligacion?.ejercicios?.map((ejercicio) => (
                                <tr
                                    key={ejercicio.anio}
                                    className="border-t border-slate-200 hover:bg-slate-50 transition"
                                >
                                    <td className="px-5 py-4 font-medium">
                                        {ejercicio.anio}
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex flex-wrap gap-2">
                                            {ejercicio.periodos.map((periodo) => (
                                                <span
                                                    key={periodo}
                                                    className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-lg
                                bg-red-50
                                border border-red-200
                                px-3
                                py-1.5
                                text-sm
                                text-red-700
                                font-medium
                            "
                                                >
                                                    <CircleAlert size={14} />
                                                    {periodo}° Bimestre
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>
            </div>
        </div>

    );

}