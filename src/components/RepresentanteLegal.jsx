import React, { useState } from "react";

export default function RepresentanteLegalForm({
    titulo = "Datos del Representante Legal",
    onGuardar,
    onCancelar,
    className = ""

}) {

    const [pasoModal, setPasoModal] = useState(1);

    return (
        <div className={`bg-green-100 rounded-xl shadow-xl w-full border border-1 ${className}`}>

            {/* HEADER */}
            <div className="rounded-xl px-6 py-4 flex justify-between items-center">

                <h4 className="font-semibold text-green mt-5">
                    Agregar representante legal
                </h4>

            </div>

            {/* BODY */}
            <div className="mb-8">

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

                    <span>Representante Legal</span>
                    <span>Documento Protocolizado</span>
                    <span>Domicilio Fiscal</span>

                </div>

                {pasoModal === 1 && (
                    <div className="grid md:grid-cols-2 gap-4 m-4">

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                RFC *
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                CURP *
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Primer Apellido *
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Segundo Apellido
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Nombre(s) *
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Fecha de Nacimiento *
                            </label>
                            <input
                                type="date"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Género
                            </label>

                            <select className="w-full border rounded-lg px-3 py-2">
                                <option>Seleccione Género</option>
                                <option>Masculino</option>
                                <option>Femenino</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Correo Electrónico
                            </label>

                            <input
                                type="email"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                    </div>
                )}
                {pasoModal === 2 && (

                    <div className="grid md:grid-cols-2 gap-4 m-4">

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Número de Escritura *
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                RFC del Federatario Público *
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Fecha de Registro de la Propiedad y Comercio *
                            </label>
                            <input
                                type="date"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Libro
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Foja
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                    </div>

                )}
                {pasoModal === 3 && (
                    <div className="max-h-[450px] overflow-y-auto p-4">
                        <div className="grid md:grid-cols-2 gap-4">

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Estado *
                                </label>
                                <select className="w-full border rounded-lg px-3 py-2">
                                    <option>Seleccione Estado</option>
                                    <option>Oaxaca</option>
                                    <option>Chiapas</option>
                                    <option>Tabasco</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Municipio *
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
                                    Código Postal *
                                </label>
                                <input
                                    type="text"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">
                                    Características del Domicilio
                                </label>
                                <textarea
                                    rows="2"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">
                                    Referencias Adicionales
                                </label>
                                <textarea
                                    rows="2"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Tipo de Vialidad *
                                </label>
                                <select className="w-full border rounded-lg px-3 py-2">
                                    <option>Seleccione</option>
                                    <option>Calle</option>
                                    <option>Avenida</option>
                                    <option>Boulevard</option>
                                    <option>Privada</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Nombre de Vialidad *
                                </label>
                                <input
                                    type="text"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Número Exterior y/o Letra *
                                </label>
                                <input
                                    type="text"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Número Interior y/o Letra
                                </label>
                                <input
                                    type="text"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Entre Vialidad *
                                </label>
                                <input
                                    type="text"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Y Qué Vialidad *
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
                                    <option>Colonia</option>
                                    <option>Fraccionamiento</option>
                                    <option>Barrio</option>
                                    <option>Unidad Habitacional</option>
                                </select>
                            </div>

                        </div>
                    </div>


                )}

            </div>

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
                        }}>
                        Cancelar
                    </button>
                    {pasoModal < 3 ? (
                        <button
                            type="button"
                            onClick={() => setPasoModal(pasoModal + 1)}
                            className="px-6 py-2 bg-green-900 hover:bg-sky-800 text-white rounded-lg"
                        >
                            Siguiente
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => {
                                onGuardar();
                            }}
                            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                        >
                            Guardar Registro
                        </button>
                    )}
                </div>


            </div>

        </div>
    );
}