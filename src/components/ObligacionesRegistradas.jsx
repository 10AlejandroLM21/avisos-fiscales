import { ClipboardList } from "lucide-react";

const obligaciones = [
    {
        id: 1,
        obligacion: "Cedular",
        actividad: "Alquiler de viviendas amuebladas",
        porcentaje: 5
    },
    {
        id: 2,
        obligacion: "Demasías Caducas",
        actividad: "Casas de préstamo y empeño",
        porcentaje: 50
    },
    {
        id: 3,
        obligacion: "Nómina",
        actividad:
            "Administración y supervisión de construcción de inmuebles comerciales, institucionales y de servicios",
        porcentaje: 45
    }
];

export default function ObligacionesSuspender() {

    return (

        <div className="bg-white rounded-2xl border shadow-sm mb-4">

            {/* Encabezado */}

            <div className="px-6 py-5 border-b">

                <div className="flex items-center gap-4">

                    <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center">

                        <ClipboardList
                            size={24}
                            className="text-amber-700"
                        />

                    </div>

                    <div>

                        <h2 className="text-xl font-semibold text-slate-800">

                            Obligaciones a Suspender

                        </h2>

                        <p className="text-sm text-slate-500 mt-1">

                            Relación de obligaciones fiscales, actividades económicas y porcentaje de participación asociados al contribuyente.

                        </p>

                    </div>

                </div>

            </div>

            {/* Tabla */}

            <div className="p-6">

                <div className="overflow-hidden rounded-xl border border-slate-200">

                    <table className="w-full">

                        <thead>

                            <tr className="bg-slate-100">

                                <th className="px-5 py-3 text-left text-xs uppercase font-semibold text-slate-600">

                                    Obligación

                                </th>

                                <th className="px-5 py-3 text-left text-xs uppercase font-semibold text-slate-600">

                                    Actividad Económica

                                </th>

                                <th className="px-5 py-3 text-center text-xs uppercase font-semibold text-slate-600 w-36">

                                    Porcentaje

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {obligaciones.map((item) => (

                                <tr
                                    key={item.id}
                                    className="border-t hover:bg-slate-50"
                                >

                                    <td className="px-5 py-4 font-medium text-slate-800">

                                        {item.obligacion}

                                    </td>

                                    <td className="px-5 py-4 text-slate-600">

                                        {item.actividad}

                                    </td>

                                    <td className="px-5 py-4 text-center">

                                        <span className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">

                                            {item.porcentaje}%

                                        </span>

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