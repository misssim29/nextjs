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
