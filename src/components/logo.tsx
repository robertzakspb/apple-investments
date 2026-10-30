import Link from "next/link";

// Ascent A mark; colors come from the --logo-* tokens in globals.css so dark mode can recolor it.
export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link aria-label="Apple Investments home" className="logo" href="/" onClick={onClick}>
      <svg aria-hidden="true" viewBox="0 0 100 100">
        <rect className="logo-tile" height="100" rx="22" width="100" />
        <g transform="translate(8 8) scale(0.84)">
          <path className="logo-peak" d="M14 88 L50 12 L86 88" />
          <polyline className="logo-trend" points="22,68 40,56 52,62 76,40" />
          <path className="logo-arrow" d="M66 36 L82 35 L80 51 Z" />
        </g>
      </svg>
    </Link>
  );
}
