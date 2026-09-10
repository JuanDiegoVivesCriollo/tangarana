export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  draft: boolean;
};

// Agregar aquí únicamente artículos reales y confirmados.
export const blogPosts: BlogPost[] = [];
