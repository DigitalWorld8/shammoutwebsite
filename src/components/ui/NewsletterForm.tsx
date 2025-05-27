import { REACAPTCH_SITE_KEY } from "@/axios/urls";
import { postEmailService } from "@/redux/services/pagesService";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const NewsletterFormWithCaptcha = () => {
  const [showModal, setShowModal] = useState(false);
  const [verified, setVerified] = useState(false);
  const { t } = useTranslation()
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: () => {
      setShowModal(true); // Open CAPTCHA modal
      dispatch(postEmailService({ email: formik.values.email })).then((action) => {
        if (postEmailService.fulfilled.match(action)) {
          setShowModal(false)
        }
      })

    },
  });

  const onRecaptchaChange = (token: string | null) => {
    if (token) {
      setVerified(true);
      setShowModal(false);
      formik.handleSubmit()
    }
  };

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full items-stretch gap-2 text-[10px] leading-none mt-[15px]"
      >
        <input
          type="email"
          name="email"
          placeholder={t("emailPlaceHolder")}
          className="bg-neutral-100 text-[rgba(30,57,94,1)] px-4 py-2 rounded-md w-full"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <button
          onClick={() => setShowModal(true)}
          type="button"
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          {t('Submit')}
        </button>
      </form>

      {formik.touched.email && formik.errors.email && (
        <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
      )}

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
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterFormWithCaptcha;
