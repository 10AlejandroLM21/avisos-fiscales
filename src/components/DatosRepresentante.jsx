import {
    UserRound,
    Search,
    Smartphone
} from "lucide-react";
import CampoInput from "./CampoInput";
import CampoSelect from "./CampoSelect";


export default function DatosRepresentante({
    nuevoRepresentante,
    setNuevoRepresentante,
    titulo,
    descripcion
}) {

    return (
        <div className="flex flex-col gap-3">
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
                                {titulo}
                            </h3>

                            <p className="text-sm text-slate-500">
                                {descripcion}
                            </p>

                        </div>

                    </div>

                </div>

                <div className="p-6">
                    <div className="grid md:grid-cols-12 gap-5">

                        {/* RFC */}
                        <div className="md:col-span-8">
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
                        </div>

                        {/* Buscar */}
                        <div className="md:col-span-4 flex items-end">
                            <button
                                className="w-full h-11 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-medium flex items-center justify-center gap-2"
                            >
                                <Search size={18} />
                                Buscar RFC
                            </button>
                        </div>

                        {/* Nombre(s) */}
                        <div className="md:col-span-4">
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
                        </div>

                        {/* Primer Apellido */}
                        <div className="md:col-span-4">
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
                        </div>

                        {/* Segundo Apellido */}
                        <div className="md:col-span-4">
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
                        </div>

                        {/* CURP */}
                        <div className="md:col-span-4">
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
                        </div>

                        {/* Nacionalidad */}
                        <div className="md:col-span-4">
                            <CampoSelect
                                etiqueta="Nacionalidad"
                                obligatorio
                                opciones={[
                                    { value: "", label: "Seleccione..." },
                                    { value: "EX", label: "Mexicana" },
                                    { value: "MX", label: "Extranjera" },

                                ]}
                            />
                        </div>

                        {/* Lugar de Nacimiento */}
                        <div className="md:col-span-4">
                            <CampoSelect
                                etiqueta="Lugar de nacimiento"
                                obligatorio
                                value="OC"
                                opciones={[
                                    { value: "", label: "Seleccione..." },
                                    { value: "OC", label: "OC-OAXACA" },
                                ]}
                            />
                        </div>

                        {/* Fecha de Nacimiento */}
                        <div className="md:col-span-4">
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
                        </div>
                        {/* Género */}
                        <div className="md:col-span-4">
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
                        </div>


                    </div>
                </div>

            </div>
            <div className="bg-white rounded-xl border border-sky-200 shadow-sm overflow-hidden mb-6">

                {/* Header */}

                <div className="bg-slate-50 border-b px-6 py-5">

                    <div className="flex items-center gap-4">

                        <div className="h-12 w-12 rounded-xl bg-sky-100 flex items-center justify-center">

                            <Smartphone
                                className="text-sky-700"
                                size={24}
                            />

                        </div>

                        <div>

                            <h3 className="font-semibold text-lg">
                                Datos de Contacto
                            </h3>

                            <p className="text-sm text-slate-500">
                                Capture la información de contacto del representante legal.
                            </p>

                        </div>

                    </div>

                </div>

                <div className="p-6">
                    <div className="grid md:grid-cols-12 gap-5">

                        {/* Correo Eletrónico */}
                        <div className="md:col-span-4">
                            <CampoInput
                                etiqueta="Correo Eletrónico"
                                obligatorio
                            />
                        </div>

                        {/* Correo Eletrónico Alternativo */}
                        <div className="md:col-span-4">
                            <CampoInput
                                etiqueta="Correo Eletrónico Alternativo"
                                obligatorio
                            />
                        </div>

                        {/* Telefóno */}
                        <div className="md:col-span-4">
                            <CampoInput
                                etiqueta="Télefono"
                                obligatorio
                            />
                        </div>

                        {/* Telefóno Alternativo - Fijo/Movil */}
                        <div className="md:col-span-8">
                            <CampoInput
                                etiqueta="Télefono Alternativo"
                                obligatorio
                            />
                        </div>

                        <div className="md:col-span-4">
                            <CampoSelect
                                etiqueta="Tipo de telefono alternativo"
                                obligatorio
                                opciones={[
                                    { value: "", label: "Seleccione..." },
                                    { value: "EX", label: "Fijo" },
                                    { value: "MX", label: "Movil" },

                                ]}
                            />
                        </div>

                    </div>
                </div>

            </div>
        </div>


    );

}