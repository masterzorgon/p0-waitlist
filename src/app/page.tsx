'use client'

import { Header } from "@/components/header";
import { Form } from "@/components/form/form";
import { useState } from "react";

export default function Home() {
    const [currentStep, setCurrentStep] = useState<number>(1);

    return (
        <main>
            <Header />
            <Form currentStep={currentStep} />
        </main>
    )
}