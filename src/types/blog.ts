export type IBlog = {
  title: string;
  summary: string;
  tags: string | null;
  blogHeroPhoto: File | null;
  content: string;
};

export interface FirebaseBlog {
  imageId: string;
  slug: string;
  summary: string;
  title: string;
  author: string | null;
  // readTime: number | null; // in minutes
}

export interface IBlogCard extends FirebaseBlog {
  created: number;
  tags: string;
}

export interface IBlogPage extends IBlogCard {
  content: string;
}

export interface ICreateBlogPost extends FirebaseBlog {
  content: string;
  tags: string | null;
  created: number;
}
