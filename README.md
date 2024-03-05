## Next 패키지 생성

npx create-next-app@latest

## 개발용 실행

npm run dev

## 빌드

npm run build

## 실제 실행

npm run start

## route

list/page.js 만들면 주소/list로 접속시 그 페이지로 이동한다

만약 특정 layout을 줘서 cart페이지와 cart/payment페이지에 고정 레이아웃을 주고싶다면 layout.js를 만들어준다

## layout

layout.js는 페이지에 공통적으로 들어가는 레이아웃을 뜻하는데

폴더 안에 page.js 옆에 또 layout.js을 만들면 계층 구조의 레이아웃을 만들 수 있다.

## image 최적화

```
import Image from "next/image";
<Image
  src={require(`@/assets/food${index + 1}.jpg`)}
  alt={item}
  width={200}
  height={200}
/>

```

## (afterLogin) / (beforeLogin) & \_component

소괄호는 주소창에 관여를 안한다. 파일들을 구분짓거나 공통 레이아웃을 설정해줄 수 있다.

\_component는 주소에 관여를 안하는 오직 폴더 묶음용으로 쓰는 디렉토리 형식이다.

## 클라이언트 컴포넌트와 서버 컴포넌트

서버컴포넌트는 큼직큼직한 곳에, 클라이언트 컴포넌트는 동적 script가 구현되야하는곳에 배치하는것이 좋다

## 클라이언트 컴포넌트 선언

"use client"

## MongoDB

npm install mongodb

https://cloud.mongodb.com/v2/65dd73edb4e20234075e4d11#/clusters

서버코드는 서버클라이언트 안에서만 사용한다.

```
//util/database.js
import { MongoClient } from "mongodb";
const url =
  "mongodb+srv://admin:930209@next-test.9mvl1pm.mongodb.net/?retryWrites=true&w=majority&appName=next-test";
const options = { useNewUrlParser: true };
let connectDB;

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}
export { connectDB };

//컴포넌트
const client = await connectDB;
const db = client.db("forum");

let result = await db.collection("post").find().toArray();

```

## router

- client component 안에서만 사용 가능

import { useRouter } from "next/navigation";

뒤로가기는 router.back()

앞으로가기는 router.forward()

바뀐내용만 새로고침은 router.refresh()

페이지 미리로드는 router.prefetch()

usePathName(), useSearchParams()

## static rendering , dynamic rendering

static rendering이 되면 서버에서 정보를 한번만 가져오기때문에 다이나믹하게 정보 변경이 안된다
그래서 특정 페이지에서(정보가 바뀌는 페이지에서) 다이나믹렌더링 설정을 해주고 빌드한다.

```
export const dynamic = "force-dynamic";
```

## 캐싱

데이터를 캐싱에 담아둔다

```
  await fetch("/URL", { cache: "force-cache" }); //캐시에 저장한다
  await fetch("/URL", { cache: "no-store" }); //캐시에 저장하지 않는다
  await fetch("/URL", { next : {revalidate : 60} }); // 60초에 한번 캐시에 저장한다
```

fetch 없이 60초마다 캐싱에 담아주는 방법

```
export const revalidate = 60;
```

-> 그래서 메인화면같이 데이터가 많고 실시간 업뎃이 안되도되는곳은 revalidate를 줘서 캐싱을 통해 최적화해 로딩을 줄이고 데이터를 저장한다.
-> 리스트나 뷰페이지같은 실시간으로 업뎃이 되야하는 페이지는 다이나믹 렌더링을 사용

## Auth.js (session, token)

src/auth.ts

src/middleware.ts

아이디/비번로그인시 JWT(token) 강제로 사용해야함

먼저 github에 허락같은걸 받아야함

setting -> Developer settings -> OAuth Apps - app 생성

![Alt text](screenshot.png)

client Id : 52dcc4c0e23e2427ac53

password : 44c4e04becd67cb937463b7402f594b99bcb8218

### token

npm install next-auth

그러고 pages/api/auth/[...nextauth].js 생성

```
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "52dcc4c0e23e2427ac53",
      clientSecret: "44c4e04becd67cb937463b7402f594b99bcb8218",
    }),
  ],
  secret: "lucyjuyeonmisssim29",
};
export default NextAuth(authOptions);
```

### session 사용법

npm uninstall mongodb

npm install mongodb@4

npm install @next-auth/mongodb-adapter

```
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectDB } from "@/util/database";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "52dcc4c0e23e2427ac53",
      clientSecret: "44c4e04becd67cb937463b7402f594b99bcb8218",
    }),
  ],
  secret: "lucyjuyeonmisssim29",
  adaper: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
```

### 카카오로그인이나 네이버로그인 provider로 쉽게 추가할 수 있음

[참조](https://mycodings.fly.dev/blog/2023-06-07-how-to-nextjs-nextauth-with-kakao-login)

## loading.js

page.js 옆에 loading.js를 만들어주면

page가 호출되기전에 loading.js를 보여준다.

## error.js

page.js 옆에 error.js 만들고 use client 선언해줘야함

그러면 page.js가 제대로 호출이 안됐을때 error.js을 보여준다.

그리고 error.js는 root/app에 하나만 넣어두면 모든 페이지들이 error.js를 갖다 쓸 수 있다. (loading도 마찬가지)

다만 layout.js 에러는 체크를 못한다.

## not-found.js

404 페이지

## 로컬스토리지와 쿠키

### 로컬스토리지

```
localStorage.getItem("mode");
localStorage.setItem('key','value');
```

### cookie

let cookie = cookies().get("mode");
console.log(cookie.value);

```
//서버 컴포넌트
let cookie = cookies().get("mode");
console.log(cookie.value);

//클라이언트 컴포넌트
document.cookie = "mode=dark;";
console.log("darkmode");
```

## middleware

몰래 감청하는 기능

root 디렉토리에 middleware.js을 만든다.

```
console.log(request.nextUrl); // 유저의 url
console.log(request.cookies); // 유저의 쿠키
console.log(request.headers.get('정보')); // 유저의 정보

NextResponse.next(); // 통과
NextResponse.redirect(); // 다른페이지로 강제이동
NextResponse.rewrite(); // 다른페이지로 이동(주소창은 냅둠)
```

```
  if (request.nextUrl.pathname.startsWith("/write")) {
    return NextResponse.redirect(new URL("/list", request.url));
  }
```

이런식으로 특정 페이지에서 로그인 안하면 강제이동 시킬 수 있음

## redirect

서버 컴포넌트에서 써주는 router.replace()의 기능

```
import { redirect } from "next/navigation";
function Login(){
  redirect('/login');
}
```

## css (module)

모듈 css로 쓰는 방법은 page.module.css로 page.tsx 옆에 만들어준다

```
import styles from './page.module.css';

<div className={styles.list}></div>
```

이런식으로 class명을 부여한다.

### css module에서 vw 대신 dvw 사용하기

```
.container{
  width:100dvw;
  geight:100dvh;
}
```

## 패러렐 라우트

모달형태인데 주소가 바뀌는 경우 쓰는 라우트형식

@modal 안에 필요한 경로 폴더를 만들어주면 mdoal폴더 밖에 page와 통합되어 보여준다.

만약 폴더가 여러계층으로 되어있으면 defalut.tsx를 만들어 연결해줄 수 있다.

그러고 default.tsx에

```
export default function Default() {
  return null;
}
```

## useSelectedLayoutSegment() / useSelectedLayoutSegments()

현재 route값 구하기

```
import {useSelectedLayoutSegment} from "next/navigation"
const segment = useSelectedLayoutSegment();
```

## usePathname()

```
import {usePathname} from 'next/navigation';
const Path = usePathname();
if(Path === '/view'){
  return null;
}
```

## searchParams

### 서버 컴포넌트

주소가 z-com/view?id=3921ejwieje 일때 3921ejwieje 값 구하기

```
type Props = {
  searchParams : { id ?: string}
}
export default function Page({searchParams} : Props){
  const id = searchParams.id;
}
```

page쪽에서 받아서 컴포넌트에 props로 넘기면된다.

### 클라이언트 컴포넌트

```
const searchParams = useSearchParams();
const id = searchParams.get('id');
```

## dayjs

npm i dayjs

```
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

<span>{dayjs(new Date()).fromNow(true)}</span>
<span>{dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}</span>

```

## 부모가 클라이언트 컴포넌트인데 자식이 서버 컴포넌트일때

부모가 클라이언트 컴포넌트고 자식이 서버컴포넌트면 클라이언트컴포넌트에서 children으로 props로 보내줘야한다

```
// app/view/page.tsx
export default function ViewPage(){
  return(
    <article>
      <div>{data}</div>
    </article>
  )
}
```

이럴 경우 article같은 시맨틱태그는 서버컴포넌트에서 작동하지 않는다 하지만 article 안에 있는 data내용을 seo때문에 서버컴포넌트로 사용해야하는 경우

article 태그를 클라이언트 컴포넌트로 분리해줄 수 있다.

```
// app/_component/articleTag.tsx
export default function ArticleTag({children} : {children : ReactNode}){
  return(
    <article>
      {children}
    </article>
  )
}
//app/view/page.tsx
import ArticleTag from '../_component/articleTag.tsx';

export default function ViewPage(){
  return(
    <ArticleTag>
      <div>{data}</div>
    </ArticleTag>
  )
}
```

## 더미데이터 넣어주는 라이브러리

npm install --save-dev @faker-js/faker

```
import  {  fakerKO  as  faker  }  from  '@faker-js/faker' ;

export function createRandomUser(): User {
  return {
    userId: fakerKO.string.uuid(),
    username: fakerKO.internet.userName(),
    email: fakerKO.internet.email(),
    avatar: fakerKO.image.avatar(),
    password: fakerKO.internet.password(),
    birthdate: fakerKO.date.birthdate(),
    registeredAt: fakerKO.date.past(),
  };
}
export const USERS: User[] = fakerKO.helpers.multiple(createRandomUser, {
  count: 5,
});

```

## .env & .env.local

.env.local 파일은 개발중에만 적용된다. 개발중일땐 .env파일과 .env.local 파일이 같이 적용된다.

빌드할땐 .env파일만 실행

process.env.API_URL

## React-query

npm i @tanstack/react-query@5

npm i @tanstack/react-query-devtools@5 -D

RQProvide를 만들어 준 후 layout에서 감싼다.

client component에서 가져오는 방법

```
  const { data } = useQuery<User[]>({
    queryKey: ['users', 'followRecommends'],
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  })
```

staleTime 은 캐시 저장 시간으로 1분으로 저장시 1분동안 캐시가 저장되고 새로고침해도 데이터를 새로가져오지않는다 1분이 지나서 새로고침해야 새로가져온다

staleTime은 항상 gcTime보다 짧아야한다. gcTime은 데이터를 보관하고있는 기간

## 메타데이터 설정하기

```
import {Metadata} from 'next'
export const metadata:Metadata = {
  title : '타이틀',
  description : '홈'
}
```

메타데이터에 변수 넣어야할 경우

```
export async function generateMetadata({searchParams}: Props):Promise<Metadata>{
  return{
    title : `${searchParams.q}`,
    description : `${searchParams.q}
  }
}
```

## 인피니트 스크롤링

### intersection-observer

npm i react-intersection-observer

```
import {useInView} from "react-intersection-observer";

const { data, fetchNextPage, hasNextPage, isFetching } = prefetchInfiniteQuery({
  queryKey : ['posts','recommends'],
  queryFn : getPostRecommentds,
  initialPageParam : 0,
  getNextPageParam : (lastPage) => lastPage.at(-1)?.postId,
  staleTime : 60 * 1000,
  gcTime : 300 * 1000
});

const { ref , inView } = useInView({
  threshold : 0,
  delay : 0
});

useEffect(()=>{
  if(inView){
   !isFetching && hasNextPage && fetchNextPage();
  }
},[inView, iseFetching, hasNextPage, fetchNextPage]);

return(
  <>
    {data?.pages.map((page,i)=>(
      <Fragment key={i}>
        {page.map((post)=><Post key={post.postId} post={post} />)}
      </Fragment>
      <div ref={ref} style={ {height : 50 } }></div>
    ))}
  </>
)
```

## SCSS 설치

npm install -D sass

npm install -D typescript-plugin-css-modules

```
// tsconfig.json
{
  "compilerOptions": {
    "plugins": [{ "name": "typescript-plugin-css-modules" }]
  }
}
```

- vscode에서 사용할 경우 추가설정
  [참조](https://gildev.tistory.com/entry/Dev-Nextjs13-scss)

## redux toolkit과 react query 같이쓰기

npm install react-redux @reduxjs/toolkit @tanstack/react-query

redux toolkit은 기존 방식 그대로 갖다 쓰되 Provider만 밖으로 뺴서 use client 설정해준다음에 layout에서 children 사용해서 넣어주기

```
//provider.tsx
"use client";

import { store } from "./index";
import { Provider } from "react-redux";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

//layout.tsx
<ReduxProvider>{children}</ReduxProvider>
```

## use 어쩌고 ESLINT 오류날 경우

page 함수명 첫글자 대문자로해야함..
