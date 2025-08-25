# Pokemon Store App

## Instrucciones para correr el proyecto

1. Instala dependencias:
   ```bash
   npm install
   npm install @react-native-community/push-notification-ios react-native-push-notification axios
   ```
2. Ejecuta el proyecto en Android:
   ```bash
   npx react-native run-android
   ```
3. Si usas emulador, asegúrate de que esté corriendo antes de ejecutar el comando.

## Explicación de arquitectura y decisiones técnicas

- **Arquitectura limpia:**
  - `src/screens`: Pantallas principales (Home, Detalle, Carrito).
  - `src/components`: Componentes reutilizables.
  - `src/services`: Lógica de acceso a APIs externas.
  - `src/context`: Estado global (carrito) usando Context API.
  - `src/navigation`: Configuración de navegación con React Navigation.
- **Estado global:** El carrito se gestiona con Context API para compartirlo entre pantallas.
- **Notificaciones y vibración:** Integradas en el flujo de agregar/eliminar productos.

## Justificación de la funcionalidad nativa elegida

Se eligió la **vibración** y **notificaciones locales** porque:
- Mejoran la experiencia del usuario con feedback inmediato y visible.
- Son fáciles de probar en emuladores y dispositivos reales.
- No requieren permisos complejos ni configuración avanzada.
- Se integran naturalmente en el flujo de compra y gestión del carrito.

## Breve análisis del enfoque de diseño visual

- **Diseño limpio y centrado:** Listas y tarjetas con bordes redondeados y sombras para destacar los productos.
- **Colores coherentes:** Verde para acciones de compra, azul para navegación y rojo para eliminar.
- **Botón flotante:** Acceso rápido al carrito desde cualquier parte de la app.
- **Feedback visual y táctil:** Mensajes claros, emojis y vibración para mejorar la interacción.

---

¡Gracias por revisar el proyecto!
