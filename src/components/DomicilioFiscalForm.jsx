import React, { useState } from "react";
import Input from "../components/Input";
import CampoSelect from "../components/CampoSelect";
import CampoInput from "../components/CampoInput";
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
    Save,
    Repeat,
    Eye
} from "lucide-react";
export default function DomicilioFiscal({
    titulo = "Datos del domicilio fiscal",
    onGuardar,
    onCancelar,
    className = ""

}) {
    const [domicilioSeleccionado, setDomicilioSeleccionado] = useState(null);
    const [mostrarFormularioDomicilio, setMostrarFormularioDomicilio] = useState(false);
    const [ambito, setAmbito] = useState("");
    const [domicilios] = useState([
        {
            id: 1,
            tipo: "Fiscal",
            direccion:
                "Av. Universidad No. 100, Col. Centro, Oaxaca de Juárez, Oaxaca"
        },
        {
            id: 2,
            tipo: "Sucursal",
            direccion:
                "Calle Reforma No. 250, Col. Reforma, Oaxaca de Juárez, Oaxaca"
        },
        {
            id: 3,
            tipo: "Matriz",
            direccion:
                "Blvd. Eduardo Vasconcelos No. 500, Oaxaca de Juárez, Oaxaca"
        }
    ]);

    return (
        <div className="">


            <div className="rounded-xl overflow-hidden border border-sky-200">
                {/* Header */}

                <div className="bg-slate-50 flex justify-between items-center p-4">

                    <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">

                            <Building2
                                className="text-sky-700"
                                size={24}
                            />

                        </div>

                        <div>

                            <h3 className="font-semibold text-slate-800">
                                Datos del domicilio fiscal
                            </h3>

                            <p className="text-sm text-slate-500">
                                Capture o verifique la información general correspondiente al domicilio fiscal.
                            </p>

                        </div>

                    </div>
                </div>
                {/* Content */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-6">
                    <div className="p-6 space-y-8">

                        {/* BÚSQUEDA POR CÓDIGO POSTAL */}

                        <section>

                            <h3 className="font-medium text-slate-700 mb-4">
                                Búsqueda por Código Postal
                            </h3>

                            <div className="grid md:grid-cols-3 gap-4">

                                <CampoInput
                                    etiqueta="Código Postal *"
                                    placeholder="68000"
                                />

                            </div>

                        </section>

                        {/* DATOS GENERALES */}

                        <section>

                            <h3 className="font-medium text-slate-700 mb-4">
                                Datos Generales del Domicilio
                            </h3>

                            <div className="grid md:grid-cols-2 gap-4">

                                <CampoSelect
                                    etiqueta="Tipo de Ámbito"
                                    obligatorio
                                    value={ambito}
                                    onChange={(e) => setAmbito(e.target.value)}
                                    opciones={[
                                        {
                                            value: "",
                                            label: "Seleccione..."
                                        },
                                        {
                                            value: "URBANO",
                                            label: "Urbano"
                                        },
                                        {
                                            value: "RURAL",
                                            label: "Rural"
                                        }
                                    ]}
                                />

                                <CampoInput etiqueta="Región *" />

                                <CampoInput etiqueta="Distrito *" />

                                <CampoInput etiqueta="Municipio / Delegación *" />

                                <CampoInput etiqueta="Localidad *" />

                                <CampoInput etiqueta="Tipo de Asentamiento *" />

                                <CampoInput etiqueta="Nombre del Asentamiento *" />

                                <CampoInput etiqueta="Tipo de Inmueble *" />

                            </div>

                        </section>

                        {/* UBICACIÓN */}

                        <section>

                            <h3 className="font-medium text-slate-700 mb-4">
                                Ubicación del Domicilio
                            </h3>

                            {
                                ambito === "URBANO" ? (

                                    <div className="grid md:grid-cols-2 gap-4">

                                        <CampoInput etiqueta="Tipo de Vialidad *" />

                                        <CampoInput etiqueta="Nombre de Vialidad *" />

                                        <CampoInput etiqueta="Número Exterior y/o Letra *" />

                                        <CampoInput etiqueta="Número Interior y/o Letra" />

                                        <CampoInput etiqueta="Entre Vialidad *" />

                                        <CampoInput etiqueta="Y Vialidad *" />

                                        <CampoInput etiqueta="Ubicación del Inmueble dentro de la Manzana" />

                                    </div>

                                ) : (

                                    <div className="grid md:grid-cols-2 gap-4">

                                        <CampoInput etiqueta="Tipo de Vía de Comunicación *" />

                                        <CampoInput etiqueta="Nombre de Vía de Comunicación *" />

                                        <CampoInput etiqueta="Tramo *" />

                                    </div>

                                )
                            }

                        </section>

                        {/* INFORMACIÓN COMPLEMENTARIA */}

                        <section>

                            <h3 className="font-medium text-slate-700 mb-4">
                                Información Complementaria
                            </h3>

                            <div className="space-y-4">

                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        Características del Domicilio
                                    </label>

                                    <textarea
                                        rows="3"
                                        className="w-full border rounded-lg p-3"
                                        placeholder="Capture las características del domicilio"
                                    />

                                </div>

                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        Referencias Adicionales
                                    </label>

                                    <textarea
                                        rows="3"
                                        className="w-full border rounded-lg p-3"
                                        placeholder="Capture referencias adicionales"
                                    />

                                </div>

                            </div>

                        </section>

                        {/* GEOLOCALIZACIÓN */}

                        <section>

                            <div className="flex items-center gap-2 mb-4">

                                <MapPin
                                    size={18}
                                    className="text-sky-700"
                                />

                                <h3 className="font-medium text-slate-700">
                                    Geolocalización
                                </h3>

                            </div>

                            <div className="h-80 rounded-xl border bg-slate-100 flex items-center justify-center text-slate-500">

                                Área de Google Maps

                            </div>

                        </section>

                    </div>

                    <div className="mt-6 flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <input
                            id="validarInformacion"
                            type="checkbox"
                            className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                        />

                        <label
                            htmlFor="validarInformacion"
                            className="text-sm text-slate-700 cursor-pointer"
                        >
                            He validado que la información recuperada es correcta.
                        </label>
                    </div>

                </div>


            </div>

        </div>
    );
}