'use client'
import { Button } from '@/components/ui/button';
import { SignInButton, useUser } from '@clerk/nextjs';
import { Check } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const plans = [
  {
    name: "Free",
    price: "$0",
    features: [
      "3 AI Trip Plans per month",
      "Basic destination recommendations",
      "Standard itinerary generation",
      "Basic hotel suggestions",
      "Email support"
    ],
    buttonText: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "per month",
    features: [
      "Unlimited AI Trip Plans",
      "Premium destination insights",
      "Advanced itinerary customization",
      "Curated hotel recommendations",
      "Priority email support",
      "Real-time trip modifications",
      "Exclusive travel deals"
    ],
    buttonText: "Go Pro",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "All Pro features",
      "Dedicated account manager",
      "Custom API integration",
      "Team collaboration tools",
      "Advanced analytics",
      "24/7 premium support",
      "Custom feature development"
    ],
    buttonText: "Contact Us",
    popular: false
  }
];

function PricingTable() {
  const { user } = useUser();

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`relative rounded-2xl p-8 ${
            plan.popular
              ? "bg-primary text-white shadow-xl scale-105"
              : "bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800"
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-green-400 to-blue-500 px-3 py-2 text-sm font-medium text-white text-center">
              Most Popular
            </div>
          )}

          <div className="mb-8">
            <h3 className={`text-xl font-semibold ${plan.popular ? "text-white" : "text-gray-900 dark:text-white"}`}>
              {plan.name}
            </h3>
            <div className="mt-4 flex items-baseline text-6xl font-bold">
              {plan.price}
              {plan.period && (
                <span className={`ml-1 text-2xl font-medium ${plan.popular ? "text-gray-100" : "text-gray-500"}`}>
                  {plan.period}
                </span>
              )}
            </div>
          </div>

          <ul className="mb-8 space-y-4">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center space-x-3">
                <Check className={`h-5 w-5 ${plan.popular ? "text-white" : "text-green-500"}`} />
                <span className={plan.popular ? "text-gray-100" : "text-gray-600 dark:text-gray-300"}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {!user ? (
            <SignInButton mode="modal">
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-white text-primary hover:bg-gray-100"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                {plan.buttonText}
              </Button>
            </SignInButton>
          ) : plan.name === "Enterprise" ? (
            <Link href="/contact-us">
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-white text-primary hover:bg-gray-100"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                {plan.buttonText}
              </Button>
            </Link>
          ) : (
            <Link href="/create-new-trip">
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-white text-primary hover:bg-gray-100"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                {plan.buttonText}
              </Button>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

export default PricingTable;