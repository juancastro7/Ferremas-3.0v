# FERREMÁS

FERREMÁS es una plataforma desarrollada como parte de la evaluación transversal de la asignatura de Aplicaciones Web. Esta solución permite la gestión de productos, pedidos, sucursales y contacto desde una interfaz web, e incluye pruebas unitarias y automatizadas para garantizar su funcionamiento.  

---

🌟 **Características**  
- 🧾 Catálogo de productos con CRUD completo  
- 🏢 Visualización de sucursales  
- 📦 Gestión de pedidos  
- 📬 Recepción de mensajes de contacto  
- 💱 Conversión y consulta de tasas de cambio vía mindicador.cl  
- 🧪 Pruebas unitarias (Postman) y de carga (JMeter)  
- 🧱 Arquitectura basada en capas (controllers, routes, models, config) para mejor organización y mantenimiento del código  

---

⚙️ **Tecnologías utilizadas**  
- **Backend:** Node.js + Express  
- **Base de datos:** MySQL (XAMPP)  
- **Pruebas:** Postman, Apache JMeter, Selenium (para pruebas automatizadas en el flujo de compra)  
- **API externa:** mindicador.cl, Transbank Webpay  

---

📁 **Estructura del proyecto**  
Ferremas-main/
├── server/
│ ├── app.js
│ ├── config/
│ ├── controllers/
│ ├── models/
│ └── routes/
├── pruebas/
│ ├── Ferremas_Plan_Corregido_POST_JSON.jmx
│ └── Plan_de_Pruebas_Ferremas.docx
├── README.md
└── ...

yaml
Copy
Edit

---

🚀 **Instalación y ejecución**  
1. Clonar el repositorio  
```bash
git clone https://github.com/usuario/ferremas.git
cd ferremas
Instalar dependencias

bash
Copy
Edit
npm install
Asegurar entorno local

Ejecutar XAMPP (MySQL y Apache activos)

Verificar la base de datos ferreteria con tablas como products, sucursales, orders, mensajes

Iniciar el servidor

bash
Copy
Edit
node app.js
Acceder a la plataforma

Abrir el navegador en la siguiente URL:
👉 http://localhost:3000/login.html

🌐 Endpoints disponibles

Método	Ruta	Descripción
GET	/api/products	Lista de productos
GET	/api/sucursales	Lista de sucursales
GET	/api/orders	Lista de pedidos
POST	/api/mensajes	Envío de formulario de contacto
GET	/api/currency/rates	Tasas de cambio desde mindicador.cl
POST	/api/currency/convert	Conversión entre monedas (USD, EUR, CLP)

🔍 Pruebas realizadas

🧪 Pruebas unitarias (Postman + Selenium)

Se validaron los endpoints con diferentes parámetros

Validación de errores, respuestas esperadas y formatos

Uso de Selenium para pruebas automatizadas en el flujo de compra (por ejemplo: añadir producto al carrito y simular el pago)

⚙️ Pruebas de carga (JMeter)

Archivo .jmx incluye:

3 endpoints GET

1 endpoint POST (/api/mensajes) con JSON

Headers correctamente configurados (Content-Type: application/json)

📄 Documentación

📑 Plan_de_Pruebas_Ferremas.docx: propósito, alcance, pruebas, entorno, herramientas y análisis de riesgo

🌍 API de Tasas de Cambio: mindicador.cl

Se utiliza: https://mindicador.cl/api

Carga las tasas de USD y EUR → convertidas dinámicamente

Caché de 1 hora para evitar múltiples solicitudes

💳 API de Webpay Transbank

Documentación: https://transbankdevelopers.cl/docs/webpay

Esta integración permite que, al realizar un pago desde el carro de compras, el usuario sea redirigido a la plataforma segura de Webpay para completar la transacción con tarjetas bancarias de manera segura y verificada.
## 📝 Licencia

Uso académico y educativo. Puedes reutilizar este proyecto como base para futuras soluciones de integración backend con pruebas.
