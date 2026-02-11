'use client';

import { usePersonalData } from "@/context/PersonalDataContext";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function SkillsSection() {
  const { personalData } = usePersonalData();
  const { skills: skillsData } = personalData;

  return (
    <section id="skills" className="w-full bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Skills</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A collection of technologies I'm proficient with and the soft skills I bring to every project.
            </p>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Technical Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {skillsData.technical.map((category) => (
                <div key={category.id}>
                  <h3 className="font-semibold text-lg mb-3">{category.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="default">{skill}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Soft Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {skillsData.soft.map((skill) => (
                  <li key={skill.id} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{skill.skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
