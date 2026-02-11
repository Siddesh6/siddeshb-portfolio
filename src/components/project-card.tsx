import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  role: string;
  problem: string;
  technologies: string[];
  imageUrl: string;
  imageHint?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export default function ProjectCard({
  title,
  role,
  problem,
  technologies,
  imageUrl,
  imageHint,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader>
        <Image
          src={imageUrl}
          data-ai-hint={imageHint}
          alt={title}
          width={600}
          height={400}
          className="aspect-video w-full object-cover rounded-t-lg"
          unoptimized={imageUrl.startsWith('data:image')}
        />
        <CardTitle className="pt-4 text-2xl font-headline">{title}</CardTitle>
        <CardDescription>{role}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{problem}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      {(liveUrl || githubUrl) && (
        <CardFooter className="flex justify-end gap-2">
          {liveUrl && (
            <Button variant="ghost" asChild>
              <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                Live Demo <ArrowUpRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          )}
          {githubUrl && (
            <Button asChild>
              <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </Link>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
