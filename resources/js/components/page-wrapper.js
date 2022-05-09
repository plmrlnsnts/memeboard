export default function PageWrapper({ children, className }) {
  return <main className={`${className} min-h-full pt-14`}>{children}</main>
}
