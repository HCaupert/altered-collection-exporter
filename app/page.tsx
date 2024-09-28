import { AuthPortal } from "@/app/AuthPortal";
import { ExportForm } from "@/app/ExportForm";

export default function Home() {
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        ACE
      </h1>
      <h2>A simple Altered Collection Exporter</h2>
      <AuthPortal>
        <ExportForm />
      </AuthPortal>
    </>
  );
}
