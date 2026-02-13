"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface PortfolioData {
  details: any;
  projects: any[];
  skills: any;
  experience: any[];
  education: any[];
  involvement: any[];
  gallery: any[];
  publications: any[];
}

interface PersonalDataContextType {
  personalData: PortfolioData;
  setPersonalData: (data: PortfolioData) => Promise<void>;
  loading: boolean;
}

const defaultData: PortfolioData = {
  details: {
    name: "",
    title: "",
    avatarUrl: "",
    professionalSummary: "",
    personalTouch: "",
    uniqueSellingPoint: "",
    contact: {
      email: "",
      location: "",
    },
    socials: [],
  },
  projects: [],
  skills: {
    technical: [],
    soft: [],
  },
  experience: [],
  education: [],
  involvement: [],
  gallery: [],
  publications: [],
};

const PersonalDataContext = createContext<PersonalDataContextType | undefined>(
  undefined
);

export const PersonalDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [personalData, setPersonalDataState] =
    useState<PortfolioData>(defaultData);

  const [loading, setLoading] = useState(true);

  // Load data from Firestore on startup
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const docRef = doc(db, "portfolio", "main");

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPersonalDataState(docSnap.data() as PortfolioData);
      } else {
        console.log("No data found in Firestore, using default.");
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }

    setLoading(false);
  }

  // Save data to Firestore
  async function setPersonalData(data: PortfolioData) {
    try {
      const docRef = doc(db, "portfolio", "main");

      await setDoc(docRef, data);

      setPersonalDataState(data);

      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }

  return (
    <PersonalDataContext.Provider
      value={{
        personalData,
        setPersonalData,
        loading,
      }}
    >
      {children}
    </PersonalDataContext.Provider>
  );
};

export function usePersonalData() {
  const context = useContext(PersonalDataContext);

  if (!context) {
    throw new Error(
      "usePersonalData must be used within PersonalDataProvider"
    );
  }

  return context;
}
