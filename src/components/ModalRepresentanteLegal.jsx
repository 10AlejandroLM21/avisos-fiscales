import {
    Home,
    ScrollText,
    UserRound,
    X
} from "lucide-react";

import CampoInput from "./CampoInput";
import CampoSelect from "./CampoSelect";
import DocumentoConsulta from "./DocumentoConsulta";
import DocumentoProtocolizado from "./DocProtocolizado";
import DomicilioRepresentante from "./DomicilioRepresentante";
import GeolocalizacionRepresentante from "./Geolocalizacion";
export default function ModalRepresentanteLegal({

    abierto,
    representante,
    onClose

}) {

    if (!abierto || !representante) return null;

    return (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">

                {/* HEADER */}

                <div className="bg-gradient-to-r from-sky-700 to-sky-600 px-8 py-6">

                    <div className="flex justify-between items-center">

                        <div className="flex items-center gap-4">

                            <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center">

                                <UserRound
                                    className="text-white"
                                    size={28}
                                />

                            </div>

                            <div>

                                <h2 className="text-2xl font-semibold text-white">

                                    Datos del Representante Legal

                                </h2>

                                <p className="text-sky-100 mt-1">

                                    Consulte la información registrada del representante legal.

                                </p>

                            </div>

                        </div>

                        {/* <button

                            onClick={onClose}

                            className="text-white hover:bg-white/20 rounded-lg p-2 transition"

                        >

                            <X size={24} />

                        </button> */}

                    </div>

                </div>

                {/* BODY */}

                <div className="flex-1 overflow-y-auto p-8">

                    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">

                        {/*==========================================
        DATOS DE IDENTIFICACIÓN
    ==========================================*/}

                        <div className="border-b">

                            <div className="px-6 py-5 bg-slate-50">

                                <div className="flex items-center gap-3">

                                    <div className="h-10 w-10 rounded-lg bg-sky-100 flex items-center justify-center">

                                        <UserRound
                                            className="text-sky-700"
                                            size={20}
                                        />

                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-slate-800">

                                            Datos de Identificación

                                        </h3>

                                        <p className="text-sm text-slate-500">

                                            Información general registrada del representante legal.

                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="p-6">

                                <div className="grid md:grid-cols-2 gap-5">

                                    <CampoInput
                                        etiqueta="RFC"
                                        value={representante.rfc}
                                        disabled
                                    />

                                    <CampoInput
                                        etiqueta="CURP"
                                        value={representante.curp}
                                        disabled
                                    />

                                    <CampoInput
                                        etiqueta="Primer Apellido"
                                        value={representante.apellidoPaterno}
                                        disabled
                                    />

                                    <CampoInput
                                        etiqueta="Segundo Apellido"
                                        value={representante.apellidoMaterno}
                                        disabled
                                    />

                                    <div className="md:col-span-2">

                                        <CampoInput
                                            etiqueta="Nombre(s)"
                                            value={representante.nombre}
                                            disabled
                                        />

                                    </div>

                                    <CampoInput
                                        etiqueta="Fecha de Nacimiento"
                                        type="date"
                                        value={representante.fechaNacimiento}
                                        disabled
                                    />

                                    <CampoInput
                                        etiqueta="Género"
                                        value={representante.genero}
                                        disabled
                                    />

                                    <div className="md:col-span-2">

                                        <CampoInput
                                            etiqueta="Correo Electrónico"
                                            value={representante.correoElectronico}
                                            disabled
                                        />

                                    </div>

                                    <CampoInput
                                        etiqueta="Teléfono"
                                        value={representante.telefono}
                                        disabled
                                    />

                                </div>

                            </div>

                        </div>

                        <DocumentoProtocolizado

                            representante={representante}

                        />

                        <DomicilioRepresentante

                            representante={representante}

                        />
                        <GeolocalizacionRepresentante
                            representante={representante}
                        />
                    </div>
                </div>

                {/* FOOTER */}

                <div className="border-t bg-slate-50 px-8 py-5 flex justify-end">

                    <button

                        onClick={onClose}

                        className="px-5 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-200 hover:text-black text-white"

                    >

                        Cerrar

                    </button>

                </div>

            </div>

        </div>

    );

}