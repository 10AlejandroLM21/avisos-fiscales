import {
    Search,
    Users,
    User,
    FileText,
    Briefcase,
    CheckCircle,
    Building2,
    Smartphone,
    BookUser,
    ChevronDown,
    Pencil,
    Trash2,
    AlertTriangle,
    Home,
    MapPin,
    Copy,
    ArrowRight,
    FilePenLine,
    ClipboardList,
    UserRound,
    FileBadge,
    ScrollText,
    Upload,
    UserPlus,
    X,
    Save
} from "lucide-react";
import DatosRepresentante from "./DatosRepresentante";
import DocumentoProtocolizado from "./DocumentoProtocolizado";
import DomicilioFiscalForm from "./DomicilioFiscalForm";
import React, { useState } from "react";

export default function ModalFormulario({

    abierto,
    onClose,
    titulo,
    descripcion,
    icono,
    children,
    onGuardar,
    textoBoton = "Guardar",
    documento,
    setDocumento
}) {
    const [pasoModal, setPasoModal] = useState(1);
    const [nuevoRepresentante, setNuevoRepresentante] = useState({
        rfc: "",
        curp: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        nombres: "",
        fechaNacimiento: "",
        genero: "",
        correoElectronico: "",
    });

    const [tipoDocumento, setTipoDocumento] = useState("");

    const [domicilio, setDomicilio] = useState(null);
    if (!abierto) return null;

    return (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden">
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-72 border-r bg-slate-50 p-6">

                        <h3 className="font-semibold text-slate-800 mb-6">
                            Proceso de Registro
                        </h3>

                        <div className="space-y-3">

                            <button
                                className={`w-full flex items-center gap-4 rounded-xl p-4 transition ${pasoModal === 1
                                    ? "bg-sky-100 border border-sky-300"
                                    : "hover:bg-slate-100"
                                    }`}
                            >

                                <UserRound
                                    className={
                                        pasoModal === 1
                                            ? "text-sky-700"
                                            : "text-slate-500"
                                    }
                                />

                                <div className="text-left">

                                    <p className="font-medium">
                                        Datos del representante legal
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Información personal
                                    </p>

                                </div>

                            </button>

                            {/* <button
                                className={`w-full flex items-center gap-4 rounded-xl p-4 transition ${pasoModal === 2
                                    ? "bg-sky-100 border border-sky-300"
                                    : "hover:bg-slate-100"
                                    }`}
                            >

                                <Home
                                    className={
                                        pasoModal === 3
                                            ? "text-sky-700"
                                            : "text-slate-500"
                                    }
                                />

                                <div>

                                    <p className="font-medium text-left">
                                        Domicilio Fiscal
                                    </p>

                                    <p className="text-xs text-slate-500 text-left">
                                        Información del domicilio
                                    </p>

                                </div>

                            </button> */}

                            <button
                                className={`w-full flex items-center gap-4 rounded-xl p-4 transition ${pasoModal === 2
                                    ? "bg-sky-100 border border-sky-300"
                                    : "hover:bg-slate-100"
                                    }`}
                            >

                                <ScrollText
                                    className={
                                        pasoModal === 2
                                            ? "text-sky-700"
                                            : "text-slate-500"
                                    }
                                />

                                <div>

                                    <p className="font-medium text-left">
                                        Documento Protocolizado
                                    </p>

                                    <p className="text-xs text-slate-500 text-left">
                                        Documento que acredita
                                    </p>
                                </div>

                            </button>

                        </div>

                    </div>

                    {/* Contenido */}
                    <div className="flex-1 overflow-y-auto p-8">

                        {pasoModal === 1 && (
                            <div>
                                <DatosRepresentante
                                    nuevoRepresentante={nuevoRepresentante}
                                    setNuevoRepresentante={setNuevoRepresentante}
                                    titulo="Datos de identificación del representante legal"
                                    descripcion="Capture los datos del representante legal"
                                />
                                <DomicilioFiscalForm />
                            </div>
                        )}

                        {pasoModal === 2 && (
                            <DocumentoProtocolizado
                                tipoDocumento={tipoDocumento}
                                setTipoDocumento={setTipoDocumento}
                                documento={documento}
                                setDocumento={setDocumento}
                                descripcion="Capture la información correspondiente al documento que acredita al representante legal."
                            />
                        )}

                    </div>
                </div>
                {/* Footer */}
                <div className="border-t bg-slate-50 px-8 py-5 flex justify-between">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-lg border"
                    >
                        Cerrar
                    </button>


                    <div className="flex gap-3">

                        <button
                            onClick={() => setPasoModal(pasoModal - 1)}
                            disabled={pasoModal === 1}
                            className="px-5 py-2.5 rounded-lg border disabled:opacity-50"
                        >
                            Anterior
                        </button>

                        {pasoModal < 3 ? (

                            <button
                                onClick={() => setPasoModal(pasoModal + 1)}
                                className="px-5 py-2.5 rounded-lg bg-sky-700 text-white"
                            >
                                Siguiente
                            </button>

                        ) : (

                            <button
                                onClick={onGuardar}
                                className="px-5 py-2.5 rounded-lg bg-green-700 text-white"
                            >
                                Siguiente
                            </button>

                        )}

                    </div>

                </div>


            </div>

        </div>

    );

}
