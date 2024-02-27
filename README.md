## Next 패키지 생성

npx create-next-app@latest

## 실행

npm run dev

## route

list/page.js 만들면 주소/list로 접속시 그 페이지로 이동한다

만약 특정 layout을 줘서 cart페이지와 cart/payment페이지에 고정 레이아웃을 주고싶다면 layout.js를 만들어준다

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
