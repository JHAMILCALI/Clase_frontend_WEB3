# Mensajes en Blockchain (React + Vite)

Proyecto de ejemplo que muestra cómo crear una pequeña dApp con React y Vite. La app permite conectar MetaMask, mostrar la dirección de la wallet conectada y está preparada para interactuar con un contrato inteligente (la ABI está en `src/abi/MensajesConNombre.json`).

Esta documentación explica cómo instalar, ejecutar y probar la aplicación localmente, además de notas prácticas para trabajar con MetaMask y Web3.

## Características

- Conectar MetaMask desde el frontend.
- Mostrar la dirección de la wallet conectada.
- Archivo ABI incluido (`src/abi/MensajesConNombre.json`) para futuras llamadas al contrato.

## Requisitos

- Node.js (v16+ recomendado)
- npm o yarn
- MetaMask (extensión del navegador) para interactuar con la dApp

## Instalación

Desde la raíz del proyecto ejecuta:

```powershell
npm install
```

o si usas yarn:

```powershell
yarn
```

## Ejecutar en desarrollo

Inicia la aplicación con:

```powershell
npm run dev
```

Abre el navegador en la URL que indique Vite (por defecto http://localhost:5173).

## Uso — conectar MetaMask

1. Asegúrate de tener MetaMask instalada y desbloqueada.
2. Haz clic en el botón "Conectar wallet" que aparece en la interfaz.
3. MetaMask pedirá permiso para conectar una cuenta; acepta y la dirección se mostrará en pantalla.

Nota: la lógica de conexión está en `src/App.jsx`.

### Problema conocido (y corrección rápida)

En algunas versiones del archivo `src/App.jsx` puede haber un typo en el método usado para solicitar cuentas a MetaMask: `eth_requesAccounts` en lugar de `eth_requestAccounts`.

Si ves un error al conectar, abre `src/App.jsx` y busca esta línea (o similar):

```js
method: "eth_requesAccounts",
```

y cámbiala por:

```js
method: "eth_requestAccounts",
```

Con esto la petición funcionará correctamente.

## Estructura del proyecto (resumen)

- public/                 -> archivos estáticos
- src/                    -> código fuente React
	- App.jsx               -> componente principal (conexión a MetaMask)
	- main.jsx              -> punto de entrada
	- abi/MensajesConNombre.json -> ABI del contrato
	- assets/               -> recursos (imágenes, etc.)
- package.json            -> dependencias y scripts
- vite.config.js          -> configuración de Vite

## Scripts útiles

- npm run dev — arranca el servidor de desarrollo (Vite)
- npm run build — genera la versión de producción
- npm run preview — sirve la build de producción localmente

Ejemplo de uso en PowerShell:

```powershell
npm run dev
# en otra ventana puedes usar:
npm run build ; npm run preview
```

## Buenas prácticas y siguientes pasos sugeridos

- Validar y manejar errores de conexión a MetaMask (por ejemplo, usuario rechazó la petición).
- Añadir manejo de redes (detectar si el usuario no está en la red esperada y mostrar instrucciones).
- Implementar lectura/escritura al contrato usando ethers.js o web3.js (importar `ethers` y usar `window.ethereum` como proveedor).
- Añadir formularios para enviar mensajes al contrato y una lista para mostrar mensajes recibidos.

## Contribuciones

Si deseas mejorar el proyecto:

1. Haz fork y crea una rama para tu feature.
2. Abre un pull request describiendo los cambios.

## Licencia

Proyecto de ejemplo — libre para usar y adaptar. Añade una licencia si lo vas a publicar públicamente.

---

Si quieres, puedo además:

- Corregir automáticamente el typo en `src/App.jsx` y aplicar una pequeña mejora (manejo del estado de conexión).
- Añadir un ejemplo mínimo de integración con ethers.js para llamar al contrato usando `src/abi/MensajesConNombre.json`.

Dime qué prefieres y lo hago en el siguiente paso.
