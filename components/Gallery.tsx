import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1470938017644-581bd9737a31?auto=format&fit=crop&w=1200&q=80",
    alt: "Close-up of string lights along a roofline edge",
  },
  {
    src: "https://images.unsplash.com/photo-1664289342468-fa99588e60b8?auto=format&fit=crop&w=1200&q=80",
    alt: "A house decorated with Christmas lights",
  },
  {
    src: "https://images.unsplash.com/photo-1544397838-37a35169ebf0?auto=format&fit=crop&w=1200&q=80",
    alt: "A pine tree wrapped in string lights beside a house",
  },
  {
    src: "https://images.unsplash.com/photo-1642184665676-636ffd0c3afe?auto=format&fit=crop&w=1200&q=80",
    alt: "A house covered in Christmas lights and decorations",
  },
  {
    src: "https://images.unsplash.com/photo-1730989886271-086aab6cb3ab?auto=format&fit=crop&w=1200&q=80",
    alt: "A lighted tree in the middle of a yard",
  },
  {
    src: "https://images.unsplash.com/photo-1664289340914-e88538627c02?auto=format&fit=crop&w=1200&q=80",
    alt: "A house with Christmas lights along the eaves",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-28 bg-ink py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Recent Work"
          title="A Look at Our Installs"
          description="Example installations shown for demo purposes — your real gallery would feature your own crew's work."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-square overflow-hidden rounded-2xl border border-white/10"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
