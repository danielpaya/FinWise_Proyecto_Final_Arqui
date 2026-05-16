# Arquitectura Backend - FinWise AI

## Estructura Modular por Dominio/Feature

La estructura del backend está organizada por módulos funcionales, no por capas globales:

```
com.finwise.finwise_backend
│
├── users/              # Gestión de usuarios
├── transactions/       # Transacciones (ingresos/gastos)
├── categories/         # Categorías de transacciones
├── budgets/           # Presupuestos mensuales
├── goals/             # Metas de ahorro
├── reports/           # Reportes financieros
├── alerts/            # Alertas financieras
├── ai/                # Perfil financiero y recomendaciones
├── simulation/        # Simulaciones de inversión
├── shared/            # Componentes compartidos
├── config/            # Configuración de la aplicación
└── security/          # Seguridad y autenticación
```

Cada módulo contiene:
- `controller/` - Endpoints REST
- `service/` - Lógica de negocio
- `repository/` - Acceso a datos
- `dto/` - Data Transfer Objects
- `model/` - Entidades del dominio
- `mapper/` - Mapeo entre entidades y DTOs

## Relaciones JPA Recomendadas

### User (Entidad Principal)
- `@OneToMany` con Transaction (cascade = ALL, orphanRemoval = true)
- `@OneToMany` con Budget (cascade = ALL, orphanRemoval = true)
- `@OneToMany` con SavingGoal (cascade = ALL, orphanRemoval = true)
- `@OneToMany` con FinancialAlert (cascade = ALL, orphanRemoval = true)
- `@OneToOne` con FinancialProfile (cascade = ALL)

### Transaction (Abstracta)
- `@ManyToOne` con User (no cascade)
- `@ManyToOne` con Category (no cascade)
- `@Inheritance(strategy = InheritanceType.JOINED)` para Income y Expense

### Category
- `@OneToMany` con Transaction (no cascade)
- Sin relaciones bidireccionales para evitar ciclos

### Budget
- `@ManyToOne` con User (no cascade)
- `@ManyToOne` con Category (no cascade)

### SavingGoal
- `@ManyToOne` con User (no cascade)

### FinancialAlert
- `@ManyToOne` con User (no cascade)

### FinancialProfile
- `@OneToOne` con User (cascade = ALL)

### InvestmentSimulation
- Sin relaciones directas con User (entidad independiente para simulaciones)

## Clases Abstractas

### Transaction (Abstracta)
- Razón: Income y Expense comparten atributos comunes pero tienen comportamientos diferentes
- Beneficio: Permite polimorfismo y reutilización de código
- Estrategia JPA: `@Inheritance(strategy = InheritanceType.JOINED)`

## Comunicación Entre Módulos

### Principios de Bajo Acoplamiento

1. **Comunicación vía DTOs**: Los módulos solo deben exponer DTOs, no entidades
2. **Inyección de dependencias**: Usar `@Autowired` o constructor injection
3. **Interfaces**: Los repositories deben ser interfaces, no implementaciones concretas
4. **Eventos (Observer Pattern)**: Para comunicación asíncrona entre módulos

### Flujo de Comunicación Recomendado

```
Controller → Service → Repository
     ↓         ↓
   DTO      Entity
```

### Módulos que deben comunicarse:

- **transactions** ↔ **categories**: Para obtener categorías al crear transacciones
- **transactions** ↔ **users**: Para validar usuario y asociar transacciones
- **budgets** ↔ **categories**: Para asociar presupuestos a categorías
- **alerts** ↔ **transactions**: Para generar alertas cuando se exceden presupuestos
- **ai** ↔ **transactions**: Para analizar patrones financieros
- **ai** ↔ **users**: Para generar perfiles financieros
- **simulation** ↔ **ai**: Para usar perfiles de riesgo en simulaciones

## Patrones de Diseño

### 1. Strategy Pattern
**Uso recomendado**: Cálculo de intereses y rendimientos en simulaciones

```java
// Interface
public interface InvestmentStrategy {
    BigDecimal calculateReturn(BigDecimal amount, Integer years, RiskLevel risk);
}

// Implementaciones
public class ConservativeStrategy implements InvestmentStrategy { ... }
public class ModerateStrategy implements InvestmentStrategy { ... }
public class AggressiveStrategy implements InvestmentStrategy { ... }
```

**Beneficio**: Fácil agregar nuevas estrategias de inversión sin modificar código existente

### 2. Observer Pattern
**Uso recomendado**: Sistema de alertas financieras

```java
// Subject
public interface AlertSubject {
    void registerObserver(AlertObserver observer);
    void removeObserver(AlertObserver observer);
    void notifyObservers(FinancialEvent event);
}

// Observers
public class BudgetExceededObserver implements AlertObserver { ... }
public class GoalReachedObserver implements AlertObserver { ... }
```

**Beneficio**: Desacoplamiento entre generación de eventos y notificación de alertas

### 3. Factory Method Pattern
**Uso recomendado**: Creación de transacciones (Income/Expense)

```java
public interface TransactionFactory {
    Transaction createTransaction(TransactionCreateDTO dto);
}

public class IncomeFactory implements TransactionFactory { ... }
public class ExpenseFactory implements TransactionFactory { ... }
```

**Beneficio**: Centraliza la lógica de creación y facilita agregar nuevos tipos

### 4. Facade Pattern
**Uso recomendado**: Servicio de reportes complejos

```java
@Service
public class ReportFacade {
    private final TransactionService transactionService;
    private final BudgetService budgetService;
    private final GoalService goalService;
    
    public MonthlyReport generateMonthlyReport(Integer month, Integer year) {
        // Coordina múltiples servicios
    }
}
```

**Beneficio**: Simplifica interfaces complejas para el cliente

### 5. Adapter Pattern
**Uso recomendado**: Integración con APIs externas (futuro)

```java
public interface ExternalDataAdapter {
    ExternalData fetchExternalData(String userId);
}

public class BankDataAdapter implements ExternalDataAdapter { ... }
public class CreditCardDataAdapter implements ExternalDataAdapter { ... }
```

**Beneficio**: Permite integrar diferentes fuentes de datos sin modificar el código existente

## Ejemplos de Endpoints REST

### Users
```
POST   /api/users              - Crear usuario
GET    /api/users/{id}         - Obtener usuario por ID
PUT    /api/users/{id}         - Actualizar usuario
DELETE /api/users/{id}         - Eliminar usuario
GET    /api/users              - Listar usuarios (admin)
```

### Transactions
```
POST   /api/transactions       - Crear transacción
GET    /api/transactions/{id}  - Obtener transacción por ID
GET    /api/transactions       - Listar transacciones del usuario
PUT    /api/transactions/{id}  - Actualizar transacción
DELETE /api/transactions/{id}  - Eliminar transacción
GET    /api/transactions/income - Listar ingresos
GET    /api/transactions/expense - Listar gastos
```

### Categories
```
POST   /api/categories         - Crear categoría
GET    /api/categories         - Listar categorías
GET    /api/categories/{id}    - Obtener categoría por ID
PUT    /api/categories/{id}    - Actualizar categoría
DELETE /api/categories/{id}    - Eliminar categoría
```

### Budgets
```
POST   /api/budgets            - Crear presupuesto
GET    /api/budgets            - Listar presupuestos del usuario
GET    /api/budgets/{id}       - Obtener presupuesto por ID
PUT    /api/budgets/{id}       - Actualizar presupuesto
DELETE /api/budgets/{id}       - Eliminar presupuesto
GET    /api/budgets/current    - Presupuesto del mes actual
```

### Goals
```
POST   /api/goals              - Crear meta de ahorro
GET    /api/goals              - Listar metas del usuario
GET    /api/goals/{id}         - Obtener meta por ID
PUT    /api/goals/{id}         - Actualizar meta
DELETE /api/goals/{id}         - Eliminar meta
POST   /api/goals/{id}/contribute - Contribuir a meta
```

### Alerts
```
GET    /api/alerts             - Listar alertas del usuario
GET    /api/alerts/unread      - Listar alertas no leídas
PUT    /api/alerts/{id}/read   - Marcar alerta como leída
DELETE /api/alerts/{id}        - Eliminar alerta
```

### AI
```
GET    /api/ai/profile         - Obtener perfil financiero
POST   /api/ai/profile/generate - Generar perfil financiero
GET    /api/ai/recommendations - Obtener recomendaciones
```

### Simulation
```
POST   /api/simulation         - Crear simulación
GET    /api/simulation/{id}    - Obtener simulación por ID
GET    /api/simulation/compare - Comparar escenarios
```

## Distribución de Tareas (Equipo de 5 personas)

### Integrante 1: Core y Usuarios
**Responsabilidades:**
- Módulo `users` completo
- Módulo `security` (JWT, autenticación)
- Configuración de PostgreSQL
- Implementación de Spring Security
- Tests de integración para usuarios

**Entregables:**
- Sistema de registro/login
- Gestión de roles y permisos
- Configuración de base de datos
- Documentación de seguridad

### Integrante 2: Transacciones y Categorías
**Responsabilidades:**
- Módulo `transactions` completo
- Módulo `categories` completo
- Implementación de herencia JPA (Income/Expense)
- Validaciones de negocio
- Tests unitarios y de integración

**Entregables:**
- CRUD completo de transacciones
- Sistema de categorías
- Mapeo correcto de entidades
- Validaciones y excepciones

### Integrante 3: Presupuestos y Metas
**Responsabilidades:**
- Módulo `budgets` completo
- Módulo `goals` completo
- Lógica de cálculo de presupuestos
- Sistema de seguimiento de metas
- Implementación de Observer Pattern para alertas

**Entregables:**
- Sistema de presupuestos mensuales
- Metas de ahorro con progreso
- Alertas automáticas
- Dashboard de progreso

### Integrante 4: Alertas y Reportes
**Responsabilidades:**
- Módulo `alerts` completo
- Módulo `reports` completo
- Implementación de Observer Pattern
- Generación de reportes mensuales
- Sistema de notificaciones

**Entregables:**
- Sistema de alertas en tiempo real
- Reportes financieros detallados
- Exportación de datos (PDF, Excel)
- Análisis de gastos

### Integrante 5: IA y Simulaciones
**Responsabilidades:**
- Módulo `ai` completo
- Módulo `simulation` completo
- Implementación de Strategy Pattern
- Algoritmos de recomendación
- Simulaciones de inversión

**Entregables:**
- Perfil financiero automático
- Sistema de recomendaciones
- Simuladores de inversión
- Integración con patrones de diseño

## Próximos Pasos

1. **Integración de PostgreSQL**
   - Agregar dependencia `spring-boot-starter-data-jpa`
   - Configurar `application.properties`
   - Agregar anotaciones JPA a las entidades
   - Implementar repositories extendiendo `JpaRepository`

2. **Implementación de JWT**
   - Agregar dependencias de Spring Security JWT
   - Crear filtros de autenticación
   - Implementar `UserDetailsService`
   - Configurar endpoints de login/registro

3. **Implementación de Lógica de Negocio**
   - Completar services con lógica real
   - Implementar mappers (Entity ↔ DTO)
   - Agregar validaciones
   - Manejo de excepciones

4. **Tests**
   - Tests unitarios para services
   - Tests de integración para controllers
   - Tests de repositories
   - Cobertura mínima del 80%

5. **Documentación**
   - Swagger/OpenAPI
   - Documentación de endpoints
   - Guías de uso
   - Diagramas de secuencia

## Buenas Prácticas Adicionales

1. **Convenciones de Nombres**
   - Controllers: `{Entidad}Controller`
   - Services: `{Entidad}Service`
   - Repositories: `{Entidad}Repository`
   - DTOs: `{Entidad}DTO`, `{Entidad}CreateDTO`, `{Entidad}UpdateDTO`

2. **Validaciones**
   - Usar `@Valid` en controllers
   - Validaciones en DTOs con Bean Validation
   - Validaciones de negocio en services

3. **Manejo de Excepciones**
   - Usar excepciones personalizadas
   - GlobalExceptionHandler para manejo centralizado
   - Mensajes de error claros y descriptivos

4. **Logging**
   - Usar SLF4J con Logback
   - Niveles apropiados (DEBUG, INFO, WARN, ERROR)
   - Logging en puntos clave de la aplicación

5. **Configuración**
   - Usar `application.properties` para configuración
   - Perfiles para diferentes entornos (dev, test, prod)
   - Variables de entorno para datos sensibles
