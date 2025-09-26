import React from 'react';
import { Metadata } from 'next';
import HeroSection from '@/components/sections/hero-section';
import CategorySection from '@/components/sections/category-section';
import {
  DollarSign,
  Shirt,
  GraduationCap,
  Home,
  Heart,
  Laptop
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Donare - Connecting Hearts, Changing Lives',
  description: 'A donation platform connecting donors with people in need. Share resources, support communities, and make a difference through the power of giving.',
  keywords: 'donation, charity, community support, financial aid, clothing donation, education support, medical assistance',
  openGraph: {
    title: 'Donare - Connecting Hearts, Changing Lives',
    description: 'A donation platform connecting donors with people in need.',
    type: 'website',
    url: 'https://donare.org',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Donare - Donation Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Donare - Connecting Hearts, Changing Lives',
    description: 'A donation platform connecting donors with people in need.',
    images: ['/images/og-image.jpg']
  }
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Money Section */}
      <CategorySection
        id="money"
        title="Financial Support"
        description="Financial assistance platform with transparent approval process. Income verification required with maximum assistance limits based on family size. Full transparency for medical emergencies, education support, and urgent family needs. All transactions tracked and publicly auditable."
        backgroundImage="/images/money-bg.jpg"
        icon={<DollarSign className="h-8 w-8" />}
        primaryCTA="Request Financial Aid"
        secondaryCTA="Donate Money"
        primaryHref="/money/request"
        secondaryHref="/money/donate"
        colorScheme="green"
        features={[
          "Transparent approval process with clear criteria",
          "Income verification for fair distribution",
          "Maximum assistance limits based on family size",
          "Emergency fund for urgent medical needs",
          "Full transaction tracking and public auditing"
        ]}
        stats={[
          { label: "Families Helped", value: "2,847" },
          { label: "Total Donated", value: "$1.2M" },
          { label: "Success Rate", value: "94%" },
          { label: "Avg. Response", value: "24hrs" }
        ]}
      />

      {/* Clothes Section */}
      <CategorySection
        id="clothes"
        title="Clothing Donations"
        description="Clothing donation system with four quality categories: Never Used (new with tags), Gently Used (excellent condition), Moderately Used (good condition), Widely Used (acceptable wear). Targeted distribution for children, women, men, and elderly. Strict no-damage policy. Anti-resale tracking system implemented."
        backgroundImage="/images/clothes-bg.jpg"
        icon={<Shirt className="h-8 w-8" />}
        primaryCTA="Donate Clothes"
        secondaryCTA="Request Clothing"
        primaryHref="/clothes/donate"
        secondaryHref="/clothes/request"
        colorScheme="purple"
        features={[
          "Four quality categories for fair distribution",
          "Targeted distribution by demographics",
          "Strict quality control and no-damage policy",
          "Anti-resale tracking system",
          "Seasonal clothing drives and collections"
        ]}
      />

      {/* Education Section */}
      <CategorySection
        id="education"
        title="Educational Resources"
        description="Educational resource sharing including NCERT textbooks (all grades), reference materials, notebooks, and stationery supplies. Free distribution for verified students with anti-resale digital tracking. Priority given to rural and underprivileged areas."
        backgroundImage="/images/education-bg.jpg"
        icon={<GraduationCap className="h-8 w-8" />}
        primaryCTA="Donate Books"
        secondaryCTA="Request Educational Materials"
        primaryHref="/education/donate"
        secondaryHref="/education/request"
        colorScheme="blue"
        features={[
          "Complete NCERT textbook collection",
          "Reference materials and study guides",
          "Notebooks and stationery supplies",
          "Digital tracking to prevent resale",
          "Priority for rural and underprivileged students"
        ]}
        stats={[
          { label: "Students Helped", value: "15,432" },
          { label: "Books Donated", value: "89,234" },
          { label: "Schools Reached", value: "567" },
          { label: "Rural Coverage", value: "78%" }
        ]}
      />

      {/* Household Section */}
      <CategorySection
        id="household"
        title="Household Essentials"
        description="Essential household items including furniture (beds, sofas, tables), kitchenware, and appliances for underprivileged families. Quality inspection required. Distribution based on family size and verified need assessment."
        backgroundImage="/images/household-bg.jpg"
        icon={<Home className="h-8 w-8" />}
        primaryCTA="Donate Household Items"
        secondaryCTA="Request Home Essentials"
        primaryHref="/household/donate"
        secondaryHref="/household/request"
        colorScheme="orange"
        features={[
          "Furniture: beds, sofas, tables, and storage",
          "Kitchen essentials and cooking appliances",
          "Quality inspection for all donated items",
          "Distribution based on family size assessment",
          "Delivery and setup assistance available"
        ]}
      />

      {/* Medical Section */}
      <CategorySection
        id="medical"
        title="Medical Assistance"
        description="Common medicines and legal medical products at subsidized costs. Prescription verification required. Strict compliance with pharmaceutical regulations and safety standards. Emergency medical fund available for verified cases."
        backgroundImage="/images/medical-bg.jpg"
        icon={<Heart className="h-8 w-8" />}
        primaryCTA="Donate Medical Supplies"
        secondaryCTA="Request Medical Aid"
        primaryHref="/medical/donate"
        secondaryHref="/medical/request"
        colorScheme="red"
        features={[
          "Common medicines at subsidized costs",
          "Prescription verification required",
          "Pharmaceutical regulation compliance",
          "Emergency medical fund for urgent cases",
          "Partnership with licensed pharmacies"
        ]}
        stats={[
          { label: "Patients Helped", value: "8,921" },
          { label: "Medicines Provided", value: "45,678" },
          { label: "Emergency Cases", value: "1,234" },
          { label: "Partner Pharmacies", value: "156" }
        ]}
      />

      {/* Electronics Section */}
      <CategorySection
        id="electronics"
        title="Digital Devices"
        description="Bridging the digital divide through refurbished laptops, smartphones, and tablets. Complete device inspection and data wiping process. Educational software pre-installed. Technical support included for 6 months."
        backgroundImage="/images/electronics-bg.jpg"
        icon={<Laptop className="h-8 w-8" />}
        primaryCTA="Donate Electronics"
        secondaryCTA="Request Digital Devices"
        primaryHref="/electronics/donate"
        secondaryHref="/electronics/request"
        colorScheme="teal"
        features={[
          "Refurbished laptops, smartphones, and tablets",
          "Complete device inspection and data wiping",
          "Educational software pre-installed",
          "6-month technical support included",
          "Digital literacy training programs"
        ]}
        stats={[
          { label: "Devices Donated", value: "3,456" },
          { label: "Students Connected", value: "2,891" },
          { label: "Success Rate", value: "96%" },
          { label: "Support Hours", value: "12,000+" }
        ]}
      />
    </main>
  );
}