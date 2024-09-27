import { AuthPortal } from "@/app/AuthPortal";
import { ExportForm } from "@/app/ExportForm";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          ACE
        </h1>
        <h2>A simple Altered Collection Exporter</h2>
        <AuthPortal>
          <ExportForm />
        </AuthPortal>
      </main>
      <footer className="row-start-3 text-muted-foreground text-center">
        <p>
          This project is not related altered, and is distributed freely and
          openly.
        </p>
        <p>Code is open-source.</p>
      </footer>
    </div>
  );
}
