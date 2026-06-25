import { Upload, FileText } from "lucide-react";

export default function CampoArchivo({
  etiqueta,
  obligatorio = false,
  archivo,
  onChange,
  accept = ".pdf",
}) {
  return (
    <div className="md:col-span-2">

      <label className="block text-sm font-medium text-slate-700 mb-2">
        {etiqueta}

        {obligatorio && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      <label className="block cursor-pointer">

        <input
          type="file"
          accept={accept}
          onChange={onChange}
          className="hidden"
        />

        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 transition hover:border-sky-500 hover:bg-sky-50">

          {!archivo ? (

            <div className="flex flex-col items-center">

              <Upload
                size={34}
                className="text-slate-400 mb-3"
              />

              <span className="font-medium text-slate-700">
                Seleccionar archivo
              </span>

              <span className="text-sm text-slate-500 mt-1">
                Formato PDF
              </span>

            </div>

          ) : (

            <div className="flex items-center gap-4">

              <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center">

                <FileText
                  className="text-red-600"
                  size={24}
                />

              </div>

              <div className="flex-1">

                <p className="font-medium text-slate-800">
                  {archivo.name}
                </p>

                <p className="text-sm text-slate-500">
                  {(archivo.size / 1024 / 1024).toFixed(2)} MB
                </p>

              </div>

            </div>

          )}

        </div>

      </label>

    </div>
  );
}