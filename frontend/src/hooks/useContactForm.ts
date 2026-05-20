import { useState, type ChangeEvent, type FormEvent } from "react";
import { playCaution, playNotification } from "../utils/soundManager";


interface ContactFormData {
    name: string;
    email: string;
    service: string;
    budget: string;
    address: string;
    message: string;
}

const initialData: ContactFormData = {
    name: "",
    email: "",
    service: "",
    budget: "",
    address: "",
    message: "",
};

/**
 * Custom hook for managing the contact form state and submission
 */
export const useContactForm = () => {
    const [formData, setFormData] = useState<ContactFormData>(initialData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Simulate API call
            console.log("Submitting contact form:", formData);
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setIsSuccess(true);
            playNotification();
            setFormData(initialData);

            // Reset success message after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (error) {
            console.error("Error submitting contact form:", error);
            playCaution();
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        isSubmitting,
        isSuccess,
        handleChange,
        handleSubmit,
    };
};
