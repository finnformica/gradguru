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
  author: string;
}

export interface IBlogCard extends FirebaseBlog {
  created: number;
  tags: string;
}

export interface IBlogPage extends IBlogCard {
  content: string;
}

export interface IAddBlogPost extends FirebaseBlog {
  content: string;
  tags: string | null;
}
