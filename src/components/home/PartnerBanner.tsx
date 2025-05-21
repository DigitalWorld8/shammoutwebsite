import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Container from "../layout/Container";
import { useAppSelector } from "@/redux/useAppSelector";

interface PartnerFormInputs {
  email: string;
  phone: string;
}

export const PartnerBanner: React.FC = ({ data, type }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const title = data[0]?.title
  const description = data[0]?.description
  const btnLabel = data[0]?.btnLabel

  const { pageContent, pos, language } = useAppSelector(state => state.pages);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnerFormInputs>();

  const onSubmit = (data: PartnerFormInputs) => {
    navigate(`/${pos}/${language}/partner/${encodeURIComponent(data.email)}/${encodeURIComponent(data.phone)}`);
  };

  return (
    <Container>

      <section
        id="partner"
        className="flex flex-col relative min-h-[454px] w-[1186px] max-w-full items-center justify-center mt-[83px] max-md:mt-10 px-[70px] py-36 rounded-[23px]  max-md:px-5 max-md:py-[100px]"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/2d7822ae101e3ed6e5ff6166e1ad62dbd2c03a4e?placeholderIfAbsent=true"
          alt={t("partner.bannerImageAlt")}
          className="absolute h-full w-full object-cover inset-0 rounded-[23px]"
        />
        <div className="relative mb-[-29px] w-[905px] max-w-full max-md:mb-2.5">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-[64%] max-md:w-full max-md:ml-0">
              <div className="relative grow text-white max-md:max-w-full max-md:mt-10">
                <h2 className="text-[32px] font-extrabold leading-[35px] tracking-[-0.96px] max-md:max-w-full max-md:mr-2">
                  {title || t("partner.title")}
                </h2>
                <p className="text-sm font-medium leading-[21px] tracking-[-0.42px] mt-[30px] max-md:max-w-full">
                  {description || t("partner.description")}
                </p>
              </div>
            </div>
            <div className="w-[36%] ml-5 max-md:w-full max-md:ml-0">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative w-full text-[10px] font-semibold leading-none max-md:mt-10"
              >
                <div className="mb-2">
                  <input
                    type="email"
                    placeholder={t("form.emailPlaceholder")}
                    {...register("email", {
                      required: t("form.emailRequired"),
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: t("form.invalidEmail"),
                      },
                    })}
                    className={`self-stretch bg-neutral-100 w-full text-[rgba(30,57,94,1)] px-[19px] py-[18px] rounded-md ${errors.email ? "border-red-500" : ""
                      }`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="mb-2">
                  <input
                    // type="tel"
                    placeholder={t("form.phonePlaceholder")}
                    {...register("phone", {
                      required: t("form.phoneRequired"),
                    })}
                    
                    className={`self-stretch bg-neutral-100 w-full text-[rgba(164,164,164,1)] font-normal px-[19px] py-[18px] rounded-md ${errors.phone ? "border-red-500" : ""
                      }`}
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="self-stretch border-[color:var(--white,#FFF)] w-full text-white mt-[9px] px-[22px] py-[18px] rounded-[6.376px] border-[1.275px] border-solid hover:bg-white hover:bg-opacity-20 transition-colors max-md:px-5"
                >
                  {btnLabel || t("form.submitButton")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Container>

  );
};
