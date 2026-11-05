// English lives in index.html. This file holds the Spanish text and swaps it in.
// Loaded at the end of <body> so a saved language applies before the first paint.
(function () {
  var KEY = "lang";

  var ES = {
    skip: "Saltar al contenido",
    brand: "Portafolio personal",
    navLabel: "Navegación principal",
    work: "Proyectos",
    experience: "Experiencia",
    skills: "Destrezas",
    contact: "Contacto",

    role: "Estudiante de ciencias de computadoras y desarrollador",
    lead: "Soy estudiante de ciencias de computadoras de Puerto Rico, con una concentración menor en ciberseguridad. Desarrollo aplicaciones web y móviles y APIs, y estoy haciendo crecer FlowTech, un estudio de tecnología que crea aplicaciones, páginas web y videojuegos.",
    viewWork: "Ver mis proyectos",
    portraitAlt: "Retrato de Fernando José Colombo Rivera",

    factsLabel: "Resumen",
    basedIn: "Ubicación",
    basedInValue: "Puerto Rico, EE. UU.",
    studying: "Estudios",
    studyingValue: "BBA en Ciencias de Computadoras, concentración menor en Ciberseguridad",
    languages: "Idiomas",
    languagesValue: "Inglés y español",
    status: "Estado",
    statusValue: "Disponible para oportunidades y proyectos en equipo",

    selectedWork: "Proyectos destacados",
    code: "Código",
    liveSite: "Sitio en vivo",
    allRepos: "Todos los repositorios en GitHub",

    typeWebsite: "Página web",
    flowtechDesc: "La página oficial de FlowTech. Es bilingüe y responsive, está hecha sin frameworks y tiene un formulario de contacto que envía emails con una función serverless.",
    typeMobile: "Aplicación móvil",
    contactBookTitle: "Libreta de contactos",
    contactBookDesc: "Una aplicación de contactos offline-first. Cada cambio se guarda de inmediato en una base de datos local y entra en una cola de sincronización, con un adaptador listo para conectarse a una API externa.",
    movieDbTitle: "Base de datos de películas",
    movieDbDesc: "Un catálogo de películas con una API REST paginada y un cliente web aparte, hecho en JavaScript, que la consume.",
    typeVision: "Visión por computadora",
    memeGestureDesc: "Un experimento con la cámara web que sigue una mano en tiempo real e identifica gestos según la posición de los dedos.",
    typeConsole: "Aplicación de consola",
    zenbotDesc: "Un chatbot basado en reglas que busca palabras clave para entender lo que preguntas y responde con la hora, la fecha, un chiste o algo de conversación.",

    twoColLabel: "Experiencia y educación",
    education: "Educación",
    dateLids: "Diciembre 2025 – presente",
    dateAlmacenes: "Agosto 2025 – octubre 2025",
    dateBarranquitas: "Agosto 2023 – 2024",
    dateBayamon: "Agosto 2024 – presente",
    salesRole: "Vendedor y servicio al cliente, Bayamón",
    interBarranquitas: "Universidad Interamericana, Recinto de Barranquitas",
    studyWork: "Programa de estudio y trabajo, servicio al cliente y apoyo",
    interBayamonFull: "Universidad Interamericana de Puerto Rico, Recinto de Bayamón",
    degreeMinor: "BBA en Ciencias de Computadoras, concentración menor en Ciberseguridad",
    interBarranquitasFull: "Universidad Interamericana de Puerto Rico, Recinto de Barranquitas",
    degree: "BBA en Ciencias de Computadoras",
    studentOrg: "Organización estudiantil",
    infotechDesc: "Networking, oportunidades y competencias de computadoras para estudiantes de ciencias de computadoras",

    skillLanguages: "Lenguajes",
    skillTools: "Frameworks y herramientas",
    skillOs: "Sistemas operativos",
    skillProfessional: "Profesionales",
    skillProfessionalValue: "Liderazgo, comunicación, resolución de problemas, creatividad, responsabilidad",

    contactHeading: "¿Tienes un puesto o un proyecto en mente? Hablemos."
  };

  var PAGE = {
    es: {
      title: "Fernando José Colombo Rivera | Estudiante de Ciencias de Computadoras y Desarrollador",
      description: "Estudiante de ciencias de computadoras y desarrollador de Puerto Rico, con concentración menor en ciberseguridad. Proyectos web y móviles, experiencia y contacto."
    }
  };

  var root = document.documentElement;
  var description = document.querySelector('meta[name="description"]');
  var toggle = document.querySelector(".lang-toggle");
  PAGE.en = { title: document.title, description: description.content };

  // Remember the English text so switching back restores it exactly.
  var targets = [];
  function collect(selector, read, write, keyAttr) {
    document.querySelectorAll(selector).forEach(function (el) {
      targets.push({ key: el.getAttribute(keyAttr), en: read(el), write: write, el: el });
    });
  }
  collect("[data-i18n]", function (el) { return el.textContent; }, function (el, v) { el.textContent = v; }, "data-i18n");
  collect("[data-i18n-label]", function (el) { return el.getAttribute("aria-label"); }, function (el, v) { el.setAttribute("aria-label", v); }, "data-i18n-label");
  collect("[data-i18n-alt]", function (el) { return el.alt; }, function (el, v) { el.alt = v; }, "data-i18n-alt");

  function setLanguage(lang) {
    root.lang = lang;
    document.title = PAGE[lang].title;
    description.content = PAGE[lang].description;
    targets.forEach(function (t) {
      t.write(t.el, lang === "es" ? ES[t.key] : t.en);
    });
    // The button names the language it switches to.
    toggle.textContent = lang === "es" ? "EN" : "ES";
    toggle.setAttribute("aria-label", lang === "es" ? "Switch to English" : "Cambiar a español");
    toggle.title = toggle.getAttribute("aria-label");
    document.dispatchEvent(new CustomEvent("langchange"));
  }

  var saved = null;
  try {
    saved = localStorage.getItem(KEY);
  } catch (e) {
    // Storage can be blocked. The page falls back to English.
  }
  setLanguage(saved === "es" ? "es" : "en");

  toggle.hidden = false;
  toggle.addEventListener("click", function () {
    var next = root.lang === "es" ? "en" : "es";
    try {
      localStorage.setItem(KEY, next);
    } catch (e) {
      // The choice still applies until the page is closed.
    }
    setLanguage(next);
  });
})();
