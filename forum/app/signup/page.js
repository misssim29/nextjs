export default function SignUp() {
  return (
    <div className="p-20">
      <h4>회원가입</h4>
      <form action="/api/users" method="POST">
        <input name="id" placeholder="아이디를 입력해주세요" />
        <input
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <input name="name" placeholder="이름" />
        <button type="submit">가입</button>
      </form>
    </div>
  );
}
