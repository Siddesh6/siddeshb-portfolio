'use client';

import Image from "next/image";
import { usePersonalData } from "@/context/PersonalDataContext";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function GallerySection() {
  const { personalData } = usePersonalData();
  const { gallery: galleryData } = personalData;

  return (
    <section id="gallery" className="w-full bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">
              Gallery & Achievements
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A collection of my certifications and memorable moments of achievement.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {galleryData.map((item) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <Card className="overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      data-ai-hint={item.imageHint}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      unoptimized={item.imageUrl.startsWith('data:image')}
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg truncate font-headline">{item.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="font-headline">{item.title}</DialogTitle>
                  <DialogDescription>{item.description}</DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    data-ai-hint={item.imageHint}
                    width={1200}
                    height={800}
                    className="w-full aspect-video object-contain rounded-md"
                    unoptimized={item.imageUrl.startsWith('data:image')}
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
