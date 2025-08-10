import Link from "next/link";

function MatchaFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background text-muted-foreground py-6">
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        {/* Left: Common Links */}
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <Link
            href="/about"
            className="hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="hover:text-foreground transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-foreground transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/help"
            className="hover:text-foreground transition-colors"
          >
            Help
          </Link>
          <Link
            href="/contact"
            className="hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Right: Copyright */}
        <div className="text-center md:text-right">
          &copy; {currentYear} Matcha. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default MatchaFooter;
