import { useState } from "react";
import {
    FileText,
    UploadCloud,
    Eye,
    Trash2
} from "lucide-react";

export default function DocumentacionRequerida() {

    const [documentos, setDocumentos] = useState([
        {
            id: 1,
            nombre: "Identificación Oficial",
            descripcion: "INE, Pasaporte o Cédula Profesional vigente.",
            obligatorio: true,
            archivo: null
        },
        {
            id: 2,
            nombre: "Constancia de Situación Fiscal",
            descripcion: "Emitida por el SAT.",
            obligatorio: true,
            archivo: null
        },
        {
            id: 3,
            nombre: "Poder Notarial",
            descripcion: "Documento que acredita la representación legal.",
            obligatorio: true,
            archivo: null
        },
        {
            id: 4,
            nombre: "Comprobante de Domicilio",
            descripcion: "No mayor a tres meses.",
            obligatorio: false,
            archivo: null
        }
    ]);


    const eliminarArchivo = (id) => {

        setDocumentos(prev =>
            prev.map(doc =>
                doc.id === id
                    ? { ...doc, archivo: null }
                    : doc
            )
        );

    };

    const seleccionarArchivo = (id, archivo) => {

        if (!archivo) return;

        setDocumentos(prev =>
            prev.map(doc =>
                doc.id === id
                    ? { ...doc, archivo }
                    : doc
            )
        );

    };

    return (
        <div className="bg-white rounded-2xl border shadow-sm">

            <div className="px-6 py-5 border-b">

                <h2 className="text-xl font-semibold text-slate-800">

                    Documentación Requerida

                </h2>

                <p className="text-sm text-slate-500 mt-1">

                    Adjunte la documentación requerida para integrar el expediente del trámite.

                </p>

            </div>
            <div className="p-4 flex flex-col gap-4">

                {documentos.map((doc) => (

                    <div
                        key={doc.id}
                        className="bg-white rounded-xl border shadow-sm overflow-hidden"
                    >

                        {/* HEADER */}

                        <div className="px-5 py-3 flex justify-between items-center">

                            <div className="flex items-center gap-3">

                                <div className="h-10 w-10 rounded-lg bg-sky-100 flex items-center justify-center">

                                    <FileText
                                        size={18}
                                        className="text-sky-700"
                                    />

                                </div>

                                <div>

                                    <h3 className="font-semibold text-slate-800 text-sm">

                                        {doc.nombre}

                                    </h3>

                                    <p className="text-xs text-slate-500">

                                        {doc.descripcion}

                                    </p>

                                </div>

                            </div>

                            <span
                                className={`
                    px-2.5
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    ${doc.obligatorio
                                        ? "bg-red-100 text-red-700"
                                        : "bg-slate-100 text-slate-700"
                                    }
                `}
                            >
                                {doc.obligatorio ? "Obligatorio" : "Opcional"}
                            </span>

                        </div>

                        {/* CUERPO */}

                        <div className="px-5 pb-4">

                            {
                                !doc.archivo ? (

                                    <label className="block">

                                        <input
                                            hidden
                                            type="file"
                                            accept=".pdf,.png,.jpg,.jpeg"
                                            onChange={(e) =>
                                                seleccionarArchivo(doc.id, e.target.files?.[0])
                                            }
                                        />

                                        <div
                                            className="
                        h-16
                        rounded-lg
                        border-2
                        border-dashed
                        border-sky-300
                        hover:border-sky-500
                        hover:bg-sky-50
                        transition
                        cursor-pointer
                        flex
                        items-center
                        px-4
                        gap-3
                    "
                                        >

                                            <UploadCloud
                                                size={22}
                                                className="text-sky-600 flex-shrink-0"
                                            />

                                            <div>

                                                <p className="text-sm font-medium text-slate-700">

                                                    Arrastre un archivo o haga clic para seleccionarlo

                                                </p>

                                                <p className="text-xs text-slate-500">

                                                    PDF, PNG o JPG

                                                </p>

                                            </div>

                                        </div>

                                    </label>

                                ) : (

                                    <div className="rounded-lg border bg-emerald-50 border-emerald-200 p-3">

                                        <div className="flex items-center justify-between">

                                            <div>

                                                <p className="text-sm font-medium text-emerald-700">

                                                    Documento cargado correctamente

                                                </p>

                                                <p className="text-xs text-slate-600">

                                                    {doc.archivo.name}

                                                </p>

                                            </div>

                                            <div className="flex gap-2">

                                                <button
                                                    className="
                                inline-flex
                                items-center
                                gap-2
                                px-3
                                py-2
                                rounded-lg
                                border
                                text-sm
                                hover:bg-white
                            "
                                                >

                                                    <Eye size={16} />

                                                    Vista previa

                                                </button>

                                                <button
                                                    onClick={() => eliminarArchivo(doc.id)}
                                                    className="
                                inline-flex
                                items-center
                                gap-2
                                px-3
                                py-2
                                rounded-lg
                                bg-red-50
                                text-red-700
                                hover:bg-red-100
                                text-sm
                            "
                                                >

                                                    <Trash2 size={16} />

                                                    Eliminar

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                )
                            }

                        </div>

                    </div>

                ))}

            </div>
        </div>

    );

}