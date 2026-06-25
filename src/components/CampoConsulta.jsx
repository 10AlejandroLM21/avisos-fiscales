
  export const CampoConsulta = ({ etiqueta, valor }) => (
    <div>
      <label className="block mb-2 text-sm font-medium text-slate-600">
        {etiqueta}
      </label>

      <div className="w-full border bg-slate-50 rounded-lg px-4 py-3 text-slate-700 min-h-[48px]">
        {valor || "-"}
      </div>
    </div>
  );
