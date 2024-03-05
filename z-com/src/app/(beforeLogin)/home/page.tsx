import { QueryClient, dehydrate } from "@tanstack/react-query";

async function getPostRecommends() {
  const res = await fetch("", {
    next: {
      tags: ["posts", "recommends"],
    },
    cache: "no-store",
  });
}

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["post", "recomments"],
    queryFn: getPostRecommends,
  });
  const dehydratedState = dehydrate(queryClient);
  queryClient.getQueryData(["post", "recommends"]);
  return <div>홈</div>;
}
