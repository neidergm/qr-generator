# QR Studio

Aplicacion web para crear codigos QR personalizables con vista previa en tiempo real y exportacion en multiples formatos.

## Caracteristicas

- Vista previa en tiempo real del QR.
- Personalizacion de patron, esquinas, colores solidos y gradientes.
- Configuracion de calidad y tamano del QR.
- Carga de logo en el centro del codigo.
- Exportacion en `SVG`, `PNG` y `JPG`.
- Tema claro/oscuro.

## Stack

- React 19 + TypeScript
- Vite 7
- Zustand (estado global)
- `qr-code-styling` (render y export de QR)
- Sass Modules

## Requisitos

- Node.js 20 o superior
- npm 10 o superior

## Inicio rapido

```bash
npm install
npm run dev
```

La app se ejecuta en `http://localhost:5173`.

## Scripts disponibles

- `npm run dev`: entorno de desarrollo con HMR.
- `npm run lint`: analisis estatico con ESLint.
- `npm run build`: chequeo TypeScript + build de produccion.
- `npm run preview`: previsualizar build local.

## Estructura principal

- `src/App.tsx`: shell principal y layout de la aplicacion.
- `src/components/*`: UI por dominio (preview, paneles, export, input).
- `src/store/useQrStore.ts`: estado de configuracion visual y datos del QR.
- `src/store/useQrInstanceStore.ts`: instancia imperativa de `QRCodeStyling` y exportacion.
- `src/utils/qrOptions.ts`: mapeo de estado a opciones de render de QR.
- `src/types/qr.ts`: tipos de dominio de configuracion/exportacion.

## Flujo funcional

1. El usuario modifica opciones en paneles.
2. `useQrStore` actualiza el estado de configuracion.
3. `QrPreview` recalcula y aplica opciones con `buildQrOptions`.
4. `useQrInstanceStore` mantiene la instancia del QR.
5. `ExportDropdown` dispara la descarga usando la instancia actual.

## Accesibilidad actual

- Dropdown de exportacion con `aria-expanded`, `aria-controls` y `role="menu"`.
- Soporte de teclado en menu (`ArrowUp`, `ArrowDown`, `Home`, `End`, `Escape`).
- Gestion de foco al abrir/cerrar menu de exportacion.

## Notas

- El proyecto inyecta Microsoft Clarity en `index.html` fuera de entornos locales.
- Se recomienda agregar capa de consentimiento si el despliegue lo requiere.
