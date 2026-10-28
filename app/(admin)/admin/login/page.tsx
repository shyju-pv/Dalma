import { signIn } from "../actions";

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h1>Sign in</h1><p className="sub">Staff only.</p>
      {error && <div className="msg err">{error === "forbidden" ? "This account is not an administrator." : "Email or password is incorrect."}</div>}
      <form className="f" action={signIn}>
        <div className="fld"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
        <div className="fld"><label htmlFor="password">Password</label><input id="password" name="password" type="password" autoComplete="current-password" required /></div>
        <button className="btn" type="submit">Sign in</button>
      </form>
    </div>
  );
}
