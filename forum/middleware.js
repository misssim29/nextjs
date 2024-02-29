import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  // 누가 list페이지에 접속시
  if (request.nextUrl.pathname === "/list") {
    console.log(new Date());
    console.log(request.headers.get("sec-ch-ua-platform"));
    return NextResponse.next();
  }

  //write에 접속했는데 login 데이터 없을때
  if (request.nextUrl.pathname.startsWith("/write")) {
    const session = await getToken({ req: request });
    console.log("세션", session);
    if (session == null) {
      return NextResponse.redirect(new URL("/api/auth/signin", request.url));
    }
  }

  // console.log(request.nextUrl); // 유저의 url
  // console.log(request.cookies); // 유저의 쿠키
  // console.log(request.headers); // 유저의 정보

  // NextResponse.next(); // 통과
  // NextResponse.redirect(); // 다른페이지로 강제이동
  // NextResponse.rewrite(); // 다른페이지로 이동(주소창은 냅둠)
}
