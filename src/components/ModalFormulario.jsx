import { X } from "lucide-react";

export default function ModalFormulario({
    abierto,
    onClose,
    titulo,
    descripcion,
    icono,
    children,
    textoBoton = "Cerrar",
    onGuardar,
    mostrarBotonCancelar = true,
    mostrarBotonGuardar = true,
    size = "max-w-6xl",
}) {

    if (!abierto) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">

            <div className={`bg-white rounded-2xl shadow-2xl w-full ${size} max-h-[90vh] overflow-hidden flex flex-col`}>

                {/* HEADER */}

                <div className="border-b px-8 py-6 bg-gradient-to-r from-sky-700 to-sky-600">

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-4">

                            <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center">

                                {icono}

                            </div>

                            <div>

                                <h2 className="text-2xl font-semibold text-white">
                                    {titulo}
                                </h2>

                                {descripcion && (

                                    <p className="text-sky-100 mt-1">
                                        {descripcion}
                                    </p>

                                )}

                            </div>

                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="text-white hover:bg-white/20 rounded-lg p-2 transition"
                        >

                            <X size={24} />

                        </button>

                    </div>

                </div>

                {/* BODY */}

                <div className="flex-1 overflow-y-auto p-8">

                    {children}

                </div>

                {/* FOOTER */}

                <div className="border-t bg-slate-50 px-8 py-5 flex justify-end gap-3">

                    {mostrarBotonCancelar && (

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white transition"
                        >
                            {textoBoton}
                        </button>

                    )}

                    {/* {mostrarBotonGuardar && (

                        <button
                            type="button"
                            onClick={onGuardar}
                            className="px-5 py-2.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white transition"
                        >
                            {textoBoton}
                        </button>

                    )} */}

                </div>

            </div>

        </div>

    );

}