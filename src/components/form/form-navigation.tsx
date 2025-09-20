import { Button } from "@/components/button";

interface FormNavigationProps {
    currentStep: number;
    totalSteps: number;
    isCurrentFieldValid: boolean;
    isSubmitting?: boolean;
    onBack: () => void;
    onNext: () => void;
    onComplete: () => void;
}

export const FormNavigation = ({
    currentStep,
    totalSteps,
    isCurrentFieldValid,
    isSubmitting = false,
    onBack,
    onNext,
    onComplete
}: FormNavigationProps) => {
    const isFirstStep = currentStep === 1;
    const isLastStep = currentStep === totalSteps;

    return (
        <div className="mt-6 text-sm flex justify-between items-center">
            <Button
                variant="secondary"
                disabled={isFirstStep || isSubmitting}
                onClick={onBack}
            >
                Back
            </Button>
            <Button
                variant="primary"
                disabled={!isCurrentFieldValid || isSubmitting}
                loading={isSubmitting}
                onClick={isLastStep ? onComplete : onNext}
            >
                {isLastStep ? 'Complete' : 'Next'}
            </Button>
        </div>
    );
};
