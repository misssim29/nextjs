"use client";

export default function Write() {
  return (
    <div className="p-20">
      <h4>글작성</h4>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="글제목" />
        <input name="content" placeholder="글내용" />
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            let file = e.target.files[0];
            let filename = encodeURIComponent(file.name);
            let res = await fetch("/api/post/image?file=" + filename);
            res = await res.json();

            //S3 업로드
            const formData = new FormData();
            Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
              formData.append(key, value);
            });
            let 업로드결과 = await fetch(res.url, {
              method: "POST",
              body: formData,
            });
            console.log(업로드결과);

            if (업로드결과.ok) {
              setSrc(업로드결과.url + "/" + filename);
            } else {
              console.log("실패");
            }
          }}
        />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
