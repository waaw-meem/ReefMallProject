import Link from "next/link";

export default function NotFound() {
  return (
    <div className="main__wrapper">
      <div className="notFound__wrapper">
        <h6>Error</h6>
        <h2>4O4</h2>
        <span>Page Not Found.</span>
        <p>
          The page you were looking for does not exist. You may have mistyped
          the address or the page may have moved.
        </p>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}
