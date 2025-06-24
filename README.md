
# 🛠️ FERREMÁS - Sistema Web de Ferretería

FERREMÁS es una plataforma desarrollada como parte de la evaluación transversal de la asignatura de Aplicaciones Web. Esta solución permite la gestión de productos, pedidos, sucursales y contacto desde una interfaz web, e incluye pruebas unitarias y automatizadas para garantizar su funcionamiento.

---

## 🌟 Características

- 🧾 Catálogo de productos con CRUD completo
- 🏢 Visualización de sucursales
- 📦 Gestión de pedidos
- 📬 Recepción de mensajes de contacto
- 💱 Conversión y consulta de tasas de cambio vía `mindicador.cl`
- 🧪 Pruebas unitarias (Postman) y de carga (JMeter)

---

## ⚙️ Tecnologías utilizadas

- **Backend:** Node.js + Express
- **Base de datos:** MySQL (XAMPP)
- **Pruebas:** Postman, Apache JMeter
- **API externa:** [mindicador.cl](https://mindicador.cl/api)

---

## 📁 Estructura del proyecto

```
Ferremas-main/
├── server/
│   ├── app.js
│   ├── config/
│   ├── controllers/
│   ├── models/
│   └── routes/
├── pruebas/
│   ├── Ferremas_Plan_Corregido_POST_JSON.jmx
│   └── Plan_de_Pruebas_Ferremas.docx
├── README.md
└── ...
```

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/usuario/ferremas.git
cd ferremas
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Asegurar entorno local

- Ejecutar **XAMPP** (MySQL y Apache activos)
- Verificar la base de datos `ferreteria` con tablas como `products`, `sucursales`, `orders`, `mensajes`.

### 4. Iniciar el servidor

```bash
node app.js
```

---

## 🌐 Endpoints disponibles

| Método | Ruta                          | Descripción                        |
|--------|-------------------------------|------------------------------------|
| GET    | `/api/products`              | Lista de productos                 |
| GET    | `/api/sucursales`           | Lista de sucursales                |
| GET    | `/api/orders`               | Lista de pedidos                   |
| POST   | `/api/mensajes`             | Envío de formulario de contacto    |
| GET    | `/api/currency/rates`       | Tasas de cambio desde mindicador.cl |
| POST   | `/api/currency/convert`     | Conversión entre monedas (USD, EUR, CLP) |

---

## 🔍 Pruebas realizadas

### 🧪 Pruebas unitarias (Postman)

- Se validaron los endpoints con diferentes parámetros.
- Se incluyó validación de errores, respuestas esperadas y formatos.

### ⚙️ Pruebas de carga (JMeter)

- Archivo `.jmx` incluye:
  - 3 endpoints `GET`
  - 1 endpoint `POST` (`/api/mensajes`) con JSON
- Headers correctamente configurados (`Content-Type: application/json`)

---

## 📄 Documentación

Se incluye el documento:

- 📑 `Plan_de_Pruebas_Ferremas.docx`: propósito, alcance, pruebas, entorno, herramientas y análisis de riesgo.

---

## 🌍 API de Tasas de Cambio: mindicador.cl

- Se utiliza `https://mindicador.cl/api`
- Carga las tasas de USD y EUR → convertidas dinámicamente
- Caché de 1 hora para evitar múltiples solicitudes

---

## 📝 Licencia

Uso académico y educativo. Puedes reutilizar este proyecto como base para futuras soluciones de integración backend con pruebas.
