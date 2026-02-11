'use client';

import { usePersonalData } from "@/context/PersonalDataContext";
import Image from "next/image";

export default function AboutSection() {
  const { personalData } = usePersonalData();
  const { details } = personalData;

  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex items-center justify-center">
             <Image
              src={details.avatarUrl || "https://placehold.co/600x600.png"}
              data-ai-hint={details.avatarHint}
              alt={details.name}
              width={300}
              height={300}
              className="rounded-full object-cover aspect-square shadow-2xl"
              unoptimized={details.avatarUrl?.startsWith('data:image')}
            />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Hi, I&apos;m <span className="text-primary">{details.name}</span>
                </h1>
                <h2 className="text-xl md:text-2xl font-medium text-muted-foreground">{details.title}</h2>
            </div>
            <p className="max-w-[600px] text-muted-foreground md:text-lg">
              {details.professionalSummary}
            </p>
            <p className="max-w-[600px] text-muted-foreground md:text-lg">
              {details.uniqueSellingPoint}
            </p>
             <p className="max-w-[600px] text-muted-foreground md:text-lg">
              {details.personalTouch}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
