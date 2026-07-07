import { Home } from "lucide-react";
import CampoInput from "./CampoInput";

export default function DomicilioRepresentante({ representante }) {

    return (

        <div>

            {/*=========================================================
                DATOS GENERALES
            =========================================================*/}

            <div className="border-b">

                <div className="px-6 py-5 bg-slate-50 flex items-center gap-3">

                    <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">

                        <Home
                            className="text-emerald-700"
                            size={20}
                        />

                    </div>

                    <div>

                        <h3 className="font-semibold text-slate-800">

                            Domicilio Fiscal

                        </h3>

                        <p className="text-sm text-slate-500">

                            Información del domicilio fiscal registrado del representante legal.

                        </p>

                    </div>

                </div>

                <div className="p-6">

                    {/* Domicilio concatenado */}

                    {/* <div className="mb-6 rounded-xl border border-sky-200 bg-sky-50 p-4">

                        <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">

                            Domicilio Fiscal Registrado

                        </p>

                        <p className="mt-2 text-slate-700 leading-6">

                            {representante.domicilioFiscal}

                        </p>

                    </div> */}

                    <div className="grid md:grid-cols-2 gap-5">

                        <CampoInput
                            etiqueta="Código Postal"
                            value={representante.codigoPostal}
                            disabled
                        />

                        <CampoInput
                            etiqueta="Tipo de Ámbito"
                            value={representante.ambito}
                            disabled
                        />

                        <CampoInput
                            etiqueta="Región"
                            value={representante.region}
                            disabled
                        />

                        <CampoInput
                            etiqueta="Distrito"
                            value={representante.distrito}
                            disabled
                        />

                        <CampoInput
                            etiqueta="Municipio / Delegación"
                            value={representante.municipio}
                            disabled
                        />

                        <CampoInput
                            etiqueta="Localidad"
                            value={representante.localidad}
                            disabled
                        />

                        <CampoInput
                            etiqueta="Tipo de Asentamiento"
                            value={representante.tipoAsentamiento}
                            disabled
                        />

                        <CampoInput
                            etiqueta="Nombre del Asentamiento"
                            value={representante.nombreAsentamiento}
                            disabled
                        />

                        <CampoInput
                            etiqueta="Tipo de Inmueble"
                            value={representante.tipoInmueble}
                            disabled
                        />

                    </div>

                </div>

            </div>

            {/*=========================================================
                UBICACIÓN
            =========================================================*/}

            <div className="border-b">

                <div className="px-6 py-5 bg-slate-50">

                    <h3 className="font-semibold text-slate-800">

                        Ubicación del Domicilio

                    </h3>

                    <p className="text-sm text-slate-500 mt-1">

                        Información de ubicación conforme al tipo de ámbito.

                    </p>

                </div>

                <div className="p-6">

                    <div className="grid md:grid-cols-2 gap-5">

                        {representante.ambito === "URBANO" ? (

                            <>

                                <CampoInput
                                    etiqueta="Tipo de Vialidad"
                                    value={representante.tipoVialidad}
                                    disabled
                                />

                                <CampoInput
                                    etiqueta="Nombre de Vialidad"
                                    value={representante.nombreVialidad}
                                    disabled
                                />

                                <CampoInput
                                    etiqueta="Número Exterior"
                                    value={representante.numeroExterior}
                                    disabled
                                />

                                <CampoInput
                                    etiqueta="Número Interior"
                                    value={representante.numeroInterior}
                                    disabled
                                />

                                <CampoInput
                                    etiqueta="Entre Vialidad"
                                    value={representante.entreVialidad}
                                    disabled
                                />

                                <CampoInput
                                    etiqueta="Y Vialidad"
                                    value={representante.yVialidad}
                                    disabled
                                />

                                <CampoInput
                                    etiqueta="Ubicación dentro de la Manzana"
                                    value={representante.ubicacionManzana}
                                    disabled
                                />

                            </>

                        ) : (

                            <>

                                <CampoInput
                                    etiqueta="Tipo de Vía de Comunicación"
                                    value={representante.tipoVia}
                                    disabled
                                />

                                <CampoInput
                                    etiqueta="Nombre de la Vía"
                                    value={representante.nombreVia}
                                    disabled
                                />

                                <CampoInput
                                    etiqueta="Tramo"
                                    value={representante.tramo}
                                    disabled
                                />

                            </>

                        )}

                    </div>

                </div>

            </div>

            {/*=========================================================
                INFORMACIÓN COMPLEMENTARIA
            =========================================================*/}

            <div>

                <div className="px-6 py-5 bg-slate-50">

                    <h3 className="font-semibold text-slate-800">

                        Información Complementaria

                    </h3>

                </div>

                <div className="p-6">

                    <div className="grid gap-5">

                        <CampoInput
                            etiqueta="Características del Domicilio"
                            value={representante.caracteristicas}
                            disabled
                        />

                        <CampoInput
                            etiqueta="Referencias Adicionales"
                            value={representante.referencias}
                            disabled
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}