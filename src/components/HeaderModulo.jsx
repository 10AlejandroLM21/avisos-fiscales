export default function HeaderModulo({

    titulo,
    descripcion,
    icono: Icono,
    color = "red"

}) {

    const colores = {

        red: {
            fondo: "bg-red-100",
            texto: "text-red-700"
        },

        blue: {
            fondo: "bg-blue-100",
            texto: "text-blue-700"
        },

        emerald: {
            fondo: "bg-emerald-100",
            texto: "text-emerald-700"
        },

        amber: {
            fondo: "bg-amber-100",
            texto: "text-amber-700"
        },

        violet: {
            fondo: "bg-violet-100",
            texto: "text-violet-700"
        },

        sky: {
            fondo: "bg-sky-100",
            texto: "text-sky-700"
        }

    };

    const estilo = colores[color] || colores.red;

    return (

        <div className="bg-white rounded-xl border shadow-sm">

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