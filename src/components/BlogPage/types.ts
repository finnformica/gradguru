export interface IBlogCard {
  author: string;
  created: number;
  imageId: string;
  slug: string;
  summary: string;
  tags: string;
  title: string;
}

export interface IBlogPage extends IBlogCard {
  content: string;
}
