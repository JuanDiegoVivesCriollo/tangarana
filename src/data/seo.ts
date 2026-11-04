import { SITE_URL } from "./site";

export interface SeoBreadcrumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: SeoBreadcrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };
}
