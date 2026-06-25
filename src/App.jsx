import React, { useState } from "react";
import './App.css';
import RepresentanteLegalForm from "./components/RepresentanteLegal";
import DomicilioFiscal from "./components/DomicilioFiscal";
import DatosRepresentante from "./components/DatosRepresentante";
import DocumentoProtocolizado from "./components/DocumentoProtocolizado";
import { CampoConsulta } from "./components/CampoConsulta";

import {
  Search,
  Users,
  User,
  FileText,
  Briefcase,
  CheckCircle,
  Building2,
  Smartphone,
  BookUser,
  ChevronDown,
  Pencil,
  Trash2,
  AlertTriangle,
  Home,
  MapPin,
  Copy,
  ArrowRight,
  FilePenLine,
  ClipboardList,
  UserRound,
  FileBadge,
  ScrollText,
  Upload,
  UserPlus,
  X,
  Save
} from "lucide-react";

export default function AvisosFiscales() {

  const [activeStep, setActiveStep] = useState(0);
  const [tipoPersona, setTipoPersona] = useState("");
  const [metodoBusqueda, setMetodoBusqueda] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [representanteSeleccionado, setRepresentanteSeleccionado] =
    useState(null);
  const [modalRepresentante, setModalRepresentante] = useState(false);
  const [representacion, setRepresentacion] = useState("");
  const [mostrarFormularioRepresentante, setMostrarFormularioRepresentante] = useState(false);
  const [pasoModal, setPasoModal] = useState(1);
  const [avisoSeleccionado, setAvisoSeleccionado] = useState("");

  const [obligacionAbierta, setObligacionAbierta] = useState(null);
  const [mostrarFormularioDomicilio, setMostrarFormularioDomicilio] = useState(true);
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);
  const [fechaAvisoSAT, setFechaAvisoSAT] = useState("");
  const [representantesBaja, setRepresentantesBaja] = useState([]);
  const [obligacionSeleccionada, setObligacionSeleccionada] = useState("");
  const [actividadSeleccionada, setActividadSeleccionada] = useState("");
  const [porcentaje, setPorcentaje] = useState("");
  const [actividadesAgregadas, setActividadesAgregadas] = useState([]);
  const [trabajadoresPermanentes, setTrabajadoresPermanentes] = useState(null);
  const [trabajadoresTemporales, setTrabajadoresTemporales] = useState(null);
  const [ambito, setAmbito] = useState("");
  const [codigoPostal, setCodigoPostal] = useState(null);
  const [motivoCancelacion, setMotivoCancelacion] = useState(null);
  const [domicilioSeleccionado, setDomicilioSeleccionado] = useState("");
  const [datosValidados, setDatosValidados] = useState(false);
  const [mostrarModalDomicilio, setMostrarModalDomicilio] =
    useState(false);
  const [mostrarObligaciones, setMostrarObligaciones] =
    useState(false);
  const [documentoAcreditador, setDocumentoAcreditador] = useState(null);
  const [modalDetalleDomicilio, setModalDetalleDomicilio] = useState(false);
  const toggleRepresentanteBaja = (id) => {
    setRepresentantesBaja((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };
  // Establecimiento seleccionado para cierre
  const [
    establecimientoSeleccionado,
    setEstablecimientoSeleccionado
  ] = useState(null);

  // Modal de detalle
  const [openDetalle, setOpenDetalle] =
    useState(false);

  // Información del establecimiento a visualizar
  const [
    establecimientoDetalle,
    setEstablecimientoDetalle
  ] = useState(null);

  // Modal de confirmación de cierre
  const [openConfirmacion, setOpenConfirmacion] =
    useState(false);

  // Toast
  // const [showToast, setShowToast] =
  //   useState(false);
  const domicilios = [
    {
      id: 1,
      tipo: "Domicilio Fiscal",
      ambito: "Urbano",
      direccion:
        "Av. Juárez No. 123, Col. Centro, Oaxaca de Juárez, Oaxaca, C.P. 68000, Región Valles Centrales",
    },
    {
      id: 2,
      tipo: "Domicilio para Notificaciones",
      ambito: "Urbano",
      direccion:
        "Calle Hidalgo No. 456, Col. Reforma, Oaxaca de Juárez, Oaxaca, C.P. 68050, Región Valles Centrales",
    },
    {
      id: 3,
      tipo: "Domicilio para Conservación de Contabilidad",
      ambito: "Rural",
      direccion:
        "Camino a San Pedro Km. 2, Tramo Norte, Localidad San Pedro Ixtlahuaca, Oaxaca, C.P. 71228, Región Valles Centrales",
    },
  ];
  const [nuevoRepresentante, setNuevoRepresentante] =
    useState({
      rfc: "",
      curp: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      nombres: "",
    });

  const [nuevosRepresentantes, setNuevosRepresentantes] =
    useState([]);
  const [representantesActuales, setRepresentantesActuales] = useState([
    {
      id: 1,
      nombre: "Juan Pérez López",
      rfc: "JUAP900101XXX",
      curp: "JUAP900101HOCXXX01",
    },
    {
      id: 2,
      nombre: "María López Torres",
      rfc: "MALT900101XXX",
      curp: "MALT900101MOCXXX01",
    },
  ]);
  const toggleRepresentanteVigente = (id) => {
    setRepresentantesVigentes((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  };

  const agregarRepresentante = () => {

    if (
      !nuevoRepresentante.rfc ||
      !nuevoRepresentante.curp ||
      !nuevoRepresentante.apellidoPaterno ||
      !nuevoRepresentante.nombres
    ) {
      alert("Capture la información obligatoria.");
      return;
    }

    setNuevosRepresentantes(prev => [
      ...prev,
      {
        id: Date.now(),
        ...nuevoRepresentante,
      },
    ]);

    // limpiar formulario
    setNuevoRepresentante({
      rfc: "",
      curp: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      nombres: "",
    });

    // regresar al estado inicial
    setMostrarFormularioRepresentante(false);
  };

  const eliminarRepresentante = (id) => {
    setNuevosRepresentantes((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const actualizarRepresentante = (
    id,
    campo,
    valor
  ) => {
    setNuevosRepresentantes((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            [campo]: valor,
          }
          : item
      )
    );
  };

  const resumenAviso = () => {
    const permanecen = representantesActuales.filter(
      (r) => representantesVigentes.includes(r.id)
    );

    const eliminados = representantesActuales.filter(
      (r) => !representantesVigentes.includes(r.id)
    );

    return {
      permanecen,
      eliminados,
      agregados: nuevosRepresentantes,
    };
  };

  const obtenerRelacionFinal = () => {
    const vigentes = representantesActuales.filter(
      (r) => representantesVigentes.includes(r.id)
    );

    const nuevos = nuevosRepresentantes.map(
      (representante) => ({
        id: representante.id,
        nombre: `${representante.nombres} ${representante.apellidoPaterno} ${representante.apellidoMaterno}`,
        rfc: representante.rfc,
        curp: representante.curp,
      })
    );

    return [...vigentes, ...nuevos];
  };
  const continuarAviso = () => {
    if (!validarAviso()) return;

    const resultadoFinal =
      obtenerRelacionFinal();

    console.log(resultadoFinal);

    setPaso("FINALIZADO");
  };
  const confirmarSeleccion = () => {
    if (!representantePendiente) return;

    setRepresentantesBaja((prev) =>
      prev.includes(representantePendiente.id)
        ? prev.filter((id) => id !== representantePendiente.id)
        : [...prev, representantePendiente.id]
    );

    setModalConfirmacion(false);
    setRepresentantePendiente(null);
  };
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  const [representantePendiente, setRepresentantePendiente] = useState(null);
  const [representantesVigentes, setRepresentantesVigentes] = useState([1, 2]);
  const [tipoDocumento, setTipoDocumento] = useState("");

  const [documento, setDocumento] = useState({
    fecha: "",
    numeroActa: "",
    numeroInstrumento: "",
    numeroFojas: "",
  });
  // Tabla de establecimientos
  const [establecimientos, setEstablecimientos] =
    useState([
      {
        id: 1,
        nombre: "Sucursal Centro",
        obligacion: "Impuesto Sobre Nóminas",
        ambito: "URBANO",
        domicilio:
          "Av. Juárez 100, Centro, Oaxaca, C.P. 68000"
      },
      {
        id: 2,
        nombre: "Sucursal Norte",
        obligacion: "Impuesto Sobre Nóminas",
        ambito: "URBANO",
        domicilio:
          "Calle Morelos 250, Reforma, Oaxaca, C.P. 68050"
      },
      {
        id: 3,
        nombre: "Hotel Costa Azul",
        obligacion: "Impuesto Sobre Hospedaje",
        ambito: "RURAL",
        domicilio:
          "Carretera Federal Km 10, Puerto Escondido"
      }
    ]);
  const totalPorcentaje = actividadesAgregadas.reduce(
    (acc, item) => acc + Number(item.porcentaje || 0),
    0
  );
  const obligaciones = [
    {
      id: 1,
      nombre: "Impuesto Sobre Nóminas",
      actividad: "Prestación de Servicios",
      cumplidas: 10,
      pendientes: 2,
      declaraciones: [
        { periodo: "Enero 2026", estatus: "Cumplido" },
        { periodo: "Febrero 2026", estatus: "Cumplido" },
        { periodo: "Marzo 2026", estatus: "No Cumplido" },
        { periodo: "Abril 2026", estatus: "No Cumplido" }
      ]
    },
    {
      id: 2,
      nombre: "Impuesto Sobre Hospedaje",
      actividad: "Servicios Turísticos",
      cumplidas: 12,
      pendientes: 0,
      declaraciones: [
        { periodo: "Enero 2026", estatus: "Cumplido" },
        { periodo: "Febrero 2026", estatus: "Cumplido" }
      ]
    },
    {
      id: 3,
      nombre: "Impuesto Sobre Hospedaje",
      actividad: "Servicios Turísticos",
      cumplidas: 12,
      pendientes: 0,
      declaraciones: [
        { periodo: "Enero 2026", estatus: "Cumplido" },
        { periodo: "Febrero 2026", estatus: "Cumplido" }
      ]
    },
    {
      id: 4,
      nombre: "Impuesto Sobre Hospedaje",
      actividad: "Servicios Turísticos",
      cumplidas: 12,
      pendientes: 0,
      declaraciones: [
        { periodo: "Enero 2026", estatus: "Cumplido" },
        { periodo: "Febrero 2026", estatus: "Cumplido" }
      ]
    },
    {
      id: 6,
      nombre: "Impuesto Sobre Hospedaje",
      actividad: "Servicios Turísticos",
      cumplidas: 12,
      pendientes: 0,
      declaraciones: [
        { periodo: "Enero 2026", estatus: "Cumplido" },
        { periodo: "Febrero 2026", estatus: "Cumplido" }
      ]
    },
    {
      id: 7,
      nombre: "Impuesto Sobre Hospedaje",
      actividad: "Servicios Turísticos",
      cumplidas: 12,
      pendientes: 0,
      declaraciones: [
        { periodo: "Enero 2026", estatus: "Cumplido" },
        { periodo: "Febrero 2026", estatus: "Cumplido" }
      ]
    }
  ];
  const newRepresentante = {
    id: Date.now(),
    rfc: "AAA010101AAA",
    nombre: "Representante Nuevo",
    tipo: "Representante Legal",
    correo: "correo@test.com",
    telefono: "9511234567"
  };
  const steps = [
    { label: "BÚSQUEDA", icon: Search },
    { label: "COINCIDENCIAS", icon: Users },
    { label: "DATOS DEL CONTRIBUYENTE", icon: User },
    { label: "TIPOS DE AVISOS", icon: FileText },
    { label: "AVISO", icon: FileText },
    { label: "FINALIZADO", icon: CheckCircle },
  ];
  const representantes = [
    {
      id: 1,
      rfc: "ROMJ800510ABC",
      nombre: "ROMÁN ORTIZ SOSA",
      curp: "ROSR800510HTCRMN01",
      correo: "roman@email.com",
      telefono: "9511234567",
      tipo: "Administrador Único",
    },
    {
      id: 2,
      rfc: "PELG790321XYZ",
      nombre: "PEDRO LÓPEZ GARCÍA",
      curp: "PEGP790321HTCRRD02",
      correo: "pedro@email.com",
      telefono: "9519998877",
      tipo: "Apoderado Legal",
    },
  ];
  const movimientos = [
    {
      id: "cambio",
      titulo: "Cambio Único",
      descripcion:
        "Sustituye un representante legal por otro representante legal."
    },
    {
      id: "eliminacion",
      titulo: "Eliminación",
      descripcion:
        "Permite dar de baja uno o varios representantes legales."
    },
    {
      id: "multiple",
      titulo: "Sustitución Múltiple",
      descripcion:
        "Da de baja uno o varios representantes legales y registra uno nuevo."
    }
  ];
  const handleBuscar = () => {
    setActiveStep(1);
  };
  const domicilioConsulta = {
    codigoPostal: "68000",

    // Datos Generales
    ambito: "Urbano",
    region: "Valles Centrales",
    distrito: "Centro",
    municipio: "Oaxaca de Juárez",
    localidad: "Oaxaca de Juárez",
    tipoAsentamiento: "Colonia",
    nombreAsentamiento: "Centro",
    tipoInmueble: "Local Comercial",

    // Ubicación del Domicilio
    tipoVialidad: "Calle",
    nombreVialidad: "Morelos",
    numeroExterior: "125",
    numeroInterior: "A",
    entreVialidad: "Guerrero",
    yVialidad: "Hidalgo",
    ubicacionManzana: "Frente al Jardín Morelos",

    // Información Complementaria
    caracteristicas:
      "Edificación de dos niveles con fachada color beige.",

    referencias:
      "Ubicado frente al Jardín Morelos y a un costado de la sucursal bancaria.",

    // Domicilio concatenado
    domicilioCompleto:
      "Calle Morelos No. 125 Int. A, Col. Centro, Oaxaca de Juárez, Oaxaca, C.P. 68000, Región Valles Centrales."
  };
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">

      {/* HEADER */}
      <header className="bg-gradient-to-r from-sky-900 to-sky-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Sistema Financiero de Oaxaca
            </h1>
            <p className="text-sky-100 text-sm">
              Administración Tributaria Estatal
            </p>
          </div>

          <div className="text-right text-white">
            <p className="font-medium">Usuario Administrador</p>
            <p className="text-sm text-sky-100">Avisos Fiscales</p>
          </div>
        </div>
      </header>

      {/* BREADCRUMB */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-8 py-3 text-sm text-slate-500">
          INICIO / ADMINISTRACIÓN DE CONTRIBUYENTES / AVISOS FISCALES
        </div>
      </div>

      {/* CONTENIDO */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-8">

        {/* TITULO */}
        <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            AVISOS FISCALES
          </h2>

          <p className="text-slate-500 mt-2">
          </p>
        </div>

        {/* STEPPER */}
        <div className="bg-white rounded-xl border shadow-sm p-8 mb-6">
          <div className="relative flex justify-between">
            <div className="absolute top-5 left-0 right-0 h-1 bg-slate-200 z-0" />

            {steps.map((step, index) => {
              const Icon = step.icon;

              const completed = index < activeStep;
              const current = index === activeStep;

              return (
                <div
                  key={index}
                  className="relative z-10 flex flex-col items-center w-36"
                >
                  <button
                    type="button"
                    onClick={() => setActiveStep(index)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all
                      ${completed
                        ? "bg-green-600 border-green-600 text-white"
                        : current
                          ? "bg-sky-700 border-sky-700 text-white"
                          : "bg-white border-slate-300 text-slate-500"
                      }
                    `}
                  >
                    <Icon size={18} />
                  </button>

                  <span
                    className={`mt-3 text-xs text-center font-medium leading-4
                    ${current
                        ? "text-sky-700"
                        : completed
                          ? "text-green-700"
                          : "text-slate-500"
                      }
                  `}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* PESTAÑA BÚSQUEDA */}
        {activeStep === 0 && (
          <div className="bg-white rounded-xl border shadow-sm">
            <div className="border-b px-6 py-5">
              <h3 className="text-lg font-semibold text-slate-800">
                Búsqueda de Contribuyente
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Seleccione el tipo de persona y el método de búsqueda para
                localizar al contribuyente.
              </p>
            </div>

            <div className="p-6 space-y-8">
              {/* TIPO PERSONA */}
              <section>
                <h4 className="font-semibold text-slate-700 mb-4">
                  Tipo de Persona
                </h4>

                <div className="grid md:grid-cols-2 gap-4">
                  <label
                    className={`border rounded-xl p-4 cursor-pointer transition hover:border-sky-500
                    ${tipoPersona === "fisica"
                        ? "border-sky-600 bg-sky-50"
                        : ""
                      }`}
                  >
                    <input
                      type="radio"
                      className="hidden"
                      value="fisica"
                      checked={tipoPersona === "fisica"}
                      onChange={(e) => {
                        setTipoPersona(e.target.value);
                        setMetodoBusqueda("");
                      }}
                    />

                    <div className="flex items-center gap-3">
                      <User size={20} />
                      <span className="font-medium">
                        Persona Física
                      </span>
                    </div>
                  </label>

                  <label
                    className={`border rounded-xl p-4 cursor-pointer transition hover:border-sky-500
                    ${tipoPersona === "moral"
                        ? "border-sky-600 bg-sky-50"
                        : ""
                      }`}
                  >
                    <input
                      type="radio"
                      className="hidden"
                      value="moral"
                      checked={tipoPersona === "moral"}
                      onChange={(e) => {
                        setTipoPersona(e.target.value);
                        setMetodoBusqueda("");
                      }}
                    />

                    <div className="flex items-center gap-3">
                      <Building2 size={20} />
                      <span className="font-medium">
                        Persona Moral o Unidad Económica
                      </span>
                    </div>
                  </label>
                </div>
              </section>

              {/* METODO BUSQUEDA */}
              {tipoPersona && (
                <section>
                  <h4 className="font-semibold text-slate-700 mb-4">
                    Método de Búsqueda
                  </h4>

                  <select
                    value={metodoBusqueda}
                    onChange={(e) =>
                      setMetodoBusqueda(e.target.value)
                    }
                    className="w-full md:w-96 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-sky-600 outline-none"
                  >
                    <option value="">
                      Seleccione una opción
                    </option>

                    <option value="rfc">
                      Por RFC
                    </option>

                    <option value="nombre">
                      Por Nombre o Razón Social
                    </option>
                  </select>
                </section>
              )}

              {/* RFC */}
              {metodoBusqueda === "rfc" && (
                <section>
                  <h4 className="font-semibold text-slate-700 mb-4">
                    RFC
                  </h4>

                  <input
                    type="text"
                    maxLength={13}
                    placeholder="Ingrese RFC"
                    className="w-full md:w-96 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-sky-600 outline-none"
                  />
                </section>
              )}

              {/* PERSONA FISICA */}
              {metodoBusqueda === "nombre" &&
                tipoPersona === "fisica" && (
                  <section>
                    <h4 className="font-semibold text-slate-700 mb-4">
                      Datos de la Persona Física
                    </h4>

                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <label className="block mb-2 font-medium text-slate-700">
                          Primer Apellido *
                        </label>

                        <input
                          type="text"
                          className="w-full border rounded-lg px-4 py-3"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 font-medium text-slate-700">
                          Segundo Apellido
                        </label>

                        <input
                          type="text"
                          className="w-full border rounded-lg px-4 py-3"
                        />
                      </div>

                      <div className="col-span-1">
                        <label className="block mb-2 font-medium text-slate-700">
                          Nombre(s) *
                        </label>

                        <input
                          type="text"
                          className="w-full border rounded-lg px-4 py-3"
                        />
                      </div>

                    </div>

                  </section>
                )}

              {/* PERSONA MORAL */}
              {metodoBusqueda === "nombre" &&
                tipoPersona === "moral" && (
                  <section>
                    <h4 className="font-semibold text-slate-700 mb-4">
                      Datos de la Persona Moral o Unidad Económica
                    </h4>

                    <div>
                      <label className="block mb-2 font-medium text-slate-700">
                        Denominación o Razón Social *
                      </label>

                      <input
                        type="text"
                        className="w-full border rounded-lg px-4 py-3"
                      />
                    </div>
                  </section>
                )}
            </div>

            <div className="border-t px-6 py-4 flex justify-between">
              <button
                type="button"
                className="px-5 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleBuscar}
                className="px-6 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg flex items-center gap-2"
              >
                <Search size={18} />
                Buscar
              </button>
            </div>
          </div>

        )}

        {/* COINCIDENCIAS */}
        {activeStep === 1 && (
          <div className="bg-white rounded-xl border shadow-sm">

            <div className="border-b px-6 py-5">
              <h3 className="text-xl font-semibold text-slate-800">
                Coincidencias
              </h3>

              <p className="text-slate-500 mt-2">
                Seleccione al contribuyente para dar inicio a su aviso fiscal.
              </p>
            </div>

            <div className="p-6">

              {/* PERSONA FISICA */}

              {tipoPersona === "fisica" && (
                <div className="overflow-x-auto">

                  <table className="w-full text-sm border border-slate-200">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="p-3 border">Seleccionar</th>
                        <th className="p-3 border">Tipo Persona</th>
                        <th className="p-3 border">RFC</th>
                        <th className="p-3 border">Nombre</th>
                        <th className="p-3 border">Primer Apellido</th>
                        <th className="p-3 border">Segundo Apellido</th>
                        <th className="p-3 border">Nombre Comercial</th>
                        <th className="p-3 border">Fecha Nacimiento</th>
                        <th className="p-3 border">CURP</th>
                        <th className="p-3 border">Estatus</th>
                        <th className="p-3 border">Origen</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="hover:bg-sky-50">
                        <td className="border p-3 text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="border p-3">Física</td>
                        <td className="border p-3">MORL900512ABC</td>
                        <td className="border p-3">JUAN</td>
                        <td className="border p-3">MORALES</td>
                        <td className="border p-3">LÓPEZ</td>
                        <td className="border p-3">ABARROTES JUAN</td>
                        <td className="border p-3">12/05/1990</td>
                        <td className="border p-3">MOLJ900512HTCRPN01</td>
                        <td className="border p-3">
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                            ACTIVO
                          </span>
                        </td>
                        <td className="border p-3">SIOX</td>
                      </tr>

                      <tr className="hover:bg-sky-50">
                        <td className="border p-3 text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="border p-3">Física</td>
                        <td className="border p-3">PEMG850318XYZ</td>
                        <td className="border p-3">MARÍA</td>
                        <td className="border p-3">PÉREZ</td>
                        <td className="border p-3">GARCÍA</td>
                        <td className="border p-3">PAPELERÍA DEL SUR</td>
                        <td className="border p-3">18/03/1985</td>
                        <td className="border p-3">PEGM850318MTCRRR02</td>
                        <td className="border p-3">
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                            ACTIVO
                          </span>
                        </td>
                        <td className="border p-3">SIOX</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* PERSONA MORAL */}

              {tipoPersona === "moral" && (
                <div className="overflow-x-auto">

                  <table className="w-full text-sm border border-slate-200">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="p-3 border">Seleccionar</th>
                        <th className="p-3 border">Tipo Persona</th>
                        <th className="p-3 border">RFC</th>
                        <th className="p-3 border">
                          Denominación o Razón Social
                        </th>
                        <th className="p-3 border">
                          Nombre Comercial
                        </th>
                        <th className="p-3 border">
                          Fecha Acta Constitutiva
                        </th>
                        <th className="p-3 border">Estatus</th>
                        <th className="p-3 border">Origen</th>
                        <th className="p-3 border">Tipo Entidad</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="hover:bg-sky-50">
                        <td className="border p-3 text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="border p-3">Moral</td>
                        <td className="border p-3">CSO210315AA1</td>
                        <td className="border p-3">
                          COMERCIALIZADORA DEL SUR S.A. DE C.V.
                        </td>
                        <td className="border p-3">
                          COMSUR
                        </td>
                        <td className="border p-3">
                          15/03/2021
                        </td>
                        <td className="border p-3">
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                            ACTIVO
                          </span>
                        </td>
                        <td className="border p-3">
                          REC
                        </td>
                        <td className="border p-3">
                          PRINCIPAL
                        </td>
                      </tr>

                      <tr className="hover:bg-sky-50">
                        <td className="border p-3 text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="border p-3">Unidad Económica</td>
                        <td className="border p-3">TSO220614B22</td>
                        <td className="border p-3">
                          TECNOLOGÍAS DEL SURESTE
                        </td>
                        <td className="border p-3">
                          TDS
                        </td>
                        <td className="border p-3">
                          14/06/2022
                        </td>
                        <td className="border p-3">
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                            ACTIVO
                          </span>
                        </td>
                        <td className="border p-3">
                          REC
                        </td>
                        <td className="border p-3">
                          SECUNDARIA
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

            </div>

            <div className="border-t px-6 py-4 flex justify-between">
              <button
                type="button"
                onClick={() => setActiveStep(0)}
                className="px-5 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="px-6 py-2 bg-sky-700 text-white rounded-lg hover:bg-sky-800"
              >
                Iniciar Aviso
              </button>
            </div>
          </div>
        )}

        {/* DATOS DEL CONTRIBUYENTE */}
        {activeStep === 2 && (
          <div className="bg-white rounded-xl border shadow-sm">

            {/* ENCABEZADO */}
            <div className="border-b px-6 py-5">
              <h3 className="text-xl font-semibold text-slate-800">
                Datos del Contribuyente
              </h3>

              <p className="text-slate-500 mt-2">
                Información general del contribuyente seleccionado.
              </p>
            </div>

            <div className="p-6 space-y-8">
              <div>
                {tipoPersona === "fisica" && (
                  <section>

                    {/* ============================= */}
                    {/* DATOS DE IDENTIFICACION */}
                    {/* ============================= */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-4">
                        <User size={20} className="text-sky-700" />
                        <h4 className="text-lg font-semibold text-slate-800">
                          Datos de Identificación
                        </h4>
                      </div>

                      <div className="grid grid-cols-3 gap-5">

                        <div>
                          <label className="text-sm font-medium text-slate-600">
                            Tipo Registro
                          </label>
                          <input
                            disabled
                            value="RFC"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-slate-600">
                            RFC
                          </label>
                          <input
                            disabled
                            value="MORL900512ABC"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-600">
                            CURP
                          </label>
                          <input
                            disabled
                            value="MOLJ900512HTCRPN01"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-600">
                            Primer Apellido
                          </label>
                          <input
                            disabled
                            value="MORALES"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-slate-600">
                            Segundo Apellido
                          </label>
                          <input
                            disabled
                            value="LÓPEZ"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-slate-600">
                            Nombre(s)
                          </label>
                          <input
                            disabled
                            value="JUAN CARLOS"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>

                        <div className="col-span-3">
                          <label className="text-sm font-medium text-slate-600">
                            Nombre Comercial
                          </label>
                          <input
                            disabled
                            value="ABARROTES JUAN"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>
                        <div className="col-span-3">
                          <label className="text-sm font-medium text-slate-600">
                            Régimen Fiscal
                          </label>
                          <input
                            disabled
                            value="Régimen Simplificado de Confianza"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-600">
                            Fecha de Nacimiento
                          </label>
                          <input
                            disabled
                            value="12/05/1990"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-slate-600">
                            Género
                          </label>
                          <input
                            disabled
                            value="Masculino"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>

                      </div>
                    </div>

                    {/* ============================= */}
                    {/* DATOS DE CONTACTO */}
                    {/* ============================= */}

                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Smartphone size={20} className="text-sky-700" />
                        <h4 className="text-lg font-semibold text-slate-800">
                          Datos de Contacto
                        </h4>
                      </div>

                      <div className="grid md:grid-cols-3 gap-5">

                        <div>
                          <label className="text-sm font-medium text-slate-600">
                            Correo Electrónico
                          </label>
                          <input
                            disabled
                            value="juan.morales@email.com"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-600">
                            Correo Electrónico (Alternativo)
                          </label>
                          <input
                            disabled
                            value="juan.morales@email.com"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-slate-600">
                            Teléfono Móvil
                          </label>
                          <input
                            disabled
                            value="9511234567"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-slate-600">
                            Teléfono (Alternativo)
                          </label>
                          <input
                            disabled
                            value="9511234567"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                )}
                {tipoPersona === "moral" && (
                  <section>
                    <div className="mb-4">
                      {/* ============================= */}
                      {/* DATOS DE IDENTIFICACION */}
                      {/* ============================= */}
                      <div className="flex items-center gap-2 mb-4">
                        <User size={20} className="text-sky-700" />
                        <h4 className="text-lg font-semibold text-slate-800">
                          Datos de Identificación
                        </h4>
                      </div>

                      <div className="grid grid-cols-3 gap-5">

                        <div>
                          <label className="text-sm font-medium text-slate-600">
                            Tipo Registro
                          </label>
                          <input
                            disabled
                            value="RFC"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-slate-600">
                            RFC
                          </label>
                          <input
                            disabled
                            value="MORL900512ABC"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-600">
                            Denominación o razón social
                          </label>
                          <input
                            disabled
                            value="MOLJ900512HTCRPN01"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>
                        <div className="col-span-3">
                          <label className="text-sm font-medium text-slate-600">
                            Régimen Capital
                          </label>
                          <input
                            disabled
                            value="Régimen Simplificado de Confianza"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>

                        <div className="col-span-3">
                          <label className="text-sm font-medium text-slate-600">
                            Régimen Fiscal
                          </label>
                          <input
                            disabled
                            value="Régimen Simplificado de Confianza"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>

                        <div className="col-span-3">
                          <label className="text-sm font-medium text-slate-600">
                            Nombre Comercial
                          </label>
                          <input
                            disabled
                            value="ABARROTES JUAN"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-slate-600">
                            Fecha de Acta Constitutiva
                          </label>
                          <input
                            disabled
                            value="12/05/1990"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>


                      </div>
                    </div>
                    {/* ============================= */}
                    {/* DATOS DE CONTACTO */}
                    {/* ============================= */}

                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Smartphone size={20} className="text-sky-700" />
                        <h4 className="text-lg font-semibold text-slate-800">
                          Datos de Contacto
                        </h4>
                      </div>

                      <div className="grid md:grid-cols-3 gap-5">

                        <div>
                          <label className="text-sm font-medium text-slate-600">
                            Correo Electrónico
                          </label>
                          <input
                            disabled
                            value="juan.morales@email.com"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-600">
                            Correo Electrónico (Alternativo)
                          </label>
                          <input
                            disabled
                            value="juan.morales@email.com"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-slate-600">
                            Teléfono Móvil
                          </label>
                          <input
                            disabled
                            value="9511234567"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-slate-600">
                            Teléfono (Alternativo)
                          </label>
                          <input
                            disabled
                            value="9511234567"
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-slate-100"
                          />
                        </div>
                      </div>
                    </div>
                  </section>


                )}

              </div>

              {/* ============================= */}
              {/* DOMICILIO FISCAL */}
              {/* ============================= */}

              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Building2 size={20} className="text-sky-700" />
                  <h4 className="text-lg font-semibold text-slate-800">
                    Domicilio Fiscal
                  </h4>
                </div>

                <div className="bg-slate-50 border rounded-xl p-5">

                  <div className="mb-3">
                    <span className="font-semibold text-slate-700">
                      Tipo de Ámbito:
                    </span>

                    <span className="ml-2 px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm">
                      URBANO
                    </span>
                  </div>

                  <p className="text-slate-700 leading-relaxed">
                    Calle Benito Juárez No. 125 Interior 3,
                    Colonia Centro, Localidad Oaxaca de Juárez,
                    Municipio Oaxaca de Juárez,
                    C.P. 68000, Región Valles Centrales.
                  </p>

                </div>
              </section>

              {/* ============================= */}
              {/* OBLIGACIONES FISCALES */}
              {/* ============================= */}

              <section>
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={20} className="text-sky-700" />
                  <h4 className="text-lg font-semibold text-slate-800">
                    Obligaciones Fiscales Activas
                  </h4>
                </div>

                <div className="grid md:grid-cols-2 gap-5">

                  <div className="border rounded-xl p-5 bg-slate-50">
                    <h5 className="font-semibold text-slate-800">
                      Impuesto Sobre Erogaciones
                    </h5>

                    <p className="text-sm text-slate-600 mt-2">
                      Actividad Económica:
                    </p>

                    <p className="font-medium">
                      Comercio al por menor de abarrotes
                    </p>

                    <p className="text-sm text-slate-600 mt-3">
                      Inicio de operaciones:
                    </p>

                    <p className="font-medium">
                      15/01/2020
                    </p>
                  </div>

                  <div className="border rounded-xl p-5 bg-slate-50">
                    <h5 className="font-semibold text-slate-800">
                      Hospedaje
                    </h5>

                    <p className="text-sm text-slate-600 mt-2">
                      Actividad Económica:
                    </p>

                    <p className="font-medium">
                      Servicios turísticos
                    </p>

                    <p className="text-sm text-slate-600 mt-3">
                      Inicio de operaciones:
                    </p>

                    <p className="font-medium">
                      02/03/2021
                    </p>
                  </div>

                </div>
              </section>

              {/* ============================= */}
              {/* REPRESENTACIÓN DEL TRÁMITE */}
              {/* ============================= */}

              <section >
                <div className="flex gap-2">
                  <BookUser size={20} className="text-sky-700" />
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Representación del Trámite
                  </h4>
                </div>
                <div className="border rounded-xl p-6 mb-4">

                  <p className="text-slate-600 mb-4">
                    Seleccione la persona que llevará a cabo el trámite.
                  </p>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="representacion"
                        checked={representacion === "propio"}
                        onChange={() => setRepresentacion("propio")}
                      />
                      El contribuyente realizará el trámite.
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="representacion"
                        checked={representacion === "tercero"}
                        onChange={() => setRepresentacion("tercero")}
                      />
                      El trámite será realizado por una tercera persona con facultades de representación.
                    </label>
                  </div>
                </div>
              </section>

              {representacion === "tercero" && (
                <section>
                  {!mostrarFormularioRepresentante && (
                    <div className="bg-white border rounded-xl p-6 mt-4">
                      {!representanteSeleccionado && (
                        <div>
                          {/*Header */}
                          <div className="flex justify-between items-center mb-4">

                            <h4 className="font-semibold text-slate-800">
                              Representantes Legales Registrados
                            </h4>

                            <button
                              type="button"
                              onClick={() => {
                                setMostrarFormularioRepresentante(true);
                              }}
                              className="bg-sky-700 hover:bg-sky-800 text-white px-4 py-2 rounded-lg text-sm font-medium">
                              + Agregar Representante Legal
                            </button>

                          </div>

                          {/* Tabla de datos representantes */}
                          <div className="overflow-x-auto">

                            <table className="w-full text-sm">
                              <thead className="bg-slate-100">
                                <tr>
                                  <th className="p-3">Seleccionar</th>
                                  <th className="p-3">RFC</th>
                                  <th className="p-3">Nombre</th>
                                  <th className="p-3">Tipo</th>
                                </tr>
                              </thead>

                              <tbody>
                                {representantes.map((rep) => (
                                  <tr key={rep.id}>
                                    <td className="p-3 text-center">
                                      <input
                                        type="radio"
                                        name="representante"
                                        onChange={() =>
                                          setRepresentanteSeleccionado(rep)
                                        }
                                      />
                                    </td>

                                    <td className="p-3">{rep.rfc}</td>
                                    <td className="p-3">{rep.nombre}</td>
                                    <td className="p-3">{rep.tipo}</td>
                                  </tr>
                                ))}
                              </tbody>

                            </table>

                          </div>
                        </div>
                      )}
                      {representanteSeleccionado && (
                        <div className="border rounded-xl bg-sky-50 p-6">

                          <div className="flex justify-between items-center mb-5">

                            <h4 className="font-semibold text-slate-800">
                              Representante Legal Seleccionado
                            </h4>

                            <button
                              type="button"
                              onClick={() =>
                                setRepresentanteSeleccionado(null)
                              }
                              className="text-sky-700 font-medium hover:underline"
                            >
                              Cambiar representante
                            </button>

                          </div>

                          <div className="grid md:grid-cols-3 gap-4">

                            <div>
                              <label className="text-xs text-slate-500">
                                RFC
                              </label>
                              <div className="font-medium">
                                {representanteSeleccionado.rfc}
                              </div>
                            </div>

                            <div>
                              <label className="text-xs text-slate-500">
                                Nombre
                              </label>
                              <div className="font-medium">
                                {representanteSeleccionado.nombre}
                              </div>
                            </div>

                            <div>
                              <label className="text-xs text-slate-500">
                                Tipo de Representación
                              </label>
                              <div className="font-medium">
                                {representanteSeleccionado.tipo}
                              </div>
                            </div>

                            <div>
                              <label className="text-xs text-slate-500">
                                Correo
                              </label>
                              <div className="font-medium">
                                {representanteSeleccionado.correo}
                              </div>
                            </div>

                            <div>
                              <label className="text-xs text-slate-500">
                                Teléfono
                              </label>
                              <div className="font-medium">
                                {representanteSeleccionado.telefono}
                              </div>
                            </div>

                          </div>

                        </div>

                      )}
                    </div>
                  )}

                  {mostrarFormularioRepresentante && (
                    <RepresentanteLegalForm className="mt-5"
                      titulo="Nuevo Representante Legal"
                      onGuardar={() => {
                        setMostrarFormularioRepresentante(false);
                      }}
                      onCancelar={() => {
                        setMostrarFormularioRepresentante(false);
                      }}
                    />

                  )}

                </section>

              )}

            </div>

            {/* BOTONES */}
            <div className="border-t px-6 py-4 flex justify-between">

              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className="px-5 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Cancelar
              </button>

              <button
                disabled={!representacion}
                onClick={() => setActiveStep(3)}
                className={`px-6 py-2 rounded-lg text-white
    ${representacion
                    ? "bg-sky-700 hover:bg-sky-800"
                    : "bg-slate-300 cursor-not-allowed"
                  }
  `}
              >
                Siguiente
              </button>

            </div>

          </div>
        )
        }

        {/* TIPOS DE AVISOS */}
        {
          activeStep === 3 && (
            <div className="bg-white rounded-xl border shadow-sm">

              <div className="border-b px-6 py-5">
                <h3 className="text-xl font-semibold text-slate-800">
                  Tipos de Avisos
                </h3>

                <p className="text-slate-500 mt-2 font-medium">
                  Seleccione el aviso a presentar
                </p>
              </div>


              <div className="mx-4 mb-6 mt-4">

                <div className="bg-slate-50 border rounded-xl p-5">

                  <div className="grid md:grid-cols-2 gap-6 items-center">

                    <div className="flex justify-start">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">
                          Estado Actual del Contribuyente
                        </p>

                        <div className="flex items-center gap-3">

                          <div className="w-3 h-3 rounded-full bg-green-500"></div>

                          <span className="font-semibold text-slate-800">
                            ACTIVO
                          </span>

                        </div>

                      </div>

                    </div>
                    <div>

                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Fecha del Aviso ante el SAT
                        <span className="text-red-600 ml-1">*</span>
                      </label>

                      <input
                        type="date"
                        value={fechaAvisoSAT}
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setFechaAvisoSAT(e.target.value)}
                        className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            bg-white
            focus:ring-2
            focus:ring-sky-600
            focus:border-sky-600
            outline-none
            transition
          "
                      />

                      <div className="flex items-center gap-2 mt-2">

                        <span className="text-amber-500 text-sm">
                          ℹ
                        </span>

                        <p className="text-xs text-slate-500">
                          La fecha debe ser menor o igual a la fecha actual.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {fechaAvisoSAT && (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mx-4 mb-4">

                  {[
                    "Cambio de Domicilio Fiscal",
                    "Cambio de Nombre, Denominación o Razón Social",
                    "Cambio de Representante Legal",
                    "Aumento de Obligaciones",
                    "Reanudación de Actividades",
                    "Disminución de Obligaciones",
                    "Suspensión de Actividades",
                    "Apertura de Establecimientos o Locales",
                    "Cierre de Establecimientos o Locales",
                    "Cancelación en el Registro Estatal de Contribuyentes"
                  ].map((aviso, index) => (
                    <label
                      key={index}
                      className={`
                              border-2 rounded-xl p-5 cursor-pointer
                              transition-all duration-200
                              hover:border-sky-600 hover:shadow-md
                              ${selectedRow === aviso
                          ? "border-sky-700 bg-sky-50"
                          : "border-slate-200"
                        }`}
                    >
                      <input
                        type="radio"
                        name="aviso"
                        className="hidden"
                        checked={selectedRow === aviso}
                        onChange={() => setSelectedRow(aviso)}
                      />

                      <div className="flex items-start gap-3">
                        <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center
                              ${selectedRow === aviso
                            ? "border-sky-700"
                            : "border-slate-400"
                          }`}>

                          {selectedRow === aviso && (
                            <div className="w-2.5 h-2.5 rounded-full bg-sky-700"></div>
                          )}

                        </div>

                        <div>
                          <h5 className="font-medium text-slate-800">
                            {aviso}
                          </h5>
                        </div>

                      </div>

                    </label>

                  ))}

                </div>

              )
              }

              <div className="border-t px-6 py-4 flex justify-between">

                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-5 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={() => {

                    if (!selectedRow) {
                      alert("Debe seleccionar un aviso fiscal.");
                      return;
                    }

                    if (!fechaAvisoSAT) {
                      alert("Debe capturar la Fecha del Aviso ante el SAT.");
                      return;
                    }

                    setActiveStep(5);

                  }}
                  className="px-6 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg"
                >
                  Continuar
                </button>

              </div>

            </div>
          )
        }

        {/*Cambio de domicilio fiscal */}
        {
          selectedRow === "Cambio de Domicilio Fiscal" && activeStep === 5 && (
            <div className="space-y-6">

              {/* Header */}
              <div className="bg-white rounded-xl border shadow-sm p-6">

                <h1 className="text-2xl font-semibold text-slate-800">
                  Cambio de Domicilio Fiscal
                </h1>

                <p className="text-slate-500 mt-2">
                  Consulte el domicilio fiscal actual y capture la nueva información.
                </p>

              </div>

              <div className="grid xl:grid-cols-3 gap-6">

                {/* DOMICILIO ACTUAL */}
                <div className="xl:col-span-1">

                  <div className="bg-white rounded-xl border shadow-sm overflow-hidden">

                    <div className="bg-slate-50 border-b px-6 py-4">

                      <h2 className="font-semibold text-slate-800">
                        Domicilio Fiscal Actual
                      </h2>

                    </div>

                    <div className="p-6">

                      <div className="flex items-center gap-3 mb-5">

                        <div className="h-12 w-12 rounded-xl bg-sky-100 flex items-center justify-center">
                          <Home className="text-sky-700" size={22} />
                        </div>

                        <div>
                          <p className="font-medium text-slate-800">
                            Domicilio Fiscal Vigente
                          </p>

                          <p className="text-sm text-slate-500">
                            Consulta en modo lectura
                          </p>
                        </div>

                      </div>

                      <div className="bg-slate-50 border rounded-xl p-4">

                        <p className="text-sm text-slate-700 leading-relaxed">
                          Calle Morelos No. 125 Int. A,
                          Col. Centro,
                          Oaxaca de Juárez,
                          Oaxaca,
                          C.P. 68000.
                        </p>

                      </div>

                      <button
                        type="button"
                        onClick={() => setModalDetalleDomicilio(true)}
                        className="
    mt-4 w-full
    border rounded-lg
    py-2.5
    hover:bg-slate-50
  "
                      >
                        Ver detalle completo
                      </button>

                    </div>

                  </div>

                </div>

                {modalDetalleDomicilio && (
                  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">

                      {/* Header */}

                      <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">

                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">
                            Detalle del Domicilio Fiscal
                          </h3>

                          <p className="text-sm text-slate-500">
                            Información mostrada conforme a la RN-002: Estructura de Domicilios
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setModalDetalleDomicilio(false)}
                          className="px-4 py-2 border rounded-lg hover:bg-slate-50"
                        >
                          Cerrar
                        </button>

                      </div>

                      <div className="p-6 space-y-8">

                        {/* Código Postal */}

                        <section className="bg-slate-50 rounded-xl p-4 border">

                          <label className="text-xs uppercase text-slate-500 font-medium">
                            Código Postal
                          </label>

                          <p className="mt-1 font-medium text-slate-800">
                            68000
                          </p>

                        </section>

                        {/* DATOS GENERALES */}

                        <section>

                          <h4 className="font-semibold text-slate-800 mb-4">
                            Datos Generales del Domicilio
                          </h4>

                          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

                            <CampoConsulta
                              etiqueta="Tipo de Ámbito"
                              valor={domicilioConsulta.ambito}
                            />

                            <CampoConsulta
                              etiqueta="Región"
                              valor={domicilioConsulta.region}
                            />

                            <CampoConsulta
                              etiqueta="Distrito"
                              valor={domicilioConsulta.distrito}
                            />

                            <CampoConsulta
                              etiqueta="Municipio"
                              valor={domicilioConsulta.municipio}
                            />

                            <CampoConsulta
                              etiqueta="Localidad"
                              valor={domicilioConsulta.localidad}
                            />

                            <CampoConsulta
                              etiqueta="Tipo de Asentamiento"
                              valor={domicilioConsulta.tipoAsentamiento}
                            />

                            <CampoConsulta
                              etiqueta="Nombre del Asentamiento"
                              valor={domicilioConsulta.nombreAsentamiento}
                            />

                            <CampoConsulta
                              etiqueta="Tipo de Inmueble"
                              valor={domicilioConsulta.tipoInmueble}
                            />

                          </div>

                        </section>

                        {/* UBICACIÓN DEL DOMICILIO */}

                        <section>

                          <h4 className="font-semibold text-slate-800 mb-4">
                            Ubicación del Domicilio
                          </h4>

                          {/* Urbano */}

                          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

                            <CampoConsulta
                              etiqueta="Tipo de Vialidad"
                              valor={domicilioConsulta.tipoVialidad}
                            />

                            <CampoConsulta
                              etiqueta="Nombre de Vialidad"
                              valor={domicilioConsulta.nombreVialidad}
                            />

                            <CampoConsulta
                              etiqueta="Número Exterior y/o Letra"
                              valor={domicilioConsulta.numeroExterior}
                            />

                            <CampoConsulta
                              etiqueta="Número Interior y/o Letra"
                              valor={domicilioConsulta.numeroInterior}
                            />

                            <CampoConsulta
                              etiqueta="Entre Vialidad"
                              valor={domicilioConsulta.entreVialidad}
                            />

                            <CampoConsulta
                              etiqueta="Y Vialidad"
                              valor={domicilioConsulta.yVialidad}
                            />

                            <CampoConsulta
                              etiqueta="Ubicación dentro de la Manzana"
                              valor={domicilioConsulta.ubicacionManzana}
                            />

                          </div>

                        </section>

                        {/* INFORMACIÓN COMPLEMENTARIA */}

                        <section>

                          <h4 className="font-semibold text-slate-800 mb-4">
                            Información Complementaria
                          </h4>

                          <div className="grid md:grid-cols-2 gap-4">

                            <CampoConsulta
                              etiqueta="Características del Domicilio"
                              valor={domicilioConsulta.caracteristicas}
                            />

                            <CampoConsulta
                              etiqueta="Referencias Adicionales"
                              valor={domicilioConsulta.referencias}
                            />

                          </div>

                        </section>

                        {/* MAPA */}

                        <section>

                          <h4 className="font-semibold text-slate-800 mb-4">
                            Ubicación Geográfica
                          </h4>

                          <div className="h-80 border rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                            Google Maps
                          </div>

                        </section>

                      </div>

                    </div>

                  </div>
                )}
                {/* NUEVO DOMICILIO */}
                <div className="xl:col-span-2">

                  <div className="bg-white rounded-xl border shadow-sm overflow-hidden">

                    <div className="border-b bg-sky-50 px-6 py-4 flex items-center justify-between">

                      <div>

                        <h2 className="font-semibold text-slate-800">
                          Actualizar Datos del Domicilio Fiscal
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                          Capture la información del nuevo domicilio fiscal.
                        </p>

                      </div>

                      <button
                        className="
                  inline-flex items-center gap-2
                  px-4 py-2
                  border rounded-lg
                  bg-white
                  hover:bg-slate-50
                "
                      >
                        <Copy size={16} />
                        Clonar domicilio actual
                      </button>

                    </div>

                    <div className="p-6 space-y-8">

                      {/* CP */}

                      <section>

                        <h3 className="font-medium text-slate-700 mb-4">
                          Búsqueda por Código Postal
                        </h3>

                        <div className="grid md:grid-cols-3 gap-4">

                          <div>
                            <label className="block text-sm mb-2">
                              Código Postal *
                            </label>

                            <input
                              className="w-full border rounded-lg px-3 py-2"
                              placeholder="68000"
                            />
                          </div>

                        </div>

                      </section>

                      {/* DATOS GENERALES */}

                      <section>

                        <h3 className="font-medium text-slate-700 mb-4">
                          Datos Generales del Domicilio
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4">

                          <input className="border rounded-lg p-2" placeholder="Tipo de Ámbito" />
                          <input className="border rounded-lg p-2" placeholder="Región" />
                          <input className="border rounded-lg p-2" placeholder="Distrito" />
                          <input className="border rounded-lg p-2" placeholder="Municipio" />
                          <input className="border rounded-lg p-2" placeholder="Localidad" />
                          <input className="border rounded-lg p-2" placeholder="Tipo de Asentamiento" />
                          <input className="border rounded-lg p-2" placeholder="Nombre de Asentamiento" />
                          <input className="border rounded-lg p-2" placeholder="Tipo de Inmueble" />

                        </div>

                      </section>

                      {/* UBICACIÓN */}

                      <section>

                        <h3 className="font-medium text-slate-700 mb-4">
                          Ubicación del Domicilio
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4">

                          <input className="border rounded-lg p-2" placeholder="Tipo de Vialidad" />
                          <input className="border rounded-lg p-2" placeholder="Nombre de Vialidad" />
                          <input className="border rounded-lg p-2" placeholder="Número Exterior" />
                          <input className="border rounded-lg p-2" placeholder="Número Interior" />
                          <input className="border rounded-lg p-2" placeholder="Entre Vialidad" />
                          <input className="border rounded-lg p-2" placeholder="Y Vialidad" />

                        </div>

                      </section>

                      {/* COMPLEMENTARIA */}

                      <section>

                        <h3 className="font-medium text-slate-700 mb-4">
                          Información Complementaria
                        </h3>

                        <div className="space-y-4">

                          <textarea
                            rows="3"
                            className="w-full border rounded-lg p-3"
                            placeholder="Características del domicilio"
                          />

                          <textarea
                            rows="3"
                            className="w-full border rounded-lg p-3"
                            placeholder="Referencias adicionales"
                          />

                        </div>

                      </section>

                      {/* MAPA */}

                      <section>

                        <div className="flex items-center gap-2 mb-4">

                          <MapPin size={18} />

                          <h3 className="font-medium text-slate-700">
                            Geolocalización
                          </h3>

                        </div>

                        <div
                          className="
                    h-80 rounded-xl border
                    bg-slate-100
                    flex items-center justify-center
                    text-slate-500
                  "
                        >
                          Google Maps
                        </div>

                      </section>

                    </div>

                  </div>

                </div>

              </div>

              {/* Footer */}

              <div className="bg-white border rounded-xl shadow-sm p-4">

                <div className="flex justify-end">

                  <button
                    className="
              inline-flex items-center gap-2
              px-6 py-3
              bg-sky-700 text-white
              rounded-lg
              hover:bg-sky-800
            "
                  >
                    Continuar
                    <ArrowRight size={18} />
                  </button>

                </div>

              </div>

            </div>
          )
        }

        {/*Cambio de representante legal*/}
        {
          selectedRow === "Cambio de Representante Legal" && activeStep === 5 && (
            <div className="space-y-6">

              {/* REPRESENTANTES LEGALES ASOCIADOS */}

              <div className="bg-white rounded-xl border shadow-sm">

                <div className="border-b px-6 py-5">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Representantes Legales Asociados
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Seleccione los representantes legales que serán dados de baja. Los registros no seleccionados permanecerán vigentes.
                  </p>
                </div>

                <div className="p-6 grid md:grid-cols-2 gap-4">

                  {representantesActuales.map((representante) => {
                    const seleccionado = representantesBaja.includes(representante.id);
                    return (
                      <div
                        key={representante.id}
                        onClick={() => {

                          if (seleccionado) {
                            toggleRepresentanteBaja(representante.id);
                            return;
                          }

                          setRepresentantePendiente(representante);
                          setModalConfirmacion(true);
                        }}
                        className={`
    relative border-2 rounded-xl p-5 cursor-pointer transition-all
    ${seleccionado
                            ? "border-red-500 bg-red-50 shadow-sm"
                            : "border-slate-200 hover:border-slate-400 hover:shadow-sm"
                          }
  `}
                      >

                        {/* Indicador de selección */}

                        <div className="absolute top-4 right-4">
                          <input
                            type="checkbox"
                            checked={seleccionado}
                            onChange={() => toggleRepresentanteBaja(representante.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-4 h-4"
                          />
                        </div>

                        {/* Encabezado */}

                        <div className="flex items-start justify-between pr-8">
                          <div>
                            <h4 className="font-semibold text-slate-800">
                              {representante.nombre}
                            </h4>

                            <span
                              className={`
                  inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium
                  ${seleccionado
                                  ? "bg-red-100 text-red-700"
                                  : "bg-emerald-100 text-emerald-700"
                                }
                `}
                            >
                              {seleccionado
                                ? "Marcado para baja"
                                : "Permanecerá vigente"}
                            </span>
                          </div>
                        </div>

                        {/* Información */}

                        <div className="mt-4 space-y-2 text-sm text-slate-600 mb-4">

                          <div>
                            <span className="font-medium text-slate-700">
                              RFC:
                            </span>{" "}
                            {representante.rfc}
                          </div>

                          <div>
                            <span className="font-medium text-slate-700">
                              CURP:
                            </span>{" "}
                            {representante.curp}
                          </div>

                          <div>
                            <span className="font-medium text-slate-700">
                              Estatus:
                            </span>{" "}
                            Vigente
                          </div>

                        </div>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setRepresentanteSeleccionado(representante);
                              setModalRepresentante(true);
                            }}
                            className="px-3 py-2 text-sm border rounded-lg hover:bg-slate-100"
                          >
                            Ver información
                          </button>
                        </div>
                      </div>
                    );
                  })}

                </div>

                {/* Resumen */}

                <div className="border-t bg-slate-50 px-6 py-4 flex items-center justify-between">

                  <div className="text-sm text-slate-600">
                    <span className="font-medium">
                      {representantesBaja.length}
                    </span>{" "}
                    representante(s) seleccionado(s) para baja.
                  </div>

                  {representantesBaja.length > 0 && (
                    <div className="text-sm text-red-600 font-medium">
                      Los registros seleccionados serán eliminados al concluir el trámite.
                    </div>
                  )}

                </div>

              </div>

              {modalRepresentante && representanteSeleccionado && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                  <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">

                    <div className="border-b px-6 py-4 flex justify-between items-center">
                      <h3 className="text-lg font-semibold">
                        Información del Representante Legal
                      </h3>

                      <button
                        onClick={() => setModalRepresentante(false)}
                        className="text-slate-500 hover:text-slate-700"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="p-6 grid md:grid-cols-2 gap-4">

                      <div>
                        <label className="text-xs text-slate-500">
                          Nombre
                        </label>
                        <p className="font-medium">
                          {representanteSeleccionado.nombre}
                        </p>
                      </div>

                      <div>
                        <label className="text-xs text-slate-500">
                          RFC
                        </label>
                        <p className="font-medium">
                          {representanteSeleccionado.rfc}
                        </p>
                      </div>

                      <div>
                        <label className="text-xs text-slate-500">
                          CURP
                        </label>
                        <p className="font-medium">
                          {representanteSeleccionado.curp}
                        </p>
                      </div>

                      <div>
                        <label className="text-xs text-slate-500">
                          Estatus
                        </label>
                        <p className="font-medium">
                          Vigente
                        </p>
                      </div>

                    </div>

                    <div className="border-t px-6 py-4 flex justify-end">
                      <button
                        onClick={() => setModalRepresentante(false)}
                        className="px-4 py-2 bg-slate-800 text-white rounded-lg"
                      >
                        Cerrar
                      </button>
                    </div>

                  </div>

                </div>
              )}

              {modalConfirmacion && representantePendiente && (

                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

                  <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">

                    {/* Header */}

                    <div className="bg-red-50 border-b border-red-100 px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                          <AlertTriangle
                            size={24}
                            className="text-red-600"
                          />
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">
                            Confirmar Baja de Representante Legal
                          </h3>

                          <p className="text-sm text-slate-500">
                            Esta acción marcará al representante para su baja.
                          </p>
                        </div>

                      </div>

                    </div>

                    {/* Body */}

                    <div className="p-6">

                      <p className="text-slate-700 mb-5">
                        ¿Está seguro de que desea dar de baja al siguiente representante legal?
                      </p>

                      <div className="border rounded-xl bg-slate-50 p-4">

                        <div className="grid grid-cols-1 gap-3">

                          <div>
                            <span className="text-xs uppercase tracking-wide text-slate-500">
                              Nombre
                            </span>

                            <p className="font-medium text-slate-800">
                              {representantePendiente.nombre}
                            </p>
                          </div>

                          <div>
                            <span className="text-xs uppercase tracking-wide text-slate-500">
                              RFC
                            </span>

                            <p className="font-medium text-slate-800">
                              {representantePendiente.rfc}
                            </p>
                          </div>

                          <div>
                            <span className="text-xs uppercase tracking-wide text-slate-500">
                              CURP
                            </span>

                            <p className="font-medium text-slate-800">
                              {representantePendiente.curp}
                            </p>
                          </div>

                        </div>

                      </div>

                      <div className="mt-5 bg-amber-50 border border-amber-200 rounded-lg p-3">

                        <p className="text-sm text-amber-800">
                          El representante permanecerá vigente hasta que el trámite sea concluido y autorizado.
                        </p>

                      </div>

                    </div>

                    {/* Footer */}

                    <div className="border-t px-6 py-4 flex justify-end gap-3 bg-slate-50">

                      <button
                        onClick={() => {
                          setModalConfirmacion(false);
                          setRepresentantePendiente(null);
                        }}
                        className="px-5 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
                      >
                        Cancelar
                      </button>

                      <button
                        onClick={confirmarSeleccion}
                        className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        Confirmar Baja
                      </button>

                    </div>

                  </div>

                </div>
              )}

              {/* NUEVOS REPRESENTANTES */}
              <div className="bg-white rounded-xl border shadow-sm">

                <div className="border-b px-6 py-5 flex justify-between items-center">

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      Nuevos Representantes Legales
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Registre los representantes legales que serán incorporados (Opcional).
                    </p>
                  </div>

                  {!mostrarFormularioRepresentante && (
                    <button
                      type="button"
                      onClick={() =>
                        setMostrarFormularioRepresentante(true)
                      }
                      className="px-4 py-2 bg-sky-700 text-white rounded-lg"
                    >
                      + Nuevo representante Legal
                    </button>
                  )
                  }
                </div>

                <div className="p-6 space-y-4">
                  {mostrarFormularioRepresentante && (

                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">

                      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">

                        {/* HEADER */}

                        <div className="border-b px-8 py-6 bg-gradient-to-r from-sky-700 to-sky-600">

                          <div className="flex justify-between items-center">

                            <div className="flex items-center gap-4">

                              <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center">

                                <UserPlus
                                  className="text-white"
                                  size={28}
                                />

                              </div>

                              <div>

                                <h2 className="text-2xl font-semibold text-white">
                                  Datos del Nuevo Representante Legal
                                </h2>

                                <p className="text-sky-100 mt-1">
                                  Capture la información correspondiente al representante legal que será incorporado al contribuyente.
                                </p>

                              </div>

                            </div>

                            <button
                              onClick={() => setMostrarFormularioRepresentante(false)}
                              className="text-white hover:bg-white/20 rounded-lg p-2 transition"
                            >

                              <X size={24} />

                            </button>

                          </div>

                        </div>

                        {/* BODY */}

                        <div className="p-8 overflow-y-auto max-h-[65vh]">

                          <DatosRepresentante
                            nuevoRepresentante={nuevoRepresentante}
                            setNuevoRepresentante={setNuevoRepresentante}
                          />

                          <DocumentoProtocolizado
                            tipoDocumento={tipoDocumento}
                            setTipoDocumento={setTipoDocumento}
                            documento={documento}
                            setDocumento={setDocumento}
                          />

                          {/*  <DomicilioFiscal /> */}

                        </div>

                        {/* FOOTER */}

                        <div className="border-t bg-slate-50 px-8 py-5 flex justify-end gap-3">

                          <button
                            type="button"
                            onClick={() => {setMostrarFormularioRepresentante(false)
                              setTipoDocumento("null")
                            }
                          }
                            className="px-5 py-2.5 rounded-lg border hover:bg-slate-100 transition"
                          >
                            Cancelar
                          </button>

                          <button
                            type="button"
                            onClick={agregarRepresentante}
                            className="px-5 py-2.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white transition flex items-center gap-2"
                          >

                            <Save size={18} />

                            Registrar

                          </button>

                        </div>

                      </div>

                    </div>


                  )}
                  {/* REPRESENTANTES A INCORPORAR */}

                  {nuevosRepresentantes.length > 0 && (

                    <div className="p-6 grid md:grid-cols-2 gap-4">

                      {nuevosRepresentantes.map((item) => (
                        <div
                          key={item.id}
                          className="
    relative bg-white rounded-2xl border
    border-sky-200 shadow-sm
    hover:shadow-md transition-all
    overflow-hidden
  "
                        >

                          {/* Barra lateral */}
                          <div className="absolute left-0 top-0 h-full w-2 bg-emerald-500" />

                          <div className="p-5 pl-6">

                            <div className="flex items-start justify-between">

                              <div className="flex items-center gap-4">

                                <div className="
          h-14 w-14 rounded-xl
          bg-sky-100
          flex items-center justify-center
        ">
                                  <User size={26} className="text-sky-700" />
                                </div>

                                <div>

                                  <div className="flex items-center gap-2">

                                    <h4 className="font-semibold text-slate-800 text-lg">
                                      {item.nombres} {item.apellidoPaterno} {item.apellidoMaterno}
                                    </h4>

                                    <span
                                      className="
                px-2 py-1 rounded-full
                text-xs font-medium
                bg-emerald-100 text-emerald-700
              "
                                    >
                                      Nuevo
                                    </span>

                                  </div>

                                  <p className="text-sm text-slate-500 mt-1">
                                    Representante Legal a incorporar
                                  </p>

                                </div>

                              </div>

                              <button
                                type="button"
                                onClick={() => eliminarRepresentante(item.id)}
                                className="
          p-2 rounded-lg
          text-red-500
          hover:bg-red-50
          transition-colors
        "
                              >
                                <Trash2 size={18} />
                              </button>

                            </div>

                            {/* Datos */}
                            <div className="mt-5 grid md:grid-cols-2 gap-3">

                              <div className="bg-slate-50 rounded-xl px-4 py-3">
                                <span className="text-xs text-slate-500 block">
                                  RFC
                                </span>

                                <span className="font-medium text-slate-800">
                                  {item.rfc}
                                </span>
                              </div>

                              <div className="bg-slate-50 rounded-xl px-4 py-3">
                                <span className="text-xs text-slate-500 block">
                                  CURP
                                </span>

                                <span className="font-medium text-slate-800">
                                  {item.curp}
                                </span>
                              </div>

                            </div>

                          </div>

                        </div>
                      ))}

                    </div>
                  )}

                </div>

              </div>


              {/* FOOTER */}
              <div className="flex justify-between">

                <button
                  type="button"
                  className="px-6 py-3 border rounded-lg"
                >
                  Regresar
                </button>

                <button
                  type="button"
                  className="px-6 py-3 bg-sky-700 text-white rounded-lg"
                >
                  Continuar
                </button>

              </div>

            </div>
          )
        }
        {/* Cambio de Nombre, Denominación o Razón Social */}

        {selectedRow === "Cambio de Nombre, Denominación o Razón Social" &&
          activeStep === 5 && (
            <div>

              {tipoPersona === "fisica" && (
                <div className="flex flex-col gap-4">
                  <div className="bg-white rounded-xl border shadow-sm overflow-hidden">

                    {/* Header */}

                    <div className="border-b px-6 py-5 bg-slate-50">

                      <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">

                          <UserRound className="text-sky-700" size={24} />

                        </div>

                        <div>

                          <h3 className="text-lg font-semibold text-slate-800">
                            Nuevo Nombre
                          </h3>

                          <p className="text-sm text-slate-500">
                            Capture la nueva información del contribuyente.
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* Body */}

                    <div className="p-6">

                      <div className="grid md:grid-cols-2 gap-5">

                        {/* RFC */}

                        <div>

                          <label className="block text-sm font-medium mb-2">
                            RFC
                          </label>

                          <input
                            className="w-full border rounded-lg px-4 py-3"
                            defaultValue=""
                          />

                        </div>

                        {/* CURP */}

                        <div>

                          <label className="block text-sm font-medium mb-2">
                            CURP Nueva
                          </label>

                          <input
                            className="w-full border rounded-lg px-4 py-3"
                            defaultValue=""
                          />

                        </div>

                        {/* Nombre Comercial */}

                        <div className="md:col-span-2">

                          <label className="block text-sm font-medium mb-2">
                            Nombre Comercial
                          </label>

                          <input
                            className="w-full border rounded-lg px-4 py-3"
                          />

                        </div>

                        {/* Primer apellido */}

                        <div>

                          <label className="block text-sm font-medium mb-2">
                            Primer Apellido
                          </label>

                          <input
                            className="w-full border rounded-lg px-4 py-3"
                          />

                        </div>

                        {/* Segundo apellido */}

                        <div>

                          <label className="block text-sm font-medium mb-2">
                            Segundo Apellido
                          </label>

                          <input
                            className="w-full border rounded-lg px-4 py-3"
                          />

                        </div>

                        {/* Nombre */}

                        <div className="md:col-span-2">

                          <label className="block text-sm font-medium mb-2">
                            Nombre(s)
                          </label>

                          <input
                            className="w-full border rounded-lg px-4 py-3"
                          />

                        </div>

                      </div>

                    </div>

                  </div>
                  {/* DATOS DEL ACTA DE NACIMIENTO */}

                  <div className="bg-white rounded-xl border shadow-sm overflow-hidden mb-6">

                    {/* Header */}

                    <div className="border-b bg-slate-50 px-6 py-5">

                      <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center">

                          <FileBadge className="text-emerald-700" size={28} />

                        </div>

                        <div>

                          <h3 className="text-lg font-semibold text-slate-800">
                            Datos del Acta de Nacimiento
                          </h3>

                          <p className="text-sm text-slate-500 mt-1">
                            Capture la información correspondiente al acta de nacimiento que
                            acredita la modificación del nombre del contribuyente.
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* Body */}

                    <div className="p-6">

                      <div className="grid md:grid-cols-2 gap-5">

                        {/* Fecha Corrección */}

                        <div>

                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Fecha de Corrección de Acta
                          </label>

                          <input
                            type="date"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
                          />

                        </div>

                        {/* Fecha Nacimiento */}

                        <div>

                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Fecha de Nacimiento
                          </label>

                          <input
                            type="date"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
                          />

                        </div>

                        {/* Número Acta */}

                        <div>

                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Número de Acta
                          </label>

                          <input
                            type="text"
                            maxLength={5}
                            placeholder="00000"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
                          />

                        </div>

                        {/* Número Foja */}

                        <div>

                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Número de Foja
                          </label>

                          <input
                            type="text"
                            maxLength={5}
                            placeholder="00000"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
                          />

                        </div>

                      </div>

                    </div>

                  </div>
                </div>
              )
              }

              {/* NUEVA DENOMINACIÓN O RAZÓN SOCIAL */}
              {tipoPersona === "moral" && (
                <div className="flex flex-col gap-5">
                  <div className="bg-white rounded-xl border shadow-sm overflow-hidden">

                    {/* Header */}

                    <div className="border-b bg-slate-50 px-6 py-5">

                      <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center">

                          <Building2
                            className="text-indigo-700"
                            size={28}
                          />

                        </div>

                        <div>

                          <h3 className="text-lg font-semibold text-slate-800">
                            Nueva Denominación o Razón Social
                          </h3>

                          <p className="text-sm text-slate-500 mt-1">
                            Capture la nueva información del contribuyente conforme a los
                            datos registrados en el trámite.
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* Body */}

                    <div className="p-6">

                      <div className="grid md:grid-cols-2 gap-5">

                        {/* RFC */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            RFC
                          </label>

                          <input
                            type="text"
                            defaultValue="ABC010203AA1"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
                          />

                        </div>

                        {/* Régimen */}

                        <div>

                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Régimen Capital
                          </label>

                          <select
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
                          >

                            <option>S.A. de C.V.</option>

                            <option>S. de R.L.</option>

                            <option>S.C.</option>

                            <option>A.C.</option>

                          </select>

                        </div>

                        {/* Razón Social */}

                        <div className="md:col-span-2">

                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Denominación o Razón Social
                          </label>

                          <input
                            type="text"
                            placeholder="Ingrese la nueva denominación o razón social"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
                          />

                        </div>

                        {/* Nombre Comercial */}

                        <div className="md:col-span-2">

                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Nombre Comercial
                          </label>

                          <input
                            type="text"
                            placeholder="Ingrese el nombre comercial"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
                          />

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* DATOS DE PROTOCOLIZACIÓN DEL DOCUMENTO */}
                  <div className="bg-white rounded-xl border shadow-sm overflow-hidden">

                    {/* Header */}

                    <div className="border-b bg-slate-50 px-6 py-5">

                      <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-xl bg-violet-100 flex items-center justify-center">

                          <ScrollText
                            className="text-violet-700"
                            size={28}
                          />
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">
                            Datos de Protocolización del Documento
                          </h3>

                          <p className="text-sm text-slate-500 mt-1">
                            Capture la información del documento que acredita el cambio de
                            denominación o razón social del contribuyente.
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* Body */}

                    <div className="p-6">

                      {/* Tipo Documento */}

                      <div className="mb-6">

                        <label className="block text-sm font-medium text-slate-700 mb-3">
                          Tipo de Documento que lo acredita
                        </label>

                        <div className="grid md:grid-cols-2 gap-4">

                          <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:border-sky-500 transition">

                            <input
                              type="radio"
                              name="tipoDocumento"
                              onClick={() => setDocumentoAcreditador("carta poder")}
                            />

                            <div>

                              <p className="font-medium text-slate-800">
                                Carta Poder con Ratificación de Firmas ante Notario
                              </p>

                              <span className="text-sm text-slate-500">
                                Acta protocolizada mediante carta poder.
                              </span>

                            </div>

                          </label>

                          <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:border-sky-500 transition">

                            <input
                              type="radio"
                              name="tipoDocumento"
                              onClick={() => setDocumentoAcreditador("poder notarial")}
                            />

                            <div>

                              <p className="font-medium text-slate-800">
                                Poder Notarial del Apoderado Legal
                              </p>

                              <span className="text-sm text-slate-500">
                                Instrumento notarial vigente.
                              </span>

                            </div>

                          </label>

                        </div>

                        {documentoAcreditador === "carta poder" && (
                          <div className="mt-6 rounded-xl border border-sky-200 bg-sky-50/40">

                            <div className="border-b px-6 py-4 flex gap-2 bg-white">
                              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">

                                <ScrollText
                                  className="text-indigo-700"
                                  size={24}
                                />

                              </div>
                              <div className="flex flex-col">
                                <h4 className="font-semibold text-slate-800">
                                  Carta Poder con Ratificación de Firmas ante Notario
                                </h4>

                                <p className="text-sm text-slate-500 mt-1">
                                  Capture la información correspondiente al documento seleccionado.
                                </p>
                              </div>

                            </div>

                            <div className="p-6">

                              <div className="grid md:grid-cols-2 gap-5">

                                {/* Archivo */}

                                <div className="md:col-span-2">

                                  <label className="block text-sm font-medium mb-2">
                                    Archivo PDF
                                  </label>

                                  <div className="border-2 border-dashed rounded-xl p-8 text-center hover:border-sky-500 transition cursor-pointer">

                                    <Upload className="mx-auto text-slate-400 mb-3" size={28} />

                                    <p className="font-medium">
                                      Seleccionar archivo PDF
                                    </p>

                                    <span className="text-sm text-slate-500">
                                      Tamaño máximo permitido: 10 MB
                                    </span>

                                  </div>

                                </div>

                                {/* Fecha */}

                                <div>

                                  <label className="block text-sm font-medium mb-2">
                                    Fecha
                                  </label>

                                  <input
                                    type="date"
                                    className="w-full border rounded-lg px-4 py-3"
                                  />

                                </div>

                                {/* Acta */}

                                <div>

                                  <label className="block text-sm font-medium mb-2">
                                    Número del Acta
                                  </label>

                                  <input
                                    maxLength={5}
                                    className="w-full border rounded-lg px-4 py-3"
                                  />

                                </div>

                              </div>

                            </div>

                          </div>
                        )
                        }
                        {documentoAcreditador === "poder notarial" && (

                          <div className="mt-6 rounded-xl border border-indigo-200 bg-indigo-50/30 shadow-sm overflow-hidden">

                            {/* Encabezado */}

                            <div className="border-b bg-white px-6 py-5">

                              <div className="flex items-center gap-4">

                                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">

                                  <ScrollText
                                    className="text-indigo-700"
                                    size={24}
                                  />

                                </div>

                                <div>

                                  <h4 className="text-lg font-semibold text-slate-800">
                                    Poder Notarial del Apoderado Legal
                                  </h4>

                                  <p className="text-sm text-slate-500 mt-1">
                                    Capture la información correspondiente al poder notarial que acredita la representación legal.
                                  </p>

                                </div>

                              </div>

                            </div>

                            {/* Contenido */}

                            <div className="p-6">

                              <div className="grid md:grid-cols-2 gap-5">

                                {/* Archivo */}

                                <div className="md:col-span-2">

                                  <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Documento (PDF)
                                  </label>

                                  <label className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500 hover:bg-sky-50 transition">

                                    <Upload
                                      className="text-slate-400 mb-3"
                                      size={30}
                                    />

                                    <span className="font-medium text-slate-700">
                                      Seleccionar archivo
                                    </span>

                                    <span className="text-sm text-slate-500">
                                      Formato PDF
                                    </span>

                                    <input
                                      type="file"
                                      accept=".pdf"
                                      className="hidden"
                                    />

                                  </label>

                                </div>

                                {/* Fecha */}

                                <div>

                                  <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Fecha
                                  </label>

                                  <input
                                    type="date"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
                                  />

                                </div>

                                {/* Número Escritura */}

                                <div>

                                  <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Número de Instrumento o Escritura
                                  </label>

                                  <input
                                    type="text"
                                    maxLength={5}
                                    placeholder="00000"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
                                  />

                                </div>

                                {/* Número de Fojas */}

                                <div>

                                  <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Número de Fojas Útiles
                                    <span className="text-slate-400 text-xs ml-2">
                                      (Opcional)
                                    </span>
                                  </label>

                                  <input
                                    type="text"
                                    maxLength={5}
                                    placeholder="00000"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
                                  />

                                </div>

                              </div>

                            </div>

                          </div>
                        )
                        }

                      </div>

                    </div>

                  </div>
                </div>
              )
              }
            </div>
          )}

        {/*suspensión de actividades*/}
        {selectedRow === "Suspensión de Actividades" && activeStep === 5 && (

          <div className="bg-white rounded-xl border shadow-sm">

            <div className="border-b px-6 py-5">

              <h3 className="text-xl font-semibold text-slate-800">
                Aviso de Suspensión de Actividades
              </h3>

              <p className="text-slate-500 mt-2">
                Consulte el historial de cumplimiento de las obligaciones fiscales asociadas al contribuyente.
              </p>

              <div className="space-y-5 mt-4">

                {/* ALERTA */}
                <div className="border border-amber-300 bg-amber-50 rounded-xl p-5">

                  <div className="font-semibold text-amber-800 mb-2">
                    Declaraciones Pendientes
                  </div>

                  <p className="text-amber-700 text-sm">
                    El aviso de suspensión de actividades no lo exime de las obligaciones pendientes
                  </p>

                </div>
                {/* RESUMEN */}

                <div className="grid md:grid-cols-2 gap-4">

                  <div className="bg-slate-50 border rounded-xl p-4">
                    <div className="text-2xl font-bold text-slate-800">
                      3
                    </div>
                    <div className="text-sm text-slate-500">
                      Obligaciones Activas
                    </div>
                  </div>


                  <div className="bg-red-50 border rounded-xl p-4">
                    <div className="text-2xl font-bold text-red-600">
                      2
                    </div>
                    <div className="text-sm text-slate-500">
                      Declaraciones Pendientes
                    </div>
                  </div>

                </div>

                {/* OBLIGACIONES */}
                <div className="rounded-2xl border border-gray-300 shadow-sm">
                  <div className="divide-y divide-gray-300">
                    {obligaciones.map((item) => (

                      <div
                        key={item.id}
                        className="border-b border-gray-300"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setObligacionAbierta(
                              obligacionAbierta === item.id ? null : item.id
                            );
                            setEjercicioSeleccionado(null);
                          }
                          }
                          className="w-full p-5 text-left hover:bg-slate-50 transition"
                        >

                          <div className="flex justify-between items-start">

                            <div>

                              <h5 className="font-semibold text-slate-800">
                                {item.nombre}
                              </h5>

                              <p className="text-sm text-slate-500 mt-1">
                                {item.actividad}
                              </p>

                            </div>

                            <div className="flex items-center gap-3">

                              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                ACTIVA
                              </span>

                              <ChevronDown
                                size={18}
                                className={`transition-transform ${obligacionAbierta === 1
                                  ? "rotate-180"
                                  : ""
                                  }`}
                              />

                            </div>

                          </div>

                          {obligacionAbierta === item.id && (
                            <div >
                              {/* Barra de cumplimiento 1*/}

                              <div className="grid md:grid-cols-2 gap-4">

                                <div>
                                  <span className="text-xs text-slate-500">
                                    Porcentaje de la actividad económica.
                                  </span>

                                  <div className="font-medium text-slate-800">
                                    70%
                                  </div>
                                </div>

                                {/* <div>
                                  <span className="text-xs text-slate-500">
                                    Cumplidas
                                  </span>

                                  <div className="font-medium text-green-600">
                                    10 Declaraciones
                                  </div>
                                </div> */}

                                <div>
                                  <span className="text-xs text-slate-500">
                                    Pendientes
                                  </span>

                                  <div className="font-medium text-red-600">
                                    2 Declaraciones
                                  </div>
                                </div>

                              </div>

                            </div>
                          )
                          }
                        </button>

                        {/* DECLARACIONES */}

                        {obligacionAbierta === item.id && (

                          <div className="border-t bg-slate-50 p-4">

                            <div className="space-y-2 p-5">
                              <h6 className="font-medium text-slate-700 mb-4 ">
                                Declaraciones pendientes
                              </h6>

                              <div className="space-y-4">

                                {/* EJERCICIOS */}
                                <div>
                                  <h6 className="font-medium text-slate-700 mb-3">
                                    Ejercicios con Declaraciones Pendientes
                                  </h6>

                                  <div className="flex gap-2 flex-wrap">

                                    <button
                                      type="button"
                                      onClick={() => setEjercicioSeleccionado(2026)}
                                      className={`px-4 py-2 rounded-lg border ${ejercicioSeleccionado === 2026
                                        ? "bg-sky-700 text-white border-sky-700"
                                        : "bg-white"
                                        }`}
                                    >
                                      Ejercicio 2026
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => setEjercicioSeleccionado(2025)}
                                      className={`px-4 py-2 rounded-lg border ${ejercicioSeleccionado === 2025
                                        ? "bg-sky-700 text-white border-sky-700"
                                        : "bg-white"
                                        }`}
                                    >
                                      Ejercicio 2025
                                    </button>

                                  </div>
                                </div>

                                {/* PERIODOS */}
                                {ejercicioSeleccionado && (
                                  <div>

                                    <h6 className="font-medium text-slate-700 mb-3">
                                      Periodos Pendientes
                                    </h6>

                                    <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">

                                      <div className="flex justify-between bg-white border rounded-lg p-3">
                                        <div>
                                          <div className="font-medium">
                                            ENERO - FEBRERO
                                          </div>

                                          <div className="text-xs text-slate-500">
                                            Bimestre 1 · Ejercicio {ejercicioSeleccionado}
                                          </div>
                                        </div>

                                        <span className="text-red-600 font-medium">
                                          No Cumplido
                                        </span>
                                      </div>

                                      <div className="flex justify-between bg-white border rounded-lg p-3">
                                        <div>
                                          <div className="font-medium">
                                            MARZO - ABRIL
                                          </div>

                                          <div className="text-xs text-slate-500">
                                            Bimestre 2 · Ejercicio {ejercicioSeleccionado}
                                          </div>
                                        </div>

                                        <span className="text-red-600 font-medium">
                                          No Cumplido
                                        </span>
                                      </div>

                                      <div className="flex justify-between bg-white border rounded-lg p-3">
                                        <div>
                                          <div className="font-medium">
                                            MAYO - JUNIO
                                          </div>

                                          <div className="text-xs text-slate-500">
                                            Bimestre 3 · Ejercicio {ejercicioSeleccionado}
                                          </div>
                                        </div>

                                        <span className="text-red-600 font-medium">
                                          No Cumplido
                                        </span>
                                      </div>

                                    </div>

                                  </div>
                                )}

                              </div>

                            </div>

                          </div>

                        )}

                      </div>

                    ))}
                  </div>
                </div>

                {mostrarFormularioDomicilio && (
                  <DomicilioFiscal
                    onGuardar={() => { }}
                    onCancelar={() => { }}
                    className="border border-gray-300 shadow-sm"
                  />
                )}

              </div>
            </div>

            <div className="border-t px-6 py-4 flex justify-between">

              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className="px-5 py-2 border rounded-lg"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={() => setActiveStep(5)}
                className="px-6 py-2 bg-sky-700 text-white rounded-lg"
              >
                Continuar
              </button>

            </div>
          </div>
        )
        }

        {/*Reanudación de actividades*/}
        {
          selectedRow === "Reanudación de Actividades" &&
          activeStep === 5 && (
            <div>

              {/* <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">

                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Seleccionar Obligación para Reanudar
                </h3>

                <div className="grid md:grid-cols-[1fr_auto] gap-4 items-end">

                  <div>
                    <label className="block mb-2 font-medium text-slate-700">
                      Obligación
                    </label>

                    <select
                      value={obligacionSeleccionada}
                      onChange={(e) =>
                        setObligacionSeleccionada(e.target.value)
                      }
                      className="w-full border rounded-lg px-4 py-3"
                    >
                      <option value="">
                        Seleccione una obligación
                      </option>

                      <option>
                        Impuesto Sobre Nóminas
                      </option>

                      <option>
                        Impuesto Sobre Hospedaje
                      </option>

                    </select>
                  </div> 

                  <button
                    type="button"
                    disabled={!obligacionSeleccionada}
                    className="px-5 py-3 bg-sky-700 text-white rounded-lg disabled:bg-slate-400"
                  >
                    + Reanudar Actividad
                  </button>

                </div>

              </div> */}


              <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">

                <h3 className="text-lg font-semibold text-slate-800 mb-5">
                  Selección de obligaciones y actividades económicas
                </h3>

                <div className="grid md:grid-cols-4 gap-4">

                  <div>
                    <label className="block mb-2 font-medium text-slate-700">
                      Obligación
                    </label>

                    <select
                      value={obligacionSeleccionada}
                      onChange={(e) =>
                        setObligacionSeleccionada(e.target.value)
                      }
                      className="w-full border rounded-lg px-4 py-3"
                    >
                      <option value="">
                        Seleccione una obligación
                      </option>

                      <option>
                        Impuesto Sobre Nóminas
                      </option>

                      <option>
                        Impuesto Sobre Hospedaje
                      </option>
                      <option>
                        Impuesto Sobre Erogaciones por Remuneraciones al Trabajo Personal
                      </option>

                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">
                      Actividad
                    </label>

                    <select
                      value={actividadSeleccionada}
                      onChange={(e) =>
                        setActividadSeleccionada(e.target.value)
                      }
                      className="w-full border rounded-lg px-4 py-3"
                    >
                      <option value="">
                        Seleccione
                      </option>

                      <option>
                        Prestación de Servicios
                      </option>

                      <option>
                        Comercialización
                      </option>

                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">
                      Porcentaje
                    </label>

                    <input
                      type="number"
                      value={porcentaje}
                      onChange={(e) =>
                        setPorcentaje(e.target.value)
                      }
                      className="w-full border rounded-lg px-4 py-3"
                    />
                  </div>

                  <div className="flex items-end">

                    <button
                      type="button"
                      onClick={() => {

                        setActividadesAgregadas([
                          ...actividadesAgregadas,
                          {
                            obligacion: obligacionSeleccionada,
                            actividad: actividadSeleccionada,
                            porcentaje,
                            fecha: "01/01/2026",
                            trabajadoresTemporales: "",
                            trabajadoresPermanentes: ""
                          }
                        ]);

                        setActividadSeleccionada("");
                        setPorcentaje("");

                      }}
                      className="w-full px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                    >
                      + Agregar
                    </button>

                  </div>

                </div>
                {
                  obligacionSeleccionada ===
                  "Impuesto Sobre Erogaciones por Remuneraciones al Trabajo Personal" && (

                    <>
                      <div>
                        <label className="block mb-2 font-medium">
                          Trabajadores Temporales
                        </label>

                        <input
                          type="number"
                          min="0"
                          value={trabajadoresTemporales}
                          onChange={(e) =>
                            setTrabajadoresTemporales(e.target.value)
                          }
                          className="w-full border rounded-lg px-4 py-3"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 font-medium">
                          Trabajadores Permanentes
                        </label>

                        <input
                          type="number"
                          min="0"
                          value={trabajadoresPermanentes}
                          onChange={(e) =>
                            setTrabajadoresPermanentes(e.target.value)
                          }
                          className="w-full border rounded-lg px-4 py-3"
                        />
                      </div>
                    </>

                  )
                }
              </div>

              <div className="bg-white rounded-xl border shadow-sm p-6">

                <h3 className="text-lg font-semibold text-slate-800 mb-5">
                  Obligaciones del Contribuyente
                </h3>
                <div className="bg-sky-50 border rounded-xl p-6 my-6 ">

                  <div className="flex justify-between items-center mb-3">

                    <span className="font-semibold text-slate-700">
                      Total de Participación
                    </span>

                    <span className="text-xl font-bold text-sky-700">
                      100%
                    </span>

                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-3">

                    <div
                      className="bg-green-600 h-3 rounded-full"
                      style={{ width: "100%" }}
                    />

                  </div>

                  <p className="text-sm text-green-700 mt-2">
                    ✓ El porcentaje total capturado es válido.
                  </p>

                </div>
                <div className="space-y-5">

                  {actividadesAgregadas.map((item, index) => (

                    <div
                      key={index}
                      className="bg-white border rounded-xl shadow-sm overflow-hidden"
                    >

                      {/* HEADER */}

                      <div className="bg-slate-50 border-b px-6 py-4 flex justify-between items-center">

                        <div>

                          <h4 className="font-semibold text-slate-800">
                            {item.obligacion}
                          </h4>

                          <p className="text-sm text-slate-500">
                            {item.actividad}
                          </p>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setActividadesAgregadas(
                              actividadesAgregadas.filter(
                                (_, i) => i !== index
                              )
                            )
                          }
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          🗑 Eliminar
                        </button>

                      </div>

                      {/* CONTENIDO */}

                      <div className="p-6">

                        {/* DATOS GENERALES */}

                        <div className="mb-6">

                          <h5 className="font-medium text-slate-700 mb-4">
                            Datos Generales
                          </h5>

                          <div className="grid md:grid-cols-3 gap-5">

                            <div>
                              <label className="block mb-2 text-sm font-medium">
                                Actividad Económica
                              </label>

                              <select
                                className="w-full border rounded-lg px-4 py-3"
                                defaultValue={item.actividad}
                              >
                                <option>
                                  Prestación de Servicios
                                </option>

                                <option>
                                  Comercialización
                                </option>

                              </select>
                            </div>

                            <div>
                              <label className="block mb-2 text-sm font-medium">
                                Porcentaje
                              </label>

                              <div className="relative">

                                <input
                                  type="number"
                                  defaultValue={item.porcentaje}
                                  className="w-full border rounded-lg px-4 py-3"
                                />

                                <span className="absolute right-4 top-3 text-slate-500">
                                  %
                                </span>

                              </div>

                            </div>

                            <div>
                              <label className="block mb-2 text-sm font-medium">
                                Fecha Inicio Operación
                              </label>

                              <input
                                type="date"
                                className="w-full border rounded-lg px-4 py-3"
                                defaultValue="2026-01-01"
                              />
                            </div>

                          </div>
                          {item.obligacion === "Impuesto Sobre Erogaciones por Remuneraciones al Trabajo Personal" && (

                            <div className="mt-5 border-t pt-5">

                              <h5 className="font-medium text-slate-700 mb-4">
                                Información Laboral
                              </h5>

                              <div className="grid md:grid-cols-2 gap-5">

                                <div>
                                  <label className="block mb-2 text-sm font-medium">
                                    Trabajadores Temporales
                                  </label>

                                  <input
                                    type="number"
                                    min="0"
                                    value={item.trabajadoresTemporales}
                                    onChange={(e) => {

                                      const nuevas = [...actividadesAgregadas];

                                      nuevas[index].trabajadoresTemporales =
                                        e.target.value;

                                      setActividadesAgregadas(nuevas);

                                    }}
                                    className="w-full border rounded-lg px-4 py-3"
                                  />
                                </div>

                                <div>
                                  <label className="block mb-2 text-sm font-medium">
                                    Trabajadores Permanentes
                                  </label>

                                  <input
                                    type="number"
                                    min="0"
                                    value={item.trabajadoresPermanentes}
                                    onChange={(e) => {

                                      const nuevas = [...actividadesAgregadas];

                                      nuevas[index].trabajadoresPermanentes =
                                        e.target.value;

                                      setActividadesAgregadas(nuevas);

                                    }}
                                    className="w-full border rounded-lg px-4 py-3"
                                  />
                                </div>

                              </div>

                            </div>

                          )}
                        </div>

                        {/* CAMPOS EXCLUSIVOS EROGACIONES */}

                        {item.obligacion ===
                          "Impuesto Sobre Erogaciones por Remuneraciones al Trabajo Personal" && (

                            <div className="border-t pt-6">

                              <h5 className="font-medium text-slate-700 mb-4">
                                Información Laboral
                              </h5>

                              <div className="grid md:grid-cols-2 gap-5">

                                <div>

                                  <label className="block mb-2 text-sm font-medium">
                                    Trabajadores Temporales
                                  </label>

                                  <input
                                    type="number"
                                    min="0"
                                    className="w-full border rounded-lg px-4 py-3"
                                  />

                                </div>

                                <div>

                                  <label className="block mb-2 text-sm font-medium">
                                    Trabajadores Permanentes
                                  </label>

                                  <input
                                    type="number"
                                    min="0"
                                    className="w-full border rounded-lg px-4 py-3"
                                  />

                                </div>

                              </div>

                            </div>

                          )}

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>
          )
        }

        {/*Apertura de Establecimientos o Locales*/}
        {
          selectedRow === "Apertura de Establecimientos o Locales" &&
          activeStep === 5 && (

            <div className="space-y-6">

              {/* OBLIGACION */}

              <div className="bg-white rounded-xl border shadow-sm p-6">

                <h3 className="text-lg font-semibold text-slate-800 mb-5">
                  Selección de Obligación Fiscal
                </h3>

                <div className="grid md:grid-cols-3 gap-4">

                  {[
                    "Impuesto Sobre Nóminas",
                    "Impuesto Sobre Hospedaje",
                    "Impuesto Cedular"
                  ].map((item) => (

                    <button
                      key={item}
                      type="button"
                      onClick={() => setObligacionSeleccionada(item)}
                      className={`
                border-2 rounded-xl p-5 text-left transition
                ${obligacionSeleccionada === item
                          ? "border-sky-700 bg-sky-50"
                          : "border-slate-200 hover:border-sky-500"
                        }
              `}
                    >
                      <h4 className="font-medium text-slate-800">
                        {item}
                      </h4>
                    </button>

                  ))}

                </div>

              </div>

              {/* FORMULARIO */}

              {obligacionSeleccionada && (

                <div className="bg-white rounded-xl border shadow-sm">

                  {/* HEADER */}

                  <div className="border-b px-6 py-5">

                    <h3 className="text-lg font-semibold text-slate-800">
                      Datos del Establecimiento
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Capture la información del establecimiento o local.
                    </p>

                  </div>

                  <div className="p-6 space-y-8">

                    {/* DATOS ESTABLECIMIENTO */}

                    <section>
                      <h4 className="font-semibold text-slate-700 mb-4">
                        Datos del Establecimiento
                      </h4>

                      <div className="grid md:grid-cols-2 gap-6">

                        <div>
                          <label className="block mb-2 font-medium">
                            Nombre del Establecimiento *
                          </label>

                          <input
                            type="text"
                            className="w-full border rounded-lg px-4 py-3"
                          />
                        </div>

                        <div>
                          <label className="block mb-2 font-medium">
                            Código Postal *
                          </label>

                          <select className="w-full border rounded-lg px-4 py-3"
                            value={codigoPostal}
                            onChange={(e) => setCodigoPostal(e.target.value)}
                          >
                            <option>Seleccione</option>
                            <option value="68030">68030</option>
                          </select>
                        </div>

                      </div>
                    </section>

                    {/* DATOS GENERALES */}

                    {codigoPostal && (

                      <section>

                        <h4 className="font-semibold text-slate-700 mb-4">
                          Datos Generales del Domicilio
                        </h4>

                        <div className="grid md:grid-cols-3 gap-6">

                          <div>
                            <label>Ámbito</label>
                            <input disabled className="w-full border rounded-lg px-4 py-3 bg-slate-50" />
                          </div>

                          <div>
                            <label>Región</label>
                            <input disabled className="w-full border rounded-lg px-4 py-3 bg-slate-50" />
                          </div>

                          <div>
                            <label>Distrito</label>
                            <input disabled className="w-full border rounded-lg px-4 py-3 bg-slate-50" />
                          </div>

                          <div>
                            <label>Municipio / Delegación</label>
                            <input disabled className="w-full border rounded-lg px-4 py-3 bg-slate-50" />
                          </div>

                          <div>
                            <label>Localidad</label>

                            <select className="w-full border rounded-lg px-4 py-3">
                              <option>Seleccione</option>
                            </select>
                          </div>

                          <div>
                            <label>Tipo de Asentamiento</label>

                            <select className="w-full border rounded-lg px-4 py-3">
                              <option>Seleccione</option>
                            </select>
                          </div>

                          <div>
                            <label>Nombre de Asentamiento</label>

                            <select className="w-full border rounded-lg px-4 py-3">
                              <option>Seleccione</option>
                            </select>
                          </div>

                        </div>

                      </section>

                    )}

                    {/* UBICACION */}

                    {ambito === "urbano" && (

                      <section>

                        <h4 className="font-semibold text-slate-700 mb-4">
                          Ubicación del Domicilio
                        </h4>

                        <div className="grid md:grid-cols-3 gap-6">

                          <input
                            placeholder="Tipo de Vialidad"
                            className="border rounded-lg px-4 py-3"
                          />

                          <input
                            placeholder="Nombre de Calle"
                            className="border rounded-lg px-4 py-3"
                          />

                          <input
                            placeholder="Número Exterior y/o Letra"
                            className="border rounded-lg px-4 py-3"
                          />

                          <input
                            placeholder="Número Interior y/o Letra"
                            className="border rounded-lg px-4 py-3"
                          />

                          <input
                            placeholder="Entre Vialidad"
                            className="border rounded-lg px-4 py-3"
                          />

                          <input
                            placeholder="Y Vialidad"
                            className="border rounded-lg px-4 py-3"
                          />

                        </div>

                      </section>

                    )}

                    {ambito === "rural" && (

                      <section>

                        <h4 className="font-semibold text-slate-700 mb-4">
                          Ubicación del Domicilio
                        </h4>

                        <div className="grid md:grid-cols-3 gap-6">

                          <input
                            placeholder="Vía de Comunicación"
                            className="border rounded-lg px-4 py-3"
                          />

                          <input
                            placeholder="Nombre de Terracería"
                            className="border rounded-lg px-4 py-3"
                          />

                          <input
                            placeholder="Tramo"
                            className="border rounded-lg px-4 py-3"
                          />

                        </div>

                      </section>

                    )}

                    {/* COMPLEMENTARIA */}

                    {ambito && (

                      <section>

                        <h4 className="font-semibold text-slate-700 mb-4">
                          Información Complementaria
                        </h4>

                        <div className="grid gap-6">

                          <textarea
                            rows={3}
                            placeholder="Características del domicilio"
                            className="border rounded-lg px-4 py-3"
                          />

                          <textarea
                            rows={3}
                            placeholder="Referencias adicionales"
                            className="border rounded-lg px-4 py-3"
                          />

                        </div>

                      </section>

                    )}

                  </div>

                  {/* FOOTER */}

                  <div className="border-t px-6 py-4 flex justify-between">

                    <button
                      type="button"
                      className="px-5 py-2 border rounded-lg"
                    >
                      Cancelar
                    </button>

                    <button
                      type="button"
                      className="px-6 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg"
                    >
                      Guardar Establecimiento
                    </button>

                  </div>

                </div>

              )}

            </div>

          )
        }

        {/*Cierre de Establecimientos o Locales*/}
        {
          selectedRow === "Cierre de Establecimientos o Locales" &&
          activeStep === 5 && (
            <div>
              <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">

                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Selección de Obligación Fiscal
                </h3>

                <p className="text-slate-500 mb-5">
                  Seleccione la obligación fiscal asociada al establecimiento que desea cerrar.
                </p>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

                  {[
                    "Impuesto Sobre Nóminas",
                    "Impuesto Sobre Hospedaje",
                    "Impuesto Cedular"
                  ].map((obligacion) => (

                    <button
                      key={obligacion}
                      type="button"
                      onClick={() => setObligacionSeleccionada(obligacion)}
                      className={`p-5 rounded-xl border-2 text-left transition-all
        ${obligacionSeleccionada === obligacion
                          ? "border-sky-700 bg-sky-50"
                          : "border-slate-200 hover:border-sky-500"
                        }`}
                    >

                      <h4 className="font-semibold text-slate-800">
                        {obligacion}
                      </h4>

                      <p className="text-sm text-slate-500 mt-2">
                        Ver establecimientos registrados
                      </p>

                    </button>

                  ))}

                </div>

              </div>

              {
                obligacionSeleccionada && !establecimientoSeleccionado && (

                  <div className="bg-white rounded-xl border shadow-sm p-6">

                    <div className="mb-6">

                      <h3 className="text-lg font-semibold text-slate-800">
                        Establecimientos Registrados
                      </h3>

                      <p className="text-slate-500 mt-1">
                        Seleccione el establecimiento que desea cerrar.
                      </p>

                    </div>

                    <div className="space-y-3">

                      {establecimientos.map((item) => (

                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setEstablecimientoSeleccionado(item)}
                          className={`w-full text-left border rounded-xl p-4 transition-all
        ${establecimientoSeleccionado?.id === item.id
                              ? "border-red-600 bg-red-50"
                              : "border-slate-200 hover:border-sky-500 hover:bg-slate-50"
                            }`}
                        >

                          <div className="flex items-start justify-between">

                            <div className="flex gap-4">

                              <div className="mt-1">

                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${establecimientoSeleccionado?.id === item.id
                                      ? "border-red-600"
                                      : "border-slate-400"
                                    }`}
                                >

                                  {establecimientoSeleccionado?.id === item.id && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-600" />
                                  )}

                                </div>

                              </div>

                              <div>

                                <h4 className="font-semibold text-slate-800">
                                  {item.nombre}
                                </h4>

                                <p className="text-sm text-slate-500 mt-1">
                                  {item.domicilio}
                                </p>

                                <div className="mt-2">

                                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-700">
                                    {item.obligacion}
                                  </span>

                                </div>

                              </div>

                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEstablecimientoDetalle(item);
                                setOpenDetalle(true);
                              }}
                              className="text-sky-700 hover:text-sky-900 text-sm font-medium"
                            >
                              Ver domicilio
                            </button>

                          </div>

                        </button>

                      ))}

                    </div>

                  </div>

                )}
              {
                establecimientoSeleccionado && (

                  <div className="bg-red-50 border border-red-200 rounded-xl p-5 mt-6">

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                          🏢
                        </div>

                        <div>

                          <h4 className="font-semibold text-red-800">
                            Establecimiento Seleccionado para Cierre
                          </h4>

                          <p className="text-red-700">
                            {establecimientoSeleccionado.nombre}
                          </p>

                        </div>

                      </div>

                      <button
                        type="button"
                        onClick={() => setEstablecimientoSeleccionado(null)}
                        className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-white text-slate-700"
                      >
                        Cambiar establecimiento
                      </button>

                    </div>

                  </div>

                )}
              <div className="border-t mt-6 px-6 py-4 flex justify-between">

                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="px-5 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Regresar
                </button>

                <button
                  type="button"
                  disabled={!establecimientoSeleccionado}
                  onClick={() => setOpenConfirmacion(true)}
                  className="px-6 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg disabled:bg-slate-400"
                >
                  Continuar
                </button>

              </div>
            </div>
          )
        }

        {/*Cancelación del REC*/}
        {
          selectedRow === "Cancelación en el Registro Estatal de Contribuyentes" &&
          activeStep === 5 && (
            <div className="bg-white p-4 rounded rounded-md border">
              <div className="bg-white rounded-xl border border-slate-300 shadow-sm mb-6">
                <button
                  type="button"
                  onClick={() => setMostrarObligaciones(!mostrarObligaciones)}
                  className="w-full px-6 py-5 flex justify-between items-center"
                >
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-slate-800">
                      Obligaciones Registradas
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Consulte las obligaciones y declaraciones pendientes del contribuyente.
                    </p>
                  </div>

                  <span className="text-slate-500">
                    {mostrarObligaciones ? "−" : "+"}
                  </span>
                </button>

                {mostrarObligaciones && (
                  <div className="border-t p-6">

                    <div className="flex flex-col gap-4">
                      {/* ALERTA */}
                      <div className="border border-amber-300 bg-amber-50 rounded-xl p-5">

                        <div className="font-semibold text-amber-800 mb-2">
                          Declaraciones Pendientes
                        </div>

                        <p className="text-amber-700 text-sm">
                          El aviso de suspensión de actividades no lo exime de las obligaciones pendientes
                        </p>

                      </div>

                      {/* RESUMEN */}
                      <div className="grid md:grid-cols-2 gap-4">

                        <div className="bg-slate-50 border rounded-xl p-4">
                          <div className="text-2xl font-bold text-slate-800">
                            3
                          </div>
                          <div className="text-sm text-slate-500">
                            Obligaciones Activas
                          </div>
                        </div>


                        <div className="bg-red-50 border rounded-xl p-4">
                          <div className="text-2xl font-bold text-red-600">
                            2
                          </div>
                          <div className="text-sm text-slate-500">
                            Declaraciones Pendientes
                          </div>
                        </div>

                      </div>

                      {/* OBLIGACIONES */}
                      <div className="rounded-2xl border border-gray-300 shadow-sm">
                        <div className="divide-y divide-gray-300">
                          {obligaciones.map((item) => (

                            <div
                              key={item.id}
                              className="border-b border-gray-300"
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  setObligacionAbierta(
                                    obligacionAbierta === item.id ? null : item.id
                                  );
                                  setEjercicioSeleccionado(null);
                                }
                                }
                                className="w-full p-5 text-left hover:bg-slate-50 transition"
                              >

                                <div className="flex justify-between items-start">

                                  <div>

                                    <h5 className="font-semibold text-slate-800">
                                      {item.nombre}
                                    </h5>

                                    <p className="text-sm text-slate-500 mt-1">
                                      {item.actividad}
                                    </p>

                                  </div>

                                  <div className="flex items-center gap-3">

                                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                      ACTIVA
                                    </span>

                                    <ChevronDown
                                      size={18}
                                      className={`transition-transform ${obligacionAbierta === 1
                                        ? "rotate-180"
                                        : ""
                                        }`}
                                    />

                                  </div>

                                </div>

                                {obligacionAbierta === item.id && (
                                  <div >
                                    {/* Barra de cumplimiento 1*/}

                                    <div className="grid md:grid-cols-2 gap-4">

                                      <div>
                                        <span className="text-xs text-slate-500">
                                          Porcentaje de la actividad económica.
                                        </span>

                                        <div className="font-medium text-slate-800">
                                          70%
                                        </div>
                                      </div>

                                      {/* <div>
                                  <span className="text-xs text-slate-500">
                                    Cumplidas
                                  </span>

                                  <div className="font-medium text-green-600">
                                    10 Declaraciones
                                  </div>
                                </div> */}

                                      <div>
                                        <span className="text-xs text-slate-500">
                                          Pendientes
                                        </span>

                                        <div className="font-medium text-red-600">
                                          2 Declaraciones
                                        </div>
                                      </div>

                                    </div>

                                  </div>
                                )
                                }
                              </button>

                              {/* DECLARACIONES */}

                              {obligacionAbierta === item.id && (

                                <div className="border-t bg-slate-50 p-4">

                                  <div className="space-y-2 p-5">
                                    <h6 className="font-medium text-slate-700 mb-4 ">
                                      Declaraciones pendientes
                                    </h6>

                                    <div className="space-y-4">

                                      {/* EJERCICIOS */}
                                      <div>
                                        <h6 className="font-medium text-slate-700 mb-3">
                                          Ejercicios con Declaraciones Pendientes
                                        </h6>

                                        <div className="flex gap-2 flex-wrap">

                                          <button
                                            type="button"
                                            onClick={() => setEjercicioSeleccionado(2026)}
                                            className={`px-4 py-2 rounded-lg border ${ejercicioSeleccionado === 2026
                                              ? "bg-sky-700 text-white border-sky-700"
                                              : "bg-white"
                                              }`}
                                          >
                                            Ejercicio 2026
                                          </button>

                                          <button
                                            type="button"
                                            onClick={() => setEjercicioSeleccionado(2025)}
                                            className={`px-4 py-2 rounded-lg border ${ejercicioSeleccionado === 2025
                                              ? "bg-sky-700 text-white border-sky-700"
                                              : "bg-white"
                                              }`}
                                          >
                                            Ejercicio 2025
                                          </button>

                                        </div>
                                      </div>

                                      {/* PERIODOS */}
                                      {ejercicioSeleccionado && (
                                        <div>

                                          <h6 className="font-medium text-slate-700 mb-3">
                                            Periodos Pendientes
                                          </h6>

                                          <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">

                                            <div className="flex justify-between bg-white border rounded-lg p-3">
                                              <div>
                                                <div className="font-medium">
                                                  ENERO - FEBRERO
                                                </div>

                                                <div className="text-xs text-slate-500">
                                                  Bimestre 1 · Ejercicio {ejercicioSeleccionado}
                                                </div>
                                              </div>

                                              <span className="text-red-600 font-medium">
                                                No Cumplido
                                              </span>
                                            </div>

                                            <div className="flex justify-between bg-white border rounded-lg p-3">
                                              <div>
                                                <div className="font-medium">
                                                  MARZO - ABRIL
                                                </div>

                                                <div className="text-xs text-slate-500">
                                                  Bimestre 2 · Ejercicio {ejercicioSeleccionado}
                                                </div>
                                              </div>

                                              <span className="text-red-600 font-medium">
                                                No Cumplido
                                              </span>
                                            </div>

                                            <div className="flex justify-between bg-white border rounded-lg p-3">
                                              <div>
                                                <div className="font-medium">
                                                  MAYO - JUNIO
                                                </div>

                                                <div className="text-xs text-slate-500">
                                                  Bimestre 3 · Ejercicio {ejercicioSeleccionado}
                                                </div>
                                              </div>

                                              <span className="text-red-600 font-medium">
                                                No Cumplido
                                              </span>
                                            </div>

                                          </div>

                                        </div>
                                      )}

                                    </div>

                                  </div>

                                </div>

                              )}

                            </div>

                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>

              {/* MOTIVO DE CANCELACIÓN */}
              {!mostrarObligaciones && (
                <div className="bg-white rounded-xl border border-slate-300 shadow-sm">
                  <div className="border-b px-6 py-5">
                    <h3 className="text-lg font-semibold text-slate-800">
                      Motivo de Cancelación
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Seleccione el motivo por el cual se realizará la cancelación
                      del registro estatal.
                    </p>
                  </div>
                  <div className="p-6">

                    {tipoPersona === "moral" && (
                      <div className="grid md:grid-cols-2 gap-4">

                        <label
                          className={`border rounded-xl p-5 cursor-pointer transition hover:border-sky-500
        ${motivoCancelacion === "fusion"
                              ? "border-sky-600 bg-sky-50"
                              : ""
                            }`}
                        >
                          <input
                            type="radio"
                            className="hidden"
                            value="fusion"
                            checked={motivoCancelacion === "fusion"}
                            onChange={(e) =>
                              setMotivoCancelacion(e.target.value)
                            }
                          />

                          <div>
                            <h4 className="font-semibold text-slate-800">
                              Fusión de Sociedades
                            </h4>

                            <p className="text-sm text-slate-500 mt-2">
                              La sociedad desaparece al integrarse con otra sociedad.
                            </p>
                          </div>
                        </label>

                        <label
                          className={`border rounded-xl p-5 cursor-pointer transition hover:border-sky-500
        ${motivoCancelacion === "escision"
                              ? "border-sky-600 bg-sky-50"
                              : ""
                            }`}
                        >
                          <input
                            type="radio"
                            className="hidden"
                            value="escision"
                            checked={motivoCancelacion === "escision"}
                            onChange={(e) =>
                              setMotivoCancelacion(e.target.value)
                            }
                          />

                          <div>
                            <h4 className="font-semibold text-slate-800">
                              Escisión de Sociedades
                            </h4>

                            <p className="text-sm text-slate-500 mt-2">
                              La sociedad divide su patrimonio en una o más entidades.
                            </p>
                          </div>
                        </label>

                      </div>
                    )}

                    {tipoPersona === "fisica" && (
                      <div className="grid md:grid-cols-1 gap-4">

                        <label
                          className={`block border rounded-xl p-5 cursor-pointer transition hover:border-sky-500
      ${motivoCancelacion === "fallecimiento"
                              ? "border-sky-600 bg-sky-50"
                              : ""
                            }`}
                        >
                          <input
                            type="radio"
                            className="hidden"
                            value="fallecimiento"
                            checked={motivoCancelacion === "fallecimiento"}
                            onChange={(e) =>
                              setMotivoCancelacion(e.target.value)
                            }
                          />

                          <div>
                            <h4 className="font-semibold text-slate-800">
                              Fallecimiento
                            </h4>

                            <p className="text-sm text-slate-500 mt-2">
                              Cancelación del registro por fallecimiento del contribuyente.
                            </p>
                          </div>
                        </label>

                      </div>
                    )}
                  </div>
                </div>
              )}
              {motivoCancelacion && (
                <div className="bg-white rounded-xl border border-slate-300 shadow-sm mt-6">
                  <div>
                    <div className="border-b px-6 py-5">
                      <h3 className="text-lg font-semibold text-slate-800">
                        Datos del Aviso de Cancelación
                      </h3>
                    </div>

                    <div className="p-6">
                      {/* DATOS DEL AVISO */}

                      {motivoCancelacion === "fallecimiento" && (
                        <div className="grid md:grid-cols-2 gap-6">

                          <div>
                            <label className="block mb-2 font-medium">
                              Fecha de Fallecimiento *
                            </label>

                            <input
                              type="date"
                              className="w-full border rounded-lg px-4 py-3"
                            />
                          </div>

                          <div>
                            <label className="block mb-2 font-medium">
                              Número de Acta de Defunción *
                            </label>

                            <input
                              type="text"
                              className="w-full border rounded-lg px-4 py-3"
                            />
                          </div>

                          <div className="md:col-span-2 border-t pt-6">
                            <h4 className="font-semibold text-slate-700 mb-4">
                              Datos del RFC Sucesor
                            </h4>
                          </div>

                          <input
                            type="text"
                            placeholder="RFC *"
                            className="border rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="CURP *"
                            className="border rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="Primer Apellido *"
                            className="border rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="Segundo Apellido"
                            className="border rounded-lg px-4 py-3"
                          />

                          <div className="md:col-span-2">
                            <input
                              type="text"
                              placeholder="Nombre(s) *"
                              className="w-full border rounded-lg px-4 py-3"
                            />
                          </div>

                        </div>
                      )}

                      {motivoCancelacion === "fusion" && (
                        <div className="grid md:grid-cols-2 gap-6">

                          <input
                            type="text"
                            placeholder="RFC de la Sociedad Subsistente *"
                            className="border rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="Razón Social *"
                            className="border rounded-lg px-4 py-3"
                          />

                          <div className="md:col-span-2 border-t pt-6">
                            <h4 className="font-semibold text-slate-700 mb-4">
                              Representante Legal de Sociedad Subsistente
                            </h4>
                          </div>

                          <input
                            type="text"
                            placeholder="RFC *"
                            className="border rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="CURP *"
                            className="border rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="Primer Apellido *"
                            className="border rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="Segundo Apellido"
                            className="border rounded-lg px-4 py-3"
                          />

                          <div className="md:col-span-2">
                            <input
                              type="text"
                              placeholder="Nombre(s) *"
                              className="w-full border rounded-lg px-4 py-3"
                            />
                          </div>

                        </div>
                      )}

                      {motivoCancelacion === "escision" && (
                        <div className="grid md:grid-cols-2 gap-6">

                          <input
                            type="text"
                            placeholder="RFC de la Sociedad Escindida *"
                            className="border rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="Razón Social *"
                            className="border rounded-lg px-4 py-3"
                          />

                          <select className="border rounded-lg px-4 py-3">
                            <option>Tipo de Escisión *</option>
                            <option>Total</option>
                            <option>Parcial</option>
                          </select>

                          <div />

                          <div className="md:col-span-2 border-t pt-6">
                            <h4 className="font-semibold text-slate-700 mb-4">
                              Representante Legal de Sociedad Escindida
                            </h4>
                          </div>

                          <input
                            type="text"
                            placeholder="RFC *"
                            className="border rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="CURP *"
                            className="border rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="Primer Apellido *"
                            className="border rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="Segundo Apellido"
                            className="border rounded-lg px-4 py-3"
                          />

                          <div className="md:col-span-2">
                            <input
                              type="text"
                              placeholder="Nombre(s) *"
                              className="w-full border rounded-lg px-4 py-3"
                            />
                          </div>

                        </div>
                      )}
                    </div>
                  </div>
                  <div className="border-t px-6 py-4 flex justify-end">
                    {/* <button
                      type="button"
                      className="px-5 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
                    >
                      Regresar
                    </button> */}

                    <button
                      type="button"
                      onClick={() => {
                        setDatosValidados(true);
                      }}
                      className="px-6 py-2 rounded-lg flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white"


                    >
                      Validar Datos y Continuar
                    </button>
                  </div>
                </div>
              )}
              {datosValidados && !domicilioSeleccionado && (
                <div className="bg-white rounded-xl border border-slate-300 shadow-sm mt-6">
                  <div className="border-b px-6 py-5">
                    <h3 className="text-lg font-semibold text-slate-800">
                      Domicilios del contribuyente
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Seleccione un domicilio para recibir notificaciones
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 p-4">

                    {domicilios.map((domicilio) => (
                      <div
                        key={domicilio.id}
                        onClick={() => setDomicilioSeleccionado(domicilio)}
                        className={`border border-slate-300 rounded-xl p-5 cursor-pointer transition
      ${domicilioSeleccionado?.id === domicilio.id
                            ? "border-sky-700 bg-sky-50"
                            : "hover:border-sky-500"
                          }`}
                      >
                        <h4 className="font-semibold text-slate-800">
                          {domicilio.tipo}
                        </h4>

                        <p className="text-sm text-slate-500 mt-2">
                          {domicilio.direccion}
                        </p>

                        <button
                          type="button"
                          onClick={() => {
                            setDomicilioConsulta(domicilio);
                            setMostrarModalDomicilio(true);
                          }}
                          className="mt-4 text-sky-700 font-medium hover:underline"
                        >
                          Ver domicilio
                        </button>
                      </div>
                    ))}

                  </div>


                </div>
              )}
              {domicilioSeleccionado && (
                <div className="bg-white rounded-xl border border-green-300 shadow-sm mt-6">

                  <div className="border-b px-6 py-5 bg-green-50">
                    <h3 className="text-lg font-semibold text-green-800">
                      Domicilio Seleccionado
                    </h3>

                    <p className="text-sm text-green-700 mt-1">
                      El siguiente domicilio será utilizado para la conservación de la
                      contabilidad y notificaciones.
                    </p>
                  </div>

                  <div className="p-6">

                    <div className="grid md:grid-cols-2 gap-6">

                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Tipo de Domicilio
                        </p>

                        <p className="font-medium text-slate-800 mt-1">
                          {domicilioSeleccionado.tipo}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Tipo de Ámbito
                        </p>

                        <p className="font-medium text-slate-800 mt-1">
                          {domicilioSeleccionado.ambito}
                        </p>
                      </div>

                    </div>

                    <div className="mt-6">
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Domicilio
                      </p>

                      <p className="mt-2 text-slate-800 leading-relaxed">
                        {domicilioSeleccionado.direccion}
                      </p>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setDomicilioSeleccionado(null)}
                        className="px-5 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
                      >
                        Cambiar Domicilio
                      </button>
                    </div>

                  </div>
                </div>
              )}
              {/* MODAL */}
              {mostrarModalDomicilio && domicilioConsulta && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">

                    <div className="border-b px-6 py-4 flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800">
                          Consulta de Domicilio
                        </h3>

                        <p className="text-sm text-slate-500">
                          Información registrada del domicilio seleccionado
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setMostrarModalDomicilio(false);
                          setDomicilioConsulta(null);
                        }}
                        className="px-4 py-2 border rounded-lg hover:bg-slate-50"
                      >
                        Cerrar
                      </button>
                    </div>

                    <div className="p-6 space-y-8">

                      {/* DATOS GENERALES */}
                      <section>
                        <h4 className="font-semibold text-slate-700 mb-4">
                          Datos Generales del Domicilio
                        </h4>

                        <div className="grid md:grid-cols-3 gap-5">

                          <CampoConsulta
                            label="Tipo de Ámbito"
                            value={domicilioConsulta.ambito}
                          />

                          <CampoConsulta
                            label="Región"
                            value={domicilioConsulta.region}
                          />

                          <CampoConsulta
                            label="Distrito"
                            value={domicilioConsulta.distrito}
                          />

                          <CampoConsulta
                            label="Municipio / Delegación"
                            value={domicilioConsulta.municipio}
                          />

                          <CampoConsulta
                            label="Localidad"
                            value={domicilioConsulta.localidad}
                          />

                          <CampoConsulta
                            label="Tipo de Asentamiento"
                            value={domicilioConsulta.tipoAsentamiento}
                          />

                          <CampoConsulta
                            label="Nombre del Asentamiento"
                            value={domicilioConsulta.nombreAsentamiento}
                          />

                          <CampoConsulta
                            label="Tipo de Inmueble"
                            value={domicilioConsulta.tipoInmueble}
                          />

                          <CampoConsulta
                            label="Código Postal"
                            value={domicilioConsulta.codigoPostal}
                          />

                        </div>
                      </section>

                      {/* UBICACIÓN URBANA */}
                      {domicilioConsulta.ambito === "Urbano" && (
                        <section>
                          <h4 className="font-semibold text-slate-700 mb-4">
                            Ubicación del Domicilio
                          </h4>

                          <div className="grid md:grid-cols-3 gap-5">

                            <CampoConsulta
                              label="Tipo de Vialidad"
                              value={domicilioConsulta.tipoVialidad}
                            />

                            <CampoConsulta
                              label="Nombre de Vialidad"
                              value={domicilioConsulta.nombreVialidad}
                            />

                            <CampoConsulta
                              label="Número Exterior y/o Letra"
                              value={domicilioConsulta.numeroExterior}
                            />

                            <CampoConsulta
                              label="Número Interior y/o Letra"
                              value={domicilioConsulta.numeroInterior}
                            />

                            <CampoConsulta
                              label="Entre Vialidad"
                              value={domicilioConsulta.entreVialidad}
                            />

                            <CampoConsulta
                              label="Y Vialidad"
                              value={domicilioConsulta.yVialidad}
                            />

                            <CampoConsulta
                              label="Ubicación del Inmueble dentro de la Manzana"
                              value={domicilioConsulta.ubicacionManzana}
                            />

                          </div>
                        </section>
                      )}

                      {/* UBICACIÓN RURAL */}
                      {domicilioConsulta.ambito === "Rural" && (
                        <section>
                          <h4 className="font-semibold text-slate-700 mb-4">
                            Ubicación del Domicilio
                          </h4>

                          <div className="grid md:grid-cols-3 gap-5">

                            <CampoConsulta
                              label="Tipo de Vía de Comunicación"
                              value={domicilioConsulta.tipoVia}
                            />

                            <CampoConsulta
                              label="Nombre de Vía de Comunicación"
                              value={domicilioConsulta.nombreVia}
                            />

                            <CampoConsulta
                              label="Tramo"
                              value={domicilioConsulta.tramo}
                            />

                          </div>
                        </section>
                      )}

                      {/* INFORMACIÓN COMPLEMENTARIA */}
                      <section>
                        <h4 className="font-semibold text-slate-700 mb-4">
                          Información Complementaria
                        </h4>

                        <div className="grid md:grid-cols-2 gap-5">

                          <CampoConsulta
                            label="Características del Domicilio"
                            value={domicilioConsulta.caracteristicas}
                          />

                          <CampoConsulta
                            label="Referencias Adicionales"
                            value={domicilioConsulta.referencias}
                          />

                        </div>
                      </section>

                    </div>

                  </div>
                </div>
              )}
              <div className="border-t mt-6 px-6 py-4 flex justify-between">

                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="px-5 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Regresar
                </button>

                <button
                  type="button"
                  disabled={!establecimientoSeleccionado}
                  onClick={() => setOpenConfirmacion(true)}
                  className="px-6 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg disabled:bg-slate-400"
                >
                  Continuar
                </button>

              </div>
            </div>

          )
        }
      </main >

      {/* FOOTER */}
      < footer className="bg-slate-900 text-slate-300" >
        <div className="max-w-7xl mx-auto px-8 py-4 flex flex-col md:flex-row justify-between">
          <span>
            Sistema Financiero de Oaxaca | Avisos Fiscales v1.0
          </span>

          <span>
            © 2026 Gobierno del Estado de Oaxaca. Todos los
            derechos reservados.
          </span>
        </div>
      </footer >
    </div >

  );
}