
export default function CampoConsulta({

    etiqueta,

    valor

}) {

    return (

        <div>

            <label className="block text-sm font-medium text-slate-500 mb-2">

                {etiqueta}

            </label>

            <div className="rounded-lg border bg-slate-50 px-4 py-3 font-medium text-slate-800">

                {valor}

            </div>

        </div>

    );

}