import React, { useRef } from "react";
import { useFormik } from "formik";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Container from "../layout/Container";
import ReCAPTCHA from "react-google-recaptcha";
import { REACAPTCH_SITE_KEY } from "@/axios/urls";
import { SectionHeader } from "../ui/SectionHeader";
import { useDispatch } from "react-redux";
import { postDataService } from "@/redux/services/pagesService";
import { useTranslation } from "react-i18next";
import CountrySelector from "./CountrySelector";
import { countries } from "@/lib/countries";
import { useAppDispatch } from "@/redux/store";

interface FormValues {
    name: string;
    email: string;
    phone: string;
    country: string;
    businessDescription: string;
    services: {
        automotive: boolean;
        steelMetals: boolean;
        aviation: boolean;
        vehicleInspection: boolean;
        realEstate: boolean;
        alternativeEnergy: boolean;
        foodManufacturing: boolean;
    };
}

interface PartnerFormProps {
    phone?: string;
    email?: string;
}

const PartnerForm: React.FC<PartnerFormProps> = ({description,title, type, data, phone, email }) => {
    const [partner] = data;
    const { id, name: nameLabel, email: emailLabel, phoneNumber: phoneNumberLabel, descripe: descripeLabel, ServicesLabel, btn, services: servicesArray } = partner;
    console.log('data', data);

    // Extract country code from full phone number (e.g., "+963935387582")
    function getCountryByPhone(phone: string) {
        // Sort countries descending by callSign length to match longest prefix first
        const sortedCountries = [...countries].sort((a, b) => b.callSign.length - a.callSign.length);

        // Find the first country where the phone number starts with its callSign
        return sortedCountries.find(country => phone.startsWith(country.callSign));
    }
    function stripCountryCode(phone: string, countryCode: string) {
        return phone.replace(countryCode, "");
    }
    // Usage
    const matchedCountry = getCountryByPhone(phone);
    const localPhone = matchedCountry ? stripCountryCode(phone || "", matchedCountry.callSign) : phone;

    if (matchedCountry) {
        console.log("Matched country:", matchedCountry.name, "Code:", matchedCountry.code);
    } else {
        console.log("No match found.");
    }

    const { t, i18n } = useTranslation("");
    const isEn = i18n.language === "en"
    const [showModal, setShowModal] = React.useState(false);
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);
    const dispatch = useAppDispatch()
    const initialValues: FormValues = {
        name: "",
        email: email || "",
        phone: localPhone || "",
        country: matchedCountry?.code || 'SY',
        businessDescription: "",
        services: {
            automotive: false,
            steelMetals: false,
            aviation: false,
            vehicleInspection: false,
            realEstate: false,
            alternativeEnergy: false,
            foodManufacturing: false,
        },
    };

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            const selectedServices = Object.entries(values.services)
                .filter(([_, isSelected]) => isSelected)
                .map(([key]) => {
                    // Convert camelCase to snake_case manually or with a helper
                    switch (key) {
                        case 'steelMetals':
                            return 'steels_and_metals';
                        case 'aviation':
                            return 'aviation';
                        case 'vehicleInspection':
                            return 'vehicle_inspection';
                        case 'realEstate':
                            return 'real_estate';
                        case 'alternativeEnergy':
                            return 'alternative_energy';
                        case 'automotive':
                            return 'automotive';
                        case 'foodManufacturing':
                            return 'food_manufacturing';
                        default:
                            return key;
                    }
                });

            if (selectedServices.length === 0) {
                formik.setFieldError("services", "Please select at least one service");
                return;
            }

            const servicesString = selectedServices.join(',');

            const { email, phone, businessDescription, country } = values;
            const code = countries.find((c) => c.code === country)?.callSign
            dispatch(postDataService({
                email,
                phoneNumber: code + phone,
                description: businessDescription,
                services: servicesString,
            })).then((action) => {
                if (postDataService.fulfilled.match(action)) {
                    setShowModal(false)
                }
            })

        }

    });

    const onRecaptchaChange = (token: string | null) => {
        if (token) {
            setShowModal(false);
            formik.handleSubmit()

            // Reset the form
            // formik.resetForm({
            //     values: {
            //         ...initialValues,
            //         email: email || "",
            //         phone: phone || "",
            //     }
            // });
        }
    };

    const services = [
        {
            columnWidth: "w-[28%]",
            items: [
                { id: "automotive", label: t("Automotive") },
                { id: "steelMetals", label: t("Steel & Metals") },
                { id: "aviation", label: t("Aviation") },
            ],
        },
        {
            columnWidth: "w-[34%] ml-5",
            items: [
                { id: "vehicleInspection", label: t("Vehicle Inspection") },
                { id: "realEstate", label: t("Real Estate") },
            ],
        },
        {
            columnWidth: "w-[38%] ml-5",
            items: [
                { id: "alternativeEnergy", label: t("Alternative Energy") },
                { id: "foodManufacturing", label: t("Food Manufacturing") },
            ],
        },
    ];


    return (
        <Container>
            <form onSubmit={formik.handleSubmit} className="w-full">
                <div className="flex items-stretch gap-1 mt-[71px] max-md:mt-10">
                    <div className="bg-primary flex w-[79px] shrink-0 h-[3px] rounded-[20px]" />
                    <div className="bg-primary flex w-[22px] shrink-0 h-[3px] rounded-[20px]" />
                </div>
                <SectionHeader
                    title={title}
                    description={description}
                />
                <div className="self-stretch mr-2.5 mt-12 max-md:max-w-full max-md:mt-10">
                    <div className="w-full max-md:max-w-full">
                        <div className="w-full max-md:max-w-full">
                            <label className="text-[rgba(30,57,94,1)] text-[19px] font-semibold leading-none">
                                {nameLabel}
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder={t("partnerForm.namePlaceholder")}
                                className="items-center shadow-[0px_1.352px_2.703px_0px_rgba(16,24,40,0.05)] bg-white flex w-full gap-[11px] overflow-hidden text-[22px] text-[#667085] font-normal mt-2 px-[22px] py-4 rounded-[10.813px] max-md:max-w-full max-md:px-5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgba(204,31,65,0.5)]"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="self-center mt-8 max-md:max-w-full w-full">
                    <div className="w-full max-md:max-w-full">
                        <div className="w-full max-md:max-w-full">
                            <label className="text-[rgba(30,57,94,1)] text-[19px] font-semibold leading-none">
                                {emailLabel}
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder={t("partnerForm.email")}

                                className="items-center shadow-[0px_1.352px_2.703px_0px_rgba(16,24,40,0.05)] bg-white flex w-full gap-[11px] overflow-hidden text-[22px] text-[#667085] font-normal mt-2 px-[22px] py-4 rounded-[10.813px] max-md:max-w-full max-md:px-5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgba(204,31,65,0.5)]"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 max-md:max-w-full w-full">
                    <div className="w-full max-md:max-w-full">
                        <div className="w-full max-md:max-w-full">
                            <label className="text-[rgba(30,57,94,1)] text-[19px] font-semibold leading-none">
                                {phoneNumberLabel}

                            </label>
                            <div className="items-stretch shadow-[0px_1.352px_2.703px_0px_rgba(16,24,40,0.05)] bg-white flex w-full overflow-hidden text-[22px] font-normal flex-wrap mt-2 rounded-[10.813px] max-md:max-w-full border border-gray-200">
                                <div className="w-[200px] border-r border-gray-200">
                                    <CountrySelector formik={formik} />
                                </div>
                                <input
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder={`${countries.find((c) => c.code === formik.values.country)?.callSign} 000-0000`}
                                    style={{
                                        direction: isEn ? 'ltr' : "rtl"
                                    }}
                                    className="flex-1 shrink basis-4 min-w-60 gap-[11px] text-[#667085] pr-[22px] py-4 max-md:max-w-full focus:outline-none"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="min-h-52 mt-8 max-md:max-w-full w-full">
                    <div className="w-full flex-1 max-md:max-w-full">
                        <div className="w-full flex-1 max-md:max-w-full">
                            <label className="text-[rgba(30,57,94,1)] text-[19px] font-semibold leading-none">
                                {descripeLabel}

                            </label>
                            <textarea
                                name="businessDescription"
                                value={formik.values.businessDescription}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder={t("partnerForm.businessDescriptionPlaceholder")}

                                className="flex-1 shrink basis-[0%] shadow-[0px_1.352px_2.703px_0px_rgba(16,24,40,0.05)] bg-white w-full gap-[11px] overflow-hidden text-[22px] text-[#667085] font-normal leading-8 h-40 mt-2 px-[19px] py-3.5 rounded-[10.813px] max-md:max-w-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgba(204,31,65,0.5)]"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="text-[rgba(30,57,94,1)] text-[19px] font-semibold leading-none mt-[33px]">
                    {ServicesLabel}
                </div>
                {formik.errors.services && typeof formik.errors.services === 'string' && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.services}</div>
                )}
                <div className="w-full max-w-[997px] mt-[22px] max-md:max-w-full">
                    <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                        {services.map((column, index) => (
                            <div
                                key={index}
                                className={`${column.columnWidth} max-md:w-full max-md:ml-0`}
                            >
                                <div className="w-full max-md:mt-10">
                                    {column.items.map((item, i) => (
                                        <div key={item.id} className={i !== 0 ? "mt-[22px]" : ""}>
                                            <div className="flex items-center space-x-2 gap-1">
                                                <Checkbox
                                                    id={item.id}
                                                    checked={formik.values.services[item.id as keyof typeof formik.values.services]}
                                                    onCheckedChange={(checked) =>
                                                        formik.setFieldValue(`services.${item.id}`, checked === true)
                                                    }
                                                />
                                                <label
                                                    htmlFor={item.id}
                                                    className="text-[rgba(30,57,94,1)] text-[22px] font-medium "
                                                >
                                                    {item.label}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="self-stretch w-full text-[22px] text-white font-bold mt-[67px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
                    <button
                        type="button"
                        onClick={() => setShowModal(true)}
                        className="self-stretch bg-primary shadow-[0px_1px_3px_rgba(16,24,40,0.05)] border min-w-60 w-full gap-[11px] overflow-hidden flex-1 shrink basis-[0%] px-[27px] py-4 rounded-[11px] border-[rgba(204,31,65,1)] border-solid max-md:max-w-full max-md:px-5 hover:bg-secondary transition-colors"
                    >
                        {btn}

                    </button>
                </div>
            </form>
            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <h2 className="text-lg font-bold mb-4">Verify you're human</h2>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={REACAPTCH_SITE_KEY}
                            onChange={onRecaptchaChange}
                        />
                        <button
                            className="mt-4 text-sm text-gray-500 underline"
                            onClick={() => setShowModal(false)}
                        >
                            {t("partnerForm.cancel")}

                        </button>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default PartnerForm;