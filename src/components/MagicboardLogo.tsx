import Link from "next/link";
import Image from "next/image";

export default function MagicboardLogo() {
  return (
    <div className="text-center">
      <Link href="/">
        <a>
          <Image src="/svg/logo.svg" alt="me" width="200" height="200" />
        </a>
      </Link>
    </div>
  );
}
