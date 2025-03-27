<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { ref, computed } from "vue";

// Estado para el drawer móvil
const isDrawerOpen = ref(false);

// Estado para detectar scroll
const isScrolled = ref(false);

// Items de navegación
const items = ref<NavigationMenuItem[]>([
  {
    label: "Servicios Oncológicos",
    icon: "",
    children: [
      {
        label: "Quimioterapia",
        to: "/tratamientos/quimioterapia",
      },
      {
        label: "Radioterapia",
        to: "/tratamientos/radioterapia",
      },
      {
        label: "Cirugía Oncológica",
        to: "/tratamientos/cirugia",
      },
      {
        label: "Inmunoterapia",
        to: "/tratamientos/inmunoterapia",
      },

      {
        label: "Contacto",
        to: "/ubicaciones",
      },
      {
        label: "Sobre Nosotros",
        to: "/nosotros",
      },

      {
        label: "Nuevas Terapias",
        to: "/blog/nuevas-terapias",
      },
      {
        label: "Avances en Oncología",
        to: "/blog/avances",
      },
      {
        label: "Casos Clínicos",
        to: "/blog/casos-clinicos",
      },
      {
        label: "Publicaciones Científicas",
        to: "/blog/publicaciones",
      },
    ],
  },
  {
    label: "Contacto",
    to: "/contacto",
  },
  {
    label: "Para Profesionales",
    icon: "",
    children: [
      {
        label: "Equipo Médico",
        to: "/profesionales/equipo",
      },
      {
        label: "Ensayos Clínicos",
        to: "/profesionales/ensayos",
      },
    ],
  },
  {
    label: "Investigación y Educación",
    icon: "",
    children: [
      {
        label: "Ensayos Clínicos",
        to: "/investigacion/ensayos",
      },
      {
        label: "Publicaciones",
        to: "/investigacion/publicaciones",
      },
      {
        label: "Conferencias Médicas",
        to: "/investigacion/conferencias",
      },

      {
        label: "Guías para Pacientes",
        to: "/educacion/guias",
      },
      {
        label: "Videos Informativos",
        to: "/educacion/videos",
      },
      {
        label: "Charlas y Talleres",
        to: "/educacion/talleres",
      },
    ],
  },
  {
    label: "Noticias",
    to: "/noticias",
  },
]);

// Detectar scroll
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

// Abrir/cerrar drawer
const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

// Cerrar drawer
const closeDrawer = () => {
  isDrawerOpen.value = false;
};
</script>

<template>
  <div class="w-full">
    <!-- Navigation -->
    <header
      class="fixed top-0 right-0 left-0 z-50 h-20 border-b border-gray-200 bg-white/95 backdrop-blur-xl transition-shadow duration-300"
      :class="{ 'shadow-md': isScrolled }"
    >
      <div class="mx-auto h-full w-full px-4 lg:container lg:px-6">
        <div class="flex h-full items-center justify-between">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <a href="/" class="block">
              <div class="flex items-center">
                <NuxtImg
                  src="logo.png"
                  alt="Logo"
                  width="180"
                  height="40"
                  draggable="false"
                />
              </div>
            </a>
          </div>

          <!-- Desktop Navigation - Visible on md and up -->
          <div class="hidden md:block">
            <UNavigationMenu
              :items="items"
              :ui="{
                root: 'flex items-center gap-1',
                list: 'flex items-center gap-1',
                item: 'group relative',
                link: 'px-2.5 py-1.5 text-sm font-medium transition-all duration-200 hover:bg-gray-50 hover:text-primary rounded-md',
                linkLeadingIcon: 'w-4 h-4 mr-1.5',
                linkTrailing: 'w-4 h-4 ml-1.5 opacity-70',
                linkTrailingIcon: 'w-3.5 h-3.5 ml-1.5 opacity-70',
                arrow:
                  'absolute -top-2 left-4 h-4 w-4 rotate-45 border-l border-t border-gray-200 bg-white',
              }"
            />
          </div>

          <!-- Action Buttons - Visible on md and up -->
          <div class="hidden md:flex items-center gap-4">
            <a
              href="#"
              class="text-sm font-medium transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              Solicita una cita
            </a>
            <a
              href="#"
              class="rounded-full border border-gray-400 px-4 py-1.5 text-sm font-medium transition-all duration-300 hover:bg-primary hover:border-primary hover:text-white shadow-sm hover:shadow"
            >
              Iniciar Sesión
            </a>
          </div>

          <!-- Mobile Menu Button - Hidden on md and up -->
          <div class="md:hidden">
            <UButton
              icon="i-lucide-menu"
              variant="ghost"
              size="sm"
              @click="toggleDrawer"
              aria-label="Abrir menú"
            />
          </div>
        </div>
      </div>
    </header>
    <div class="h-20" />

    <!-- Mobile Drawer - Only for screens smaller than md -->
    <UDrawer
      v-model="isDrawerOpen"
      :ui="{
        overlay: 'fixed inset-0 bg-black/30 z-40',
        container: 'flex flex-col h-full',
        header:
          'flex items-center justify-between border-b border-gray-200 p-4 h-16',
        body: 'flex-1 overflow-auto p-4',
        footer: 'border-t border-gray-200 p-4',
      }"
    >
      <template #header>
        <div class="flex-shrink-0">
          <a href="/" class="block">
            <div class="flex items-center">
              <NuxtImg
                src="logo.png"
                alt="Logo"
                width="140"
                height="30"
                draggable="false"
              />
            </div>
          </a>
        </div>
        <UButton
          icon="i-lucide-x"
          variant="ghost"
          size="sm"
          @click="closeDrawer"
          aria-label="Cerrar menú"
        />
      </template>

      <div class="flex flex-col">
        <!-- Navegación móvil personalizada -->
        <UVerticalNavigation
          :links="items"
          :ui="{
            root: 'space-y-1',
            wrapper: 'space-y-1',
            base: 'group',
            link: 'flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors',
            linkActive: 'bg-gray-50 text-primary',
            linkInactive: 'text-gray-700 hover:bg-gray-50 hover:text-primary',
            label: 'truncate',
            icon: 'flex-shrink-0 w-4 h-4 mr-2',
            badge: 'ml-auto',
            divider: 'my-2 -mx-3 border-t border-gray-100',
          }"
        />

        <!-- Mobile Action Buttons -->
        <div class="mt-6 flex flex-col space-y-2 px-2">
          <a
            href="#"
            class="block rounded-md bg-primary/10 px-4 py-2.5 text-center text-sm font-medium transition-colors hover:bg-primary/20 text-primary border border-primary/20"
          >
            Solicita una cita
          </a>
          <a
            href="#"
            class="block rounded-md bg-primary px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-primary/90 shadow-sm"
          >
            Iniciar Sesión
          </a>
        </div>
      </div>
    </UDrawer>
  </div>
</template>

<style scoped>
/* Estilos adicionales para mejorar la apariencia */
:deep(.u-navigation-menu-dropdown) {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hacer los cards de apertura más pequeños */
:deep(.u-navigation-menu-dropdown) {
  padding: 0.5rem !important;
}

:deep(.u-navigation-menu-dropdown-item) {
  padding: 0.375rem 0.75rem !important;
  font-size: 0.8125rem !important;
}

:deep(.u-vertical-navigation-link) {
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
}
</style>
