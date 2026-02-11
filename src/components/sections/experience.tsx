
'use client';

import { usePersonalData } from "@/context/PersonalDataContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";

export default function ExperienceSection() {
  const { personalData } = usePersonalData();
  const { experience: experienceData } = personalData;

  return (
    <section id="experience" className="w-full">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Work Experience</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My professional journey and the roles I've undertaken.
            </p>
          </div>
        </div>
        <div className="relative md:pl-8">
          <div className="absolute left-4 md:left-1/2 w-0.5 h-full bg-border -translate-x-1/2" aria-hidden="true" />
          <div className="space-y-8">
            {experienceData.map((exp, index) => (
              <div key={exp.id} className="relative flex items-start">
                 <div className="absolute left-4 -translate-x-1/2 bg-background p-1 rounded-full border">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="pl-12 md:pl-0 md:w-1/2 md:flex md:justify-start">
                   <div className={`w-full ${index % 2 === 0 ? 'md:pr-8 md:text-left' : 'md:pl-8 md:text-left'}`}>
                    <Card className={`text-left shadow-md transition-shadow hover:shadow-lg w-full ${index % 2 !== 0 ? 'md:translate-x-[calc(100%_+_4rem)]' : ''}`}>
                      <CardHeader>
                        <CardTitle className="font-headline text-xl">{exp.title}</CardTitle>
                        <CardDescription>{exp.company} &bull; {exp.dates}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 list-disc pl-5 text-sm text-muted-foreground">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i}>{resp}</li>
                          ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary">{tech}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
