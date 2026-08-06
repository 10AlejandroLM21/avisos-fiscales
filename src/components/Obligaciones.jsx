import { ClipboardList } from "lucide-react"

export default function Obligaciones({ obligaciones }) {

    return (

        <div className="shadow-xl rounded-lg overflow-hidden">
            <div className="border-b bg-slate-50 px-8 py-6">

                <h2 className="text-xl font-bold text-slate-800">
                    Obligaciones Fiscales
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                    Consulte el listado de obligaciones fiscales del contribuyente.                </p>

            </div>
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