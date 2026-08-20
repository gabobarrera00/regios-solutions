# Auditoría — Regios Tech Solutions

Revisión de `index.html`, `style.css` y `script.js` en el commit `1730c2b`.

Gabo: esto es una revisión de código de verdad, del tipo que se hace en una empresa antes de aprobar un cambio. No es una lista de quejas. Cada hallazgo trae **qué está mal**, **por qué le cuesta dinero al cliente** y **cómo pedir el arreglo** — porque tú diriges, no escribes el CSS, así que lo que de verdad te sirve es saber *qué exigir*.

Cuatro cosas ya vienen arregladas en este PR como ejemplo. El resto es tuyo.

---

## Antes de los hallazgos: lo que hiciste bien

No es cortesía, es información. Estas decisiones fueron correctas y quiero que sepas cuáles para repetirlas a propósito:

- **`lang="es-MX"`** en el `<html>`. La mayoría pone `lang="en"` por copiar plantillas y rompe el corrector, la separación de sílabas y la pronunciación de los lectores de pantalla. Tú pusiste la variante regional. Correcto.
- **`target="_blank" rel="noopener"`** en todos los enlaces externos. Sin `rel="noopener"` la página que abres puede manipular la que la abrió. Lo hiciste en los cinco enlaces, no en tres de cinco.
- **`<meta name="description">` escrita a mano**, con la ciudad y el diferenciador. Es exactamente lo que le reclamas a Vaconsa en tu propia auditoría. Aplicaste tu propio estándar.
- **Variables CSS** (`--navy`, `--green`, `--radius`) en lugar de repetir `#0a1f44` treinta veces. Es la diferencia entre cambiar la marca en un lugar o en treinta.
- **Elegir no usar framework, y escribir por qué** en el `CLAUDE.md`. Volveré a esto en el playbook: la decisión fue correcta y la justificación es más valiosa que la decisión.
- **`clamp()` en el `h1`** para que el título escale con la pantalla sin media query. Eso es CSS moderno; mucha gente que cobra por esto todavía no lo usa.

Y el dato más importante de toda esta auditoría: **`propuesta-vaconsa`, que hiciste al día siguiente, no tiene ni un emoji, tiene SVG, tiene `:focus-visible`, tiene modo oscuro y respeta `prefers-reduced-motion`.** Corregiste solo, en un día, casi todo lo que sigue. Lo que falta es hacerlo a propósito y no por instinto.

---

## Crítico — cuesta clientes hoy

### 1. Los dos botones de conversión fallan contraste. Son los únicos dos botones de la página.

`style.css:104` y `style.css:118` — texto blanco sobre verde:

| Botón | Colores | Contraste | Mínimo WCAG AA |
|---|---|---|---|
| `.btn-primary` "Cotización sin compromiso" | `#ffffff` sobre `#2fb344` | **2.74:1** | 4.5:1 |
| `.btn-whatsapp` "WhatsApp" / "Enviar por WhatsApp" | `#ffffff` sobre `#25d366` | **1.98:1** | 4.5:1 |

Medido, no estimado — con la fórmula de luminancia relativa de WCAG 2.2.

Revisé **los otros nueve pares de color de tu paleta y todos pasan** — el texto del hero (10.76:1), el menú (12.71:1), el pie (10.76:1), el badge (8.01:1). Tu instinto para texto es bueno. El problema es específico: **el patrón "botón de color de marca con texto blanco" casi siempre falla**, y `#25d366` es el verde oficial de WhatsApp, así que es una trampa en la que cae todo el mundo. Fíjate que WhatsApp mismo nunca pone blanco sobre ese verde en su interfaz: usa verdes mucho más oscuros (`#075E54`) para las áreas con texto.

**Por qué le cuesta dinero a Pablo:** un señor de 55 años viendo su celular al sol en Guadalupe, que es exactamente el cliente que compra paneles solares, no alcanza a leer el botón. La página entera existe para que le den clic a ese botón.

**Arreglo (ya aplicado):** tinta oscura sobre el mismo verde. `#0b2e13` sobre `#25d366` da **7.49:1** y el botón sigue siendo inconfundiblemente de WhatsApp. No cambié la marca, cambié el texto encima.

**Cómo pedirlo la próxima vez:** *"Verifica el contraste WCAG AA de todos los botones y textos sobre color. Dame la razón medida, no tu impresión."*

---

### 2. Cero etiquetas Open Graph. El canal de venta del cliente es WhatsApp.

`index.html:1-9` — no hay `og:title`, `og:description` ni `og:image`.

Cuando Pablo pega `regios-solutions.vercel.app` en un chat de WhatsApp, en su estado o en un grupo de vecinos, **aparece la URL pelona**. Sin título, sin descripción, sin imagen. Un competidor con las tres etiquetas aparece con una tarjeta grande con foto de una instalación y el texto "18 años de experiencia".

Esto es el hallazgo con mejor relación esfuerzo/resultado de toda la auditoría: son cinco líneas en el `<head>` y cambian cómo se ve el negocio en el único canal por el que realmente vende. Y nota la ironía — **el hallazgo #3 de tu auditoría de Vaconsa es exactamente este**, "sin imagen de vista previa al compartir el enlace". Lo detectaste en el sitio de otro y no en el tuyo. Eso pasa siempre; por eso existen las revisiones de código.

**Arreglo (parcialmente aplicado):** ya agregué `og:title`, `og:description`, `og:type`, `og:locale`, `og:url` y `twitter:card`. **Falta `og:image` y eso lo tienes que producir tú:** un PNG o JPG de **1200 × 630 px** con el logo y una foto de instalación real. Sin la imagen, la tarjeta se ve pobre; con ella se ve como empresa. Pídele la foto a Pablo — necesitas fotos de todos modos, ver hallazgo #8.

---

### 3. El negocio es local y no tiene datos estructurados. Es invisible en el mapa.

No hay `application/ld+json` en ningún lado.

Cuando alguien en Guadalupe busca *"paneles solares cerca de mí"* o *"instalación paneles solares Guadalupe"*, Google muestra un bloque de tres negocios con mapa, estrellas y teléfono. Ese bloque se llena con **datos estructurados** (`LocalBusiness` de schema.org) más el perfil de Google Business. Sin esquema, tu página compite por la lista azul de abajo, donde casi nadie llega en móvil.

Para un instalador de paneles solares esto no es SEO técnico, es **el canal de adquisición completo**. Nadie busca "Regios Tech Solutions"; buscan el servicio más la ciudad.

**Arreglo (aplicado a medias, a propósito):** agregué el bloque `LocalBusiness` con lo que sé de cierto — nombre, teléfono, Guadalupe, Nuevo León, MX, y los servicios. **Dejé `streetAddress`, `geo` y `openingHours` como comentarios `TODO` porque no me los sé, y meter una dirección inventada en datos estructurados es peor que no tenerlos** — Google la publica. Pregúntale a Pablo y llénalos.

Y dile a Pablo que reclame su **perfil de Google Business** si no lo tiene. El esquema y el perfil trabajan juntos; el perfil solo probablemente rinde más que la página entera.

---

## Importante — arreglar antes del siguiente cliente

### 4. Catorce emojis haciendo de iconos

`index.html` — `☀` en el logo, `📈 🌱 🛡` en beneficios, `🏠 📋 ⭐ ✅ 👷 🏅` en servicios, `📱` en cotiza, `📍 💬` en el pie, `☰` en el menú.

Cuatro problemas concretos, en orden de gravedad:

1. **Cada sistema operativo dibuja otro emoji.** El 🛡 de "garantía" es un escudo azul y plano en Windows, uno azul con brillo en Android y uno gris metálico en iPhone. No controlas cómo se ve tu propia página. Para un cliente que paga, eso es inaceptable.
2. **No los puedes pintar del color de la marca.** Un emoji trae su color de fábrica. Por eso la fila de beneficios se ve como una conversación de chat y no como una sección de un sitio corporativo: hay verde, café, azul y morado peleándose con tu paleta navy/verde.
3. **Los lectores de pantalla los leen en voz alta.** Una persona ciega oye *"gráfica con tendencia al alza. Ahorra. en tu recibo de luz"*. El emoji es decorativo y está contaminando el contenido.
4. **Leen como algo hecho de prisa.** Este es el punto comercial. Nadie te lo va a decir en la junta, pero un emoji donde debería ir un icono es la señal más rápida de "esto lo hicieron en una tarde". Cuando cobras $15,000 el cliente compara con sitios que no tienen emojis.

**La alternativa: SVG en línea.** Un SVG es un dibujo hecho de instrucciones, no de pixeles. Se ve idéntico en todas las máquinas, escala sin pixelearse, **hereda el color con `fill="currentColor"` o `stroke="currentColor"`** — así que si cambias `--green` los iconos cambian solos — y pesa menos que una imagen. Con `aria-hidden="true"` desaparece para los lectores de pantalla, que es lo correcto para un icono decorativo.

**Arreglo (aplicado en una sección de tres, a propósito):** convertí los tres iconos de **beneficios** a SVG de trazo, heredando `currentColor`, con `aria-hidden="true"`. **Dejé los seis de servicios, el del logo, el de cotiza, los dos del pie y el del menú sin tocar** para que hagas la comparación tú mismo: abre la página y mira la fila de beneficios junto a la de servicios. La diferencia es el hallazgo.

**Cómo pedirlo:** *"Reemplaza los emojis por SVG en línea de trazo, con `stroke="currentColor"`, `aria-hidden="true"` y `width`/`height` explícitos. Que hereden el color de la marca."* Iconos gratis y decentes: [Lucide](https://lucide.dev), [Heroicons](https://heroicons.com), [Phosphor](https://phosphoricons.com).

---

### 5. La página está publicada dos veces y tu documentación se contradice

- `regios-solutions.vercel.app` → 200. Es la que dice el `README.md`.
- `gabobarrera00.github.io/regios-solutions/` → 200. Es la que dice el campo *homepage* del repo en GitHub.

Dos copias vivas de la misma página. Tres consecuencias reales:

1. **Google ve contenido duplicado** y tiene que adivinar cuál posicionar. Reparte la señal entre las dos en lugar de acumularla en una.
2. **Vas a arreglar una y olvidar la otra.** Con toda seguridad. Es la misma clase de problema que la copia gemela de Vaconsa, y ahí al menos escribiste un script para sincronizar.
3. **No sabes cuál le diste al cliente.** Si Pablo trae la de GitHub Pages y tú actualizas la de Vercel, él ve la página vieja y cree que no trabajaste.

**Arreglo:** decide cuál es la real — te recomiendo **Vercel**, porque es donde vas a poner el dominio propio y donde funcionan las variables de entorno y las funciones cuando las necesites. Luego **apaga GitHub Pages** en *Settings → Pages → Source: None* y pon la URL de Vercel en el campo *homepage* del repo, para que coincida con el README. Ya agregué la etiqueta `<link rel="canonical">` apuntando a Vercel, que le dice a Google cuál es la buena, pero eso es el cinturón, no la solución: apaga la otra.

Y el paso siguiente de verdad: **un dominio propio**. `regios-solutions.vercel.app` en una tarjeta de presentación se ve como un experimento. `regiostech.mx` cuesta unos cientos de pesos al año y es la diferencia entre parecer proveedor y parecer tarea escolar. Cóbralo aparte, con el registro a nombre del cliente.

---

### 6. Sin estilos de foco, y `:hover` no sirve en un celular

`style.css:130` tiene `.btn:hover { transform: translateY(-1px); }` y no hay ni un `:focus-visible` en todo el archivo.

Dos consecuencias:

- **Quien navega con teclado no ve dónde está.** Tabula por la página y no pasa nada visible. Eso incluye a personas con discapacidad motriz, a quien usa lector de pantalla, y a cualquiera que llene formularios con Tab porque es más rápido.
- **`:hover` no existe en móvil.** No hay puntero. Toda la retroalimentación visual que programaste desaparece justo en el dispositivo donde va a estar la mayoría de las visitas de Pablo.

**Arreglo (aplicado):** agregué un `:focus-visible` con anillo visible en botones, enlaces y el toggle. `:focus-visible` es mejor que `:focus` porque solo aparece con teclado — quien da clic con el mouse no ve el anillo, así que no hay costo estético.

También agregué el bloque `prefers-reduced-motion` que ya sabes usar (lo tienes en Vaconsa) para que las transiciones se apaguen si el usuario configuró su sistema así. Hay gente a la que el movimiento en pantalla le provoca mareo o migraña; es una preferencia del sistema operativo y respetarla son tres líneas.

---

### 7. Tres defectos de comportamiento que sí se pueden reproducir

Estos no son opinión, son errores. Reprodúcelos tú:

**a) El menú móvil se queda pegado en escritorio.** `style.css:275` — la regla `.nav.open` está **fuera** de la media query. Abre la página en una ventana angosta, toca el menú, y sin cerrarlo ensancha la ventana. El menú se queda como panel flotante encima del contenido. Pasa porque `.nav.open` tiene más especificidad que el `.nav { display:none }` de la media query y vive después en el archivo. *(Arreglado en este PR: la regla se movió dentro de la media query.)*

**b) Los enlaces del menú aterrizan debajo del encabezado.** El header es `position: sticky` con 68px de alto y no hay `scroll-padding-top` en el `html`. Da clic en "Servicios": el navegador lleva el borde superior de la sección al borde superior de la ventana, y los 68px del header tapan el título. El usuario ve la sección empezada a media res. *(Arreglado: `html { scroll-padding-top: 84px }`. Una línea.)*

**c) Si el JavaScript no carga, el menú móvil no existe.** En móvil `.nav` es `display:none` y solo `script.js` lo abre. Si el archivo falla — red mala, bloqueador, un error de sintaxis futuro — no hay navegación. En una página de una sola sección es sobrevivible porque los enlaces también están en el pie, pero es la lección que importa: **lo que el JavaScript agrega debe ser mejora, no requisito.** El mismo menú se hace sin una línea de JS con `<details>` o con un checkbox oculto. *(No lo arreglé: es un cambio de enfoque, no un parche, y es buen ejercicio.)*

---

## Sugerencias — súbete el nivel

### 8. Cero fotos en una página que vende algo visual

No hay ni un `<img>`. Vendes paneles solares: instalaciones reales sobre techos reales en Guadalupe. Eso es prueba social y es lo único que convence a alguien de dejar entrar a un instalador a su casa.

Pídele a Pablo seis fotos: dos instalaciones terminadas, una del equipo trabajando, una de él (la cara del dueño vende, sobre todo con 18 años de experiencia), y capturas de un recibo de CFE antes y después con los datos personales tapados. **Ese último par vale más que toda la sección de beneficios**, porque es el único argumento que el cliente entiende sin traducción.

Cuando las metas: `loading="lazy"` en todas las de abajo del pliegue, `width` y `height` explícitos para que la página no salte al cargar, `alt` descriptivo, y formato WebP.

### 9. El `wa.me` no lleva mensaje precargado

Los cinco enlaces son `https://wa.me/528112095779` a secas. Se abre WhatsApp con un cuadro vacío y el visitante tiene que redactar. Un porcentaje real se arrepiente ahí.

Con `?text=` el mensaje viene escrito:

```
https://wa.me/528112095779?text=Hola,%20vi%20su%20p%C3%A1gina%20y%20quiero%20una%20cotizaci%C3%B3n%20de%20paneles%20solares.
```

Y hay un truco: **pon un texto distinto en cada botón.** El del hero dice "vi su página", el de la sección de cotización dice "quiero cotizar, aquí va mi recibo de CFE". Así Pablo sabe por dónde entró cada prospecto sin instalar nada. Es atribución gratis. *(Aplicado en el botón principal de cotización como ejemplo; los otros cuatro son tuyos.)*

### 10. Sin analítica no puedes subir tu precio

No hay nada instalado. Y esto no es un detalle técnico, es tu modelo de negocio:

> Si no puedes probar que la página generó prospectos, cada renovación y cada aumento de precio es una discusión de opiniones, y la vas a perder porque el que paga siempre gana las discusiones de opiniones.

Con analítica, a los 90 días llegas con *"la página tuvo 1,240 visitas y 34 clics a WhatsApp"*. Ahí ya no estás pidiendo un aumento, estás mostrando un retorno. Es la conversación que convierte $8,000 una vez en $2,500 al mes.

Usa algo que respete la privacidad y no requiera aviso de cookies: [Plausible](https://plausible.io), [Umami](https://umami.is) o el propio [Vercel Analytics](https://vercel.com/analytics). Google Analytics es gratis pero te obliga a poner banner de cookies y es tratamiento de datos personales — más trámite del que necesitas. Lo importante: **marca el clic a WhatsApp como evento**, porque esa es la única métrica que le importa al cliente.

### 11. Detalles menores

- **`style.css:16`** — `font-family: "Segoe UI", system-ui, ...`. Segoe UI es la fuente de Windows y va primero, así que en Mac y en iPhone se ignora y cae en la siguiente. El orden correcto es `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`: primero la del sistema, y las específicas como respaldo. Como está, decidiste que Windows manda; casi seguro no era la intención.
- **Sin favicon.** La pestaña muestra un globo gris. Un SVG de 1KB lo resuelve y aparece también en los favoritos del cliente.
- **`.marca-chip`** son `<span>` sueltos. Nueve marcas es una lista; `<ul>`/`<li>` se lo dice a los lectores de pantalla ("lista de nueve elementos"). Se ve idéntico con `list-style:none`.
- **El toggle del menú no dice si está abierto.** Le agregué `aria-expanded` que se actualiza en el JS. Sin eso, un lector de pantalla anuncia "botón" y nunca "expandido/contraído".

---

## Qué viene arreglado en este PR

Cambios quirúrgicos, para que veas cómo se ve el arreglo. **No arreglé todo a propósito** — hacer el resto es el ejercicio.

1. Contraste de los dos botones de conversión → 7.49:1 y 6.03:1, marca intacta.
2. `og:*` + `twitter:card` + `canonical` (falta que produzcas el `og:image` de 1200×630).
3. `LocalBusiness` JSON-LD con los datos verificables; `streetAddress`, `geo` y `openingHours` marcados `TODO` para que Pablo te los dé.
4. Los **tres** iconos de beneficios a SVG (`currentColor` + `aria-hidden`). Los otros once siguen siendo emoji para que compares.
5. `:focus-visible` en botones, enlaces y toggle. Bloque `prefers-reduced-motion`.
6. `.nav.open` movida dentro de la media query. `scroll-padding-top`. `aria-expanded` en el toggle.
7. Orden del `font-family` corregido.
8. `?text=` precargado en el botón principal de cotización.

## Qué te queda

- [ ] Producir el `og:image` de 1200×630 y enlazarlo
- [ ] Conseguir de Pablo dirección, coordenadas y horario → completar el JSON-LD
- [ ] Los once emojis restantes → SVG
- [ ] Apagar GitHub Pages, dejar solo Vercel, arreglar el campo *homepage*
- [ ] Seis fotos reales, con `loading="lazy"`, `width`/`height` y `alt`
- [ ] `?text=` distinto en los otros cuatro botones de WhatsApp
- [ ] Instalar analítica y marcar el clic a WhatsApp como evento
- [ ] Favicon
- [ ] Menú móvil que funcione sin JavaScript
- [ ] Sugerirle a Pablo el perfil de Google Business y un dominio propio

---

## El punto que importa más que los once hallazgos

Ninguno de estos errores es de programación. Son de **criterio**: qué revisar antes de decir "ya quedó".

Tú no escribes el CSS — diriges. Entonces tu habilidad no es memorizar `scroll-padding-top`, es **tener una lista de verificación que se dispara antes de entregar**, y saber pedir la revisión con palabras precisas. Los que cobran caro no es que escriban mejor código; es que su lista es más larga.

Aquí está la tuya. Cópiala y córrela antes de cada entrega:

```
[ ] Contraste WCAG AA medido en todo texto sobre color, sobre todo botones
[ ] og:title, og:description, og:image (1200x630) — probado pegando el link en WhatsApp
[ ] JSON-LD LocalBusiness con datos reales, ninguno inventado
[ ] Cero emojis como iconos — SVG con currentColor + aria-hidden
[ ] :focus-visible visible al tabular por toda la página
[ ] Probada a 390px de ancho, sin scroll horizontal
[ ] Los enlaces de ancla no quedan tapados por el header pegajoso
[ ] Publicada en UNA sola URL
[ ] Analítica instalada, clic a WhatsApp marcado como evento
[ ] lang correcto, favicon, canonical
```

Cómo cobrar por esto está en `NEXO-WEB-PLAYBOOK.md`, en el repo de `propuesta-vaconsa`. Adelanto: **este trabajo, arreglado, vale bastante más de lo que probablemente pensabas pedir.**

— Revisado por tu tío Chuy y buddai · agosto 2026
