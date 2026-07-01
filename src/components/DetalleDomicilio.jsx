import { Home, MapPin } from "lucide-react";
import CampoInput from "./CampoInput";

export default function DetalleDomicilio({ domicilio }) {

    if (!domicilio) return null;

    return (

        <div className="space-y-8">

            {/* DATOS GENERALES */}

            <section>

                <div className="flex items-center gap-2 mb-5">

                    <Home
                        size={20}
                        className="text-sky-700"
                    />

                    <h3 className="font-semibold text-slate-700">
                        Datos Generales del Domicilio
                    </h3>

                </div>

                <div className="grid md:grid-cols-2 gap-5">

                    <CampoInput
                        etiqueta="Código Postal"
                        value={domicilio.codigoPostal}
                        disabled
                    />

                    <CampoInput
                        etiqueta="Tipo de Ámbito"
                        value={domicilio.ambito}
                        disabled
                    />

                    <CampoInput
                        etiqueta="Región"
                        value={domicilio.region}
                        disabled
                    />

                    <CampoInput
                        etiqueta="Distrito"
                        value={domicilio.distrito}
                        disabled
                    />

                    <CampoInput
                        etiqueta="Municipio / Delegación"
                        value={domicilio.municipio}
                        disabled
                    />

                    <CampoInput
                        etiqueta="Localidad"
                        value={domicilio.localidad}
                        disabled
                    />

                    <CampoInput
                        etiqueta="Tipo de Asentamiento"
                        value={domicilio.tipoAsentamiento}
                        disabled
                    />

                    <CampoInput
                        etiqueta="Nombre del Asentamiento"
                        value={domicilio.nombreAsentamiento}
                        disabled
                    />

                    <CampoInput
                        etiqueta="Tipo de Inmueble"
                        value={domicilio.tipoInmueble}
                        disabled
                    />

                </div>

            </section>

            {/* UBICACIÓN */}

            <section>

                <div className="flex items-center gap-2 mb-5">

                    <MapPin
                        size={20}
                        className="text-sky-700"
                    />

                    <h3 className="font-semibold text-slate-700">
                        Ubicación del Domicilio
                    </h3>

                </div>

                <div className="grid md:grid-cols-2 gap-5">

                    {domicilio.ambito === "URBANO" ? (

                        <>

                            <CampoInput
                                etiqueta="Tipo de Vialidad"
                                value={domicilio.tipoVialidad}
                                disabled
                            />

                            <CampoInput
                                etiqueta="Nombre de Vialidad"
                                value={domicilio.nombreVialidad}
                                disabled
                            />

                            <CampoInput
                                etiqueta="Número Exterior y/o Letra"
                                value={domicilio.numeroExterior}
                                disabled
                            />

                            <CampoInput
                                etiqueta="Número Interior y/o Letra"
                                value={domicilio.numeroInterior}
                                disabled
                            />

                            <CampoInput
                                etiqueta="Entre Vialidad"
                                value={domicilio.entreVialidad}
                                disabled
                            />

                            <CampoInput
                                etiqueta="Y Vialidad"
                                value={domicilio.yVialidad}
                                disabled
                            />

                            <CampoInput
                                etiqueta="Ubicación del Inmueble dentro de la Manzana"
                                value={domicilio.ubicacionManzana}
                                disabled
                            />

                        </>

                    ) : (

                        <>

                            <CampoInput
                                etiqueta="Tipo de Vía de Comunicación"
                                value={domicilio.tipoVia}
                                disabled
                            />

                            <CampoInput
                                etiqueta="Nombre de Vía de Comunicación"
                                value={domicilio.nombreVia}
                                disabled
                            />

                            <CampoInput
                                etiqueta="Tramo"
                                value={domicilio.tramo}
                                disabled
                            />

                        </>

                    )}

                </div>

            </section>

            {/* INFORMACIÓN COMPLEMENTARIA */}

            <section>

                <div className="flex items-center gap-2 mb-5">

                    <MapPin
                        size={20}
                        className="text-sky-700"
                    />

                    <h3 className="font-semibold text-slate-700">
                        Información Complementaria
                    </h3>

                </div>

                <div className="space-y-5">

                    <CampoInput
                        etiqueta="Características del Domicilio"
                        value={domicilio.caracteristicas}
                        disabled
                    />

                    <CampoInput
                        etiqueta="Referencias Adicionales"
                        value={domicilio.referencias}
                        disabled
                    />

                </div>

            </section>

            {/* MAPA */}

            <section>

                <div className="flex items-center gap-2 mb-5">

                    <MapPin
                        size={20}
                        className="text-sky-700"
                    />

                    <h3 className="font-semibold text-slate-700">
                        Geolocalización
                    </h3>

                </div>

                <div className="h-80 rounded-xl border bg-slate-100 flex items-center justify-center text-slate-500">

                    Google Maps

                </div>

            </section>

        </div>

    );

}