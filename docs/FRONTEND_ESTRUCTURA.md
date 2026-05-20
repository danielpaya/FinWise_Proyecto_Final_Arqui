# Frontend Structure - FinWise AI

## Fecha de Creación
20 de Mayo de 2026

## Estructura Completa del Directorio `src/`

```
src/
 ├── assets/                    # Imágenes, iconos, archivos estáticos
 │
 ├── components/               # Componentes React reutilizables
 │    ├── ui/                 # Componentes UI base (Button, Input, etc.)
 │    ├── shared/             # Componentes compartidos entre páginas
 │    ├── auth/               # Componentes específicos de autenticación
 │    ├── dashboard/          # Componentes específicos del dashboard
 │    ├── charts/             # Componentes de gráficos
 │    └── forms/              # Componentes de formularios
 │
 ├── pages/                   # Páginas principales de la aplicación
 │    ├── auth/
 │    │    ├── LoginPage.jsx           # Página de login
 │    │    └── RegisterPage.jsx        # Página de registro
 │    │
 │    ├── dashboard/
 │    │    └── DashboardPage.jsx       # Dashboard principal
 │    │
 │    ├── transactions/
 │    │    └── TransactionsPage.jsx    # Gestión de transacciones
 │    │
 │    ├── budgets/
 │    │    └── BudgetsPage.jsx         # Gestión de presupuestos
 │    │
 │    ├── goals/
 │    │    └── GoalsPage.jsx           # Gestión de metas de ahorro
 │    │
 │    └── reports/
 │         └── ReportsPage.jsx        # Reportes financieros
 │
 ├── layouts/                 # Layouts para envolver páginas
 │    ├── DashboardLayout.jsx         # Layout con sidebar para dashboard
 │    └── AuthLayout.jsx              # Layout centrado para auth
 │
 ├── routes/                  # Configuración de rutas
 │    └── AppRouter.jsx               # Router principal con React Router
 │
 ├── services/                # Servicios API (Axios)
 │    ├── api.js                      # Configuración base de Axios
 │    ├── authService.js              # Servicio de autenticación
 │    ├── transactionService.js       # Servicio de transacciones
 │    ├── budgetService.js            # Servicio de presupuestos
 │    ├── goalService.js              # Servicio de metas
 │    ├── reportService.js            # Servicio de reportes
 │    └── index.js                    # Exportaciones centralizadas
 │
 ├── hooks/                   # Custom hooks React
 │    ├── useApi.js                   # Hook para llamadas API
 │    └── index.js                    # Exportaciones centralizadas
 │
 ├── context/                 # Contextos React (State global)
 │    └── AuthContext.jsx             # Contexto de autenticación
 │
 ├── styles/                  # Estilos globales y temas
 │
 ├── utils/                   # Funciones utilitarias
 │    ├── format.js                   # Formateo de moneda, fechas, etc.
 │    └── index.js                    # Exportaciones centralizadas
 │
 ├── lib/                     # Librerías de terceros personalizadas
 │    └── utils.js                    # Utilidades de librerías
 │
 ├── App.jsx                  # Componente principal
 ├── main.jsx                 # Punto de entrada
 └── index.css                # Estilos globales con Tailwind
```

## Archivos Creados

### Configuración Base
- ✅ `App.jsx` - Componente principal que usa AppRouter
- ✅ `main.jsx` - Punto de entrada de React
- ✅ `index.css` - Estilos globales con Tailwind CSS y variables CSS

### Rutas
- ✅ `routes/AppRouter.jsx` - Configuración completa de rutas con React Router v7

### Layouts
- ✅ `layouts/DashboardLayout.jsx` - Layout con sidebar para páginas autenticadas
- ✅ `layouts/AuthLayout.jsx` - Layout centrado para páginas de auth

### Context
- ✅ `context/AuthContext.jsx` - Contexto para manejo de autenticación global

### Servicios API
- ✅ `services/api.js` - Configuración de Axios con interceptors
- ✅ `services/authService.js` - Login, register, logout
- ✅ `services/transactionService.js` - CRUD transacciones
- ✅ `services/budgetService.js` - CRUD presupuestos
- ✅ `services/goalService.js` - CRUD metas + contribuciones
- ✅ `services/reportService.js` - Reportes mensuales y por categoría
- ✅ `services/index.js` - Exportaciones centralizadas

### Páginas
- ✅ `pages/auth/LoginPage.jsx` - Formulario de login
- ✅ `pages/auth/RegisterPage.jsx` - Formulario de registro
- ✅ `pages/dashboard/DashboardPage.jsx` - Dashboard con resumen financiero
- ✅ `pages/transactions/TransactionsPage.jsx` - Lista y filtro de transacciones
- ✅ `pages/budgets/BudgetsPage.jsx` - Gestión de presupuestos con progreso
- ✅ `pages/goals/GoalsPage.jsx` - Metas de ahorro con progreso
- ✅ `pages/reports/ReportsPage.jsx` - Reportes detallados

### Hooks
- ✅ `hooks/useApi.js` - Custom hook para llamadas API con loading/error
- ✅ `hooks/index.js` - Exportaciones centralizadas

### Utils
- ✅ `utils/format.js` - Formateo de moneda, fechas, porcentajes
- ✅ `utils/index.js` - Exportaciones centralizadas

### Dependencias Agregadas
- ✅ `axios` - Cliente HTTP
- ✅ `react-router-dom` - Enrutamiento

## Rutas Configuradas

### Rutas Públicas (AuthLayout)
- `/auth/login` - LoginPage
- `/auth/register` - RegisterPage

### Rutas Privadas (DashboardLayout)
- `/` - DashboardPage (por defecto)
- `/transactions` - TransactionsPage
- `/budgets` - BudgetsPage
- `/goals` - GoalsPage
- `/reports` - ReportsPage

## Funcionalidades Implementadas

### Autenticación
- ✅ Login con email y password
- ✅ Registro con name, email, password
- ✅ Manejo de token en localStorage
- ✅ Contexto global de autenticación
- ✅ Logout con limpieza de localStorage
- ✅ Redirección automática en 401

### Dashboard
- ✅ Resumen financiero (ingresos, gastos, balance)
- ✅ Transacciones recientes
- ✅ Overview de presupuestos con barras de progreso
- ✅ Metas de ahorro con progreso

### Transacciones
- ✅ Listado de todas las transacciones
- ✅ Filtro por tipo (ALL, INCOME, EXPENSE)
- ✅ Eliminación de transacciones
- ✅ Mostrado de categoría y fecha

### Presupuestos
- ✅ Listado de presupuestos del mes actual
- ✅ Barras de progreso con colores según estado
- ✅ Mostrado de límite, gastado, restante
- ✅ Eliminación de presupuestos

### Metas de Ahorro
- ✅ Grid de metas con tarjetas
- ✅ Barras de progreso
- ✅ Indicador de meta lograda
- ✅ Mostrado de target, current, progress, deadline
- ✅ Eliminación de metas

### Reportes
- ✅ Selector de mes/año
- ✅ Resumen mensual (ingresos, gastos, balance)
- ✅ Desglose de gastos por categoría
- ✅ Desglose de ingresos por categoría
- ✅ Tabla de análisis por categoría
- ✅ Totales, conteo de transacciones, promedios

## Configuración de API

### Base URL
```
http://localhost:8080
```

### Endpoints Utilizados
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/transactions`
- `GET /api/transactions/type/{type}`
- `DELETE /api/transactions/{id}`
- `GET /api/budgets/current`
- `DELETE /api/budgets/{id}`
- `GET /api/goals`
- `DELETE /api/goals/{id}`
- `GET /api/reports/monthly`
- `GET /api/reports/categories`

### Interceptors
- ✅ Request: Agrega token Bearer si existe
- ✅ Response: Maneja 401 con redirect a login

## Estilos y Tema

### Variables CSS
- ✅ Sistema de diseño completo con variables CSS
- ✅ Soporte para tema claro y oscuro
- ✅ Colores semánticos (primary, secondary, muted, destructive)
- ✅ Variables para sidebar, charts, etc.

### Tailwind CSS
- ✅ Configuración completa
- ✅ Integración con shadcn/ui
- ✅ Fuente Geist Variable
- ✅ Animaciones CSS

## Próximos Pasos

### Componentes UI (Pendientes)
- Crear componentes base en `components/ui/`:
  - Button
  - Input
  - Card
  - Modal
  - Table
  - etc.

### Formularios (Pendientes)
- Crear componentes de formularios en `components/forms/`:
  - TransactionForm
  - BudgetForm
  - GoalForm
  - etc.

### Gráficos (Pendientes)
- Integrar librería de gráficos en `components/charts/`:
  - Recharts
  - Chart.js
  - etc.

### Características Adicionales (Pendientes)
- Crear transacciones
- Crear presupuestos
- Crear metas
- Editar transacciones
- Editar presupuestos
- Editar metas
- Contribuir a metas
- Filtros avanzados
- Búsqueda
- Paginación

## Comandos de Desarrollo

### Instalar Dependencias
```bash
cd src/frontend
pnpm install
```

### Iniciar Servidor de Desarrollo
```bash
pnpm dev
```

### Build para Producción
```bash
pnpm build
```

### Preview de Producción
```bash
pnpm preview
```

## Notas Importantes

1. **Backend**: El frontend está configurado para conectar al backend en `http://localhost:8080`
2. **Autenticación**: Usa mock JWT tokens del backend
3. **Estado**: La autenticación se maneja con Context API y localStorage
4. **Rutas**: React Router v7 con layouts separados
5. **Estilos**: Sistema de diseño completo con Tailwind CSS
6. **API**: Axios con interceptors para manejo de tokens y errores

## Integración con Backend

El frontend está completamente integrado con el backend de Persona 1:
- ✅ Usa los mismos endpoints del backend
- ✅ Maneja el formato `ApiResponse<T>` del backend
- ✅ Implementa manejo de errores del backend
- ✅ Usa los datos mock del backend para desarrollo

## Estructura Escalable

La estructura está diseñada para ser escalable:
- **Separación por dominio**: Cada módulo tiene su carpeta
- **Componentes reutilizables**: Carpeta components para compartir UI
- **Servicios centralizados**: Llamadas API separadas de componentes
- **Custom hooks**: Lógica reutilizable en hooks
- **Contextos**: Estado global donde es necesario
- **Utils**: Funciones puras reutilizables

## Documentación de Backend

Para más información sobre el backend, revisar:
- `docs/PERSONA_1_COMPLETADA.md`
- `http://localhost:8080/swagger-ui.html`
