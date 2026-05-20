import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { playCaution, playNotification } from "../utils/soundManager";
import { contactService } from "../services/contact.service";
import { servicesService } from "../services/services.service";

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
    const [services, setServices] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await servicesService.getAll();
                setServices(data);
            } catch (error) {
                console.error("Failed to load services for contact form:", error);
            }
        };
        fetchServices();
    }, []);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            playCaution();
            alert("يرجى ملء جميع الحقول المطلوبة (الاسم، البريد الإلكتروني، والرسالة)");
            return;
        }

        setIsSubmitting(true);

        try {
            let budgetNum: number | undefined;
            if (formData.budget === "500-1000") budgetNum = 1000;
            else if (formData.budget === "1000-5000") budgetNum = 5000;
            else if (formData.budget === "5000+") budgetNum = 10000;

            const selectedServiceObj = services.find(s => s._id === formData.service);
            const serviceName = selectedServiceObj ? selectedServiceObj.name : "عام";

            await contactService.sendMessage({
                fullName: formData.name,
                email: formData.email,
                subject: `طلب خدمة: ${serviceName} من ${formData.name}`,
                message: formData.message + (formData.address ? `\n\nالعنوان: ${formData.address}` : ""),
                selectedService: formData.service || undefined,
                budget: budgetNum,
            });

            setIsSuccess(true);
            playNotification();
            setFormData(initialData);

            // Reset success message after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (error) {
            console.error("Error submitting contact form:", error);
            playCaution();
            alert("حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة مرة أخرى لاحقاً.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        services,
        isSubmitting,
        isSuccess,
        handleChange,
        handleSubmit,
    };
};
