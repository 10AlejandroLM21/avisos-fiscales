import React, { useState, useEffect } from "react";
import './App.css';
import RepresentanteLegalForm from "./components/RepresentanteLegal";
import DomicilioFiscal from "./components/DomicilioFiscal";
import DomicilioFiscalForm from "./components/DomicilioFiscalForm";
import DomicilioFiscalForm2 from "./components/DomicilioFiscalFormAlternativo";
import DatosRepresentante from "./components/DatosRepresentante";
import DocumentoProtocolizado from "./components/DocumentoProtocolizado";
import CampoConsulta from "./components/CampoConsulta";
import FormularioRepresentanteLegal from "./components/FormularioRepresentanteLegal";
import CampoInput from "./components/CampoInput";
import CampoArchivo from "./components/CampoArchivo";
import CampoSelect from "./components/CampoSelect";
import DocumentoConsulta from "./components/DocumentoConsulta";
import DetalleDomicilio from "./components/DetalleDomicilio";
import ModalFormulario from "./components/ModalFormulario";
import CardEstablecimiento from "./components/CardEstablecimiento";
import DisminucionDeObligaciones from "./Views/DisminucionDeObligaciones";
import Digitalizacion from "./Views/Digitalizacion";
import BotonesNavegacion from "./components/BotonesNavegacion";
import HeaderModulo from "./components/HeaderModulo";
import CarouselTarjetas from "./components/CarouselTarjetas";
import ModalRepresentanteLegal from "./components/ModalRepresentanteLegal";
import ModalAccionAviso from "./components/ModalAccionAviso";
import DocumentacionRequerida from "./components/DocumentacionRequerida";
import ObligacionesPendientes from "./components/Adeudos";
import ObligacionesSuspender from "./components/ObligacionesRegistradas";
import CampoFecha from "./components/CampoFecha";
import ReanudacionDeActividades from "./Views/ReanudacionDeActividades";
import DomiciliosRegistrados from "./components/DomiciliosRegistrados";
import CampoTextArea from "./components/CampoTextArea";
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
  Pencil,
  Trash2,
  AlertTriangle,
  Home,
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
  Save,
  CircleCheckBig,
  CircleX,
  ArrowLeft,
  CheckCircle2,
  Eye,
  BadgeCheck,
  Check,
  MapPinned,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  MapPin,
  BriefcaseBusiness,
  Building
} from "lucide-react";
import AumentoObligaciones from "./Views/AumentoObligaciones";
export default function AvisosFiscales() {
  const catalogoObligaciones = [

    {
      value: "erogaciones",
      label: "Impuesto Sobre Erogaciones por Remuneraciones al Trabajo Personal"
    },

    {
      value: "hospedaje",
      label: "Impuesto Sobre Prestación de Servicios de Hospedaje"
    },

    {
      value: "cedular",
      label: "Impuesto Cedular por la Prestación de Servicios Profesionales"
    },

    {
      value: "cedular_arrendamiento",
      label: "Impuesto Cedular por el Otorgamiento del Uso o Goce Temporal de Bienes Inmuebles"
    },

    {
      value: "cedular_enajenacion",
      label: "Impuesto Cedular por la Enajenación de Bienes Inmuebles"
    },

    {
      value: "rifas",
      label: "Impuesto Sobre Loterías, Rifas, Sorteos y Concursos"
    },

    {
      value: "espectaculos",
      label: "Impuesto Sobre Espectáculos Públicos"
    },

    {
      value: "juegos",
      label: "Impuesto Sobre Juegos Permitidos"
    },

    {
      value: "nomina_eventual",
      label: "Impuesto Sobre Nóminas por Personal Eventual"
    },

    {
      value: "bebidas",
      label: "Impuesto Sobre Venta Final de Bebidas con Contenido Alcohólico"
    },

    {
      value: "adquisicion",
      label: "Impuesto Sobre Adquisición de Vehículos Usados"
    },

    {
      value: "notarios",
      label: "Obligación de Presentar Avisos Notariales"
    },

    {
      value: "retenedor",
      label: "Retenedor del Impuesto Sobre Erogaciones por Remuneraciones al Trabajo Personal"
    }

  ];
  const [desplegarCapturaDomicilio, setDesplegarCapturaDomicilio] = useState(false);
  const [mostrarDomicilios, setMostrarDomicilios] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [tipoPersona, setTipoPersona] = useState("");
  const [metodoBusqueda, setMetodoBusqueda] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [representanteConsulta, setRepresentanteConsulta] = useState(null); // Para el modal
  const [representanteSeleccionado, setRepresentanteSeleccionado] =
    useState(null);
  const [modalAviso, setModalAviso] = useState(false);
  const [avisoPrev, setAvisoPrev] = useState("");
  const [modalRepresentante, setModalRepresentante] = useState(false);
  const [representacion, setRepresentacion] = useState("");
  const [mostrarFormularioRepresentante, setMostrarFormularioRepresentante] = useState(false);
  const [pasoModal, setPasoModal] = useState(1);
  const [avisoSeleccionado, setAvisoSeleccionado] = useState("");
  const [vistaPrevia, setVistaPrevia] = useState(false);
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
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  const [establecimientoPendiente, setEstablecimientoPendiente] = useState(null);
  // Modal de detalle
  const [openDetalle, setOpenDetalle] =
    useState(false);
  const obtenerEtiquetaBoton = () => {

    switch (selectedRow) {

      case "Cambio de Domicilio Fiscal":
        return "Siguiente";

      case "Cambio de Nombre, Denominación o Razón Social":
        return "Siguiente";

      case "Cambio de Representante Legal":
        return "Siguiente";

      case "Aumento de Obligaciones":
        return "Siguiente";

      case "Reanudación de Actividades":
        return "Siguiente";

      case "Disminucion de Obligaciones":
        return "Siguiente";

      case "Suspensión de Actividades":
        return "Siguiente";

      case "Apertura de Establecimientos o Locales":
        return "Siguiente";

      case "Cierre de Establecimientos o Locales":
        return "Siguiente";

      case "Cancelación en el Registro Estatal de Contribuyentes":
        return "Siguiente";

      default:
        return "Siguiente";

    }

  };
  // Información del establecimiento a visualizar
  const [
    establecimientoDetalle,
    setEstablecimientoDetalle
  ] = useState(null);

  const obtenerConfiguracionAviso = () => {

    switch (selectedRow) {

      case "Cambio de Domicilio Fiscal":
        return {
          titulo: "Confirmar Cambio de Domicilio Fiscal",
          descripcion: "Se generará el aviso de cambio de domicilio fiscal. Verifique que la información capturada sea correcta antes de continuar.",
          boton: "Generar Aviso"
        };

      case "Cambio de Nombre, Denominación o Razón Social":
        return {
          titulo: "Confirmar Cambio de Nombre, Denominación o Razón Social",
          descripcion: "Se generará el aviso para actualizar el nombre, denominación o razón social del contribuyente. Revise cuidadosamente la información antes de continuar.",
          boton: "Generar Aviso"
        };

      case "Cambio de Representante Legal":
        return {
          titulo: "Confirmar Cambio de Representante Legal",
          descripcion: "Se generará el aviso para actualizar el representante legal del contribuyente. Verifique que el representante seleccionado sea el correcto.",
          boton: "Generar Aviso"
        };

      case "Aumento de Obligaciones":
        return {
          titulo: "Confirmar Aumento de Obligaciones",
          descripcion: "Se generará el aviso de aumento de obligaciones fiscales. Confirme que las obligaciones seleccionadas sean las que desea registrar.",
          boton: "Generar Aviso"
        };

      case "Reanudación de Actividades":
        return {
          titulo: "Confirmar Reanudación de Actividades",
          descripcion: "Se generará el aviso de reanudación de actividades del contribuyente. Verifique la información antes de continuar.",
          boton: "Generar Aviso"
        };

      case "Disminucion de Obligaciones":
        return {
          titulo: "Confirmar Disminución de Obligaciones",
          descripcion: "Se generará el aviso de disminución de obligaciones fiscales. Revise las obligaciones seleccionadas antes de continuar.",
          boton: "Generar Aviso"
        };

      case "Suspensión de Actividades":
        return {
          titulo: "Confirmar Suspensión de Actividades",
          descripcion: "Se generará el aviso de suspensión de actividades. Una vez generado el aviso, el trámite continuará con la digitalización de documentos.",
          boton: "Generar Aviso"
        };

      case "Apertura de Establecimientos o Locales":
        return {
          titulo: "Confirmar Apertura de Establecimiento o Local",
          descripcion: "Se generará el aviso de apertura del establecimiento o local registrado. Verifique los datos antes de continuar.",
          boton: "Generar Aviso"
        };

      case "Cierre de Establecimientos o Locales":
        return {
          titulo: "Confirmar Cierre de Establecimiento o Local",
          descripcion: "Se generará el aviso de cierre del establecimiento o local seleccionado. Confirme que la información sea correcta.",
          boton: "Generar Aviso"
        };

      case "Cancelación en el Registro Estatal de Contribuyentes":
        return {
          titulo: "Confirmar Cancelación en el Registro Estatal de Contribuyentes",
          descripcion: "Se generará el aviso de cancelación en el Registro Estatal de Contribuyentes. Esta acción deberá revisarse cuidadosamente antes de continuar.",
          boton: "Generar Aviso"
        };

      default:
        return {
          titulo: "Confirmar Aviso",
          descripcion: "Verifique la información capturada antes de generar el aviso.",
          boton: "Generar Aviso"
        };

    }

  };
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

  const [nuevosRepresentantes, setNuevosRepresentantes] = useState([
    {
      id: 1,
      rfc: "PEMJ900315AB2",
      curp: "PEMJ900315HTSRRN09",
      nombres: "Juan Carlos",
      apellidoPaterno: "Pérez",
      apellidoMaterno: "Martínez",
      correoElectronico: "juan.perez@empresa.com.mx",
      telefono: "9931234567",
      tipoAcreditacion: "Poder Notarial",
      documentoProtocolizado: "Escritura Pública No. 1245",
      domicilio:
        "Av. Paseo Tabasco No. 120, Col. Centro, C.P. 86000, Centro, Tabasco",
      fechaRegistro: "12/07/2026",
    },
  ]);
  const [representantesActuales, setRepresentantesActuales] = useState([
    {
      id: 1,
      nombre: "Juan Pérez López",
      rfc: "JUAP900101XXX",
      curp: "JUAP900101HOCXXX01",
      fechaRegistro: "20/01/2025"
    },
    {
      id: 2,
      nombre: "María López Torres",
      rfc: "MALT900101XXX",
      curp: "MALT900101MOCXXX01",
      fechaRegistro: "20/01/2024"

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
  const [mostrarDomicilio, setMostrarDomicilio] = useState(false);
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
      actividad: "Prestación de Servicios Profesionales",
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
      nombre: "Impuesto Sobre Erogaciones por Remuneraciones al Trabajo Personal",
      actividad: "Comercio al por Menor de Abarrotes",
      cumplidas: 8,
      pendientes: 4,
      declaraciones: [
        { periodo: "Enero 2026", estatus: "Cumplido" },
        { periodo: "Febrero 2026", estatus: "Cumplido" },
        { periodo: "Marzo 2026", estatus: "Cumplido" },
        { periodo: "Abril 2026", estatus: "No Cumplido" }
      ]
    },

    {
      id: 4,
      nombre: "Impuesto Cedular por Arrendamiento de Bienes Inmuebles",
      actividad: "Arrendamiento de Locales Comerciales",
      cumplidas: 9,
      pendientes: 3,
      declaraciones: [
        { periodo: "Enero 2026", estatus: "Cumplido" },
        { periodo: "Febrero 2026", estatus: "No Cumplido" }
      ]
    },

    {
      id: 5,
      nombre: "Impuesto Cedular por Prestación de Servicios Profesionales",
      actividad: "Consultoría en Tecnologías de la Información",
      cumplidas: 12,
      pendientes: 0,
      declaraciones: [
        { periodo: "Enero 2026", estatus: "Cumplido" },
        { periodo: "Febrero 2026", estatus: "Cumplido" }
      ]
    },

    {
      id: 6,
      nombre: "Impuesto Sobre Diversiones y Espectáculos Públicos",
      actividad: "Organización de Eventos",
      cumplidas: 6,
      pendientes: 6,
      declaraciones: [
        { periodo: "Enero 2026", estatus: "No Cumplido" },
        { periodo: "Febrero 2026", estatus: "Cumplido" }
      ]
    },

    {
      id: 7,
      nombre: "Impuesto Sobre Juegos con Apuestas y Sorteos",
      actividad: "Sorteos Promocionales",
      cumplidas: 11,
      pendientes: 1,
      declaraciones: [
        { periodo: "Enero 2026", estatus: "Cumplido" },
        { periodo: "Febrero 2026", estatus: "Cumplido" }
      ]
    },

    {
      id: 8,
      nombre: "Impuesto Sobre Enajenación de Vehículos Usados",
      actividad: "Compraventa de Vehículos",
      cumplidas: 7,
      pendientes: 5,
      declaraciones: [
        { periodo: "Enero 2026", estatus: "Cumplido" },
        { periodo: "Febrero 2026", estatus: "No Cumplido" }
      ]
    },

    {
      id: 9,
      nombre: "Impuesto Sobre Loterías, Rifas, Sorteos y Concursos",
      actividad: "Rifas Comerciales",
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
  const [representantes, setRepresentantes] = useState([

    {
      id: 1,
      nombre: "Juan Pérez Hernández",
      rfc: "PEHJ900101ABC",
      curp: "PEHJ900101HOCRNN09",
      fechaRegistro: "20/01/2025",
      tipoAcreditacion: "Carta Poder con Ratificación de Firmas ante Notario",

      correo: "juan@correo.com",
      telefono: "9511234567",

      ambito: "URBANO",

      calle: "Av. Universidad",
      numeroExterior: "120",
      numeroInterior: "3-B",
      colonia: "Reforma",
      codigoPostal: "68050",
      municipio: "Oaxaca de Juárez",
      entidad: "Oaxaca",

      domicilioFiscal:
        "Av. Universidad No. 120 Int. 3-B, Col. Reforma, C.P. 68050, Oaxaca de Juárez, Oaxaca"

    },

    {
      id: 2,
      nombre: "María López Ruiz",
      rfc: "LORM920215AAA",
      curp: "LORM920215MOCRZZ01",
      fechaRegistro: "20/01/2025",
      tipoAcreditacion: "Acta Protocolizada mediante Carta Poder",

      correo: "maria@correo.com",
      telefono: "9519876543",

      ambito: "RURAL",

      localidad: "San Pedro Ixtlahuaca",
      municipio: "San Pedro Ixtlahuaca",
      entidad: "Oaxaca",
      codigoPostal: "71224",

      domicilioFiscal:
        "Localidad San Pedro Ixtlahuaca, C.P. 71224, San Pedro Ixtlahuaca, Oaxaca"

    }

  ]);

  const [representantesNuevos, setRepresentantesNuevos] = useState([

    {
      id: 1,
      nombre: "María Fernanda López García",
      rfc: "LOGF920315XYZ",
      curp: "LOGF920315MOCPRRA7",
      fechaRegistro: "20/01/2025",
      tipoAcreditacion: "Poder Notarial",

      correo: "maria.lopez@correo.com",
      telefono: "9512346789",

      ambito: "RURAL",

      calle: "Calle Independencia",
      numeroExterior: "245",
      numeroInterior: "2-A",
      colonia: "Centro",
      codigoPostal: "68000",
      municipio: "Oaxaca de Juárez",
      entidad: "Oaxaca",

      domicilioFiscal:
        "Calle Independencia No. 245 Int. 2-A, Col. Centro, C.P. 68000, Oaxaca de Juárez, Oaxaca"
    }

  ]);

  const [eliminarRep, setEliminarRep] = useState(false);
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
  const obtenerBotonDerecha = () => {

    // Paso 4
    if (activeStep === 4) {

      return [
        {
          etiqueta: obtenerEtiquetaBoton(),
          icono: "FileCheck2",
          className: "bg-blue-600 text-white hover:bg-blue-700",
          disabled: !selectedRow,
          onClick: () => {
            setModalAviso(true);
          }
        }
      ];

    }

    // Paso 5 - Vista previa
    if (activeStep === 5 && vistaPrevia) {

      return [];

    }

    // Paso 5 - Digitalización
    if (activeStep === 5 && !vistaPrevia) {

      return [
        {
          etiqueta: "Finalizar Aviso",
          icono: "CheckCircle2",
          className: "bg-emerald-600 text-white hover:bg-emerald-700",
          disabled: !selectedRow,
          onClick: () => {
            // Finalizar trámite
          }
        }
      ];

    }

    return [];

  };
  const configAviso = obtenerConfiguracionAviso();
  let botonesIzquierda = [];

  const configuracionCampos = [

    {
      key: "rfc",
      etiqueta: "RFC",
      tipo: "input",
      tipoExistente: "actualizacion"
    },

    {

      key: "curp",
      etiqueta: "CURP",
      tipo: "input",
      tipoExistente: "correccion"
    },

    {
      key: "nombreComercial",
      etiqueta: "Nombre Comercial",
      tipo: "input",
      tipoExistente: "actualizacion"
    },

    {
      key: "primerApellido",
      etiqueta: "Primer Apellido",
      tipo: "input",
      tipoExistente: "correccion"
    },

    {
      key: "segundoApellido",
      etiqueta: "Segundo Apellido",
      tipo: "input",
      tipoExistente: "correccion"
    },

    {
      key: "nombre",
      etiqueta: "Nombre",
      tipo: "input",
      tipoExistente: "correccion"
    },

    {
      key: "fechaNacimiento",
      etiqueta: "Fecha de Nacimiento",
      tipo: "input",
      tipoExistente: "correccion"
    },
    {
      key: "sectorGubernamental",
      etiqueta: "Sector Gubernamental",
      tipo: "select",
      tipoExistente: "Incorporación"
    },
    {
      key: "subsectorGubernamental",
      etiqueta: "Tipo de Subsector Gubernamental",
      tipo: "select",
      tipoExistente: "Incorporación"
    }

  ];
  const [datosActuales, setDatosActuales] = useState({

    rfc: "PEMJ900101ABC",

    curp: "",

    nombreComercial: "",

    primerApellido: "PEREZ",

    segundoApellido: "LOPEZ",

    nombre: "JUAN",

    fechaNacimiento: ""

  });

  const respuesta = {

    rfc: "PEMJ900101ABC",

    curp: "",

    nombreComercial: "",

    primerApellido: "PEREZ",

    segundoApellido: "LOPEZ",

    nombre: "JUAN",

    fechaNacimiento: ""

  };
  const obtenerTipoCambio = (campo) => {

    const valorActual = datosActuales[campo.key];

    if (!valorActual)
      return "Incorporación";

    // Siempre inicia como Actualización
    // El usuario decide si cambiarlo a Corrección
    return "Actualización";

  };
  const [representanteEjecutor, setRepresentanteEjecutor] = useState(null);

  const [tipoCambio, setTipoCambio] = useState({});
  const [mostrarDatosContacto, setMostrarDatosContacto] = useState(true);
  const [mostrarDocumentacion, setMostrarDocumentacion] = useState(false);

  useEffect(() => {

    const cambios = {};

    configuracionCampos.forEach(campo => {

      cambios[campo.key] = obtenerTipoCambio(campo);

    });

    setTipoCambio(cambios);

  }, [datosActuales]);
  if (activeStep === 5 && vistaPrevia) {

    botonesIzquierda = []
  } else if (activeStep === 5 && !vistaPrevia) {

    botonesIzquierda = [

    ];

  } else if (activeStep === 4) {

    botonesIzquierda = [

      {
        etiqueta: "Regresar",
        icono: "ArrowLeft",
        className: "bg-slate-600 text-white hover:bg-slate-700",
        onClick: () => {
          setActiveStep(3);
        }
      }

    ];

  }

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
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-8 py-3 text-sm text-slate-500">
          INICIO / ADMINISTRACIÓN DE CONTRIBUYENTES / AVISOS FISCALES
        </div>
      </div>

      {/* CONTENIDO */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-8">

        {/* TITULO */}
        <div className="bg-white rounded-xl shadow md p-6 mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            AVISOS FISCALES
          </h2>

          <p className="text-slate-500 mt-2">
          </p>
        </div>

        {/* STEPPER */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
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
                    className={`w-12 h-12 rounded-full flex items-center justify-center -4 transition-all
                      ${completed
                        ? "bg-green-600 -green-600 text-white"
                        : current
                          ? "bg-sky-700 -sky-700 text-white"
                          : "bg-white -slate-300 text-slate-500"
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
          <div>
            <div className="bg-white rounded-xl  shadow-sm">
              <div className="-b px-6 py-5">
                <h3 className="text-lg font-semibold text-slate-800">
                  Búsqueda de Contribuyente
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Seleccione el tipo de persona y el método de búsqueda para
                  localizar al contribuyente registrado en el Registro Estatal de Contribuyentes.
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
                      className={` rounded-xl p-4 cursor-pointer transition hover:-sky-500
                    ${tipoPersona === "fisica"
                          ? "-sky-600 bg-sky-50"
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
                      className={` rounded-xl p-4 cursor-pointer transition hover:-sky-500
                    ${tipoPersona === "moral"
                          ? "-sky-600 bg-sky-50"
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
                      className="w-full md:w-96  rounded-lg px-4 py-3 focus:ring-2 focus:ring-sky-600 outline-none"
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
                      className="w-full md:w-96  rounded-lg px-4 py-3 focus:ring-2 focus:ring-sky-600 outline-none"
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
                            className="w-full  rounded-lg px-4 py-3"
                          />
                        </div>

                        <div>
                          <label className="block mb-2 font-medium text-slate-700">
                            Segundo Apellido
                          </label>

                          <input
                            type="text"
                            className="w-full  rounded-lg px-4 py-3"
                          />
                        </div>

                        <div className="col-span-1">
                          <label className="block mb-2 font-medium text-slate-700">
                            Nombre(s) *
                          </label>

                          <input
                            type="text"
                            className="w-full  rounded-lg px-4 py-3"
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
                          className="w-full  rounded-lg px-4 py-3"
                        />
                      </div>
                    </section>
                  )}
              </div>
            </div>
            <BotonesNavegacion
              derecha={[
                {
                  etiqueta: "Buscar",
                  icono: "Search",
                  className: "bg-blue-600 text-white hover:bg-blue-700",
                  onClick: () => setActiveStep(1)
                }

              ]}
            />
          </div>
        )}

        {/* COINCIDENCIAS */}
        {activeStep === 1 && (
          <div>
            <div className="bg-white rounded-xl  shadow-sm">

              <div className="-b px-6 py-5">
                <h3 className="text-xl font-semibold text-slate-800">
                  Coincidencias
                </h3>

                <p className="text-slate-500 mt-2">
                  Seleccione al contribuyente para dar inicio con el aviso fiscal.
                </p>
              </div>

              <div className="p-6">

                {/* PERSONA FISICA */}

                {tipoPersona === "fisica" && (
                  <div className="overflow-x-auto">

                    <table className="w-full text-sm  -slate-200">
                      <thead className="bg-slate-100">
                        <tr>
                          <th className="p-3 ">Seleccionar</th>
                          <th className="p-3 ">Tipo Persona</th>
                          <th className="p-3 ">RFC</th>
                          <th className="p-3 ">Nombre</th>
                          <th className="p-3 ">Primer Apellido</th>
                          <th className="p-3 ">Segundo Apellido</th>
                          <th className="p-3 ">Nombre Comercial</th>
                          <th className="p-3 ">Fecha Nacimiento</th>
                          <th className="p-3 ">CURP</th>
                          <th className="p-3 ">Estatus</th>
                          <th className="p-3 ">Origen</th>
                        </tr>
                      </thead>

                      <tbody>
                        {/* <tr className="hover:bg-sky-50">
                          <td className=" p-3 text-center">
                            <input type="checkbox" />
                          </td>
                          <td className=" p-3">Física</td>
                          <td className=" p-3">MORL900512ABC</td>
                          <td className=" p-3">JUAN</td>
                          <td className=" p-3">MORALES</td>
                          <td className=" p-3">LÓPEZ</td>
                          <td className=" p-3">ABARROTES JUAN</td>
                          <td className=" p-3">12/05/1990</td>
                          <td className=" p-3">MOLJ900512HTCRPN01</td>
                          <td className=" p-3">
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                              ACTIVO
                            </span>
                          </td>
                          <td className=" p-3">SIOX</td>
                        </tr> */}

                        <tr className="hover:bg-sky-50">
                          <td className=" p-3 text-center">
                            <input type="checkbox" />
                          </td>
                          <td className=" p-3">Física</td>
                          <td className=" p-3">PEMG850318XYZ</td>
                          <td className=" p-3">MARÍA</td>
                          <td className=" p-3">PÉREZ</td>
                          <td className=" p-3">GARCÍA</td>
                          <td className=" p-3">PAPELERÍA DEL SUR</td>
                          <td className=" p-3">18/03/1985</td>
                          <td className=" p-3">PEGM850318MTCRRR02</td>
                          <td className=" p-3">
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                              ACTIVO
                            </span>
                          </td>
                          <td className=" p-3">SIOX</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {/* PERSONA MORAL */}

                {tipoPersona === "moral" && (
                  <div className="overflow-x-auto">

                    <table className="w-full text-sm  -slate-200">
                      <thead className="bg-slate-100">
                        <tr>
                          <th className="p-3 ">Seleccionar</th>
                          <th className="p-3 ">Tipo Persona</th>
                          <th className="p-3 ">RFC</th>
                          <th className="p-3 ">
                            Denominación o Razón Social
                          </th>
                          <th className="p-3 ">
                            Nombre Comercial
                          </th>
                          <th className="p-3 ">
                            Fecha Acta Constitutiva
                          </th>
                          <th className="p-3 ">Estatus</th>
                          <th className="p-3 ">Origen</th>
                          <th className="p-3 ">Tipo Entidad</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr className="hover:bg-sky-50">
                          <td className=" p-3 text-center">
                            <input type="checkbox" />
                          </td>
                          <td className=" p-3">Moral</td>
                          <td className=" p-3">CSO210315AA1</td>
                          <td className=" p-3">
                            COMERCIALIZADORA DEL SUR S.A. DE C.V.
                          </td>
                          <td className=" p-3">COMSUR MATRIZ</td>
                          <td className=" p-3">15/03/2021</td>
                          <td className=" p-3">
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                              ACTIVO
                            </span>
                          </td>
                          <td className=" p-3">SIOX</td>
                          <td className=" p-3">PRINCIPAL</td>
                        </tr>

                        <tr className="hover:bg-sky-50">
                          <td className=" p-3 text-center">
                            <input type="checkbox" />
                          </td>
                          <td className=" p-3">Moral</td>
                          <td className=" p-3">CSO210315AA1</td>
                          <td className=" p-3">
                            COMERCIALIZADORA DEL SUR S.A. DE C.V.
                          </td>
                          <td className=" p-3">COMSUR</td>
                          <td className=" p-3">15/03/2021</td>
                          <td className=" p-3">
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                              ACTIVO
                            </span>
                          </td>
                          <td className=" p-3">SIOX</td>
                          <td className=" p-3">SECUNDARIO</td>
                        </tr>

                        <tr className="hover:bg-sky-50">
                          <td className=" p-3 text-center">
                            <input type="checkbox" />
                          </td>
                          <td className=" p-3">Moral</td>
                          <td className=" p-3">CSO210315AA1</td>
                          <td className=" p-3">
                            COMERCIALIZADORA DEL SUR S.A. DE C.V.
                          </td>
                          <td className=" p-3">COMSUR</td>
                          <td className=" p-3">15/03/2021</td>
                          <td className=" p-3">
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                              ACTIVO
                            </span>
                          </td>
                          <td className=" p-3">SIOX</td>
                          <td className=" p-3">SECUNDARIO</td>
                        </tr>

                        <tr className="hover:bg-sky-50">
                          <td className=" p-3 text-center">
                            <input type="checkbox" />
                          </td>
                          <td className=" p-3">Moral</td>
                          <td className=" p-3">CSO210315AA1</td>
                          <td className=" p-3">
                            COMERCIALIZADORA DEL SUR S.A. DE C.V.
                          </td>
                          <td className=" p-3">COMSUR</td>
                          <td className=" p-3">15/03/2021</td>
                          <td className=" p-3">
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                              ACTIVO
                            </span>
                          </td>
                          <td className=" p-3">SIOX</td>
                          <td className=" p-3">SECUNDARIO</td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                )}

              </div>
            </div>

            <BotonesNavegacion

              izquierda={[

                {
                  etiqueta: "Regresar",
                  icono: "ArrowLeft",
                  className: " -slate-300 text-slate-700 hover:bg-slate-50",
                  onClick: () => setActiveStep(0)
                }

              ]}

              derecha={[

                {
                  etiqueta: "Siguiente",
                  icono: "ArrowRight",
                  className: "bg-blue-600 text-white hover:bg-blue-700",
                  onClick: () => setActiveStep(2)
                }

              ]}

            />
          </div>
        )}

        {/* DATOS DEL CONTRIBUYENTE */}
        {activeStep === 2 && (
          <div>
            <div className="bg-white rounded-xl  shadow-sm">

              {/* ENCABEZADO */}
              <div className="-b px-6 py-5">
                <h3 className="text-xl font-semibold text-slate-800">
                  Datos del Contribuyente
                </h3>
                {/* 
                <p className="text-slate-500 mt-2">
                  Información general del contribuyente seleccionado.
                </p> */}
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
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-slate-600">
                              RFC
                            </label>
                            <input
                              disabled
                              value="MORL900512ABC"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-slate-600">
                              CURP
                            </label>
                            <input
                              disabled
                              value="MOLJ900512HTCRPN01"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-slate-600">
                              Primer Apellido
                            </label>
                            <input
                              disabled
                              value="MORALES"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-slate-600">
                              Segundo Apellido
                            </label>
                            <input
                              disabled
                              value="LÓPEZ"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-slate-600">
                              Nombre(s)
                            </label>
                            <input
                              disabled
                              value="JUAN CARLOS"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>

                          <div className="col-span-3">
                            <label className="text-sm font-medium text-slate-600">
                              Nombre Comercial
                            </label>
                            <input
                              disabled
                              value="ABARROTES JUAN"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>

                          <div className="col-span-3">
                            <label className="text-sm font-medium text-slate-600">
                              Régimen Fiscal
                            </label>
                            <input
                              disabled
                              value="Régimen Simplificado de Confianza"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-slate-600">
                              Nacionalidad
                            </label>
                            <input
                              disabled
                              value="Méxicana"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-slate-600">
                              Lugar de Nacimiento
                            </label>
                            <input
                              disabled
                              value="OC-OAXACA"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-slate-600">
                              Fecha de Nacimiento
                            </label>
                            <input
                              disabled
                              value="12/05/1990"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-slate-600">
                              Género
                            </label>
                            <input
                              disabled
                              value="Masculino"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
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
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-slate-600">
                              Correo Electrónico (Alternativo)
                            </label>
                            <input
                              disabled
                              value="juan.morales@email.com"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-slate-600">
                              Teléfono Móvil
                            </label>
                            <input
                              disabled
                              value="9511234567"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-slate-600">
                              Teléfono (Alternativo)
                            </label>
                            <input
                              disabled
                              value="9511234567"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
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

                        <div className="grid grid-cols-6 gap-5">

                          <div className="col-span-3">
                            <label className="text-sm font-medium text-slate-600">
                              Tipo Registro
                            </label>
                            <input
                              disabled
                              value="RFC"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>

                          <div className="col-span-3">
                            <label className="text-sm font-medium text-slate-600">
                              RFC
                            </label>
                            <input
                              disabled
                              value="MORL900512ABC"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>
                          <div className="col-span-6">
                            <label className="text-sm font-medium text-slate-600">
                              Denominación o razón social
                            </label>
                            <input
                              disabled
                              value="MOLJ900512HTCRPN01"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>
                          <div className="col-span-6">
                            <label className="text-sm font-medium text-slate-600">
                              Régimen Capital
                            </label>
                            <input
                              disabled
                              value="Régimen Simplificado de Confianza"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>

                          <div className="col-span-6">
                            <label className="text-sm font-medium text-slate-600">
                              Régimen Fiscal
                            </label>
                            <input
                              disabled
                              value="Régimen Simplificado de Confianza"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>

                          <div className="col-span-6">
                            <label className="text-sm font-medium text-slate-600">
                              Nombre Comercial
                            </label>
                            <input
                              disabled
                              value="ABARROTES JUAN"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>

                          <div className="col-span-3">
                            <label className="text-sm font-medium text-slate-600">
                              Fecha de Acta Constitutiva
                            </label>
                            <input
                              disabled
                              value="12/05/1990"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
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
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-slate-600">
                              Correo Electrónico (Alternativo)
                            </label>
                            <input
                              disabled
                              value="juan.morales@email.com"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-slate-600">
                              Teléfono Móvil
                            </label>
                            <input
                              disabled
                              value="9511234567"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-slate-600">
                              Teléfono (Alternativo) - Movil
                            </label>
                            <input
                              disabled
                              value="9511234567"
                              className="w-full mt-1  rounded-lg px-3 py-2 bg-slate-100"
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

                  <div className="bg-slate-50  rounded-xl p-5">

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

                  <div className="overflow-x-auto pb-3">

                    <CarouselTarjetas

                      elementos={obligaciones}

                      tarjetasPorPagina={3}

                      renderItem={(item) => (

                        <div className="w-full h-full rounded-2xl  bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">

                          {/* Header */}

                          <div className="px-5 py-4 -b bg-gradient-to-r from-sky-50 to-white">

                            <div className="flex items-center justify-between">

                              <span className="inline-flex items-center px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold">

                                Obligación Fiscal

                              </span>

                              <span className="text-xs text-slate-400">

                                #{item.id}

                              </span>

                            </div>

                            <h4 className="font-semibold text-slate-800 mt-4 leading-6 min-h-[48px]">

                              {item.nombre}

                            </h4>

                          </div>

                          {/* Body */}

                          <div className="flex-1 p-5 flex flex-col justify-between">

                            <div className="space-y-4">

                              <div className="rounded-xl bg-slate-50 p-4">

                                <p className="text-xs uppercase tracking-wider text-slate-500">

                                  Actividad Económica

                                </p>

                                <p className="font-semibold text-slate-800 mt-2">

                                  {item.actividad}

                                </p>

                              </div>

                              <div className="rounded-xl bg-slate-50 p-4">

                                <p className="text-xs uppercase tracking-wider text-slate-500">

                                  Inicio de Operaciones

                                </p>

                                <p className="font-semibold text-slate-800 mt-2">

                                  {item.inicio}

                                </p>

                              </div>

                            </div>

                            {/* Footer */}

                            {/* <div className="mt-5 pt-4 -t flex justify-between items-center">

                              <span className="text-xs text-slate-500">

                                Estado

                              </span>

                              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">

                                Vigente

                              </span>

                            </div> */}

                          </div>

                        </div>

                      )}

                    />

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
                  <div className=" rounded-xl p-6 mb-4">

                    <p className="text-slate-600 mb-4">
                      Seleccione la persona que llevará a cabo el trámite.
                    </p>

                    <div className="grid md:grid-cols-2 gap-5">

                      {/* El contribuyente realiza el trámite */}

                      <div
                        onClick={() => setRepresentacion("propio")}
                        className={`
            cursor-pointer
            rounded-xl
            
            p-5
            transition-all
            ${representacion === "propio"
                            ? "-sky-600 bg-sky-50 shadow-md"
                            : "-slate-200 hover:-sky-300 hover:shadow"
                          }
        `}
                      >

                        <div className="flex justify-between items-start">

                          <div className="flex gap-4">

                            <div
                              className={`
                        h-12 w-12 rounded-full flex items-center justify-center
                        ${representacion === "propio"
                                  ? "bg-sky-600 text-white"
                                  : "bg-slate-100 text-slate-600"
                                }
                    `}
                            >
                              <UserRound size={22} />
                            </div>

                            <div>

                              <h3 className="font-semibold text-slate-800">
                                El Contribuyente
                              </h3>

                              <p className="text-sm text-slate-500 mt-1">
                                El propio contribuyente realizará el trámite.
                              </p>

                            </div>

                          </div>

                          <input
                            type="radio"
                            checked={representacion === "propio"}
                            readOnly
                            className="accent-sky-700 h-5 w-5"
                          />

                        </div>

                      </div>

                      {/* Representante */}

                      <div
                        onClick={() => setRepresentacion("tercero")}
                        className={`
            cursor-pointer
            rounded-xl
            
            p-5
            transition-all
            ${representacion === "tercero"
                            ? "-sky-600 bg-sky-50 shadow-md"
                            : "-slate-200 hover:-sky-300 hover:shadow"
                          }
        `}
                      >

                        <div className="flex justify-between items-start">

                          <div className="flex gap-4">

                            <div
                              className={`
                        h-12 w-12 rounded-full flex items-center justify-center
                        ${representacion === "tercero"
                                  ? "bg-sky-600 text-white"
                                  : "bg-slate-100 text-slate-600"
                                }
                    `}
                            >
                              <UserPlus size={22} />
                            </div>

                            <div>

                              <h3 className="font-semibold text-slate-800">
                                Representante Legal
                              </h3>

                              <p className="text-sm text-slate-500 mt-1">
                                El trámite será realizado por una persona con facultades de representación.
                              </p>

                            </div>

                          </div>

                          <input
                            type="radio"
                            checked={representacion === "tercero"}
                            readOnly
                            className="accent-sky-700 h-5 w-5"
                          />

                        </div>

                      </div>

                    </div>
                  </div>
                </section>

                {representacion === "tercero" && (
                  <section>
                    {!mostrarFormularioRepresentante && (
                      <div className="bg-white  rounded-xl p-6 mt-4">
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

                          {/* Representantes */}

                          <div className="grid gap-5">

                            {representantes.map((rep) => {

                              const seleccionado =
                                representanteSeleccionado?.id === rep.id;

                              return (

                                <div
                                  key={rep.id}
                                  className={`
                                            group
                                            relative
                                            overflow-hidden
                                            rounded-2xl
                                            shadow-md
                                            border 
                                            border-slate-100 
                                            bg-white
                                            transition-all
                                            duration-300

                                    ${seleccionado
                                      ? "-sky-500 shadow-lg ring-2 ring-sky-100"
                                      : "-slate-200 hover:-sky-300 hover:shadow-lg"
                                    }`}
                                >
                                  {seleccionado && (

                                    <div
                                      className="
                                            bg-gradient-to-r
                                            from-sky-600
                                            to-blue-600
                                            text-white
                                            px-6
                                            py-2
                                            text-sm
                                            font-semibold
                                            flex
                                            items-center
                                            gap-2
                                        ">

                                      <BadgeCheck size={18} />
                                      REPRESENTANTE SELECCIONADO
                                    </div>

                                  )}

                                  <div
                                    className={`
                                        absolute
                                        left-0
                                        top-0
                                        h-full
                                        w-1
                        ${seleccionado
                                        ? "bg-sky-600"
                                        : "bg-transparent group-hover:bg-sky-300"
                                      }`}
                                  />

                                  <div className="p-6 flex justify-between gap-6">

                                    {/*INFORMACIÓN*/}

                                    <div className="flex gap-5 flex-1">

                                      <div
                                        className={`
                                          h-16
                                          w-16
                                          rounded-2xl
                                          flex
                                          items-center
                                          justify-center
                                          shrink-0

                                ${seleccionado
                                            ? "bg-sky-600 text-white"
                                            : "bg-slate-100 text-slate-600"
                                          }`}>

                                        <UserRound size={30} />

                                      </div>

                                      <div className="flex-1">

                                        {/* Nombre */}

                                        <div className="flex items-center gap-3">

                                          <h3 className="text-lg font-semibold text-slate-800">

                                            {rep.nombre}

                                          </h3>

                                        </div>

                                        {/* RFC */}

                                        <p className="text-sm text-slate-500 mt-2">

                                          RFC: <span className="font-medium text-slate-700">

                                            {rep.rfc}

                                          </span>

                                        </p>

                                        {/* Pills */}

                                        <div className="flex flex-wrap gap-3 mt-5">

                                          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-2 text-xs font-semibold text-green-700">
                                            📬{rep.correo}
                                          </span>
                                          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-2 text-xs font-semibold text-blue-700">
                                            📲 {rep.telefono}
                                          </span>
                                          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-2 text-xs font-semibold text-violet-700">

                                            📑 {rep.tipoAcreditacion}

                                          </span>

                                          <span
                                            className="
            inline-flex
            items-start
            gap-2
            rounded-2xl
            bg-amber-50
            
            -amber-200
            px-4
            py-3
            text-sm
            text-slate-700
            leading-6
        "
                                          >

                                            <MapPinned
                                              size={18}
                                              className="text-amber-600 shrink-0 mt-0.5"
                                            />

                                            {rep.domicilioFiscal}

                                          </span>

                                        </div>

                                      </div>

                                    </div>

                                    {/*======================================================
                        ACCIONES
                    ======================================================*/}

                                    <div className="flex flex-col justify-between items-end">

                                      {/* Radio */}
                                      <button

                                        onClick={() => {
                                          setRepresentanteSeleccionado(
                                            seleccionado ? null : rep
                                          )
                                          setRepresentanteEjecutor(seleccionado ? null : rep
                                          );
                                        }
                                        }

                                        className={`
        inline-flex
        items-center
        gap-2
        px-5
        py-2.5
        rounded-xl
        font-semibold
        transition-all
        duration-200
        border
        border-slate-200
        shadow-xs
        ${seleccionado
                                            ? "bg-emerald-600 text-white shadow-md hover:bg-emerald-700"
                                            : "text-slate-700 hover:bg-green-500 hover:text-white"
                                          }
    `}

                                      >

                                        {seleccionado ? (

                                          <>
                                            <BadgeCheck size={18} />
                                            Seleccionado
                                          </>

                                        ) : (

                                          <>
                                            <Check size={18} />
                                            Seleccionar
                                          </>

                                        )}

                                      </button>

                                      {/* Botón */}

                                      <button
                                        className="
                                mt-8
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                border
                                border-slate-200
                                shadow-xs
                                px-4
                                py-2.5
                                text-sm
                                font-medium
                                text-slate-700
                                transition
                                hover:bg-sky-500
                                hover:text-white
                            "
                                        onClick={() => {

                                          setRepresentanteConsulta(rep);

                                          setModalRepresentante(true);

                                        }}
                                      >

                                        <Eye size={17} />

                                        Ver información

                                      </button>


                                    </div>

                                  </div>

                                </div>

                              );

                            })}
                            {representantesNuevos.map((rep) => {

                              const seleccionado =
                                representanteSeleccionado?.id === rep.id;

                              return (

                                <div
                                  key={rep.id}
                                  className={`
                                            group
                                            relative
                                            overflow-hidden
                                            rounded-2xl
                                            shadow-md
                                            border 
                                            border-slate-100
                                            bg-green-100/40
                                            transition-all
                                            duration-300

                                    ${seleccionado
                                      ? "shadow-lg ring-2 ring-sky-100"
                                      : " hover:-sky-300 hover:shadow-lg"
                                    }`}
                                >
                                  {seleccionado && (

                                    <div
                                      className="
                                            bg-gradient-to-r
                                            from-sky-600
                                            to-blue-600
                                            text-white
                                            px-6
                                            py-2
                                            text-sm
                                            font-semibold
                                            flex
                                            items-center
                                            gap-2
                                        ">

                                      <BadgeCheck size={18} />
                                      REPRESENTANTE SELECCIONADO
                                    </div>

                                  )}

                                  <div
                                    className={`
                                        absolute
                                        left-0
                                        top-0
                                        h-full
                                        w-1
                        ${seleccionado
                                        ? "bg-sky-600"
                                        : "bg-transparent group-hover:bg-sky-300"
                                      }`}
                                  />

                                  <div className="p-6 flex justify-between gap-6">

                                    {/*INFORMACIÓN*/}

                                    <div className="flex gap-5 flex-1">

                                      <div
                                        className={`
                                          h-16
                                          w-16
                                          rounded-2xl
                                          flex
                                          items-center
                                          justify-center
                                          shrink-0

                                        ${seleccionado
                                            ? "bg-sky-600 text-white"
                                            : "bg-slate-100 text-slate-600"
                                          }`}>

                                        <UserRound size={30} />

                                      </div>

                                      <div className="flex-1">

                                        <div className="flex flex-col gap-2">

                                          {/* Nombre + Nuevo */}
                                          <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-semibold text-slate-800">
                                              {rep.nombre}
                                            </h3>

                                            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                              Nuevo
                                            </span>
                                          </div>

                                          {/* RFC */}
                                          <p className="text-sm text-slate-500">
                                            RFC:{" "}
                                            <span className="font-medium text-slate-700">
                                              {rep.rfc}
                                            </span>
                                          </p>

                                        </div>

                                        {/* Pills */}

                                        <div className="flex flex-wrap gap-3 mt-5">

                                          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-2 text-xs font-semibold text-green-700">
                                            📬{rep.correo}
                                          </span>
                                          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-2 text-xs font-semibold text-blue-700">
                                            📲 {rep.telefono}
                                          </span>
                                          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-2 text-xs font-semibold text-violet-700">

                                            📑 {rep.tipoAcreditacion}

                                          </span>
                                          <span
                                            className="
            inline-flex
            items-start
            gap-2
            rounded-2xl
            bg-amber-50
            
            -amber-200
            px-4
            py-3
            text-sm
            text-slate-700
            leading-6
        "
                                          >

                                            <MapPinned
                                              size={18}
                                              className="text-amber-600 shrink-0 mt-0.5"
                                            />

                                            {rep.domicilioFiscal}

                                          </span>

                                        </div>

                                      </div>

                                    </div>

                                    {/*======================================================
                                                    ACCIONES
                                      ======================================================*/}

                                    <div className="flex flex-col justify-between items-end">

                                      {/* Radio */}
                                      <button

                                        onClick={() => {
                                          setRepresentanteSeleccionado(
                                            seleccionado ? null : rep
                                          )
                                          setRepresentanteEjecutor(seleccionado ? null : rep
                                          );
                                        }
                                        }

                                        className={`
        inline-flex
        items-center
        gap-2
        px-5
        py-2.5
        rounded-xl
        font-semibold
        transition-all
        duration-200
 border
        border-slate-200
        shadow-xs
        ${seleccionado
                                            ? "bg-emerald-600 text-white shadow-md hover:bg-emerald-700"
                                            : "text-slate-700 hover:bg-green-500 hover:text-white"
                                          }
    `}

                                      >

                                        {seleccionado ? (

                                          <>
                                            <BadgeCheck size={18} />
                                            Seleccionado
                                          </>

                                        ) : (

                                          <>
                                            <Check size={18} />
                                            Seleccionar
                                          </>

                                        )}

                                      </button>

                                      {/* Botón */}

                                      <button
                                        className="
                                mt-8
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                
                                 border
        border-slate-200
        shadow-xs
                                px-4
                                py-2.5
                                text-sm
                                font-medium
                                text-slate-700
                                transition
                                hover:bg-sky-500
                                hover:text-white
                            "
                                        onClick={() => {

                                          setRepresentanteConsulta(rep);

                                          setModalRepresentante(true);

                                        }}
                                      >

                                        <Eye size={17} />

                                        Ver información

                                      </button>

                                      <button
                                        className="
                                mt-8
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                
                                 border
        border-slate-200
        shadow-xs
                                px-4
                                py-2.5
                                text-sm
                                font-medium
                                text-slate-700
                                transition
                                hover:bg-red-500
                                hover:text-white
                              
                            "
                                        onClick={() => {

                                          setEliminarRep(true);
                                        }}
                                      >
                                        <Trash2 size={17} />

                                        Eliminar representante

                                      </button>

                                      <ModalAccionAviso icono="UserRoundMinus" color="red" titulo="¿Desea eliminar a este representante legal?"
                                        abierto={eliminarRep}
                                        descripcion="Al eliminar a este representante legal, se perderá toda la información capturada y no podrá recuperarse. ¿Desea continuar con la eliminación?"
                                        textoBoton="Eliminar"
                                        onAceptar={() => {
                                          setEliminarRep(false);
                                          setRepresentantesNuevos(prev => prev.filter(r => r.id !== rep.id));
                                        }}
                                        onClose={() => {
                                          setEliminarRep(false);
                                        }}
                                        estilo={{ button: "bg-red-600 hover:bg-red-700", text: "text-red-600" }} />
                                    </div>

                                  </div>

                                </div>

                              );

                            })}

                          </div>
                        </div>

                        <ModalRepresentanteLegal
                          abierto={modalRepresentante}

                          representante={representanteConsulta}

                          onClose={() => setModalRepresentante(false)}
                        />

                      </div>
                    )}

                    {mostrarFormularioRepresentante && (

                      <FormularioRepresentanteLegal
                        abierto={mostrarFormularioRepresentante}
                        onClose={() => setMostrarFormularioRepresentante(false)}
                        onGuardar={agregarRepresentante}
                        nuevoRepresentante={nuevoRepresentante}
                        setNuevoRepresentante={setNuevoRepresentante}
                        tipoDocumento={tipoDocumento}
                        setTipoDocumento={setTipoDocumento}
                        documento={documento}
                        setDocumento={setDocumento}
                      />
                    )}

                  </section>

                )}

              </div>

            </div>

            {/* BOTONES */}
            <BotonesNavegacion
              izquierda={[
                {
                  etiqueta: "Regresar ",
                  icono: "ArrowLeft",
                  className: "bg-blue-600 text-white hover:bg-blue-700",
                  onClick: () => setActiveStep(1)
                }

              ]}
              derecha={[
                {
                  etiqueta: "Siguiente",
                  icono: "ArrowRight",
                  disabled: !(representanteSeleccionado || representacion === "propio"),
                  className: "bg-blue-600 text-white hover:bg-blue-700",
                  onClick: () => setActiveStep(3)
                }

              ]}
            />
          </div>
        )
        }

        {/* TIPOS DE AVISOS */}
        {
          activeStep === 3 && (
            <div>
              <div className="bg-white rounded-xl  shadow-sm">

                <div className="-b px-6 py-5">
                  <h3 className="text-xl font-semibold text-slate-800">
                    Tipos de Avisos
                  </h3>

                  {/* <p className="text-slate-500 mt-2 font-medium">
                    Seleccione el aviso a presentar
                  </p> */}
                </div>

                <div className="mx-4 mb-6 mt-4">

                  <div className=" -slate-300 -dashed bg-slate-100 rounded-xl p-5">

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
            
            rounded-xl
            px-4
            py-3
            bg-white
            focus:ring-2
            focus:ring-sky-600
            focus:-sky-600
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
                      "Disminucion de Obligaciones",
                      "Suspensión de Actividades",
                      "Apertura de Establecimientos o Locales",
                      "Cierre de Establecimientos o Locales",
                      "Cancelación en el Registro Estatal de Contribuyentes"
                    ]
                      .map((aviso, index) => (
                        <label
                          key={index}
                          className={`
                              shadow-sm border rounded-xl p-5 cursor-pointer
                              transition-all duration-200
                              hover:bg-sky-100 hover:shadow-lg 
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
                            <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center
                              ${selectedRow === aviso
                                ? "-sky-800"
                                : "-slate-400"
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
                {!fechaAvisoSAT && (
                  <div className="mx-4 mb-6">
                    <div className=" -dashed -slate-300 rounded-xl bg-slate-100 py-16 px-8 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-200">
                        <CalendarDays className="h-7 w-7 text-slate-500" />
                      </div>
                      <p className="mt-2 max-w-xl mx-auto text-sm text-slate-500">
                        Para consultar los avisos fiscales disponibles y continuar con el trámite,
                        primero capture la <strong>Fecha del Aviso ante el SAT</strong>.
                      </p>
                    </div>
                  </div>
                )}

              </div>

              <BotonesNavegacion
                izquierda={[
                  {
                    etiqueta: "Regresar ",
                    icono: "ArrowLeft",
                    className: "bg-blue-600 text-white hover:bg-blue-700",
                    onClick: () => setActiveStep(2)
                  }

                ]}
                derecha={[
                  {
                    etiqueta: "Siguiente",
                    icono: "ArrowRight",
                    className: "bg-blue-600 text-white hover:bg-blue-700",
                    disabled: !selectedRow,
                    onClick: () => setActiveStep(4)
                  }
                ]}
              />
            </div>
          )
        }

        {
          activeStep === 5 && vistaPrevia && (
            <div className="space-y-6">


              <div className="bg-white rounded-xl  shadow-sm">

                <div className="px-8 py-8 flex items-center gap-5">

                  <div className="h-16 w-16 rounded-2xl bg-emerald-100 flex items-center justify-center">

                    <CircleCheckBig
                      size={34}
                      className="text-emerald-700"
                    />

                  </div>

                  <div>

                    <h2 className="text-2xl font-bold text-slate-800">

                      Información del aviso
                    </h2>
                    {/* 
                    <p className="text-slate-500 mt-2">

                      Revise la información del aviso antes de continuar con el proceso de digitalización.

                    </p> */}

                  </div>

                </div>

              </div>
              <div className="bg-white rounded-xl  shadow-sm">

                <div className="-b px-6 py-5">

                  <h3 className="font-semibold text-slate-800">

                    Datos del Aviso

                  </h3>

                  <p className="text-sm text-slate-500 mt-1">

                    Información general correspondiente al aviso fiscal generado.

                  </p>

                </div>

                <div className="p-6">

                  <div className="grid lg:grid-cols-2 gap-x-10 gap-y-6">

                    <CampoConsulta
                      etiqueta="Tipo de Aviso"
                      valor="Disminución de Obligaciones"
                    />

                    {/* <CampoConsulta
                      etiqueta="Folio Temporal"
                      valor="AF-2026-000001"
                    /> */}

                    <CampoConsulta
                      etiqueta="Fecha del Aviso"
                      valor="08/07/2026"
                    />

                    {/* <CampoConsulta
                      etiqueta="Hora"
                      valor="11:35 hrs"
                    /> */}

                    <CampoConsulta
                      etiqueta="RFC"
                      valor="XAXX010101000"
                    />

                    <CampoConsulta
                      etiqueta="Nombre / Razón Social"
                      valor="COMERCIALIZADORA DEL SURESTE S.A. DE C.V."
                    />

                    <CampoConsulta
                      etiqueta="Régimen Cápital"
                      valor="Sociedad de Responsabilidad Limitada de Capital Variable"
                    />

                    {/* <CampoConsulta
                      etiqueta="Estado"
                      valor="Pendiente de Digitalización"
                    /> */}

                  </div>

                </div>

              </div>


              <div className="bg-white rounded-xl  shadow-sm">

                <div className="-b px-6 py-5">

                  <h3 className="font-semibold text-slate-800 mb-2 ">

                    Realizó la captura de información del aviso a presentar ¿Que acción desea realizar?
                  </h3>
                  <div className="flex items-start gap-3 rounded-xl  -amber-300 bg-amber-50 p-4">
                    <AlertTriangle className="mt-0.5 text-amber-600" size={20} />

                    <div>
                      <h4 className="font-medium text-amber-800">
                        Recomendación
                      </h4>

                      <p className="mt-1 text-sm text-amber-700">
                        Revise la información del aviso,  descargando la <strong>“VISTA PREVIA”</strong>, antes de confirmar.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 grid lg:grid-cols-3 gap-5">


                  <button
                    className="rounded-xl  hover:-sky-300 hover:bg-sky-50 transition p-6 text-left"
                    onClick={() => {
                      setActiveStep(4);
                      setVistaPrevia(false);
                    }}
                  >

                    <div className="h-12 w-12 rounded-xl bg-sky-100 flex items-center justify-center mb-4">

                      <Pencil
                        size={22}
                        className="text-sky-700"
                      />

                    </div>

                    <h4 className="font-semibold text-slate-800">

                      Editar Aviso

                    </h4>

                    <p className="text-sm text-slate-500 mt-2">

                      Regrese a la pestaña del aviso para realizar modificaciones antes de confirmar.
                    </p>

                  </button>


                  <button
                    className="rounded-xl  hover:-indigo-300 hover:bg-indigo-50 transition p-6 text-left"
                  >

                    <div className="h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">

                      <FileText
                        size={22}
                        className="text-indigo-700"
                      />

                    </div>

                    <h4 className="font-semibold text-slate-800">

                      Vista Previa

                    </h4>

                    <p className="text-sm text-slate-500 mt-2">

                      Consulte el formato de vista previa con los datos del aviso generado.
                    </p>

                  </button>


                  <button
                    className="rounded-xl  hover:-red-300 hover:bg-red-50 transition p-6 text-left"
                    onClick={
                      () => {
                        setActiveStep(0);
                      }
                    }
                  >

                    <div className="h-12 w-12 rounded-xl bg-red-100 flex items-center justify-center mb-4">

                      <CircleX
                        size={22}
                        className="text-red-700"
                      />

                    </div>

                    <h4 className="font-semibold text-slate-800">

                      Cancelar Aviso

                    </h4>

                    <p className="text-sm text-slate-500 mt-2">

                      Cancele el aviso y descarte la información capturada
                    </p>

                  </button>

                  <button
                    className="rounded-xl  hover:-emerald-300 hover:bg-emerald-50 transition p-6 text-left"
                    onClick={() => {
                      setVistaPrevia(false);
                    }}
                  >

                    <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">

                      <CheckCircle2
                        size={22}
                        className="text-emerald-700"
                      />

                    </div>

                    <h4 className="font-semibold text-slate-800">

                      Confirmar Aviso

                    </h4>

                    <p className="text-sm text-slate-500 mt-2">

                      Confirme la información capturada y continúe con el proceso de digitalización
                    </p>

                  </button>

                </div>

              </div>



            </div>
          )
        }

        {activeStep === 5 && !vistaPrevia && (
          <Digitalizacion></Digitalizacion>
        )
        }

        {/*Cambio de domicilio fiscal */}
        {
          selectedRow === "Cambio de Domicilio Fiscal" && activeStep === 4 && (
            <div className="space-y-6">

              {/* Header */}
              <HeaderModulo

                titulo="Cambio de Domicilio Fiscal"

                descripcion="Consulte el domicilio fiscal actual y los datos del nuevo domicilio fiscal"

                icono="MapPinned"

              />

              <div className="flex flex-col">

                {/* DOMICILIO ACTUAL */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">

                  <button
                    type="button"
                    onClick={() => setMostrarDomicilio(!mostrarDomicilio)}
                    className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-4">

                      <div className="w-11 h-11 rounded-xl bg-sky-100 flex items-center justify-center">
                        <MapPin className="text-sky-600" size={22} />
                      </div>

                      <div className="text-left">
                        <h3 className="font-semibold text-slate-800">
                          Domicilio Fiscal Actual
                        </h3>

                        <p className="text-sm text-slate-500">
                          Consulte la información completa del domicilio fiscal actual del contribuyente.
                        </p>
                      </div>

                    </div>

                    {mostrarDomicilio
                      ? <ChevronDown size={22} />
                      : <ChevronRight size={22} />}
                  </button>

                  {mostrarDomicilio && (

                    <div className="p-6">

                      {/* Código Postal */}

                      <section className="bg-slate-50 rounded-xl p-4  mb-4">

                        <label className="text-xs uppercase text-slate-500 font-medium ">
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

                        <div className="h-80  rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                          Google Maps
                        </div>

                      </section>

                    </div>
                  )}
                </div>

                {/* NUEVO DOMICILIO */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mt-4">

                  <div className="flex items-center gap-4 p-5 justify-between bg-slate-50">

                    <div className="flex gap-4 ">
                      <div className="w-11 h-11 rounded-xl bg-sky-100 flex items-center justify-center">
                        <MapPin className="text-sky-600" size={22} />
                      </div>

                      <div className="text-left">
                        <h3 className="font-semibold text-slate-800">
                          Nuevo Domicilio Fiscal
                        </h3>

                        <p className="text-sm text-slate-500">
                          Capture la información del nuevo domicilio fiscal actual
                        </p>
                      </div>
                    </div>

                    <button
                      className="
                  inline-flex items-center gap-2
                  px-4 py-2
                   rounded-lg
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
                            className="w-full  rounded-lg px-3 py-2"
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

                        <input className=" rounded-lg p-2" placeholder="Tipo de Ámbito" />
                        <input className=" rounded-lg p-2" placeholder="Región" />
                        <input className=" rounded-lg p-2" placeholder="Distrito" />
                        <input className=" rounded-lg p-2" placeholder="Municipio" />
                        <input className=" rounded-lg p-2" placeholder="Localidad" />
                        <input className=" rounded-lg p-2" placeholder="Tipo de Asentamiento" />
                        <input className=" rounded-lg p-2" placeholder="Nombre de Asentamiento" />
                        <input className=" rounded-lg p-2" placeholder="Tipo de Inmueble" />

                      </div>

                    </section>

                    {/* UBICACIÓN */}

                    <section>

                      <h3 className="font-medium text-slate-700 mb-4">
                        Ubicación del Domicilio
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4">

                        <input className=" rounded-lg p-2" placeholder="Tipo de Vialidad" />
                        <input className=" rounded-lg p-2" placeholder="Nombre de Vialidad" />
                        <input className=" rounded-lg p-2" placeholder="Número Exterior" />
                        <input className=" rounded-lg p-2" placeholder="Número Interior" />
                        <input className=" rounded-lg p-2" placeholder="Entre Vialidad" />
                        <input className=" rounded-lg p-2" placeholder="Y Vialidad" />

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
                          className="w-full  rounded-lg p-3"
                          placeholder="Características del domicilio"
                        />

                        <textarea
                          rows="3"
                          className="w-full  rounded-lg p-3"
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
                    h-80 rounded-xl 
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

              <DocumentacionRequerida mostrarDocumentos={false} />

            </div>
          )
        }

        {/*Cambio de representante legal*/}
        {
          selectedRow === "Cambio de Representante Legal" && activeStep === 4 && (
            <div className="space-y-6">
              <HeaderModulo

                titulo="Cambio de Representante Legal"

                // descripcion="Actualice la información del representante legal registrado para el contribuyente conforme a la documentación presentada."

                icono="UserRoundCog"

                color="red"

              />

              <ModalRepresentanteLegal

                abierto={modalRepresentante}

                representante={representanteSeleccionado}

                onClose={() => setModalRepresentante(false)}
              />
              {modalConfirmacion && representantePendiente && (

                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

                  <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">

                    {/* Header */}

                    <div className="bg-red-50 -b -red-100 px-6 py-5">

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
                      <div className=" rounded-lg px-3 mb-4">

                        <p className="text-sm text-amber-800 font-bold">
                          ¿Desea continuar con la baja de este representante legal?”</p>
                      </div>
                      <div className="bg-amber-50  -amber-200 rounded-lg p-3 mb-4">

                        <p className="text-sm text-amber-800">
                          Está a punto de marcar para baja al siguiente representante legal.

                          Esta acción se aplicará al concluir el trámite</p>

                      </div>

                      <div className=" rounded-xl bg-slate-50 p-4">

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

                    </div>

                    {/* Footer */}

                    <div className="-t px-6 py-4 flex justify-end gap-3 bg-slate-50">

                      <button
                        onClick={() => {
                          setModalConfirmacion(false);
                          setRepresentantePendiente(null);
                        }}
                        className="px-5 py-2.5  -slate-300 rounded-lg hover:bg-slate-100 transition"
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

              {/*REPRESENTANTE EJECUTOR */}
              <div className="bg-white rounded-xl shadow-md">

                <div className="px-6 py-5 bg-slate-100/30">
                  {/* Encabezado */}
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        Representante Legal Ejecutor
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        Representante legal seleccionado para ejecutar el trámite.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">

                  {/* REPRESENTANTE LEGAL EJECUTOR */}

                  {representanteEjecutor ? (

                    <div
                      className="
          relative
          bg-white
          rounded-2xl
          shadow-sm
          hover:shadow-md
          transition-all
          overflow-hidden
          w-full
        "
                    >

                      {/* Barra lateral */}
                      <div className="absolute left-0 top-0 h-full w-2 bg-emerald-500" />

                      <div className="p-5 pl-6">

                        <div className="flex items-start justify-between">

                          <div className="flex items-center gap-4">

                            {/* Icono */}
                            <div
                              className="
                  h-14 w-14 rounded-xl
                  bg-sky-100
                  flex items-center justify-center
                "
                            >
                              <User size={26} className="text-sky-700" />
                            </div>

                            {/* Información principal */}
                            <div>

                              <div className="flex items-center gap-2">

                                <h4 className="font-semibold text-slate-800 text-lg">
                                  {representanteEjecutor.nombre}
                                </h4>

                                {/* <span
                                  className="
                      px-2 py-1 rounded-full
                      text-xs font-medium
                      bg-emerald-100 text-emerald-700
                    "
                                >
                                  Ejecutor
                                </span> */}

                              </div>

                              <p className="text-sm text-slate-500 mt-1">
                                Representante Legal que ejecutará el trámite
                              </p>

                            </div>

                          </div>

                        </div>

                        {/* Datos */}
                        <div className="mt-5 grid md:grid-cols-3 gap-3">

                          <div className="bg-slate-50 rounded-xl px-4 py-3">
                            <span className="text-xs text-slate-500 block">
                              RFC
                            </span>

                            <span className="font-medium text-slate-800">
                              {representanteEjecutor.rfc}
                            </span>
                          </div>

                          <div className="bg-slate-50 rounded-xl px-4 py-3">
                            <span className="text-xs text-slate-500 block">
                              CURP
                            </span>

                            <span className="font-medium text-slate-800">
                              {representanteEjecutor.curp}
                            </span>
                          </div>

                          <div className="bg-slate-50 rounded-xl px-4 py-3">
                            <span className="text-xs text-slate-500 block">
                              Fecha de registro como representante legal
                            </span>

                            <span className="font-medium text-slate-800">
                              {representanteEjecutor.fechaRegistro}
                            </span>
                          </div>

                        </div>

                        {/* Footer */}
                        <div className="mt-6 pt-4 flex justify-end items-center gap-4">

                          <button
                            type="button"
                            onClick={() => {
                              setRepresentanteSeleccionado(representanteEjecutor);
                              setModalRepresentante(true);
                            }}
                            className="
                inline-flex
                items-center
                gap-2
                text-sky-700
                hover:text-sky-900
                text-sm
                font-medium
                transition
                bg-sky-100
                py-2
                px-4
                rounded-xl
              "
                          >
                            <Eye size={17} />
                            Ver información
                          </button>
                          {/* <button
                            type="button"
                            onClick={() => {
                              setRepresentanteSeleccionado(representanteEjecutor);
                              setModalRepresentante(true);
                            }}
                            className="
                inline-flex
                items-center
                gap-2
                text-sky-700
                hover:text-sky-900
                text-sm
                font-medium
                transition
                bg-sky-100
                py-2
                px-4
                rounded-xl
              "
                          >
                            <Pencil size={17} />
                            Editar información
                          </button> */}
                        </div>

                      </div>

                    </div>

                  ) : (

                    /* SIN REPRESENTANTE EJECUTOR */

                    <div
                      className="
          rounded-2xl
          border-dashed
          border-slate-300
          bg-slate-50
          px-8
          py-12
        "
                    >

                      <div className="flex flex-col items-center text-center">

                        <div
                          className="
              h-16 w-16 rounded-2xl
              bg-sky-100
              flex items-center justify-center
            "
                        >
                          <UserPlus
                            className="text-sky-700"
                            size={30}
                          />
                        </div>

                        <h3 className="mt-5 text-lg font-semibold text-slate-800">
                          Sin representante legal ejecutor
                        </h3>

                        <p className="mt-2 max-w-md text-sm text-slate-500">
                          No se ha seleccionado un representante legal para ejecutar el
                          trámite.
                        </p>

                      </div>

                    </div>

                  )}

                </div>

              </div>

              {/* REPRESENTANTES LEGALES ASOCIADOS */}

              <div className="bg-white rounded-xl  shadow-sm">

                <div className="-b px-6 py-5">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Representantes Legales Asociados
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Seleccione los representantes legales a cambiar. Los registros no seleccionados permanecerán asociados al contribuyente                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-5 p-5">

                  {representantesActuales.map((representante) => {

                    const seleccionado = representantesBaja.includes(representante.id);

                    return (

                      <div
                        key={representante.id}
                        className={`
                relative
                bg-white
                rounded-2xl
                
                shadow-sm
                transition-all
                overflow-hidden
                ${seleccionado
                            ? "-red-300 bg-red-50 shadow-md"
                            : "-sky-200 hover:shadow-md hover:-sky-300"
                          }
            `}
                      >

                        {/* Barra lateral */}

                        <div
                          className={`
                    absolute left-0 top-0 h-full w-2
                    ${seleccionado ? "bg-red-500" : "bg-emerald-500"}
                `}
                        />

                        <div className="p-5 pl-6">

                          {/* Header */}

                          <div className="flex items-start justify-between">

                            <div className="flex items-center gap-4">

                              <div
                                className={`
                                h-14
                                w-14
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                ${seleccionado
                                    ? "bg-red-100 text-red-700"
                                    : "bg-sky-100 text-sky-700"
                                  }
                            `}
                              >

                                <UserRound size={26} />

                              </div>

                              <div>

                                <div className="flex items-center gap-2">

                                  <h4 className="font-semibold text-slate-800 text-lg">

                                    {representante.nombre}

                                  </h4>

                                  <span
                                    className={`
                                        px-2 py-1 rounded-full text-xs font-medium
                                        ${seleccionado
                                        ? "bg-red-100 text-red-700"
                                        : "bg-emerald-100 text-emerald-700"
                                      }
                                    `}
                                  >

                                    {seleccionado ? "Seleccionado para cambio" : "Vigente"}

                                  </span>

                                </div>

                                <p className="text-sm text-slate-500 mt-1">

                                  Representante Legal

                                </p>

                              </div>

                            </div>

                          </div>

                          {/* Datos */}

                          <div className="mt-5 grid md:grid-cols-2 gap-3">

                            <div className="bg-slate-50 rounded-xl px-4 py-3">

                              <span className="text-xs text-slate-500 block">

                                RFC

                              </span>

                              <span className="font-medium text-slate-800">

                                {representante.rfc}

                              </span>

                            </div>

                            <div className="bg-slate-50 rounded-xl px-4 py-3">

                              <span className="text-xs text-slate-500 block">

                                CURP

                              </span>

                              <span className="font-medium text-slate-800">

                                {representante.curp}

                              </span>

                            </div>

                            <div className="bg-slate-50 rounded-xl px-4 py-3">

                              <span className="text-xs text-slate-500 block">

                                Fecha de registro como representante legal

                              </span>

                              <span className="font-medium text-slate-800">

                                {representante.fechaRegistro}

                              </span>

                            </div>
                          </div>

                          {/* Footer */}

                          <div className="mt-6 pt-4 -t flex justify-between items-center">
                            <button
                              type="button"
                              onClick={() => {

                                setRepresentanteSeleccionado(representante);
                                setModalRepresentante(true);

                              }}
                              className="
            inline-flex
            items-center
            gap-2
            text-sky-700
            hover:text-sky-900
            text-sm
            font-medium
            transition
            bg-sky-100
            py-2
            px-4
            rounded-xl
        "
                            >

                              <Eye size={17} />

                              Ver información

                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                toggleRepresentanteBaja(representante.id);

                              }}
                              className={`
                            px-4
                            py-2
                            rounded-xl
                            text-sm
                            font-medium
                            transition
                            ${seleccionado
                                  ? "bg-red-600 hover:bg-red-700 text-white"
                                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                                }
                        `}
                            >

                              {seleccionado
                                ? "Cancelar"
                                : "Seleccionar"}

                            </button>

                          </div>

                        </div>

                      </div>

                    );

                  })}

                </div>


                {/* <div className="-t bg-slate-50 px-6 py-4 flex items-center justify-between">

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

                </div> */}

              </div>
            </div>
          )
        }

        {/* Cambio de Nombre, Denominación o Razón Social */}

        {selectedRow === "Cambio de Nombre, Denominación o Razón Social" &&
          activeStep === 4 && (
            <div>
              <div className="mb-4">
                <HeaderModulo
                  titulo="Cambio de Nombre, Denominación o Razón Social"
                  // descripcion="Actualice la información correspondiente al nombre, denominación o razón social del contribuyente."
                  icono="UserRoundPen"
                  color="sky"
                />
              </div>

              {/* NUEVO NOMBRE */}
              {tipoPersona === "fisica" && (
                <div className="flex flex-col gap-4 mt-4">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">

                    {/* Header */}
                    <div className="px-6 py-5 bg-slate-50 flex items-start gap-4">

                      <div className="h-12 w-12 rounded-xl bg-sky-100 flex items-center justify-center shrink-0">

                        <UserRound
                          size={24}
                          className="text-sky-700"
                        />

                      </div>

                      <div>

                        <h3 className="text-lg font-semibold text-slate-800">
                          Datos del nuevo nombre
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          Capture la información correspondiente al nuevo nombre del contribuyente.
                        </p>

                      </div>

                    </div>

                    {/* Body */}
                    <div className="p-6 grid md:grid-cols-2 gap-5">

                      {
                        configuracionCampos.map(campo => {

                          const Componente =
                            campo.tipo === "input"
                              ? CampoInput
                              : CampoSelect;

                          return (

                            <Componente

                              key={campo.key}

                              etiqueta={campo.etiqueta}

                              value={datosActuales[campo.key]}

                              mostrarTipoCambio={true}

                              tipoCambio={tipoCambio[campo.key]}

                              onTipoCambio={(valor) =>
                                setTipoCambio(prev => ({
                                  ...prev,
                                  [campo.key]: valor
                                }))
                              }

                            />

                          );

                        })
                      }
                    </div>

                  </div>

                  {/* DATOS DEL ACTA DE NACIMIENTO */}

                  <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">

                    {/* Header */}

                    <div className="bg-slate-50 px-6 py-5">

                      <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center">

                          <FileBadge className="text-emerald-700" size={28} />

                        </div>

                        <div>

                          <h3 className="text-lg font-semibold text-slate-800">
                            Datos del Acta de Nacimiento
                          </h3>

                          <p className="text-sm text-slate-500 mt-1">
                            Capture la información correspondiente al acta de nacimiento del contribuyente
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* Body */}

                    <div className="p-6">

                      <div className="grid md:grid-cols-2 gap-5">

                        {/* Fecha Corrección */}

                        <CampoFecha etiqueta="Fecha de corrección de acta"></CampoFecha>

                        {/* Fecha Nacimiento */}

                        <CampoFecha etiqueta="Fecha de nacimiento"></CampoFecha>


                        {/* Número Acta */}

                        <CampoInput etiqueta="Número de acta"></CampoInput>

                        {/* Número Foja */}

                        <CampoInput etiqueta="Número de Foja"></CampoInput>

                      </div>

                    </div>

                  </div>

                </div>
              )
              }

              {/* NUEVA DENOMINACIÓN O RAZÓN SOCIAL */}
              {tipoPersona === "moral" && (

                <div>
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

                    <div className="px-6 py-5 flex items-start gap-4 bg-sky-100 ">

                      <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center">

                        <Building2
                          size={24}
                          className="text-sky-700"
                        />

                      </div>

                      <div>

                        <h3 className="text-lg font-semibold text-slate-800">
                          Nueva denominación o razón social
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          Capture la información correspondiente a la nueva Denominación o razón social del contribuyente.
                        </p>

                      </div>

                    </div>

                    <div className="p-6">

                      <div className="grid md:grid-cols-2 gap-5">

                        {/*RFC*/}
                        <div className="grid grid-cols-7 items-end gap-2">
                          <CampoInput className="col-span-5" etiqueta="RFC"></CampoInput>

                          <button className="col-span-2 flex gap-2 bg-blue-600 font-semibold shadow-md text-white p-3 rounded-xl h-12 hover:bg-white hover:text-black w-full">
                            <Search size={20}></Search> Buscar RFC
                          </button>

                        </div>

                        {/* Denominación o razón social */}
                        <CampoInput className="col-span-2" etiqueta="Denominación o razón social"></CampoInput>
                        {/* Nombre Comercial */}
                        <CampoInput className="col-span-2" etiqueta="Nombre Comercial"></CampoInput>

                        {/* Régimen Fiscal */}
                        {/* <CampoSelect etiqueta="Régimen Fiscal" opciones={
                          [
                            { value: "", label: "Seleccione" }
                          ]
                        } ></CampoSelect> */}

                        {/* Régimen Capital */}
                        <CampoSelect etiqueta="Régimen Capital" opciones={
                          [
                            { value: "", label: "Seleccione" }
                          ]
                        }></CampoSelect>



                      </div>

                    </div>

                  </div>

                  <div className="mt-4">

                    <DocumentoProtocolizado
                      tipoDocumento={tipoDocumento}
                      setTipoDocumento={setTipoDocumento}
                      documento={documento}
                      setDocumento={setDocumento}
                      titulo="Datos de protocolización del documento"
                      descripcion="Capture la información del documento que acredita el cambio de denominación o razón social del contribuyente."
                      resetKey={true}
                    />

                  </div>
                </div>

              )
              }
            </div>
          )}

        {/*suspensión de actividades*/}
        {selectedRow === "Suspensión de Actividades" && activeStep === 4 && (

          <div>
            <HeaderModulo

              titulo="Suspensión de Actividades"
              icono="PauseCircle"

              color="amber"
            />
            <div className="bg-white mt-2 p-4  -amber-800 -dashed rounded-lg flex gap-2 bg-yellow-50">
              <div className="h-14 w-14 rounded-xl flex items-center justify-center bg-yellow-100 text-amber-800">
                <AlertTriangle
                  size={30}

                />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-amber-800">
                  Importante
                </p>

                <p className="mt-1 text-sm text-amber-700">
                  El aviso de suspensión de actividades no lo exime de las obligaciones pendientes.               </p>
              </div>


            </div>

            <div className="mt-4">

              {/* RESUMEN */}

              <div className="grid md:grid-cols-2 gap-4">
              </div>
              <ObligacionesSuspender title="Obligaciones fiscales" />

              {/* OBLIGACIONES PENDIENTES */}
              <ObligacionesPendientes />

              {mostrarFormularioDomicilio && (
                <DomicilioFiscal
                  onGuardar={() => { }}
                  onCancelar={() => { }}
                  className=" shadow-sm"
                  titulo="Domicilios del contribuyente"
                  descripcion="Capture o seleccione un domicilio para notificaciones"
                />
              )}

            </div>
          </div>
        )
        }

        {/*Reanudación de actividades*/}
        {
          selectedRow === "Reanudación de Actividades" &&
          activeStep === 4 && (
            <ReanudacionDeActividades></ReanudacionDeActividades>

          )
        }

        {/*Apertura de Establecimientos o Locales*/}
        {
          selectedRow === "Apertura de Establecimientos o Locales" &&
          activeStep === 4 && (

            <div className="space-y-6">
              <HeaderModulo
                titulo="Apertura de Establecimientos o Locales"
                descripcion="Registre la apertura de establecimientos o locales vinculados al contribuyente conforme a la información proporcionada."
                icono="Store"
                color="emerald"
              />

              {/* RESUMEN DE ESTABLECIMIENTOS */}
              <div className="
                              bg-white
                              border
                              border-slate-200
                              rounded-xl
                              p-5
                              flex
                              items-center
                              justify-between
                              shadow-sm 
                          ">
                <div className="flex justify-between gap-2">
                  <div className="p-3 bg-sky-200 rounded-lg">
                    <Building
                      size={20}
                      className="text-sky-700"
                    />
                  </div>

                  <div className="flex flex-col">
                    <p className="font-semibold">
                      Resumen de Establecimientos registrados
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                      Total de establecimientos asociados al contribuyente
                    </p>
                  </div>
                </div>


                <div className="
            min-w-14
            h-14
            px-4
            rounded-xl
            bg-sky-100
            text-sky-700
            flex
            items-center
            justify-center
            text-xl
            font-bold
        ">
                  {establecimientos.length}
                </div>

              </div>

              {/* TABLA DE DOMICILIOS */}
              <div className="flex flex-col bg-white rounded-xl shadow-sm">

                {/* ENCABEZADO */}
                <button
                  type="button"
                  onClick={() => setMostrarDomicilios(!mostrarDomicilios)}
                  className="
        w-full
        h-full
        flex
        items-center
        justify-between
        px-6
        py-5
        text-left
        bg-white
        hover:bg-slate-100
        transition-colors
        bg-slate-100
        rounded-lg
    "
                >
                  <div className="flex items-center justify-content gap-3">
                    <div className="p-3 bg-blue-200 rounded-lg">
                      <Building
                        size={20}
                        className="text-blue-700"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        Establecimientos registrados
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        Consulte los domicilios asociados al contribuyente.
                      </p>
                    </div>

                  </div>

                  <ChevronDown
                    size={20}
                    className={`
            text-slate-500
            transition-transform
            duration-700
            ease-in-out
            ${mostrarDomicilios ? "rotate-180" : ""}
        `}
                  />
                </button>

                {/* CONTENIDO DESPLEGABLE */}
                <div
                  className={`
        px-6
        transition-all
        duration-700
        ease-in-out
        ${mostrarDomicilios
                      ? "max-h-[1000px] opacity-100 pb-6"
                      : "max-h-0 opacity-0 overflow-hidden"
                    }
    `}
                >
                  <DomiciliosRegistrados />
                </div>

              </div>

              {/* FORMULARIO */}
              <div className="rounded-lg mb-4 rounded">

                <button className="
                                w-full
                                flex
                                items-center
                                justify-between
                                px-6
                                py-5
                                text-left
                                bg-white
                                hover:bg-slate-100
                                transition-colors
                                bg-slate-100 rounded shadow-md
                                "
                  onClick={() => {
                    setDesplegarCapturaDomicilio(!desplegarCapturaDomicilio)
                  }}>
                  <div className="flex items-center gap-2">

                    <span className="bg-blue-100 rounded-lg">
                      <Building2
                        size={20}
                        className="text-sky-700 m-3"
                      />
                    </span>

                    <div className="flex flex-col">

                      <h4 className="font-semibold text-slate-700">
                        Datos del Nuevo Establecimiento
                      </h4>

                      <p className="text-sm text-slate-500 mt-1">
                        Capture la información del establecimiento o local.
                      </p>

                    </div>
                  </div>

                  <ChevronDown size={20}
                    className={`text-slate-500
                    transition-transform
                    duration-700
                    ease-in-out
                    ${desplegarCapturaDomicilio ? "rotate-180" : ""}`}
                  />

                </button>

                {/* DATOS GENERALES */}
                <div className={
                  `overflow-hidden
                  transition-all
                duration-700
                ease-in-out
                ${desplegarCapturaDomicilio ? " max-h-[2200px] opacity-100" : "max-h-0 opacity-0"}
                `}>
                  <DomicilioFiscalForm2
                    onGuardar={() => { }}
                    onCancelar={() => { }}
                  />
                </div>

              </div>

              {/* DATOS DE CONTACTO */}
              <div className="rounded-lg mb-4 rounded shadow-md overflow-hidden">

                {/* Encabezado */}
                <button
                  onClick={() => setMostrarDatosContacto(!mostrarDatosContacto)}
                  className="
                            w-full bg-white hover:bg-slate-100 flex items-center justify-between
                            px-6 py-5 text-left
                            transition-colors
                           "
                >
                  <div className="flex items-center justify-content gap-3">
                    <span className="bg-blue-100 rounded-lg">

                      <Smartphone
                        size={20}
                        className="text-sky-700 m-3"
                      />

                    </span>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        Datos de contacto
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        Capture la información de contacto del contribuyente.
                      </p>
                    </div>

                  </div>

                  <ChevronDown
                    size={20}
                    className={`
                              text-slate-500
                              transition-transform
                              duration-700
                              ease-in-out
                        ${mostrarDatosContacto ? "rotate-180" : ""}`}
                  />

                </button>

                {/* Contenido */}
                <div className={`
                          px-6
                          bg-white
                          overflow-hidden
                          transition-all
                          duration-700
                          ease-in-out
                          ${mostrarDatosContacto
                    ? "max-h-[1000px] opacity-100 pb-6"
                    : "max-h-0 opacity-0"
                  }
    `}>
                  {/* Campos */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6">

                    {/* Correo electrónico */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-slate-700">
                        Correo electrónico <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="email"
                        maxLength={100}
                        placeholder="usuario@dominio.extensión"
                        className="
                                    w-full h-11 px-3
                                    border border-slate-300
                                    rounded-lg
                                    text-sm text-slate-700
                                    outline-none
                                    focus:border-sky-500
                                    focus:ring-2 focus:ring-sky-100
                                  "
                      />

                      <p className="text-xs text-slate-400">
                        Máximo 100 caracteres.
                      </p>
                    </div>

                    {/* Correo electrónico alternativo */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-slate-700">
                        Correo electrónico alternativo
                      </label>

                      <input
                        type="email"
                        maxLength={100}
                        placeholder="usuario@dominio.extensión"
                        className="
          w-full h-11 px-3
          border border-slate-300
          rounded-lg
          text-sm text-slate-700
          outline-none
          focus:border-sky-500
          focus:ring-2 focus:ring-sky-100
        "
                      />

                      <p className="text-xs text-slate-400">
                        Máximo 100 caracteres.
                      </p>
                    </div>

                    {/* Teléfono fijo */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-slate-700">
                        Teléfono fijo <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="tel"
                        maxLength={10}
                        inputMode="numeric"
                        placeholder="Ingrese 10 dígitos"
                        className="
          w-full h-11 px-3
          border border-slate-300
          rounded-lg
          text-sm text-slate-700
          outline-none
          focus:border-sky-500
          focus:ring-2 focus:ring-sky-100
        "
                      />

                      <p className="text-xs text-slate-400">
                        Ingrese únicamente números. Máximo 10 caracteres.
                      </p>
                    </div>

                    {/* Teléfono alternativo */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-slate-700">
                        Teléfono alternativo <span className="text-red-500">*</span>
                      </label>

                      <div className="flex gap-2">

                        {/* Tipo de teléfono */}
                        <select
                          className="
            h-11
            w-40
            px-3
            border border-slate-300
            rounded-lg
            bg-white
            text-sm text-slate-700
            outline-none
            focus:border-sky-500
            focus:ring-2 focus:ring-sky-100
          "
                        >
                          <option value="">
                            Tipo
                          </option>

                          <option value="fijo">
                            Teléfono fijo
                          </option>

                          <option value="movil">
                            Teléfono móvil
                          </option>
                        </select>

                        {/* Número */}
                        <input
                          type="tel"
                          maxLength={10}
                          inputMode="numeric"
                          placeholder="Ingrese 10 dígitos"
                          className="
            flex-1
            h-11 px-3
            border border-slate-300
            rounded-lg
            text-sm text-slate-700
            outline-none
            focus:border-sky-500
            focus:ring-2 focus:ring-sky-100
          "
                        />

                      </div>

                      <p className="text-xs text-slate-400">
                        Ingrese únicamente números. Máximo 10 caracteres.
                      </p>
                    </div>

                  </div>
                </div>

              </div>

              {/* DOCUMENTACIÓN REQUERIDA */}
              <div className=" bg-white rounded-lg shadow-md rounded overflow-hidden">

                {/* Encabezado */}
                <button
                  type="button"
                  onClick={() => setMostrarDocumentacion(!mostrarDocumentacion)}
                  className="
                            w-full
                            flex
                            items-center
                            justify-between
                            px-6
                            py-5
                            text-left
                            bg-white
                            hover:bg-slate-100
                            transition-colors
                            bg-slate-100
                        "
                >
                  <div className="flex items-center justify-content gap-3">
                    <span className="bg-blue-100 rounded-lg">
                      <Building2
                        size={20}
                        className="text-sky-700 m-3"
                      />
                    </span>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        Documentación Requerida
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        Capture la información de contacto del contribuyente.
                      </p>
                    </div>

                  </div>

                  <ChevronDown
                    size={20}
                    className={`
                              text-slate-500
                              transition-transform
                              duration-700
                              ease-in-out
                        ${mostrarDocumentacion ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Contenido */}
                <div className={`
                          px-6
                          overflow-hidden
                          transition-all
                          duration-700
                          ease-in-out
                          ${mostrarDocumentacion
                    ? "max-h-[1000px] opacity-100 pb-6"
                    : "max-h-0 opacity-0"
                  }
    `}>
                  {/* Campos */}
                  <DocumentacionRequerida mostrarDocumentos={false} />


                </div>


              </div>

            </div>

          )
        }

        {/*Cierre de Establecimientos o Locales*/}
        {
          selectedRow === "Cierre de Establecimientos o Locales" &&
          activeStep === 4 && (
            <div>
              <HeaderModulo

                titulo="Cierre de Establecimientos o Locales"

                descripcion="Registre el cierre de establecimientos o locales vinculados al contribuyente conforme a la información proporcionada."

                icono="Store"

                color="red"

              />
              <div className="bg-white rounded-xl  shadow-sm p-6 mb-6 mt-5">

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
                      className={`
                p-5 rounded-xl border-2 text-left transition-all
                ${obligacionSeleccionada === obligacion
                          ? "border-sky-700 bg-sky-50"
                          : "border-slate-200 hover:border-sky-500 hover:bg-sky-50"
                        }
            `}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="font-semibold text-slate-800">
                          {obligacion}
                        </h4>

                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                          VIGENTE
                        </span>
                      </div>

                      <p className="text-sm text-slate-500 mt-2">
                        Ver establecimientos registrados
                      </p>
                    </button>
                  ))}
                </div>

              </div>
              {
                obligacionSeleccionada && (

                  <div className="bg-white rounded-xl  shadow-sm p-6">

                    <div className="mb-6">

                      <h3 className="text-lg font-semibold text-slate-800">
                        Establecimientos Registrados
                      </h3>

                      <p className="text-slate-500 mt-1">
                        Seleccione el establecimiento que desea cerrar.
                      </p>

                    </div>
                    <div className="space-y-4">

                      {establecimientos.map((item) => (

                        <CardEstablecimiento
                          key={item.id}
                          establecimiento={item}
                          seleccionado={establecimientoSeleccionado?.id === item.id}
                          onSeleccionar={() => {
                            setEstablecimientoPendiente(item);
                            setModalConfirmacion(true);
                          }}
                          onVer={() => {
                            setEstablecimientoDetalle(item);
                            setOpenDetalle(true);
                          }}
                        />

                      ))}

                    </div>

                    {openDetalle && (

                      <ModalFormulario
                        abierto={openDetalle}
                        onClose={() => setOpenDetalle(false)}
                        titulo="Domicilio del Establecimiento"
                        descripcion="Consulte la información correspondiente al domicilio del establecimiento seleccionado."
                        icono={<Home className="text-white" size={28} />}
                        textoBoton="Cerrar"
                      >

                        <DetalleDomicilio
                          domicilio={establecimientoSeleccionado}
                        />

                      </ModalFormulario>

                    )
                    }

                    {modalConfirmacion && (

                      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">

                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

                          {/* Header */}

                          <div className="px-6 py-5 -b bg-red-50 flex items-center gap-3">

                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">

                              <Building2
                                className="text-red-600"
                                size={24}
                              />

                            </div>

                            <div>

                              <h3 className="font-semibold text-slate-800">
                                Confirmar selección
                              </h3>

                              <p className="text-sm text-slate-500">
                                Verifique la información antes de continuar.
                              </p>

                            </div>

                          </div>

                          {/* Contenido */}

                          <div className="px-6 py-6">

                            <p className="text-slate-700 text-center text-lg font-medium">

                              ¿DESEA SELECCIONAR ESTE ESTABLECIMIENTO?

                            </p>

                            {establecimientoPendiente && (

                              <div className="mt-6 rounded-xl  bg-slate-50 p-4">

                                <p className="text-xs uppercase text-slate-500">
                                  Nombre del Establecimiento
                                </p>

                                <p className="font-semibold text-slate-800">
                                  {establecimientoPendiente.nombre}
                                </p>

                                <p className="text-xs uppercase text-slate-500 mt-4">
                                  Domicilio
                                </p>

                                <p className="text-slate-700">
                                  {establecimientoPendiente.domicilio}
                                </p>

                              </div>

                            )}

                          </div>

                          {/* Footer */}

                          <div className="-t bg-slate-50 px-6 py-4 flex justify-end gap-3">

                            <button
                              type="button"
                              onClick={() => {
                                setModalConfirmacion(false);
                                setEstablecimientoPendiente(null);
                              }}
                              className="px-5 py-2.5 rounded-lg  hover:bg-slate-100"
                            >
                              No
                            </button>

                            <button
                              type="button"
                              onClick={() => {

                                setEstablecimientoSeleccionado(establecimientoPendiente);
                                setModalConfirmacion(false);

                                setEstablecimientoPendiente(null);

                              }}
                              className="px-5 py-2.5 rounded-lg bg-red-700 hover:bg-red-800 text-white"
                            >
                              Sí
                            </button>

                          </div>

                        </div>

                      </div>

                    )}
                  </div>

                )
              }
            </div>
          )
        }

        {/*Cancelación del REC*/}
        {
          selectedRow === "Cancelación en el Registro Estatal de Contribuyentes" &&
          activeStep === 4 && (
            <div className="">
              <HeaderModulo

                titulo="Cancelación en el Registro Estatal de Contribuyentes"

                descripcion="Registre la cancelación de la inscripción del contribuyente en el Registro Estatal de Contribuyentes conforme a la información y documentación presentada."

                icono="UserRoundX"

                color="red"

              />
              <div className="bg-white rounded-xl  -slate-300 shadow-sm my-4">
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
                  <div className="-t p-6">

                    <div className="flex flex-col gap-4">
                      {/* ALERTA */}
                      <div className=" -amber-300 bg-amber-50 rounded-xl p-5">

                        <div className="font-semibold text-amber-800 mb-2">
                          Declaraciones Pendientes
                        </div>

                        <p className="text-amber-700 text-sm">
                          El aviso de Cancelación en el Registro Estatal de Contribuyentes no lo exime de las obligaciones pendientes
                        </p>

                      </div>


                      {/* OBLIGACIONES */}
                      <div className="rounded-2xl  -gray-300 shadow-sm">
                        <div className="divide-y divide-gray-300">
                          {obligaciones.map((item) => (

                            <div
                              key={item.id}
                              className="-b -gray-300"
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

                                <div className="-t bg-slate-50 p-4">

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
                                            className={`px-4 py-2 rounded-lg  ${ejercicioSeleccionado === 2026
                                              ? "bg-sky-700 text-white -sky-700"
                                              : "bg-white"
                                              }`}
                                          >
                                            Ejercicio 2026
                                          </button>

                                          <button
                                            type="button"
                                            onClick={() => setEjercicioSeleccionado(2025)}
                                            className={`px-4 py-2 rounded-lg  ${ejercicioSeleccionado === 2025
                                              ? "bg-sky-700 text-white -sky-700"
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

                                            <div className="flex justify-between bg-white  rounded-lg p-3">
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

                                            <div className="flex justify-between bg-white  rounded-lg p-3">
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

                                            <div className="flex justify-between bg-white  rounded-lg p-3">
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
                <div className="bg-white rounded-xl  -slate-300 shadow-sm">
                  <div className="-b px-6 py-5">
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
                          className={` rounded-xl p-5 cursor-pointer transition hover:-sky-500
        ${motivoCancelacion === "fusion"
                              ? "-sky-600 bg-sky-50"
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
                          className={` rounded-xl p-5 cursor-pointer transition hover:-sky-500
        ${motivoCancelacion === "escision"
                              ? "-sky-600 bg-sky-50"
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
                          className={`block  rounded-xl p-5 cursor-pointer transition hover:-sky-500
      ${motivoCancelacion === "fallecimiento"
                              ? "-sky-600 bg-sky-50"
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
                <div className="bg-white rounded-xl  -slate-300 shadow-sm mt-6">
                  <div>
                    <div className="-b px-6 py-5">
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
                              className="w-full  rounded-lg px-4 py-3"
                            />
                          </div>

                          <div>
                            <label className="block mb-2 font-medium">
                              Número de Acta de Defunción *
                            </label>

                            <input
                              type="text"
                              className="w-full  rounded-lg px-4 py-3"
                            />
                          </div>

                          <div className="md:col-span-2 -t pt-6">
                            <h4 className="font-semibold text-slate-700 mb-4">
                              Datos del RFC Sucesor
                            </h4>
                          </div>

                          <input
                            type="text"
                            placeholder="RFC *"
                            className=" rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="CURP *"
                            className=" rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="Primer Apellido *"
                            className=" rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="Segundo Apellido"
                            className=" rounded-lg px-4 py-3"
                          />

                          <div className="md:col-span-2">
                            <input
                              type="text"
                              placeholder="Nombre(s) *"
                              className="w-full  rounded-lg px-4 py-3"
                            />
                          </div>

                        </div>
                      )}

                      {motivoCancelacion === "fusion" && (
                        <div className="grid md:grid-cols-2 gap-6">

                          <input
                            type="text"
                            placeholder="RFC de la Sociedad Subsistente *"
                            className=" rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="Razón Social *"
                            className=" rounded-lg px-4 py-3"
                          />

                          <div className="md:col-span-2 -t pt-6">
                            <h4 className="font-semibold text-slate-700 mb-4">
                              Representante Legal de Sociedad Subsistente
                            </h4>
                          </div>

                          <input
                            type="text"
                            placeholder="RFC *"
                            className=" rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="CURP *"
                            className=" rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="Primer Apellido *"
                            className=" rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="Segundo Apellido"
                            className=" rounded-lg px-4 py-3"
                          />

                          <div className="md:col-span-2">
                            <input
                              type="text"
                              placeholder="Nombre(s) *"
                              className="w-full  rounded-lg px-4 py-3"
                            />
                          </div>

                        </div>
                      )}

                      {motivoCancelacion === "escision" && (
                        <div className="grid md:grid-cols-2 gap-6">

                          <input
                            type="text"
                            placeholder="RFC de la Sociedad Escindida *"
                            className=" rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="Razón Social *"
                            className=" rounded-lg px-4 py-3"
                          />

                          <select className=" rounded-lg px-4 py-3">
                            <option>Tipo de Escisión *</option>
                            <option>Total</option>
                            <option>Parcial</option>
                          </select>

                          <div />

                          <div className="md:col-span-2 -t pt-6">
                            <h4 className="font-semibold text-slate-700 mb-4">
                              Representante Legal de Sociedad Escindida
                            </h4>
                          </div>

                          <input
                            type="text"
                            placeholder="RFC *"
                            className=" rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="CURP *"
                            className=" rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="Primer Apellido *"
                            className=" rounded-lg px-4 py-3"
                          />

                          <input
                            type="text"
                            placeholder="Segundo Apellido"
                            className=" rounded-lg px-4 py-3"
                          />

                          <div className="md:col-span-2">
                            <input
                              type="text"
                              placeholder="Nombre(s) *"
                              className="w-full  rounded-lg px-4 py-3"
                            />
                          </div>

                        </div>
                      )}
                    </div>
                  </div>
                  <div className="-t px-6 py-4 flex justify-end">
                    {/* <button
                      type="button"
                      className="px-5 py-2  -slate-300 rounded-lg hover:bg-slate-50"
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
              {datosValidados && (
                <DomicilioFiscal
                  onGuardar={() => { }}
                  onCancelar={() => { }}
                  className=" -gray-300 shadow-sm"
                  titulo="Domicilio para notificaciones"
                  descripcion="Seleccione Un Domicilio Para Recibir Notificaciones"
                />
              )}

              {/* MODAL */}
              {mostrarModalDomicilio && domicilioConsulta && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">

                    <div className="-b px-6 py-4 flex justify-between items-center">
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
                        className="px-4 py-2  rounded-lg hover:bg-slate-50"
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

            </div>

          )
        }

        {/*Aumento de obligaciones*/}
        {
          selectedRow === "Aumento de Obligaciones" &&
          activeStep === 4 && (
            <AumentoObligaciones />
          )
        }

        {/*Disminución de obligaciones*/}
        {
          selectedRow === "Disminucion de Obligaciones" &&
          activeStep === 4 && (
            <DisminucionDeObligaciones />
          )
        }

        {selectedRow &&
          !(activeStep === 5 && vistaPrevia) &&
          (activeStep === 4 || activeStep === 5) && (

            <BotonesNavegacion
              izquierda={botonesIzquierda}
              derecha={obtenerBotonDerecha()}
            />

          )}

        <ModalAccionAviso
          abierto={modalAviso}

          onClose={() => setModalAviso(false)}

          titulo={configAviso.titulo}

          descripcion={configAviso.descripcion}

          textoBoton={configAviso.boton}
          onAceptar={() => {
            setActiveStep(5);
            setModalAviso(false);
            setVistaPrevia(true);
          }}
        />
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