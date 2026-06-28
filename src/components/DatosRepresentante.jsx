import { UserRound } from "lucide-react";
import  CampoInput  from "./CampoInput";
import  CampoSelect  from "./CampoSelect";


export default function DatosRepresentante({
    nuevoRepresentante,
    setNuevoRepresentante
}) {

    return (

        <div className="bg-white rounded-xl border border-sky-200 shadow-sm overflow-hidden mb-6">

            {/* Header */}

            <div className="bg-slate-50 border-b px-6 py-5">

                <div className="flex items-center gap-4">

                    <div className="h-12 w-12 rounded-xl bg-sky-100 flex items-center justify-center">

                        <UserRound
                            className="text-sky-700"
                            size={24}
                        />

                    </div>

                    <div>

                        <h3 className="font-semibold text-lg">
                            Datos del Representante Legal
                        </h3>

                        <p className="text-sm text-slate-500">
                            Capture la información del nuevo representante legal.
                        </p>

                    </div>

                </div>

            </div>

            <div className="p-6">

                <div className="grid md:grid-cols-2 gap-5">

                    {/* RFC */}

                    <CampoInput
                        etiqueta="RFC"
                        obligatorio
                        value={nuevoRepresentante.rfc}
                        onChange={(e) =>
                            setNuevoRepresentante({
                                ...nuevoRepresentante,
                                rfc: e.target.value,
                            })
                        }
                    />

                    {/* CURP */}

                    <CampoInput
                        etiqueta="CURP"
                        obligatorio
                        value={nuevoRepresentante.curp}
                        onChange={(e) =>
                            setNuevoRepresentante({
                                ...nuevoRepresentante,
                                curp: e.target.value,
                            })
                        }
                    />

                    {/* Primer Apellido */}

                    <CampoInput
                        etiqueta="Primer Apellido"
                        obligatorio
                        value={nuevoRepresentante.apellidoPaterno}
                        onChange={(e) =>
                            setNuevoRepresentante({
                                ...nuevoRepresentante,
                                apellidoPaterno: e.target.value,
                            })
                        }
                    />

                    {/* Segundo Apellido */}

                    <CampoInput
                        etiqueta="Segundo Apellido"
                        value={nuevoRepresentante.apellidoMaterno}
                        onChange={(e) =>
                            setNuevoRepresentante({
                                ...nuevoRepresentante,
                                apellidoMaterno: e.target.value,
                            })
                        }
                    />

                    {/* Nombre(s) */}

                    <CampoInput
                        etiqueta="Nombre(s)"
                        obligatorio
                        value={nuevoRepresentante.nombres}
                        onChange={(e) =>
                            setNuevoRepresentante({
                                ...nuevoRepresentante,
                                nombres: e.target.value,
                            })
                        }
                    />

                    {/* Fecha de Nacimiento */}

                    <CampoInput
                        etiqueta="Fecha de Nacimiento"
                        obligatorio
                        type="date"
                        value={nuevoRepresentante.fechaNacimiento}
                        onChange={(e) =>
                            setNuevoRepresentante({
                                ...nuevoRepresentante,
                                fechaNacimiento: e.target.value,
                            })
                        }
                    />

                    {/* Género */}

                    <CampoSelect
                        etiqueta="Género"
                        obligatorio
                        value={nuevoRepresentante.genero}
                        onChange={(e) =>
                            setNuevoRepresentante({
                                ...nuevoRepresentante,
                                genero: e.target.value,
                            })
                        }
                        opciones={[
                            { value: "", label: "Seleccione..." },
                            { value: "M", label: "Masculino" },
                            { value: "F", label: "Femenino" },
                        ]}
                    />

                    {/* Correo Electrónico */}

                    <CampoInput
                        etiqueta="Correo Electrónico"
                        obligatorio
                        type="email"
                        value={nuevoRepresentante.correoElectronico}
                        onChange={(e) =>
                            setNuevoRepresentante({
                                ...nuevoRepresentante,
                                correoElectronico: e.target.value,
                            })
                        }
                    />
                </div>

            </div>

        </div>

    );

}