# Tauri + React + TypeScript

```bash
src/
├── adapters/                 # Adaptadores (implementaciones concretas)
│   └── api/
│       └── todo.adapter.ts   # Adaptador para comunicarse con el backend Tauri
│
├── application/              # Capa de aplicación (casos de uso)
│   └── usecases/
│       └── todo.usecase.ts   # Lógica de negocio para operaciones con todos
│
├── domain/                   # Capa de dominio (entidades y puertos)
│   ├── models/
│   │   └── todo.interface.ts # Definición de la entidad Todo
│   └── ports/
│       └── api/
│           └── todo.adapter.interface.ts # Puerto para adaptadores de API
│
├── infrastructure/           # Capa de infraestructura
│   ├── di/
│   │   └── container.ts      # Contenedor de inyección de dependencias
│   └── repositories/
│       └── todo.repository.ts # Implementación del repositorio
│
├── ui/                       # Capa de presentación
│   ├── components/           # Componentes de React
│   ├── pages/                # Páginas de la aplicación
│   └── store/                # Estado global con Zustand
│       └── todoStore.ts      # Store para gestionar el estado de los todos
│
└── src-tauri/                # Backend Tauri en Rust
    └── src/                  # Código Rust
        ├── adapters/         # Adaptadores en Rust
        ├── domain/           # Dominio en Rust
        └── services/         # Servicios en Rust
```

### Arquitectura Hexagonal

La arquitectura hexagonal, propuesta por Alistair Cockburn, busca crear aplicaciones donde:

1. La lógica de negocio está aislada de los detalles de implementación
2. Las dependencias apuntan hacia el interior (hacia el dominio)
3. Los componentes son fácilmente reemplazables e intercambiables

### Capas en este proyecto

1. Capa de Dominio

* Modelos: Define la interfaz ITodo que representa la entidad principal
* Puertos: Define la interfaz ITodoApi que especifica las operaciones que cualquier adaptador debe implementar

2. Capa de Aplicación

* Casos de Uso: Implementa TodoUseCase que contiene la lógica de negocio y orquesta las operaciones
* Depende únicamente de las interfaces definidas en el dominio, no de implementaciones concretas

3. Capa de Infraestructura

* Repositorios: Implementa TodoRepository que actúa como intermediario
* Inyección de Dependencias: El archivo container.ts gestiona la creación e inyección de dependencias

4. Capa de Adaptadores

* API: Implementa TodoApi que se comunica con el backend de Tauri
* Traduce las operaciones del dominio a llamadas específicas de la tecnología (Tauri)

5. Capa de UI

* Componentes: Implementa la interfaz de usuario con React
* Estado: Utiliza Zustand para la gestión del estado global

### ¿Cumple con la Arquitectura Hexagonal?

Sí, el proyecto cumple con los principios de la arquitectura hexagonal:

1. Separación de Responsabilidades: Cada capa tiene una responsabilidad bien definida.
2. Inversión de Dependencias: Las dependencias apuntan hacia el interior. Por ejemplo:
   * TodoUseCase depende de la interfaz ITodoApi, no de implementaciones concretas
   * TodoRepository implementa ITodoApi y depende de otra implementación de ITodoApi
3. Puertos y Adaptadores:
   * Puertos: Interfaces como ITodoApi que definen cómo se comunica el dominio con el exterior
   * Adaptadores: Implementaciones como TodoApi que conectan el sistema con tecnologías específicas
4. Testabilidad: La arquitectura facilita la prueba de cada componente de forma aislada mediante mocks.
5. Reemplazabilidad: Se podría reemplazar TodoApi por otra implementación (por ejemplo, para usar REST en lugar de Tauri) sin afectar la lógica de negocio.

### Flujo de Datos

El flujo de datos en la aplicación sigue este patrón:

1. UI (React) → Interactúa con el estado global (Zustand)
2. Estado (todoStore) → Llama a los casos de uso
3. Casos de Uso (TodoUseCase) → Orquestan operaciones a través del repositorio
4. Repositorio (TodoRepository) → Delega a la implementación concreta de API
5. API (TodoApi) → Se comunica con el backend de Tauri
