'use client'

import { useState } from "react";
import { Progress } from "@/components/form/progress";
import { InputField } from "@/components/form/input-field";
import { ConfirmationDisplay } from "@/components/form/confirmation-display";
import { FormNavigation } from "@/components/form/form-navigation";
import { useToast } from "@/components/toast-provider";
import {
    EnvelopeIcon,
    WalletIcon,
    CheckCircleIcon,
    ChatBubbleLeftRightIcon,
    UserIcon
} from "@heroicons/react/24/outline";
import { validateEmail, validateTelegram, validateTwitter, validateWallet, validateTwitterExists, getTwitterProfileImage } from "@/lib/utils";

export const stepConfigs = [
    {
        id: 1,
        name: "Email",
        title: "Enter your email address",
        description: "We'll sign you up for our newsletter and contact you if you're accepted for early access.",
        icon: EnvelopeIcon,
        inputType: "email",
        inputName: "email",
        inputId: "email",
        placeholder: "example@email.com"
    },
    {
        id: 2,
        name: "Telegram",
        title: "Enter your Telegram username",
        description: "We'll use this to contact you about exclusive opportunities.",
        icon: ChatBubbleLeftRightIcon,
        inputType: "text",
        inputName: "telegram",
        inputId: "telegram",
        placeholder: "@yourusername"
    },
    {
        id: 3,
        name: "Wallet",
        title: "Enter your wallet address",
        description: "Enter the wallet you use on Project 0. We'll determine your points and rank.",
        icon: WalletIcon,
        inputType: "text",
        inputName: "wallet",
        inputId: "wallet",
        placeholder: "CYBE..7S6E"
    },
    {
        id: 4,
        name: "Twitter",
        title: "Enter your X (Twitter) handle",
        description: "We'll use this to generate a banner image you can share on X (Twitter).",
        icon: UserIcon,
        inputType: "text",
        inputName: "twitter",
        inputId: "twitter",
        placeholder: "@yourhandle"
    },
    {
        id: 5,
        name: "Confirmation",
        title: "Confirm your information",
        description: "We will never ask for your secret key or seed phrase.",
        icon: CheckCircleIcon,
        inputType: "text",
        inputName: "confirmation",
        inputId: "confirmation",
        placeholder: "All set!"
    }
];

const validateField = (fieldName: string, value: string): string | null => {
    switch (fieldName) {
        case 'email':
            return validateEmail(value);
        case 'telegram':
            return validateTelegram(value);
        case 'twitter':
            return validateTwitter(value);
        case 'wallet':
            return validateWallet(value);
        default:
            return null;
    }
};

export const Form = ({ initialStep = 1 }: { initialStep?: number }) => {
    const [currentStep, setCurrentStep] = useState(initialStep);
    const [formData, setFormData] = useState({
        email: '',
        telegram: '',
        twitter: '',
        wallet: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showToast } = useToast();
    const [twitterProfileImage, setTwitterProfileImage] = useState<string>('');
    const [isValidatingTwitter, setIsValidatingTwitter] = useState(false);

    const currentConfig = stepConfigs[currentStep - 1];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // const validateTwitterField = async (twitterHandle: string): Promise<string | null> => {
    //     // First do basic format validation
    //     const formatError = validateTwitter(twitterHandle);
    //     if (formatError) return formatError;

    //     // Then check if the username exists
    //     setIsValidatingTwitter(true);
    //     try {
    //         const exists = await validateTwitterExists(twitterHandle);
    //         if (!exists) {
    //             showToast('Twitter handle not found', 'error');
    //             return null;
    //         }
            
    //         // If valid, set the profile image
    //         setTwitterProfileImage(getTwitterProfileImage(twitterHandle))
    //         console.log('Twitter handle found', twitterProfileImage);
    //         return null;
    //     } catch (error) {
    //         console.warn('Twitter validation error:', error);
    //         return null; // Don't block on validation errors
    //     } finally {
    //         setIsValidatingTwitter(false);
    //     }
    // };

    const validateCurrentField = async (): Promise<boolean> => {
        if (currentStep === 5) return true;

        const fieldName = currentConfig.inputName;
        const fieldValue = formData[fieldName as keyof typeof formData];
        
        let error: string | null = null;
        
        // if (fieldName === 'twitter') {
        //     error = await validateTwitterField(fieldValue);
        // } else {
        //     error = validateField(fieldName, fieldValue);
        // }

        if (error) {
            setErrors(prev => ({
                ...prev,
                [fieldName]: error
            }));
            return false;
        }

        return true;
    };

    const submitEmailToNewsletter = async (email: string): Promise<boolean> => {
        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (response.ok) {
                // Successfully signed up or already subscribed
                showToast('Successfully subscribed', 'success');
                return true;
            } else {
                const errorMessage = result.error || 'Failed to sign up for newsletter';
                showToast(errorMessage, 'error');
                setErrors(prev => ({
                    ...prev,
                    email: errorMessage
                }));
                return false;
            }
        } catch (error) {
            console.error('Newsletter signup error:', error);
            const errorMessage = 'An error occurred. Please try again.';
            showToast(errorMessage, 'error');
            setErrors(prev => ({
                ...prev,
                email: errorMessage
            }));
            return false;
        }
    };

    const handleNext = async () => {
        const isValid = await validateCurrentField();
        if (!isValid) return;

        // If we're on the email step, submit to newsletter first
        if (currentStep === 1) {
            setIsSubmitting(true);
            const success = await submitEmailToNewsletter(formData.email);
            setIsSubmitting(false);
            
            if (!success) {
                return; // Don't proceed if newsletter signup failed
            }
        }

        if (currentStep < stepConfigs.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = () => {
        // Handle form completion logic here
        console.log('Form completed!', formData);
        // You can add form submission logic here
    };

    const isCurrentFieldValid = currentStep === 5 || !validateField(
        currentConfig.inputName,
        formData[currentConfig.inputName as keyof typeof formData]
    );

    return (
        <section className="mx-auto w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] mb-22">
            <Progress currentStep={currentStep} />

            <div className="p-8 mt-6 rounded-lg shadow-md outline-1 outline-gray-100">
                {currentStep === 5 ? (
                    <ConfirmationDisplay formData={formData} />
                ) : (
                    <InputField
                        title={currentConfig.title}
                        description={currentConfig.description}
                        icon={currentConfig.icon}
                        inputType={currentConfig.inputType}
                        inputName={currentConfig.inputName}
                        inputId={currentConfig.inputId}
                        placeholder={currentConfig.placeholder}
                        value={formData[currentConfig.inputName as keyof typeof formData] || ''}
                        onChange={handleInputChange}
                        error={errors[currentConfig.inputName]}
                    />
                )}

                <FormNavigation
                    currentStep={currentStep}
                    totalSteps={stepConfigs.length}
                    isCurrentFieldValid={isCurrentFieldValid}
                    isSubmitting={isSubmitting}
                    onBack={handleBack}
                    onNext={handleNext}
                    onComplete={handleComplete}
                />
            </div>

            <div className="mt-6 text-sm text-center text-gray-400 max-w-sm sm:max-w-lg mx-auto">
                <p>
                    Early access will be granted at Project 0's discretion.
                    You will be notified via email if your early access application is approved.
                    We will never ask for your secret key or seed phrase.
                </p>
            </div>
        </section>
    );
};