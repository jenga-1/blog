import type { CategoryIcon } from "./icons";

export type { CategoryIcon } from "./icons";

export type CategoryDefinition = {
  label: string;
  description: string;
  icon: CategoryIcon;
  order: number;
};

export const categories = {
  programacion: {
    label: "Programación",
    description:
      "Lenguajes, frameworks, patrones, herramientas y conceptos que utilizo o voy aprendiendo.",
    icon: "code",
    order: 10,
  },

  arquitectura: {
    label: "Arquitectura",
    description:
      "Arquitecturas, patrones de diseño, organización de proyectos y decisiones técnicas.",
    icon: "architecture",
    order: 20,
  },

  seguridad: {
    label: "Seguridad",
    description:
      "Seguridad de aplicaciones, buenas prácticas, vulnerabilidades y aprendizaje defensivo.",
    icon: "security",
    order: 30,
  },

  autenticacion: {
    label: "Autenticación",
    description:
      "OAuth, sesiones, proveedores, autorización y diferentes formas de autenticar usuarios.",
    icon: "lock",
    order: 40,
  },
  design: {
    label: "Diseño",
    description:
      "Diseño de interfaces, experiencia de usuario, patrones y principios de diseño.",
    icon: "design",
    order: 50,
  },

  ideas: {
    label: "Ideas",
    description:
      "Conceptos, notas rápidas, referencias y cualquier idea que quiera conservar.",
    icon: "idea",
    order: 90,
  },
} as const satisfies Record<string, CategoryDefinition>;

export type CategoryKey = keyof typeof categories;

const keys = Object.keys(categories) as CategoryKey[];

if (keys.length === 0) {
  throw new Error("Debe existir al menos una categoría.");
}

export const categoryKeys = keys as [CategoryKey, ...CategoryKey[]];

export const categoryEntries = [...categoryKeys]
  .sort((a, b) => categories[a].order - categories[b].order)
  .map((key) => [key, categories[key]] as const);

export function getCategoryConfig(category: CategoryKey) {
  return categories[category];
}

export function getCategoryHref(category: CategoryKey): string {
  return `/${category}`;
}
