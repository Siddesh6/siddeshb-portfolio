
'use client';

import { usePersonalData } from "@/context/PersonalDataContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function InvolvementSection() {
  const { personalData } = usePersonalData();
  const { involvement: involvementData } = personalData;

  if (!involvementData?.length) return null;

  return (
    <section id="involvement" className="w-full">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Organizations & Involvement</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My roles and contributions in technical and campus organizations.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-4xl gap-6">
          {involvementData.map((item) => (
            <Card key={item.id} className="shadow-md">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                   <div className="bg-primary/10 p-2 rounded-full">
                        <Users className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline">{item.title}</CardTitle>
                </div>
                <CardDescription>{item.role} &bull; {item.dates}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

    