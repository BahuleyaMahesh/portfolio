"use client";

import React from "react";
import Hero from "@/components/hero/Hero";
import SystemMap from "@/components/visualizations/SystemMap";
import FeaturedProjects from "@/components/projects/FeaturedProjects";
import ResearchSection from "@/components/research/ResearchSection";
import EngineeringSection from "@/components/engineering/EngineeringSection";
import CurrentlyBuilding from "@/components/engineering/CurrentlyBuilding";
import SkillsMatrix from "@/components/about/SkillsMatrix";
import AboutSection from "@/components/about/AboutSection";
import ContactSection from "@/components/contact/ContactSection";
import SectionHeading from "@/components/ui/SectionHeading";
import PageTransition from "@/components/layout/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      {/* 01 / HERO */}
      <Hero />

      {/* Main Page Containers */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-12 space-y-32 md:space-y-48">
        
        {/* 02 / WHAT I BUILD */}
        <section id="what-i-build" className="scroll-mt-24">
          <SectionHeading
            number="02"
            title="What I Build"
            subtitle="INTELLIGENT SYSTEMS CLASSIFICATION"
          />
          <SystemMap />
        </section>

        {/* 03 / SELECTED WORK */}
        <section id="selected-work" className="scroll-mt-24">
          <SectionHeading
            number="03"
            title="Selected Work"
            subtitle="FEATURED ENGINEERING PROTOTYPES"
          />
          <FeaturedProjects />
        </section>

        {/* 04 / RESEARCH */}
        <section id="research-summary" className="scroll-mt-24">
          <SectionHeading
            number="04"
            title="Research"
            subtitle="DATA SCIENCE & BIOLOGY"
          />
          <ResearchSection />
        </section>

        {/* 05 / ENGINEERING */}
        <section id="engineering-summary" className="scroll-mt-24">
          <SectionHeading
            number="05"
            title="Physical Systems"
            subtitle="VEHICLE TELEMETRY & CONTROLS"
          />
          <EngineeringSection />
        </section>

        {/* 06 / CURRENTLY BUILDING */}
        <section id="currently-building" className="scroll-mt-24">
          <SectionHeading
            number="06"
            title="Active R&D logs"
            subtitle="REAL-TIME DEVELOPMENT STATUS"
          />
          <CurrentlyBuilding />
        </section>

        {/* 07 / SKILLS */}
        <section id="skills-matrix" className="scroll-mt-24">
          <SectionHeading
            number="07"
            title="Expertise"
            subtitle="TECHNOLOGY STACKS & KNOWLEDGE DOMAINS"
          />
          <SkillsMatrix />
        </section>

        {/* 08 / ABOUT */}
        <section id="about-snippet" className="scroll-mt-24">
          <SectionHeading
            number="08"
            title="Philosophy"
            subtitle="THE PERSPECTIVE OF A BUILDER"
          />
          <AboutSection />
        </section>

        {/* 09 / CONTACT */}
        <section id="contact-snippet" className="scroll-mt-24 pb-12">
          <SectionHeading
            number="09"
            title="Connect"
            subtitle="ESTABLISH TELEMETRY TUNNEL"
          />
          <ContactSection />
        </section>

      </main>
    </PageTransition>
  );
}
