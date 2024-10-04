"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useExportCollection } from "@/lib/altered/getCollection";
import { ExportForm } from "@/lib/export/ExportForm";
import { useEffect, useState } from "react";
import { db } from "@/lib/db/db";
import { useLiveQuery } from "dexie-react-hooks";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

function useCheckEmpty(openDialog: () => void) {
  const empty = useLiveQuery(() => db.cards.count()) === 0;

  async function checkDb() {
    const count = await db.cards.count();
    if (count === 0) openDialog();
  }

  useEffect(() => {
    checkDb();
  }, []);

  return { empty };
}

export function NewExportButton() {
  const { setAuth } = useAuth();

  const { mutate } = useExportCollection();
  const [open, setOpen] = useState(false);
  const { empty } = useCheckEmpty(() => setOpen(true));
  const router = useRouter();

  function createExport({
    locale,
    bearer,
  }: {
    locale: string;
    bearer: string;
  }) {
    setAuth(bearer);
    mutate({ locale });
    setOpen(false);
    router.push("/");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(empty && "animate-wiggle")}
          variant="ghost"
          size="icon"
        >
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {empty ? "Welcome to MyAltered" : "Making a new export"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className={cn(empty && "text-foreground leading-8")}>
          {empty && (
            <>
              Looks like it's your first time here <br />
              First things first, let's create an export. <br />
            </>
          )}
          To create an export, you'll first need{" "}
          <Link
            href="/auth"
            className={cn("underline hover:no-underline", empty && "font-bold")}
            onClick={() => setOpen(false)}
          >
            your auth.
          </Link>
          <br />
        </DialogDescription>

        <ExportForm createExport={createExport} empty={empty} />
      </DialogContent>
    </Dialog>
  );
}
