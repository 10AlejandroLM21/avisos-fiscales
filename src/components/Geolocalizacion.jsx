import { MapPinned } from "lucide-react";
import CampoInput from "./CampoInput";

export default function GeolocalizacionRepresentante({

    representante

}) {

    return (

        <div>

            {/*=========================================================
                GEOLOCALIZACIÓN
            =========================================================*/}

            <div className="px-6 py-5 bg-slate-50">

                <div className="flex items-center gap-3">

                    <div className="h-10 w-10 rounded-lg bg-cyan-100 flex items-center justify-center">

                        <MapPinned
                            className="text-cyan-700"
                            size={20}
                        />

                    </div>

                    <div>

                        <h3 className="font-semibold text-slate-800">

                            Geolocalización

                        </h3>

                        <p className="text-sm text-slate-500">

                            Coordenadas geográficas registradas para el domicilio fiscal.

                        </p>

                    </div>

                </div>

            </div>

            <div className="p-6">

                {/* Resumen */}

                {/* <div className="mb-6 rounded-xl border border-cyan-200 bg-cyan-50 p-5">

                    <div className="flex items-center gap-3">

                        <MapPinned
                            className="text-cyan-700"
                            size={22}
                        />

                        <div>

                            <p className="text-xs uppercase tracking-wide font-semibold text-cyan-700">

                                Ubicación registrada

                            </p>

                            <p className="text-sm text-slate-600 mt-1">

                                Coordenadas geográficas del domicilio fiscal.

                            </p>

                        </div>

                    </div>

                </div> */}

                {/* Coordenadas */}

                {/* <div className="grid md:grid-cols-2 gap-5">

                    <CampoInput
                        etiqueta="Latitud"
                        value={representante.latitud}
                        disabled
                    />

                    <CampoInput
                        etiqueta="Longitud"
                        value={representante.longitud}
                        disabled
                    />

                </div> */}

                {/* Mapa */}

                <div className="mt-1">

                    <div
                        className="
                            h-72
                            rounded-xl
                            border-2
                            border-dashed
                            border-slate-300
                            bg-slate-50
                            flex
                            flex-col
                            items-center
                            justify-center
                        "
                    >

                        <MapPinned
                            size={42}
                            className="text-slate-400"
                        />

                        <p className="mt-4 font-medium text-slate-600">

                            Vista previa del mapa

                        </p>

                        <p className="text-sm text-slate-400 mt-1">

                            Aquí podrá visualizar la ubicación geográfica del domicilio.

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}