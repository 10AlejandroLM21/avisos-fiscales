import { Eye, FileText } from "lucide-react";

export default function DocumentoConsulta({

    etiqueta,
    nombreArchivo,
    descripcion = "Documento registrado",
    onVer,

}) {

    return (

        <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">

                {etiqueta}

            </label>

            <div className="border rounded-xl bg-slate-50 px-5 py-4 flex items-center justify-between">

                <div className="flex items-center gap-4">

                    <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center">

                        <FileText
                            size={24}
                            className="text-red-600"
                        />

                    </div>

                    <div>

                        <p className="font-medium text-slate-800">

                            {nombreArchivo || "Sin documento"}

                        </p>

                        <p className="text-sm text-slate-500">

                            {descripcion}

                        </p>

                    </div>

                </div>

                <button
                    type="button"
                    onClick={onVer}
                    disabled={!nombreArchivo}
                    className="
                        inline-flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-lg
                        border
                        bg-white
                        hover:bg-slate-100
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        transition
                    "
                >

                    <Eye size={18} />

                    Ver documento

                </button>

            </div>

        </div>

    );

}