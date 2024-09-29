import { ExportForm } from "@/lib/export/ExportForm";
import { AuthPortal } from "@/lib/auth/AuthPortal";
import { CollectionInfo } from "@/lib/collectioninfo/collectionInfo";

export default function Home() {
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        ACE
      </h1>
      <h2>A simple Altered Collection Exporter</h2>
      <CollectionInfo />
      <AuthPortal>
        <ExportForm />
      </AuthPortal>
    </>
  );
}
