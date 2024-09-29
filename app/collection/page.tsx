import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CollectionContent } from "@/lib/card-table/collectionContent";
import { Suspense } from "react";

export default function App() {
  return (
    <>
      <Button asChild className="absolute left-20 top-10 gap-2" variant="ghost">
        <Link href="/">
          <ArrowLeft /> Export
        </Link>
      </Button>
      <h1 className="mb-20 text-2xl font-extrabold">Your collection</h1>
      <Suspense>
        <CollectionContent />
      </Suspense>
    </>
  );
}
