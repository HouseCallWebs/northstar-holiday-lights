import { Snowflake } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center bg-ink">
      <Container className="text-center">
        <Snowflake className="mx-auto h-10 w-10 text-gold-400" />
        <h1 className="mt-6 font-display text-4xl text-cream">Page Not Found</h1>
        <p className="mx-auto mt-3 max-w-md text-cream-dim/70">
          Looks like this page melted away. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/">Back to Home</Button>
          <Button href="/book" variant="secondary">
            Book an Install
          </Button>
        </div>
      </Container>
    </div>
  );
}
