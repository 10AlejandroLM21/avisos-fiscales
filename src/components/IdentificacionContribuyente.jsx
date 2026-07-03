import { UserRound } from "lucide-react";
import { useState } from "react";
import CampoInput from "./CampoInput";

export default function IdentificacionContribuyente({
    datos,
    setDatos
}) {

    const actualizarDatosContribuyente = (campo, valor) => {

        setDatos((prev) => ({

            ...prev,

            [campo]: valor,

        }));

    };

    return (

        <div className="rounded-xl border border-sky-200 shadow-sm">

            {/* HEADER */}

            <div className="border-b border-sky-200 px-6 py-5">

                <div className="flex items-center gap-3">

                    <div className="h-10 w-10 rounded-lg bg-sky-100 flex items-center justify-center">

                        <UserRound
                            size={20}
                            className="text-sky-700"
                        />

                    </div>

                    <div>

                        <h3 className="font-semibold text-slate-800">

                            Datos de Identificación del Contribuyente

                        </h3>

                        <p className="text-sm text-slate-500 mt-1">

                            Consulte y proporcione la información de identificación del contribuyente.

                        </p>

                    </div>

                </div>

            </div>

            {/* BODY */}

            <div className="p-6 border-sky-200 bg-sky-50/30">

                <div className="grid md:grid-cols-2 gap-6">

                    <CampoInput
                        etiqueta="Nombre Comercial"
                        obligatorio
                        value={datos.nombreComercial}
                        onChange={(e) => actualizarDatosContribuyente("nombreComercial", e.target.value)}
                    />

                    <CampoInput
                        etiqueta="Correo Electrónico"
                        obligatorio
                        type="email"
                        value={datos.correo}
                        onChange={(e) => actualizarDatosContribuyente("correo", e.target.value)}
                    />

                    <CampoInput
                        etiqueta="Teléfono Fijo"
                        obligatorio
                        value={datos.telefono}
                        onChange={(e) => actualizarDatosContribuyente("telefono", e.target.value)}
                    />

                    <CampoInput
                        etiqueta="Fecha de Nacimiento"
                        obligatorio
                        type="date"
                        value={datos.fechaNacimiento}
                        onChange={(e) => actualizarDatosContribuyente("fechaNacimiento", e.target.value)}
                    />

                </div>

            </div>

        </div>

    );
}