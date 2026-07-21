import {
    ScrollText,
    CircleAlert,
    FileText,
    UploadCloud

} from "lucide-react";
import CampoInput from "./CampoInput";
import CampoSelect from "./CampoSelect";
import CampoArchivo from "./CampoArchivo";
import { useEffect, useState } from "react";

export default function DocumentoProtocolizado({
    tipoDocumento,
    setTipoDocumento,
    documento,
    setDocumento,
    descripcion,
    resetKey,
    titulo
}) {
    const [documentos, setDocumentos] = useState([
        {
            id: 1,
            nombre: "Identificación oficial del apoderado legal",
            obligatorio: true,
            archivo: null
        },
        {
            id: 2,
            nombre: "Constancia de situación fiscal expedida por el SAT (del apoderado legal)",
            obligatorio: true,
            archivo: null
        },
    ]);

    const [esMunicipio,setEsMunicipio] = useState(false);
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
    useEffect(() => {
        if (resetKey) {
            setTipoDocumento("");
        }
    }, [resetKey, setTipoDocumento]);

    return (
        <div className="bg-white rounded-xl border border-sky-200 shadow-sm overflow-hidden mb-6">

            {/* Header */}

            <div className="bg-white border-b px-6 py-5">

                <div className="flex items-center gap-4">

                    <div className="h-12 w-12 rounded-xl bg-violet-100 flex items-center justify-center">
                        <ScrollText
                            className="text-violet-700"
                            size={24}
                        />
                    </div>

                    <div>

                        <h3 className="font-semibold text-lg text-slate-800">
                            {titulo}
                        </h3>

                        <p className="text-sm text-slate-500">
                            {descripcion || "-"}
                        </p>

                    </div>

                </div>

            </div>

            {/* Body */}

            <div className="p-6">

                {/* <CampoSelect
                    etiqueta="Tipo de Documento que lo acredita"
                    obligatorio
                    value={tipoDocumento}
                    onChange={(e) => setTipoDocumento(e.target.value)}
                    opciones={[
                        {
                            value: "",
                            label: "Seleccione...",
                        },
                        {
                            value: "CARTA_PODER",
                            label: "Carta Poder con Ratificación de Firmas ante Notario",
                        },
                        {
                            value: "PODER_NOTARIAL",
                            label: "Poder Notarial del Apoderado Legal",
                        },
                    ]}
                /> */}
                <b className="font-semibold text-md text-slate-800 ">
                    Tipo de Documento que lo acredita
                </b>

                <div className="grid md:grid-cols-2 gap-4 mt-2">

                    <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:border-sky-500 transition">

                        <input
                            type="radio"
                            name="tipoDocumento"
                            onClick={() => setTipoDocumento("CARTA_PODER")}
                        />

                        <div>

                            <p className="font-medium text-slate-800">
                                Carta Poder con Ratificación de Firmas ante Notario
                            </p>

                            <span className="text-sm text-slate-500">
                                Acta protocolizada mediante carta poder.
                            </span>

                        </div>

                    </label>

                    <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:border-sky-500 transition">

                        <input
                            type="radio"
                            name="tipoDocumento"
                            onClick={() => setTipoDocumento("PODER_NOTARIAL")}
                        />

                        <div>

                            <p className="font-medium text-slate-800">
                                Poder Notarial del Apoderado Legal
                            </p>

                            <span className="text-sm text-slate-500">
                                Instrumento notarial vigente.
                            </span>

                        </div>

                    </label>

                </div>
                {/* Carta Poder */}

                {tipoDocumento === "CARTA_PODER" && (

                    <div className="mt-6 rounded-xl border border-sky-200 bg-sky-50/40 overflow-hidden">

                        <div className="border-b px-6 py-4 bg-white flex items-center gap-4">

                            <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">

                                <ScrollText
                                    className="text-sky-700"
                                    size={24}
                                />

                            </div>

                            <div>

                                <h4 className="font-semibold text-slate-800">
                                    Carta Poder con Ratificación de Firmas ante Notario
                                </h4>

                                <p className="text-sm text-slate-500">
                                    Capture la información correspondiente al documento seleccionado.
                                </p>

                            </div>

                        </div>

                        <div className="p-6">

                            <div className="grid md:grid-cols-2 gap-5">

                                <CampoArchivo
                                    etiqueta="Documento (PDF)"
                                    obligatorio
                                    archivo={documento.archivo}
                                    onChange={(e) =>
                                        setDocumento({
                                            ...documento,
                                            archivo: e.target.files[0],
                                        })
                                    }
                                />

                                <CampoInput
                                    etiqueta="Fecha"
                                    obligatorio
                                    type="date"
                                    value={documento.fecha}
                                    onChange={(e) =>
                                        setDocumento({
                                            ...documento,
                                            fecha: e.target.value
                                        })
                                    }
                                />

                                <CampoInput
                                    etiqueta="Número del Acta"
                                    obligatorio
                                    value={documento.numeroActa}
                                    onChange={(e) =>
                                        setDocumento({
                                            ...documento,
                                            numeroActa: e.target.value
                                        })
                                    }
                                />

                            </div>

                        </div>

                    </div>

                )}

                {/* Poder Notarial */}

                {tipoDocumento === "PODER_NOTARIAL" && (
                    <div>
                        <div className="mt-6 rounded-xl border border-indigo-200 bg-indigo-50/30 overflow-hidden">

                            <div className="border-b bg-white px-6 py-5">

                                <div className="flex items-center gap-4">

                                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">

                                        <ScrollText
                                            className="text-indigo-700"
                                            size={24}
                                        />

                                    </div>

                                    <div>

                                        <h4 className="font-semibold text-slate-800">
                                            Poder Notarial del Apoderado Legal
                                        </h4>

                                        <p className="text-sm text-slate-500">
                                            Capture la información correspondiente al instrumento notarial.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="p-6">

                                <div className="grid md:grid-cols-2 gap-5">

                                    <CampoArchivo
                                        etiqueta="Documento (PDF)"
                                        obligatorio
                                        archivo={documento.archivo}
                                        onChange={(e) =>
                                            setDocumento({
                                                ...documento,
                                                archivo: e.target.files[0],
                                            })
                                        }
                                    />

                                    <CampoInput
                                        etiqueta="Fecha"
                                        obligatorio
                                        type="date"
                                        value={documento.fecha}
                                        onChange={(e) =>
                                            setDocumento({
                                                ...documento,
                                                fecha: e.target.value
                                            })
                                        }
                                    />

                                    <CampoInput
                                        etiqueta="Número de Instrumento o Escritura"
                                        obligatorio
                                        value={documento.numeroInstrumento}
                                        onChange={(e) =>
                                            setDocumento({
                                                ...documento,
                                                numeroInstrumento: e.target.value
                                            })
                                        }
                                    />

                                    <CampoInput
                                        etiqueta="Número de Fojas Útiles"
                                        value={documento.numeroFojas}
                                        onChange={(e) =>
                                            setDocumento({
                                                ...documento,
                                                numeroFojas: e.target.value
                                            })
                                        }
                                    />

                                </div>

                            </div>

                        </div>
                        {!esMunicipio && (
                            <div className="mt-6 rounded-xl border border-indigo-200 bg-indigo-50/30 overflow-hidden">

                                <div className="border-b bg-white px-6 py-5">

                                    <div className="flex items-center gap-4">

                                        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">

                                            <ScrollText
                                                className="text-indigo-700"
                                                size={24}
                                            />

                                        </div>

                                        <div>

                                            <h4 className="font-semibold text-slate-800">
                                                Documentación adicional
                                            </h4>

                                            <p className="text-sm text-slate-500">
                                                Cargue el documento correspondiente solicitado
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <div className="flex flex-col gap-3 p-4 bg-white">
                                    {documentos.map((doc) => {

                                        const estado = obtenerEstado(doc);

                                        return (

                                            <div
                                                key={doc.id}
                                                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                                            >
                                                {/* HEADER */}

                                                <div className="bg-slate-100 px-5 py-4 border-b border-slate-200 flex justify-between items-start">

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

                        )}
                    </div>
                )}

            </div>

        </div>
    );
}