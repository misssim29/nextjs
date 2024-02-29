"use client";

export default async function Action() {
  function handleSubmit() {}

  return (
    <div>
      <form action={handleSubmit}>
        <input name="title" />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
