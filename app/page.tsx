import { CollectionContent } from "@/lib/card-table/collectionContent";
import { Suspense } from "react";

export default function App() {
  return (
    <Suspense>
      <CollectionContent />
    </Suspense>
  );
}
