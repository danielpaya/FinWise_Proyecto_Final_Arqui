# FinWise AI

# Integrantes

- Juan Camilo Gómez Bayona
- Daniel Sanchez Sotelo
- Jeronimo Infante Vega
- Daniel Felipe Pallares Kelin
- Samuel Guerrero Arcos


  
## Descripción
FinWise AI es un sistema inteligente de gestión financiera personal orientado a estudiantes universitarios y jóvenes adultos. El sistema permite registrar ingresos, gastos, presupuestos y metas de ahorro, ofreciendo además herramientas de análisis financiero y orientación educativa mediante un asistente inteligente.

El proyecto busca ayudar a los usuarios a comprender mejor sus hábitos financieros, mejorar el control de sus recursos y fortalecer conceptos relacionados con ahorro, riesgo financiero e inversión a través de simulaciones hipotéticas y reportes comprensibles.

---


  

# Objetivo del Proyecto

Desarrollar un sistema de información que permita a estudiantes universitarios gestionar sus ingresos, gastos, presupuestos y metas de ahorro, con el fin de mejorar su control financiero personal y fortalecer su educación en inversión mediante análisis inteligente, simulaciones y recomendaciones educativas basadas en su perfil financiero.

---

# Problema que aborda

Muchos estudiantes universitarios manejan ingresos limitados o variables y no cuentan con herramientas claras para entender cómo administran su dinero. Aunque algunas personas registran sus gastos, normalmente no reciben análisis útiles que les permitan tomar mejores decisiones financieras.

Además, existe una brecha importante de educación financiera relacionada con conceptos como:
- Presupuesto
- Ahorro
- Fondo de emergencia
- Perfil de riesgo
- Diversificación
- Interés compuesto

FinWise AI busca resolver este problema mediante una solución enfocada en:
1. Organización financiera personal.
2. Interpretación de datos financieros.
3. Generación de reportes y alertas.
4. Simulaciones educativas de ahorro e inversión.

---

# Alcance del Sistema

## Funcionalidades Incluidas
- Registro e inicio de sesión de usuarios.
- Registro de ingresos y gastos.
- Clasificación de transacciones por categorías.
- Gestión de presupuestos mensuales.
- Gestión de metas de ahorro.
- Generación de reportes financieros.
- Alertas financieras automáticas.
- Clasificación del perfil financiero y de riesgo.
- Asistente inteligente con orientación educativa.
- Simulaciones hipotéticas de inversión y ahorro.

## Funcionalidades Excluidas
- Ejecución real de inversiones.
- Transferencias de dinero.
- Compra o venta de activos financieros.
- Integración obligatoria con bancos en la primera versión.
- Gestión contable empresarial o tributaria.

---

# Actores del Sistema

## Usuario
Estudiante o joven adulto que registra información financiera, consulta reportes y utiliza el asistente educativo.

## Administrador
Encargado de gestionar configuraciones generales, categorías y contenido educativo base.

## Asistente IA
Componente que analiza hábitos financieros y genera recomendaciones educativas, alertas y simulaciones.

## Servicio Externo Financiero
Fuente futura de indicadores financieros y datos de referencia.

---

# Módulos Principales

- Usuarios
- Transacciones
- Categorías
- Presupuestos
- Metas de ahorro
- Reportes
- Alertas
- Asistente IA
- Simulación financiera

---

# Requerimientos Funcionales Principales

| ID | Funcionalidad |
|---|---|
| RF-001 | Registro de usuario |
| RF-002 | Inicio de sesión |
| RF-003 | Registro de ingresos y gastos |
| RF-004 | Gestión de categorías |
| RF-005 | Gestión de presupuestos |
| RF-006 | Gestión de metas de ahorro |
| RF-007 | Generación de reportes |
| RF-008 | Alertas financieras |
| RF-009 | Asistente financiero inteligente |
| RF-010 | Simulación de inversión |

---

# Reglas de Negocio Relevantes

- Una transacción debe tener monto, fecha y categoría.
- Las metas de ahorro requieren monto objetivo y fecha límite.
- El sistema genera alertas cuando un presupuesto supera el 90% de consumo.
- Un presupuesto se marca como excedido al superar el 100%.
- El asistente IA no puede recomendar compra o venta de activos específicos.
- Las simulaciones solo se realizan si existe capacidad de ahorro positiva.

---

# Modelo UML

El sistema se organiza alrededor de las siguientes clases principales:

- Usuario
- CuentaFinanciera
- Transaccion
- Ingreso
- Gasto
- Categoria
- Presupuesto
- MetaAhorro
- AlertaFinanciera
- AsistenteIA
- PerfilFinanciero
- SimulacionInversion

El modelo utiliza relaciones de:
- Composición
- Asociación
- Dependencia
- Herencia

---

# Patrones de Diseño Aplicados

## Strategy
Permite variar las estrategias de recomendación según el perfil financiero del usuario.

## Observer
Desacopla la actualización de módulos cuando ocurre una nueva transacción.

## Factory Method
Centraliza la creación de diferentes tipos de reportes financieros.

## Facade
Simplifica el acceso al subsistema inteligente.

## Adapter
Facilita futuras integraciones con APIs financieras externas.

---

# Atributos de Calidad

| Atributo | Propósito |
|---|---|
| Security | Protección de datos financieros y personales |
| Usability | Facilidad de uso y comprensión |
| Maintainability | Facilidad de modificación y escalabilidad |
| Performance | Respuesta rápida del sistema |
| Explainability | Explicación clara de alertas y recomendaciones |

## Atributo Dominante
El atributo principal del sistema es **Security**, debido al manejo de información financiera sensible.

---

# Arquitectura Propuesta

## Estilo Arquitectónico Inicial
El sistema se plantea como un **monolito modular**, organizado internamente por módulos independientes.

## Evolución Arquitectónica
La arquitectura contempla una evolución gradual hacia:
1. Monolito modular inicial.
2. Procesamiento asíncrono mediante eventos.
3. Arquitectura orientada a servicios o microservicios parciales.

---


# Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React |
| Backend | Spring Boot |
| Base de datos | PostgreSQL |
| IA y análisis | Python |
| Mensajería futura | RabbitMQ |
| Infraestructura | Docker |
| CI/CD | GitHub Actions |
| Control de versiones | Git + GitHub |

---

# Estructura del Proyecto

```text
finwise-ai/
│
├── README.md
├── docs/
├── backend/
├── frontend/
├── ai-service/
├── database/
└── docker/
