src/
├── domain/                # Capa de Dominio
│   ├── models/            # Modelos de entidad puros
│   │   └── user.model.ts
│   └── interfaces/        # Interfaces de contratos
│       └── user-repository.interface.ts
│
├── application/           # Capa de Aplicación
│   ├── use-cases/         # Casos de uso
│   │   └── user/
│   │       ├── create-user.use-case.ts
│   │       └── get-users.use-case.ts
│   └── dtos/              # Objetos de Transferencia de Datos
│       └── user-dto.ts
│
├── infrastructure/        # Capa de Infraestructura
│   ├── repositories/      # Implementaciones de repositorios
│   │   └── user-repository.impl.ts
│   ├── mappers/           # Mapeadores de datos
│   │   └── user-mapper.ts
│   └── data-sources/      # Fuentes de datos
│       └── user-api-datasource.ts
│
├── presentation/          # Capa de Presentación
│   ├── components/        # Componentes de UI
│   │   └── users/
│   │       ├── UserForm.vue
│   │       └── UserList.vue
│   ├── stores/            # Stores de estado
│   │   └── user.store.ts
│   └── composables/       # Hooks personalizados
│       └── use-user-form.ts
│
└── shared/                # Recursos compartidos
    ├── utils/             # Utilidades
    │   └── validation.ts
    └── constants/         # Constantes
        └── app-constants.ts
