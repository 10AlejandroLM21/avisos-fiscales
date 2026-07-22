import { useMemo, useState } from "react";
import {
    FileWarning,
    CircleAlert,
    ClipboardList
} from "lucide-react";

const obligaciones = [
    {
        id: 1,
        obligacion: "CEDULAR",
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
        id: 2,
        obligacion: "DEMASÍAS CADUCAS",
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
    }
];

export default function ObligacionesPendientes() {

    const [obligacionSeleccionada, setObligacionSeleccionada] = useState(
        obligaciones[0].id
    );

    const obligacion = useMemo(
        () =>
            obligaciones.find(
                o => o.id === Number(obligacionSeleccionada)
            ),
        [obligacionSeleccionada]
    );

    return (

        <div className="bg-white rounded-2xl border shadow-sm">

            {/* Encabezado */}

            <div className="px-6 py-5 border-b">

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

                            Consulte los ejercicios y períodos pendientes de cumplimiento correspondientes a la obligación seleccionada.

                        </p>

                    </div>

                </div>

            </div>

            {/* Selector */}

            <div className="p-5 border-b">

                <label className="block text-sm font-medium text-slate-700 mb-2">

                    Obligación Fiscal

                </label>

                <select
                    value={obligacionSeleccionada}
                    onChange={(e) =>
                        setObligacionSeleccionada(e.target.value)
                    }
                    className="
                        w-full
                        rounded-lg
                        border
                        border-slate-300
                        px-3
                        py-2.5
                        text-sm
                        focus:ring-2
                        focus:ring-sky-500
                        focus:border-sky-500
                    "
                >

                    {obligaciones.map(item => (

                        <option
                            key={item.id}
                            value={item.id}
                        >

                            {item.obligacion}

                        </option>

                    ))}

                </select>

            </div>

            {/* Tabla */}
            <div className="p-5">

                <div className="overflow-hidden rounded-xl border border-slate-200">

                    <table className="w-full border-collapse">

                        <thead>

                            <tr className="bg-slate-100">

                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">

                                    Ejercicio

                                </th>

                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">

                                    Períodos pendientes

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {obligacion.ejercicios.map((ejercicio) => (

                                <tr
                                    key={ejercicio.anio}
                                    className="border-t border-slate-200 hover:bg-slate-50 transition"
                                >

                                    <td className="px-5 py-4 font-medium">

                                        {ejercicio.anio}

                                    </td>

                                    <td className="px-5 py-4">

                                        <div className="flex flex-wrap gap-2">

                                            {ejercicio.periodos.map(periodo => (

                                                <span
                                                    key={periodo}
                                                    className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    rounded-lg
                                                    bg-red-50
                                                    border
                                                    border-red-200
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