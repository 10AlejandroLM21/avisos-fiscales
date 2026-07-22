import { ClipboardList } from "lucide-react";

const obligaciones = [
    {
        id: 1,
        obligacion: "Cedular",
        actividades: [
            "Alquiler de viviendas amuebladas",
            "Servicios de hospedaje temporal",
            "Arrendamiento de locales comerciales"
        ],
        porcentaje: 5
    },
    {
        id: 2,
        obligacion: "Demasías Caducas",
        actividades: [
            "Casas de préstamo y empeño"
        ],
        porcentaje: 50
    },
    {
        id: 3,
        obligacion: "Nómina",
        actividades: [
            "Administración y supervisión de construcción de inmuebles comerciales",
            "Servicios de consultoría",
            "Servicios administrativos"
        ],
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

                                    <td className="px-5 py-4">

                                        <div className="flex flex-wrap gap-2">

                                            {item.actividades.map((actividad, index) => (

                                                <span
                                                    key={index}
                                                    className="
inline-flex
items-center
rounded-full
bg-blue-100
text-sky-700
border
border-sky-200
px-3
py-1
text-xs
font-medium
"
                                                >

                                                    {actividad}

                                                </span>

                                            ))}

                                        </div>

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