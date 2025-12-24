import { useState, type FormEvent } from "react";


/**
 * Custom hook for managing the newsletter subscription state and submission
 */
export const useNewsletter = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);

        try {
            // Simulate API call
            console.log("Submitting newsletter subscription for:", email);
            await new Promise((resolve) => setTimeout(resolve, 800));

            setIsSuccess(true);
            setEmail("");

            // Reset success message after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (error) {
            console.error("Error submitting newsletter:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        email,
        isSubmitting,
        isSuccess,
        handleEmailChange,
        handleSubmit,
    };
};
