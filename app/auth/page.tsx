import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AuthPage() {
  return (
    <>
      <Button asChild className="absolute left-20 top-20" variant="ghost">
        <Link href="/">
          <ArrowLeft />
        </Link>
      </Button>
      <h1 className="scroll-m-20 text-lg tracking-tight lg:text-2xl">
        How to get my auth ?
      </h1>
      <ul className="list-decimal space-y-2">
        <li>
          Go to the{" "}
          <Link
            href="https://www.altered.gg/cards"
            target="_blank"
            className="underline hover:no-underline"
          >
            Altered website,
          </Link>{" "}
          sign in and go to your collection
        </li>
        <li>
          Right click anywhere on the page, and select{" "}
          <span className="italic">inspect</span>
        </li>
        <li>
          Head over the the <span className="italic">Network</span> tab
        </li>
        <li>
          In the search bar, type <span className="italic">'api.altered'</span>
        </li>
        <li>
          In the request table:
          <ul className="list-disc ml-6">
            <li>
              Select any item.{" "}
              <span className="text-muted-foreground">
                If nothing shows up, refresh your page.
              </span>
            </li>
            <li>
              Find the <span className="italic">Request Headers </span> section
            </li>
            <li>
              Look for the <span className="italic">Authorization</span> header
            </li>
            <li>Copy it's value, and that's it!</li>
          </ul>
        </li>
        <li>
          You can know hit the '<b>+</b>' button again in the navbar
        </li>
      </ul>
      <Image
        src="images/auth-tutorial.png"
        alt="auth-tutorial"
        width="1200"
        height="300"
        className="object-cover rounded-lg"
      />
    </>
  );
}
