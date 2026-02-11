
'use client';

import { useState } from 'react';
import Header from '@/components/header';
import ProjectsSection from '@/components/sections/projects';
import SkillsSection from '@/components/sections/skills';
import ExperienceSection from '@/components/sections/experience';
import EducationSection from '@/components/sections/education';
import ContactSection from '@/components/sections/contact';
import Footer from '@/components/footer';
import GallerySection from '@/components/sections/gallery';
import PublicationsSection from '@/components/sections/publications';
import AboutSection from '@/components/sections/about';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import InvolvementSection from '@/components/sections/involvement';

export default function Home() {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1">
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <InvolvementSection />
        <PublicationsSection />
        
        {!showGallery ? (
          <section id="gallery" className="w-full py-20 bg-secondary">
            <div className="container text-center">
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl mb-4">
                View My Gallery
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed mb-8">
                Take a look at my collection of certifications, awards, and memorable achievements.
              </p>
              <Button size="lg" onClick={() => setShowGallery(true)}>
                <Eye className="mr-2 h-5 w-5" />
                Show Gallery
              </Button>
            </div>
          </section>
        ) : (
          <GallerySection />
        )}

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

    