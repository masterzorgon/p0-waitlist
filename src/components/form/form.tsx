'use client'

import { Progress } from "./progress";

export const Form = ({ currentStep }: { currentStep: number }) => {
    return (
        <section className="outline-1 outline-gray-200 p-6 mx-auto max-w-4xl rounded-lg">
            <Progress currentStep={currentStep} />
        </section>
    );
};