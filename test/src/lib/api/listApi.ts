import authClient from "../axios";

export const listApi = () => authClient.get(`/posts`);
