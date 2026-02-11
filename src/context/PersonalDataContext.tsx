
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  personalData as defaultPersonalData,
  projectsData as defaultProjectsData,
  skillsData as defaultSkillsData,
  experienceData as defaultExperienceData,
  educationData as defaultEducationData,
  galleryData as defaultGalleryData,
  publicationsData as defaultPublicationsData,
  involvementData as defaultInvolvementData,
  socialIconMap
} from '@/lib/data';
import { LucideIcon } from 'lucide-react';
import { db } from '@/lib/firebase'; // Import the db instance
import { doc, onSnapshot, setDoc } from 'firebase/firestore'; // Import firestore functions

// Define types based on data structure
type Social = { id: string; name: string; url: string; icon: LucideIcon };
type PersonalDetails = Omit<typeof defaultPersonalData, 'socials'> & { socials: Social[] };
type Project = typeof defaultProjectsData[0];
type Skills = typeof defaultSkillsData;
type Experience = typeof defaultExperienceData[0];
type Education = typeof defaultEducationData[0];
type GalleryItem = typeof defaultGalleryData[0];
type Publication = typeof defaultPublicationsData[0];
type Involvement = typeof defaultInvolvementData[0];

export type PortfolioData = {
  details: PersonalDetails;
  projects: Project[];
  skills: Skills;
  experience: Experience[];
  education: Education[];
  gallery: GalleryItem[];
  publications: Publication[];
  involvement: Involvement[];
};

type PersonalDataContextType = {
  personalData: PortfolioData;
  setPersonalData: (data: Partial<PortfolioData>) => void;
};

const defaultData: PortfolioData = {
  details: defaultPersonalData,
  projects: defaultProjectsData,
  skills: defaultSkillsData,
  experience: defaultExperienceData,
  education: defaultEducationData,
  gallery: defaultGalleryData,
  publications: defaultPublicationsData,
  involvement: defaultInvolvementData,
}

const PersonalDataContext = createContext<PersonalDataContextType>({
  personalData: defaultData,
  setPersonalData: () => {},
});

export const usePersonalData = () => useContext(PersonalDataContext);

export const PersonalDataProvider = ({ children }: { children: ReactNode }) => {
  const [personalData, setPersonalDataState] = useState<PortfolioData>(defaultData);

  useEffect(() => {
    const docRef = doc(db, 'portfolios', 'user-data');

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        try {
          const parsedData = docSnap.data() as PortfolioData;

          // Re-hydrate icons for socials
          if (parsedData.details?.socials) {
            parsedData.details.socials.forEach((social: any) => {
              social.icon = socialIconMap[social.name] || socialIconMap['GitHub'];
            });
          }

          // Deep merge with defaults to prevent breakage if data structure changes
          const mergedData = {
            details: { ...defaultData.details, ...(parsedData.details || {}) },
            projects: parsedData.projects || defaultData.projects,
            skills: parsedData.skills || defaultData.skills,
            experience: parsedData.experience || defaultData.experience,
            education: parsedData.education || defaultData.education,
            gallery: parsedData.gallery || defaultData.gallery,
            publications: parsedData.publications || defaultData.publications,
            involvement: parsedData.involvement || defaultData.involvement,
          };

          setPersonalDataState(mergedData);
        } catch (e) {
          console.error("Failed to parse portfolio data from Firestore", e);
          setPersonalDataState(defaultData);
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document! Creating one with default data.");
        try {
          // Create a serializable version of the data without React components (icons)
          const serializableData = {
            ...defaultData,
            details: {
              ...defaultData.details,
              socials: defaultData.details.socials.map(({ icon, ...rest }) => rest),
            }
          };
          setDoc(doc(db, "portfolios", "user-data"), serializableData);
          setPersonalDataState(defaultData);
        } catch (e) {
          console.error("Failed to create portfolio data in Firestore", e);
        }
      }
    });
    
    return () => unsubscribe();
  }, []);

  const setPersonalData = async (newData: Partial<PortfolioData>) => {
    setPersonalDataState(prev => ({...prev, ...newData}));
    try {
      // Create a serializable version of the data without React components (icons)
      const serializableData = {...newData};
      if(newData.details){
        serializableData.details = {
          ...newData.details,
          socials: newData.details.socials.map(({ icon, ...rest }) => rest),
        }
      }
      
      await setDoc(doc(db, "portfolios", "user-data"), serializableData, { merge: true });
    } catch (e) {
        console.error("Failed to save portfolio data to Firestore", e);
    }
  };

  return (
    <PersonalDataContext.Provider value={{ personalData, setPersonalData }}>
      {children}
    </PersonalDataContext.Provider>
  );
};
