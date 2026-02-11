
'use client';

import { usePersonalData } from "@/context/PersonalDataContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function PublicationsSection() {
  const { personalData } = usePersonalData();
  const { publications: publicationsData } = personalData;

  return (
    <section id="publications" className="w-full bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Publications</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of my published articles and journal papers.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8">
          {publicationsData.map((pub) => (
            <Card key={pub.id} className="shadow-md flex flex-col md:flex-row overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="md:w-1/3 relative aspect-[3/2] md:aspect-auto">
                 <Image
                    src={pub.imageUrl}
                    alt={pub.title}
                    data-ai-hint={pub.imageHint}
                    layout="fill"
                    className="object-cover"
                    unoptimized={pub.imageUrl.startsWith('data:image')}
                  />
              </div>
              <div className="flex flex-col justify-between p-6 md:w-2/3">
                <div>
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="font-headline text-xl">{pub.title}</CardTitle>
                    <CardDescription>{pub.journal} &bull; {pub.date}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-sm text-muted-foreground">{pub.summary}</p>
                  </CardContent>
                </div>
                <CardFooter className="p-0 mt-4 flex justify-end">
                   {pub.url && (
                    <Button asChild>
                      <Link href={pub.url} target="_blank" rel="noopener noreferrer">
                        Read Article <ArrowUpRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
