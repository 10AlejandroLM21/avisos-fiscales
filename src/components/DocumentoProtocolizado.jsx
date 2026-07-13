import { ScrollText } from "lucide-react";
import CampoInput from "./CampoInput";
import CampoSelect from "./CampoSelect";
import CampoArchivo from "./CampoArchivo";
import { useEffect } from "react";

export default function DocumentoProtocolizado({
    tipoDocumento,
    setTipoDocumento,
    documento,
    setDocumento,
    descripcion,
    resetKey, 
    titulo
}) {
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

                )}

            </div>

        </div>
    );
}