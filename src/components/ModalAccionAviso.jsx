import * as Icons from "lucide-react";

export default function ModalAccionAviso({

    abierto,
    onClose,
    titulo,
    descripcion,
    icono = "FileCheck2",
    color = "blue",
    textoBoton = "Aceptar",
    onAceptar

}) {

    if (!abierto) return null;

    const Icono = Icons[icono];

    const colores = {

        blue: {
            bg: "bg-blue-100",
            text: "text-blue-700",
            button: "bg-blue-600 hover:bg-blue-700"
        },

        red: {
            bg: "bg-red-100",
            text: "text-red-700",
            button: "bg-red-600 hover:bg-red-700"
        },

        emerald: {
            bg: "bg-emerald-100",
            text: "text-emerald-700",
            button: "bg-emerald-600 hover:bg-emerald-700"
        },

        amber: {
            bg: "bg-amber-100",
            text: "text-amber-700",
            button: "bg-amber-600 hover:bg-amber-700"
        }

    };

    const estilo = colores[color] ?? colores.blue;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">

                {/*==========================================
                    CONTENIDO
                ==========================================*/}

                <div className="px-8 pt-8 pb-6 text-center">

                    <div className={`mx-auto h-20 w-20 rounded-2xl ${estilo.bg} flex items-center justify-center`}>

                        <Icono
                            size={40}
                            className={estilo.text}
                        />

                    </div>

                    <h2 className="mt-6 text-2xl font-bold text-slate-800">

                        {titulo}

                    </h2>

                    <p className="mt-3 text-slate-500 leading-relaxed">

                        {descripcion}

                    </p>

                </div>

                {/*==========================================
                    BOTONES
                ==========================================*/}

                <div className="border-t bg-slate-50 px-6 py-5 flex justify-end gap-3">

                    <button

                        onClick={onClose}

                        className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-white transition"

                    >

                        Cancelar

                    </button>

                    <button

                        onClick={onAceptar}

                        className={`px-6 py-2.5 rounded-xl text-white font-semibold transition ${estilo.button}`}

                    >

                        {textoBoton}

                    </button>

                </div>

            </div>

        </div>

    );

}