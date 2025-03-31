// ---
// import { getLangFromUrl, useTranslations } from "../i18n/utils";

// const lang = getLangFromUrl(Astro.url);
// const t = useTranslations(lang);
// ---
import { useForm, type SubmitHandler } from "react-hook-form"
// https://docs.astro.build/es/reference/configuration-reference/#experimentalenv
import { PRIVATE_FORM_URL } from "astro:env/client"
import { getLangFromUrl, useTranslations } from "../i18n/utils";

type FormData = {
    email: string
    nombres: string
    telefono: string
    mensaje: string
}

interface FormProps {
    link: URL;
}

export default function Form({ link }: FormProps) {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        formState
    } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = async (data, e) => {
        e?.target.reset();

        // Validar datos antes de enviarlos
        // if (!data.user_email || !data.message) {
        //     console.error("Faltan campos obligatorios");
        //     return;
        // }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(data);
        var requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(PRIVATE_FORM_URL,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));

    }

    const lang = getLangFromUrl(link);
    const t = useTranslations(lang);
    // console.log(link);

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >{t("Contact.form.email.label")}</label
                >
                <input
                    type="email"
                    id="contact-email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-[#8bdefa]"
                    placeholder={t("Contact.form.email.placeholder")}
                    {...register("email", {
                        required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                    })}
                />
                {errors.email?.type === "required" && (
                    <p role="alert" className="!text-red-500 !text-sm mt-1">{t("Contact.form.error.email")}</p>
                )}
                {errors.email?.type === "pattern" && (
                    <p role="alert" className="!text-red-500 !text-sm mt-1">{t("Contact.form.error.email.pattern")}</p>
                )}

            </div>

            <div className="mb-4">
                <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >{t("Contact.form.name.label")}</label
                >
                <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-[#8bdefa]"
                    placeholder={t("Contact.form.name.placeholder")}
                    {...register("nombres", { required: true })}
                />
                {errors.nombres?.type === "required" && (
                    <p role="alert" className="!text-red-500 !text-sm mt-1">{t("Contact.form.error.name")}</p>
                )}
            </div>

            <div className="mb-4">
                <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >{t("Contact.form.phone.label")}</label
                >
                <input
                    type="number"
                    id="phone"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-[#8bdefa]"
                    placeholder={t(
                        "Contact.form.phone.placeholder",
                    )}
                    {...register("telefono", { required: true })}
                />
                {errors.telefono?.type === "required" && (
                    <p role="alert" className="!text-red-500 !text-sm mt-1">{t("Contact.form.error.phone")}</p>
                )}
            </div>

            <div className="mb-6">
                <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >{t("Contact.form.message.label")}</label
                >
                <textarea
                    id="message"
                    rows={5}
                    // name="user_message"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-[#8bdefa]"
                    placeholder={t(
                        "Contact.form.message.placeholder",
                    )}
                    {...register("mensaje", { required: true, minLength: 10 })}
                ></textarea>
                {errors.mensaje?.type === "required" && (
                    <p role="alert" className="!text-red-500 !text-sm mt-1">{t("Contact.form.error.message")}</p>
                )}
                {errors.mensaje?.type === "minLength" && (
                    <p role="alert" className="!text-red-500 !text-sm mt-1">{t("Contact.form.error.message.required")}</p>
                )}
            </div>

            {formState.isSubmitSuccessful ? <div className="text-center p-6 text-[#f5f3ff] dark:bg-[#1f263b] rounded-lg">
                <svg
                    className="w-12 h-12 mx-auto mb-4 text-[#6f83bd]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
                <h3
                    className="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                >
                    Message Sent!
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                    Thank you for reaching out. We'll get back to
                    you as soon as possible.
                </p>
            </div> : <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300 focus:outline-none bg-gray-900 hover:bg-gray-800 text-white shadow-md hover:shadow-lg cursor-pointer"
            >
                {t("Contact.form.submitButton")}
            </button>}


        </form>


    )
}
