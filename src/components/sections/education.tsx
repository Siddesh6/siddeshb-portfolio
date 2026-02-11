'use client';

import { usePersonalData } from "@/context/PersonalDataContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function EducationSection() {
  const { personalData } = usePersonalData();
  const { education: educationData } = personalData;

  return (
    <section id="education" className="w-full bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Education</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My academic background and qualifications.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-2xl gap-6">
          {educationData.map((edu) => (
            <Card key={edu.id} className="shadow-md">
              <CardHeader className="flex flex-row items-center gap-4">
                <GraduationCap className="h-10 w-10 text-primary" />
                <div>
                  <CardTitle className="font-headline">{edu.title}</CardTitle>
                  <CardDescription>{edu.institution}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>Graduated: {edu.graduationDate}</p>
                {edu.honors && <p className="text-accent-foreground font-semibold">Honors: {edu.honors}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
