import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function QA() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-xl">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it safe?</AccordionTrigger>
        <AccordionContent>
          tl;dr: <b>Yes, absolutely safe.</b> Everything stays between your
          browser and altered. <br />
          We do <b>not</b> store any information related to you or your account,
          we do <b>not</b> modify or use your account in any other way than
          reading your cards.{" "}
          <a
            className="hover:underline"
            href="https://github.com/HCaupert/altered-collection-exporter"
          >
            Code is open-source.
          </a>{" "}
          if you want to make sure of it.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How does it work?</AccordionTrigger>
        <AccordionContent>
          You are giving access to your account, we use the altered API (what's
          behind the website) to find all your collection and store it in your
          browser. This is how we get such a responsive user experience.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          Will my collection be updated / tracked?
        </AccordionTrigger>
        <AccordionContent>
          Nope. You can consider My Altered Collection as an offline application
          once you made your export. If you want to update your collection,
          you'll have to export it again.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
