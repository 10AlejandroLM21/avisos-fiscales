import React, { useState } from "react";
import Input from "../components/Input";

export default function DomicilioFiscal({
    titulo = "Domicilio fiscal del representante legal",
    onGuardar,
    onCancelar,
    className = ""

}) {
    const [domicilioSeleccionado, setDomicilioSeleccionado] = useState(null);
    const [mostrarFormularioDomicilio, setMostrarFormularioDomicilio] = useState(false);
    const [pasoModal, setPasoModal] = useState(1);
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
        <div className={`"bg-white rounded-xl ${className}"`}>

            {!mostrarFormularioDomicilio && (
                <div>


                    {!domicilioSeleccionado && (
                        <div>
                            <div className="border-b px-6 py-5 flex justify-between items-center">

                                <div>
                                    <h3 className="text-xl font-semibold text-slate-800">
                                        Domicilios del Contribuyente
                                    </h3>

                                    <p className="text-slate-500 mt-1">
                                        Seleccione un domicilio fiscal o registre uno nuevo.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setMostrarFormularioDomicilio(true)}
                                    className="px-4 py-2 bg-sky-700 text-white rounded-lg hover:bg-sky-800"
                                >
                                    + Agregar Domicilio Fiscal
                                </button>

                            </div>
                            <div className="overflow-x-auto p/2">

                                <table className="w-full text-sm">

                                    <thead className="bg-slate-100">

                                        <tr>
                                            <th className="p-3 text-left">ID</th>
                                            <th className="p-3 text-left">Tipo Domicilio</th>
                                            <th className="p-3 text-left">Domicilio</th>
                                            <th className="p-3 text-center">Seleccionar</th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {domicilios.map((domicilio) => (

                                            <tr
                                                key={domicilio.id}
                                                className="border-t hover:bg-slate-50"
                                            >

                                                <td className="p-3">
                                                    {domicilio.id}
                                                </td>

                                                <td className="p-3">
                                                    {domicilio.tipo}
                                                </td>

                                                <td className="p-3">
                                                    {domicilio.direccion}
                                                </td>

                                                <td className="p-3 text-center">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setDomicilioSeleccionado(domicilio)
                                                        }
                                                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                                                    >
                                                        Continuar
                                                    </button>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>
                        </div>

                    )}

                </div>


            )}

            {domicilioSeleccionado && (

                <div className="p-6 bg-sky-50 border-t">
                    <div class="flex justify-between">
                        <h4 className="font-semibold text-slate-800 mb-4">
                            Domicilio Seleccionado
                        </h4>
                        <button
                            type="button"
                            onClick={() => setDomicilioSeleccionado(null)}
                            className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg transition"
                        >
                            Cambiar domicilio
                        </button>
                    </div>


                    <div className="grid md:grid-cols-3 gap-4">

                        <div>
                            <label className="text-xs text-slate-500">
                                Tipo
                            </label>

                            <div className="font-medium">
                                {domicilioSeleccionado.tipo}
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-xs text-slate-500">
                                Domicilio
                            </label>

                            <div className="font-medium">
                                {domicilioSeleccionado.direccion}
                            </div>
                        </div>

                    </div>

                </div>

            )}

            {mostrarFormularioDomicilio && (
                <div>
                    <div className="flex items-center justify-center mt-4">

                        {[1, 2, 3].map((step, index) => (
                            <React.Fragment key={step}>

                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
                              ${pasoModal >= step
                                            ? "bg-green-900 text-white"
                                            : "bg-slate-200 text-slate-500"
                                        }`}
                                >
                                    {step}
                                </div>

                                {index < 2 && (
                                    <div
                                        className={`w-24 h-1
                                ${pasoModal > step
                                                ? "bg-sky-700"
                                                : "bg-slate-200"
                                            }`}
                                    />
                                )}

                            </React.Fragment>
                        ))}

                    </div>
                    <div className="flex justify-center gap-16 mt-3 text-xs font-medium">

                        <span>Datos Generales</span>

                        <span>
                            {ambito === "RURAL"
                                ? "Ubicación Rural"
                                : "Ubicación Urbana"}
                        </span>

                        <span>Referencias</span>

                    </div>

                    {pasoModal === 1 && (

                        <div className="grid md:grid-cols-2 gap-4 m-4">

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Código Postal *
                                </label>

                                <input
                                    type="text"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Ámbito *
                                </label>

                                <select
                                    value={ambito}
                                    onChange={(e) => setAmbito(e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2"
                                >
                                    <option value="">
                                        Seleccione
                                    </option>

                                    <option value="URBANO">
                                        Urbano
                                    </option>

                                    <option value="RURAL">
                                        Rural
                                    </option>

                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Región *
                                </label>

                                <input
                                    type="text"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Distrito *
                                </label>

                                <input
                                    type="text"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Municipio / Delegación *
                                </label>

                                <input
                                    type="text"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Localidad *
                                </label>

                                <input
                                    type="text"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Tipo de Asentamiento *
                                </label>

                                <select className="w-full border rounded-lg px-3 py-2">
                                    <option>Seleccione</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Nombre de Asentamiento *
                                </label>

                                <input
                                    type="text"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                        </div>

                    )}
                    {pasoModal === 2 && ambito === "URBANO" && (

                        <div className="grid md:grid-cols-2 gap-4 m-4">

                            <Input label="Tipo de Vialidad *" />

                            <Input label="Nombre de Calle *" />

                            <Input label="Número Exterior y/o Letra *" />

                            <Input label="Número Interior y/o Letra" />

                            <Input label="Ubicación del Inmueble dentro de la Manzana" />

                            <Input label="Entre Vialidad *" />

                            <Input label="Y Vialidad *" />

                        </div>

                    )}
                    {pasoModal === 2 && ambito === "RURAL" && (

                        <div className="grid md:grid-cols-2 gap-4 m-4">

                            <Input label="Vía de Comunicación *" />

                            <Input label="Nombre de Terracería *" />

                            <Input label="Tramo *" />

                        </div>

                    )}
                    {pasoModal === 3 && (

                        <div className="space-y-5 p-4">

                            <div>

                                <label className="block text-sm font-medium mb-1">
                                    Tipo de Inmueble *
                                </label>

                                <select className="w-full border rounded-lg px-3 py-2">
                                    <option>Seleccione</option>
                                </select>

                            </div>

                            <div>

                                <label className="block text-sm font-medium mb-1">
                                    Geolocalización
                                </label>

                                <input
                                    type="text"
                                    placeholder={
                                        ambito === "URBANO"
                                            ? "PIN de Google Maps"
                                            : "Interfaz de Google Maps"
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-medium mb-1">
                                    Características del Domicilio
                                </label>

                                <textarea
                                    rows="3"
                                    className="w-full border rounded-lg px-3 py-2"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-medium mb-1">
                                    Referencias del Domicilio
                                </label>

                                <textarea
                                    rows="3"
                                    className="w-full border rounded-lg px-3 py-2"
                                />

                            </div>

                        </div>

                    )}
                    {/* FOOTER */}
                    <div className="flex justify-between mt-8 pt-6 p-4">

                        <button
                            type="button"
                            onClick={() => {
                                if (pasoModal > 1) {
                                    setPasoModal(pasoModal - 1);
                                }
                            }}
                            disabled={pasoModal === 1}
                            className={`px-5 py-2 rounded-lg border
                           
                                ${pasoModal === 1
                                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                    : "hover:bg-slate-50"
                                }`}
                        >
                            Anterior
                        </button>
                        <div className="flex gap-2">
                            <button type="button"
                                className="px-6 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-lg"
                                onClick={() => {
                                    onCancelar();
                                    setMostrarFormularioDomicilio(false);
                                }}>
                                Cancelar
                            </button>
                            {pasoModal < 3 ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPasoModal(pasoModal + 1);

                                    }
                                    }
                                    className="px-6 py-2 bg-green-900 hover:bg-sky-800 text-white rounded-lg"
                                >
                                    Siguiente
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        onGuardar();
                                        setMostrarFormularioDomicilio(false);
                                    }}
                                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                                >
                                    Guardar Registro
                                </button>
                            )}
                        </div>


                    </div>

                </div>
            )}

        </div>
    );
}