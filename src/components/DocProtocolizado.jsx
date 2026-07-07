import { ScrollText } from "lucide-react";

import CampoInput from "./CampoInput";
import CampoSelect from "./CampoSelect";
import DocumentoConsulta from "./DocumentoConsulta";

export default function DocumentoProtocolizado({

    representante

}) {

    return (

        <div className="border-b">

            <div className="px-6 py-5 bg-slate-50">

                <div className="flex items-center gap-3">

                    <div className="h-10 w-10 rounded-lg bg-violet-100 flex items-center justify-center">

                        <ScrollText
                            className="text-violet-700"
                            size={20}
                        />

                    </div>

                    <div>

                        <h3 className="font-semibold text-slate-800">

                            Documento Protocolizado

                        </h3>

                        <p className="text-sm text-slate-500">

                            Información del documento mediante el cual se acredita la representación legal.

                        </p>

                    </div>

                </div>

            </div>

            <div className="p-6">

                <div className="grid md:grid-cols-2 gap-5">

                    <CampoSelect

                        etiqueta="Tipo de Documento que lo acredita"

                        value={representante.tipoDocumento}

                        opciones={[

                            {
                                value: "CARTA_PODER",
                                label: "Carta Poder con Ratificación de Firmas ante Notario"
                            },

                            {
                                value: "ACTA_PROTOCOLIZADA",
                                label: "Acta Protocolizada mediante Carta Poder"
                            },

                            {
                                value: "PODER_NOTARIAL",
                                label: "Poder Notarial del Apoderado Legal"
                            }

                        ]}

                        disabled

                    />

                    <CampoInput

                        etiqueta="Fecha"

                        type="date"

                        value={representante.fechaDocumento}

                        disabled

                    />

                    {representante.tipoDocumento === "CARTA_PODER" && (

                        <CampoInput

                            etiqueta="Número del Acta"

                            value={representante.numeroActa}

                            disabled

                        />

                    )}

                    {representante.tipoDocumento === "ACTA_PROTOCOLIZADA" && (

                        <CampoInput

                            etiqueta="Número del Acta Protocolizada"

                            value={representante.numeroActa}

                            disabled

                        />

                    )}

                    {representante.tipoDocumento === "PODER_NOTARIAL" && (

                        <>

                            <CampoInput

                                etiqueta="Número de Instrumento o Escritura"

                                value={representante.numeroInstrumento}

                                disabled

                            />

                            <CampoInput

                                etiqueta="Número de Fojas Útiles"

                                value={representante.numeroFojas}

                                disabled

                            />

                        </>

                    )}

                    <div className="md:col-span-2">

                        <DocumentoConsulta

                            etiqueta="Documento Protocolizado"

                            nombreArchivo={representante.documento}

                            descripcion="Documento mediante el cual se acredita la representación legal."

                            onVer={() => console.log("Abrir documento")}

                        />

                    </div>

                </div>

            </div>

        </div>

    );

}