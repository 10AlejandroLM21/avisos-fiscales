import {
    FolderOpen,
    FileText,
    UploadCloud,
    CheckCircle2,
    Clock3,
    CircleAlert,
    Trash2,
    RefreshCw,
    Eye,
    File,
    ArrowRight,
    ArrowLeft
} from "lucide-react";

import { useMemo, useState } from "react";

import CampoConsulta from "../components/CampoConsulta";

export default function Digitalizacion() {

    const [documentos, setDocumentos] = useState([
        {
            id: 1,
            nombre: "Identificación Oficial",
            obligatorio: true,
            archivo: null
        },
        {
            id: 2,
            nombre: "CURP",
            obligatorio: true,
            archivo: null
        },
        {
            id: 3,
            nombre: "Comprobante de Domicilio",
            obligatorio: false,
            archivo: null
        },
        {
            id: 4,
            nombre: "Documento Soporte",
            obligatorio: false,
            archivo: null
        }
    ]);

    const [documentoSeleccionado, setDocumentoSeleccionado] = useState(1);

    const documentoActual = documentos.find(
        d => d.id === documentoSeleccionado
    );

    const porcentaje = useMemo(() => {

        return Math.round(

            documentos.filter(d => d.archivo).length * 100 /

            documentos.length

        );

    }, [documentos]);

    const seleccionarArchivo = (id, archivo) => {

        if (!archivo) return;

        setDocumentos(prev =>

            prev.map(doc =>

                doc.id === id

                    ? {
                        ...doc,
                        archivo
                    }

                    : doc

            )

        );

    };

    const eliminarArchivo = (id) => {

        setDocumentos(prev =>

            prev.map(doc =>

                doc.id === id

                    ? {
                        ...doc,
                        archivo: null
                    }

                    : doc

            )

        );

    };

    const obtenerEstado = (doc) => {

        if (doc.archivo) {

            return {
                color: "bg-emerald-100 text-emerald-700",
                icono: <CheckCircle2 size={15} />,
                texto: "Cargado"
            };

        }

        if (doc.obligatorio) {

            return {
                color: "bg-red-100 text-red-700",
                icono: <CircleAlert size={15} />,
                texto: "Pendiente"
            };

        }

        return {
            color: "bg-slate-100 text-slate-600",
            icono: <Clock3 size={15} />,
            texto: "Opcional"
        };

    };

    return (

        <div className="space-y-6">

            {/*======================================================
                HEADER
            ======================================================*/}

            <div className="bg-white rounded-2xl border shadow-sm">

                <div className="px-8 py-8 flex items-center gap-5">

                    <div className="h-16 w-16 rounded-2xl bg-sky-100 flex items-center justify-center">

                        <FolderOpen

                            size={34}

                            className="text-sky-700"

                        />

                    </div>

                    <div>

                        <h2 className="text-2xl font-bold text-slate-800">

                            Digitalización de Documentos

                        </h2>

                        <p className="text-slate-500 mt-2">

                            Adjunte la documentación requerida para integrar el expediente electrónico del aviso.

                        </p>

                    </div>

                </div>

            </div>

            {/*======================================================
                DATOS DEL AVISO
            ======================================================*/}

            <div className="bg-white rounded-2xl border shadow-sm">

                <div className="border-b px-6 py-5">

                    <h3 className="font-semibold">

                        Datos del Aviso

                    </h3>

                    <p className="text-sm text-slate-500 mt-1">

                        Información general del aviso fiscal.

                    </p>

                </div>

                <div className="p-6 grid lg:grid-cols-2 gap-6">

                    <CampoConsulta

                        etiqueta="Tipo de Aviso"

                        valor="Disminución de Obligaciones"

                    />

                    <CampoConsulta

                        etiqueta="Folio"

                        valor="AF-2026-000001"

                    />

                    <CampoConsulta

                        etiqueta="RFC"

                        valor="XAXX010101000"

                    />

                    <CampoConsulta

                        etiqueta="Nombre"

                        valor="COMERCIALIZADORA DEL SURESTE S.A. DE C.V."

                    />

                    <CampoConsulta

                        etiqueta="Fecha"

                        valor="08/07/2026"

                    />

                    <CampoConsulta

                        etiqueta="Estado"

                        valor="Pendiente de Digitalización"

                    />

                </div>

            </div>

            {/*======================================================
                GESTOR DOCUMENTAL
            ======================================================*/}

            <div className="grid lg:grid-cols-12 gap-6">

                {/*======================================================
    PANEL IZQUIERDO
======================================================*/}

                <div className="lg:col-span-4">

                    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

                        {/* HEADER */}

                        <div className="px-5 py-5 border-b">

                            <h3 className="font-semibold text-slate-800">

                                Documentos

                            </h3>

                            <p className="text-sm text-slate-500 mt-1">

                                Seleccione un documento para visualizarlo o adjuntarlo.

                            </p>

                        </div>

                        {/* PROGRESO */}

                        <div className="px-5 py-5 border-b bg-slate-50">

                            <div className="flex justify-between text-sm mb-3">

                                <span className="font-medium">

                                    Expediente Digital

                                </span>

                                <span className="font-semibold text-sky-700">

                                    {documentos.filter(d => d.archivo).length}

                                    /

                                    {documentos.length}

                                </span>

                            </div>

                            <div className="h-3 rounded-full bg-slate-200 overflow-hidden">

                                <div

                                    className="bg-sky-600 h-full transition-all duration-500"

                                    style={{

                                        width: `${porcentaje}%`

                                    }}

                                />

                            </div>

                            <p className="text-xs text-slate-500 mt-2">

                                {porcentaje}% del expediente integrado

                            </p>

                        </div>

                        {/* LISTADO */}

                        <div className="max-h-[650px] overflow-y-auto">

                            {documentos.map((doc) => {

                                const estado = obtenerEstado(doc);

                                const activo = documentoSeleccionado === doc.id;

                                return (

                                    <button

                                        key={doc.id}

                                        onClick={() =>
                                            setDocumentoSeleccionado(doc.id)
                                        }

                                        className={`
                            w-full
                            text-left
                            transition-all
                            border-b
                            ${activo
                                                ? "bg-sky-50 border-l-4 border-l-sky-600"
                                                : "hover:bg-slate-50"
                                            }
                        `}

                                    >

                                        <div className="px-5 py-4">

                                            <div className="flex justify-between items-start">

                                                <div className="flex items-start gap-3">

                                                    <div
                                                        className={`
                                            h-10
                                            w-10
                                            rounded-xl
                                            flex
                                            items-center
                                            justify-center
                                            ${activo

                                                                ? "bg-sky-100"

                                                                : "bg-slate-100"

                                                            }
                                        `}
                                                    >

                                                        <FileText

                                                            size={18}

                                                            className={

                                                                activo

                                                                    ? "text-sky-700"

                                                                    : "text-slate-500"

                                                            }

                                                        />

                                                    </div>

                                                    <div>

                                                        <h4
                                                            className={`
                                                font-medium

                                                ${activo

                                                                    ? "text-sky-700"

                                                                    : "text-slate-700"

                                                                }
                                            `}
                                                        >

                                                            {doc.nombre}

                                                        </h4>

                                                        <p className="text-xs text-slate-500 mt-1">

                                                            {

                                                                doc.archivo

                                                                    ? doc.archivo.name

                                                                    : "Sin documento"

                                                            }

                                                        </p>

                                                    </div>

                                                </div>

                                                <ArrowRight

                                                    size={18}

                                                    className={`
                                        transition-transform

                                        ${activo

                                                            ? "rotate-90 text-sky-600"

                                                            : "text-slate-400"

                                                        }
                                    `}

                                                />

                                            </div>

                                            <div className="mt-4 flex items-center justify-between">

                                                <span
                                                    className={`
                                        inline-flex
                                        items-center
                                        gap-2
                                        px-3
                                        py-1
                                        rounded-full
                                        text-xs
                                        font-semibold

                                        ${estado.color}
                                    `}
                                                >

                                                    {estado.icono}

                                                    {estado.texto}

                                                </span>

                                                {doc.archivo && (

                                                    <span className="text-xs text-slate-400">

                                                        {(doc.archivo.size / 1024 / 1024).toFixed(2)} MB

                                                    </span>

                                                )}

                                            </div>

                                        </div>

                                    </button>

                                );

                            })}

                        </div>

                    </div>

                </div>

                {/*======================================================
    PANEL DERECHO
======================================================*/}

                <div className="lg:col-span-8"><div className="bg-white rounded-2xl border shadow-sm overflow-hidden h-full">

                    {/* HEADER */}

                    <div className="border-b px-6 py-5 flex justify-between items-center">

                        <div>

                            <h3 className="text-xl font-semibold text-slate-800">

                                {documentoActual.nombre}

                            </h3>

                            <p className="text-sm text-slate-500 mt-1">

                                {documentoActual.obligatorio
                                    ? "Documento obligatorio para integrar el expediente."
                                    : "Documento opcional."
                                }

                            </p>

                        </div>

                        <span
                            className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold ${obtenerEstado(documentoActual).color
                                }`}
                        >

                            {obtenerEstado(documentoActual).icono}

                            {obtenerEstado(documentoActual).texto}

                        </span>

                    </div>

                    <div className="p-6">

                        {/*========================
            SIN ARCHIVO
        ========================*/}

                        {!documentoActual.archivo && (

                            <label className="block">

                                <input

                                    hidden

                                    type="file"

                                    accept=".pdf,.png,.jpg,.jpeg"

                                    onChange={(e) =>
                                        seleccionarArchivo(
                                            documentoActual.id,
                                            e.target.files?.[0]
                                        )
                                    }

                                />

                                <div className="
                    h-[420px]
                    rounded-2xl
                    border-2
                    border-dashed
                    border-sky-300
                    hover:border-sky-500
                    hover:bg-sky-50
                    transition-all
                    cursor-pointer
                    flex
                    flex-col
                    items-center
                    justify-center
                ">

                                    <UploadCloud

                                        size={80}

                                        className="text-sky-600"

                                    />

                                    <h2 className="mt-6 text-xl font-semibold">

                                        Arrastre un archivo aquí

                                    </h2>

                                    <p className="text-slate-500 mt-3">

                                        o haga clic para seleccionarlo

                                    </p>

                                    <div className="mt-8 flex gap-3">

                                        <span className="px-3 py-2 rounded-full bg-slate-100 text-sm">

                                            PDF

                                        </span>

                                        <span className="px-3 py-2 rounded-full bg-slate-100 text-sm">

                                            JPG

                                        </span>

                                        <span className="px-3 py-2 rounded-full bg-slate-100 text-sm">

                                            PNG

                                        </span>

                                    </div>

                                    <p className="mt-5 text-sm text-slate-400">

                                        Tamaño máximo: 10 MB

                                    </p>

                                </div>

                            </label>

                        )}

                        {/*========================
            CON ARCHIVO
        ========================*/}

                        {documentoActual.archivo && (

                            <div className="space-y-6">

                                {/* Vista previa */}

                                <div className="rounded-2xl border bg-slate-50 overflow-hidden">

                                    {

                                        documentoActual.archivo.type.startsWith("image/")

                                            ? (

                                                <img

                                                    src={URL.createObjectURL(documentoActual.archivo)}

                                                    alt="preview"

                                                    className="w-full h-[420px] object-contain"

                                                />

                                            )

                                            : (

                                                <div className="
                                    h-[420px]
                                    flex
                                    flex-col
                                    justify-center
                                    items-center
                                ">

                                                    <File

                                                        size={90}

                                                        className="text-red-600"

                                                    />

                                                    <h2 className="mt-5 text-xl font-semibold">

                                                        Archivo PDF

                                                    </h2>

                                                    <p className="text-slate-500 mt-2">

                                                        Vista previa disponible al abrir el documento.

                                                    </p>

                                                </div>

                                            )

                                    }

                                </div>

                                {/* Información */}

                                <div className="grid md:grid-cols-3 gap-5">

                                    <div className="rounded-xl border p-5">

                                        <p className="text-xs uppercase tracking-wide text-slate-500">

                                            Archivo

                                        </p>

                                        <h3 className="mt-2 font-semibold break-all">

                                            {documentoActual.archivo.name}

                                        </h3>

                                    </div>

                                    <div className="rounded-xl border p-5">

                                        <p className="text-xs uppercase tracking-wide text-slate-500">

                                            Tamaño

                                        </p>

                                        <h3 className="mt-2 font-semibold">

                                            {(documentoActual.archivo.size / 1024 / 1024).toFixed(2)} MB

                                        </h3>

                                    </div>

                                    <div className="rounded-xl border p-5">

                                        <p className="text-xs uppercase tracking-wide text-slate-500">

                                            Estado

                                        </p>

                                        <h3 className="mt-2 font-semibold text-emerald-700">

                                            Documento listo

                                        </h3>

                                    </div>

                                </div>

                                {/* Acciones */}

                                <div className="flex justify-end gap-3">

                                    <button
                                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border hover:bg-slate-50"
                                    >

                                        <Eye size={18} />

                                        Vista previa

                                    </button>

                                    <label>

                                        <input

                                            hidden

                                            type="file"

                                            accept=".pdf,.png,.jpg,.jpeg"

                                            onChange={(e) =>
                                                seleccionarArchivo(
                                                    documentoActual.id,
                                                    e.target.files?.[0]
                                                )
                                            }

                                        />

                                        <div className="
                            inline-flex
                            items-center
                            gap-2
                            px-5
                            py-3
                            rounded-xl
                            border
                            cursor-pointer
                            hover:bg-slate-50
                        ">

                                            <RefreshCw size={18} />

                                            Cambiar archivo

                                        </div>

                                    </label>

                                    <button

                                        onClick={() =>
                                            eliminarArchivo(documentoActual.id)
                                        }

                                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-50 text-red-700 hover:bg-red-100"

                                    >

                                        <Trash2 size={18} />

                                        Eliminar

                                    </button>

                                </div>

                            </div>

                        )}

                    </div>

                </div>

                </div></div>

            {/*======================================================
    BOTONES
======================================================*/}

            <div className="sticky bottom-0 bg-white rounded-2xl border shadow-sm">

                <div className="px-6 py-5 flex justify-between items-center">

                    <button
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
                    >

                        <ArrowLeft size={18} />

                        Regresar

                    </button>

                    <button
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition shadow-sm"
                    >

                        <CheckCircle2 size={18} />

                        Finalizar Aviso

                    </button>

                </div>

            </div>
        </div>
    )
}