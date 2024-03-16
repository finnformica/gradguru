import { endpoints, postFetcher } from "utils/axios";

export function postFirebaseSupport(data: any) {
  const URL = endpoints.admin.support.firebase;
  return postFetcher([URL, {}, data]);
}

export function postConvertkitSubscription(data: any) {
  const URL = endpoints.admin.subscribe.convertkit;
  return postFetcher([URL, {}, data]);
}
