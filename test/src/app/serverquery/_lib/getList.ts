export default async function getList() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/posts", {
    next: {
      tags: ["lists", "item"],
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  // revalidateTag("item"); // 서버에 저장된 item 쿠키를 삭제
  // revalidatePath("/serverquery"); // serverquery 페이지의 모든 정보를 새로고침함

  return res.json();
}
