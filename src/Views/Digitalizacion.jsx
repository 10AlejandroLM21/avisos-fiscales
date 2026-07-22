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
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Download
} from "lucide-react";

import { useMemo, useState } from "react";

import CampoConsulta from "../components/CampoConsulta";

export default function Digitalizacion() {

    const [documentos, setDocumentos] = useState([
        {
            id: 1,
            nombre: "Formato de Aviso del Registro Estatal de Contribuyentes",
            obligatorio: true,
            archivo: null
        },
        {
            id: 2,
            nombre: "Constancia de Representante Legal",
            obligatorio: true,
            archivo: null
        },
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
    const [documentosGenerados, setDocumentosGenerados] = useState([
        { id: 1, siglas: "AF-01", nombre: "Solicitud de Aviso", consultado: false },
        { id: 2, siglas: "AF-02", nombre: "Formato para Firma", consultado: false },
        { id: 3, siglas: "AF-03", nombre: "Acuse de Recepción", consultado: false },
        { id: 4, siglas: "AF-04", nombre: "Manifestación del Contribuyente", consultado: false },
        { id: 5, siglas: "AF-05", nombre: "Declaración Bajo Protesta", consultado: false },
        { id: 6, siglas: "AF-06", nombre: "Constancia del Trámite", consultado: false },
        { id: 7, siglas: "AF-07", nombre: "Resumen del Aviso", consultado: false },
        { id: 8, siglas: "AF-08", nombre: "Anexo de Información", consultado: false },
        { id: 9, siglas: "AF-09", nombre: "Hoja de Validación", consultado: false },
        { id: 10, siglas: "AF-10", nombre: "Acuse Final", consultado: false },
    ]);

    const [pagina, setPagina] = useState(0);

    const porPagina = 4;

    const totalPaginas = Math.ceil(documentosGenerados.length / porPagina);

    const documentosVisibles = documentosGenerados.slice(
        pagina * porPagina,
        pagina * porPagina + porPagina
    );

    const consultarDocumento = (id) => {
        setDocumentosGenerados(prev =>
            prev.map(doc =>
                doc.id === id
                    ? { ...doc, consultado: !doc.consultado }
                    : doc
            )
        );
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

                        {/* <p className="text-slate-500 mt-2">

                            Adjunte la documentación requerida para integrar el expediente electrónico del aviso.

                        </p> */}

                    </div>

                </div>

            </div>

            <div className="bg-white rounded-2xl border shadow-sm">

                {/* Encabezado */}

                <div className="px-6 py-5 border-b">

                    <h2 className="text-xl font-semibold text-slate-800">
                        Documentación generada
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Consulte y descargue los formatos generados durante el trámite.
                    </p>

                </div>

                {/* Contenido */}

                <div className="p-6 grid grid-cols-2 gap-6">

                    {/* FAREC */}

                    <div className="border rounded-xl p-5 hover:border-sky-500 hover:shadow-sm transition">

                        <div className="flex gap-4">

                            <div className="h-12 w-12 rounded-xl bg-sky-100 flex items-center justify-center">

                                <FileText
                                    size={24}
                                    className="text-sky-700"
                                />

                            </div>

                            <div className="flex-1">

                                <h3 className="font-semibold text-slate-800">
                                    Formato de Aviso del Registro Estatal de Contribuyentes
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    Siglas:
                                    <span className="font-semibold text-slate-700 ml-1">
                                        FAREC
                                    </span>
                                </p>

                                <p className="text-sm text-slate-500 mt-3">
                                    Seleccione el formato para visualizarlo o descargarlo.
                                </p>

                            </div>

                        </div>

                        <div className="flex justify-end mt-5">

                            <button
                                className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-lg
                    bg-sky-600
                    text-white
                    hover:bg-sky-700
                    transition
                "
                            >

                                <Download size={18} />

                                Descargar

                            </button>

                        </div>

                    </div>

                    {/* CREC */}

                    <div className="border rounded-xl p-5 hover:border-sky-500 hover:shadow-sm transition">

                        <div className="flex gap-4">

                            <div className="h-12 w-12 rounded-xl bg-sky-100 flex items-center justify-center">

                                <FileText
                                    size={24}
                                    className="text-sky-700"
                                />

                            </div>

                            <div className="flex-1">

                                <h3 className="font-semibold text-slate-800">
                                    Constancia de Representante Legal
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    Siglas:
                                    <span className="font-semibold text-slate-700 ml-1">
                                        CREC
                                    </span>
                                </p>

                                <p className="text-sm text-slate-500 mt-3">
                                    Seleccione el formato para visualizarlo o descargarlo.
                                </p>

                            </div>

                        </div>

                        <div className="flex justify-end mt-5">

                            <button
                                className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-lg
                    bg-sky-600
                    text-white
                    hover:bg-sky-700
                    transition
                "
                            >

                                <Download size={18} />

                                Descargar

                            </button>

                        </div>

                    </div>

                </div>

            </div>

            <div className="bg-white rounded-2xl border shadow-sm">

                {/* Encabezado */}

                <div className="px-6 py-5 border-b">

                    <h2 className="text-xl font-semibold text-slate-800">
                        Expediente digital
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Cargue los documentos generados para integrar el expediente digital.</p>

                </div>
                <div className="flex flex-col gap-3 p-4">
                    {documentos.map((doc) => {

                        const estado = obtenerEstado(doc);

                        return (

                            <div
                                key={doc.id}
                                className="bg-white rounded-xl border shadow-sm overflow-hidden"
                            >

                                {/* HEADER */}

                                <div className="px-5 py-4 border-b flex justify-between items-start">

                                    <div className="flex items-start gap-3">

                                        <div className="h-11 w-11 rounded-xl bg-sky-100 flex items-center justify-center">

                                            <FileText
                                                size={20}
                                                className="text-sky-700"
                                            />

                                        </div>

                                        <div>

                                            <h3 className="font-semibold text-slate-800">

                                                {doc.nombre}

                                            </h3>

                                            <p className="text-sm text-slate-500 mt-1">

                                                Documento requerido para integrar el expediente.

                                            </p>



                                        </div>
                                        <div className="flex gap-2 mt-3">

                                            <span className={`
                                    flex
                                    px-3
                                    py-1
                                    rounded-full
                                    text-xs
                                    font-semibold

                                    ${doc.obligatorio
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-slate-100 text-slate-700"
                                                }
                                `}>

                                                {doc.obligatorio
                                                    ? "Obligatorio"
                                                    : "Opcional"}

                                            </span>

                                            <span className={`
                                 flex
                                 items-center
                                 px-3
                                    py-1
                                    rounded-full
                                    text-xs
                                    font-semibold

                                    ${estado.color}
                                `}>

                                                {estado.icono}

                                                <span className="ml-1">

                                                    {estado.texto}

                                                </span>

                                            </span>

                                        </div>
                                    </div>

                                    {/* <button
                                    className="
                            inline-flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-lg
                            border
                            hover:bg-slate-50
                            text-sm
                        "
                                >

                                    <Download size={17} />

                                    Descargar formato

                                </button> */}

                                </div>

                                {/* CUERPO */}

                                <div className="p-5">

                                    {/* Información */}

                                    <div className="flex justify-between items-center mb-4">

                                        <div className="flex items-center gap-2">

                                            <span className="text-xs uppercase font-medium text-slate-500">
                                                Archivo:
                                            </span>

                                            <span className="text-sm font-medium text-slate-700 truncate">
                                                {doc.archivo
                                                    ? doc.archivo.name
                                                    : "Sin documento"}
                                            </span>

                                        </div>

                                        {

                                            doc.archivo && (

                                                <span className="text-sm text-slate-500">

                                                    {(doc.archivo.size / 1024 / 1024).toFixed(2)} MB

                                                </span>

                                            )

                                        }

                                    </div>

                                    {/* Drag */}
                                    {
                                        !doc.archivo ? (

                                            <label>

                                                <input
                                                    hidden
                                                    type="file"
                                                    accept=".pdf,.png,.jpg,.jpeg"
                                                    onChange={(e) =>
                                                        seleccionarArchivo(doc.id, e.target.files?.[0])
                                                    }
                                                />

                                                <label>

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
            h-20
            rounded-xl
            border-2
            border-dashed
            border-sky-300
            hover:border-sky-500
            hover:bg-sky-50
            transition
            cursor-pointer
            flex
            items-center
            justify-center
            gap-3
        "
                                                    >

                                                        <UploadCloud
                                                            size={26}
                                                            className="text-sky-600"
                                                        />

                                                        <div>

                                                            <p className="font-medium text-sm">
                                                                Arrastre un archivo aquí
                                                            </p>

                                                            <p className="text-xs text-slate-500">
                                                                o haga clic para seleccionarlo
                                                            </p>

                                                        </div>

                                                    </div>

                                                </label>

                                            </label>

                                        ) : (

                                            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">

                                                <div className="flex justify-between items-center">

                                                    <div className="flex items-center gap-3">

                                                        <CheckCircle2
                                                            className="text-emerald-600"
                                                            size={22}
                                                        />

                                                        <div>

                                                            <p className="font-medium text-emerald-700">
                                                                Documento cargado correctamente
                                                            </p>

                                                            <p className="text-sm text-slate-500">
                                                                {doc.archivo.name}
                                                            </p>

                                                        </div>

                                                    </div>

                                                    {/* <label>

                                                    <input
                                                        hidden
                                                        type="file"
                                                        accept=".pdf,.png,.jpg,.jpeg"
                                                        onChange={(e) =>
                                                            seleccionarArchivo(doc.id, e.target.files?.[0])
                                                        }
                                                    />

                                                    <div className="cursor-pointer text-sky-600 text-sm font-medium hover:underline">

                                                        Cambiar archivo

                                                    </div>

                                                </label> */}

                                                </div>

                                            </div>

                                        )
                                    }


                                    {/* Acciones */}
                                    {doc.archivo && (
                                        <div className="flex justify-end gap-2 mt-4">

                                            <button
                                                className="
                                inline-flex
                                items-center
                                gap-2
                                px-3
                                py-2
                                rounded-lg
                                border
                                hover:bg-slate-50
                                text-sm
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
                                    )}
                                </div>

                            </div>

                        );

                    })}
                </div>
            </div>
        </div>
    )
}