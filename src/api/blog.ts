import { endpoints, postFetcher } from "@/utils/axios";

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

export function postBlog(id: string | null, data: any) {
  const URL = endpoints.admin.blogs.blog(id);
  console.log(URL);
  return postFetcher([URL, {}, data]);
}
