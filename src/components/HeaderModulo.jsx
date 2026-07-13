import * as Icons from "lucide-react";

export default function HeaderModulo({

    titulo,
    descripcion,
    icono = "Circle",
    color
}) {

    const Icono = Icons[icono];

    const colores = {

        sky: {
            fondo: "bg-sky-100",
            texto: "text-sky-700",
            border: "border-sky-200"
        },

        blue: {
            fondo: "bg-blue-100",
            texto: "text-blue-700",
            border: "border-blue-200"

        },

        emerald: {
            fondo: "bg-emerald-100",
            texto: "text-emerald-700",
            border: "border-emerald-200"

        },

        green: {
            fondo: "bg-green-100",
            texto: "text-green-700",
            border: "border-green-200"

        },

        red: {
            fondo: "bg-red-100",
            texto: "text-red-700",
            border: "border-red-200"

        },

        amber: {
            fondo: "bg-amber-100",
            texto: "text-amber-700",
            border: "border-amber-200"

        },

        orange: {
            fondo: "bg-orange-100",
            texto: "text-orange-700",
            border: "border-orange-200"

        },

        yellow: {
            fondo: "bg-yellow-100",
            texto: "text-yellow-700",
            border: "border-yellow-200"

        },

        violet: {
            fondo: "bg-violet-100",
            texto: "text-violet-700",
            border: "border-violet-200"

        },

        purple: {
            fondo: "bg-purple-100",
            texto: "text-purple-700",
            border: "border-purple-200"

        },

        pink: {
            fondo: "bg-pink-100",
            texto: "text-pink-700",
            border: "border-pink-200"

        },

        indigo: {
            fondo: "bg-indigo-100",
            texto: "text-indigo-700",
            border: "border-indigo-200"

        },

        teal: {
            fondo: "bg-teal-100",
            texto: "text-teal-700",
            border: "border-teal-200"

        },

        cyan: {
            fondo: "bg-cyan-100",
            texto: "text-cyan-700",
            border: "border-cyan-200"
        },

        slate: {
            fondo: "bg-slate-100",
            texto: "text-slate-700",
            border: "border-slate-200"
        }

    };

    const estilo = colores[color] || colores.sky;

    return (

        <div className= {`bg-white rounded-xl border ${estilo.border} shadow-sm`}>

            <div className="px-6 py-6 flex items-center gap-4">

                <div
                    className={`h-14 w-14 rounded-xl ${estilo.fondo} flex items-center justify-center`}
                >

                    {Icono && (

                        <Icono
                            size={30}
                            className={estilo.texto}
                        />

                    )}

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-slate-800">

                        {titulo}

                    </h2>

                    <p className="text-slate-500 mt-1">

                        {descripcion}

                    </p>

                </div>

            </div>

        </div>

    );

}