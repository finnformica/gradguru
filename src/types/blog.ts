export type BlogForm = {
  title: string;
  summary: string;
  tags: string | null;
};

export interface FirebaseBlog {
  imageId: string;
  slug: string;
  summary: string;
  title: string;
  author: string | null;
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
}
