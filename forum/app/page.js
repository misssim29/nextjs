import Link from "next/link";
import { cookies } from "next/headers";

export default function Home() {
  let cookie = cookies().get("mode");
  console.log(cookie.value);

  return (
    <div>
      <Link href="/write">글쓰기</Link>
    </div>
  );
}
