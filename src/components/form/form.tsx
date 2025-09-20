'use client'

import { Progress } from "./progress";
import { Button } from "../button";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export const Form = ({ currentStep }: { currentStep: number }) => {
    return (
        <section className="mx-auto max-w-3xl mt-20">
            <Progress currentStep={currentStep} />

            <div className="p-8 mt-6 rounded-lg shadow-md outline-1 outline-gray-100">
                <h3 className="text-lg leading-6 font-semibold text-gray-900">
                    Your email address
                </h3>
                <p className="mt-1 text-sm font-medium mb-4 text-gray-500">
                    We'll use this to sign you up for our newsletter and contact you about your waitlist status.
                </p>
                <div className="mt-4 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="py-4 block w-full pl-10 sm:text-sm rounded-md text-gray-900 border-gray-300 focus:ring-vanguardPurple focus:border-vanguardPurple"
                        placeholder="example@email.com"
                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mt-6 text-sm flex justify-between items-center">
                    <Button
                        variant="secondary"
                        // onClick={onSubmit}
                        // loading={loading}
                        // disabled={loading || !complete}
                        // arrow={true}
                    >
                        Back
                    </Button>
                    <Button
                        variant="primary"
                        // onClick={onSubmit}
                        // loading={loading}
                        // disabled={loading || !complete}
                        // arrow={true}
                    >
                        Next
                    </Button>
                </div>
            </div>

            <div className="mt-6 text-sm text-center text-gray-400 max-w-lg mx-auto">
                <p>
                    Early access will be granted at Project 0's discretion.
                    You will be notified via email when your early access is granted.
                    Thank you for your interest.
                </p>
            </div>
        </section>
    );
};