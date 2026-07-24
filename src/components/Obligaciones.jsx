import { ClipboardList } from "lucide-react"

export default function Obligaciones({ obligaciones }) {

    return (

        <div className="border rounded-lg overflow-hidden">
            <div className="border-b bg-gray-50 px-8 py-6">

                <h2 className="text-xl font-bold text-slate-800">
                    Obligaciones Fiscales
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                    Consulte el listado de obligaciones fiscales del contribuyente.                </p>

            </div>
            <table className="w-full border-collapse">

                <thead>

                    <tr className="bg-sky-100">

                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-600">
                            Obligación
                        </th>

                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-600">
                            Actividad Económica
                        </th>

                        <th className="px-5 py-3 text-center text-xs font-semibold uppercase text-slate-600 w-36">
                            Porcentaje
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {obligaciones.map((obligacion) => (

                        obligacion.actividades.map((actividad, index) => (

                            <tr
                                key={`${obligacion.id}-${actividad.id}`}
                                className="border-t hover:bg-slate-50"
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
                                            bg-slate-50
                                            border-r
                                            border-slate-200
                                            w-72
                                        "
                                    >

                                        {obligacion.nombre}

                                    </td>

                                )}

                                <td className="px-5 py-4 border-r border-slate-200">

                                    {actividad.nombre}

                                </td>

                                <td className="px-5 py-4 text-center">

                                    <span className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">

                                        {actividad.porcentaje}

                                    </span>

                                </td>

                            </tr>

                        ))

                    ))}

                </tbody>

            </table>

        </div>

    );

}