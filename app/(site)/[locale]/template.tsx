// A template re-mounts on every navigation, which gives the smooth page transition (.pt in globals.css).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="pt">{children}</div>;
}
