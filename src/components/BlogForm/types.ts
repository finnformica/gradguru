export interface BlogCardState {
  author: string;
  date: string;
  body: string;
  tags?: string;
  read_time: string;
}

export const EmptyBlogCard = {
  author: "",
  date: "",
  body: "",
  tags: "",
  read_time: "",
};
