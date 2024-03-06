import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { revalidatePath, revalidateTag } from "next/cache";
import QueryList from "./_component/List";
import getList from "./_lib/getList";

export default async function ServerQueryPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["lists", "item"],
    queryFn: getList,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <QueryList />
      </HydrationBoundary>
    </>
  );
}
