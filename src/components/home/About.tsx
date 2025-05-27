import React from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { useTranslation } from "react-i18next";
import missionImg from "../../assets/images/img01.png"
import visionImg from "../../assets/images/img02.png"
import Container from "../layout/Container";
export const About: React.FC = ({ data, description, title, type }) => {
  const { t } = useTranslation();

  // Extract the relevant content by ID
  const growthData = data.find((item) => item.id === "growth");
  const missionData = data.find((item) => item.id === "mission");
  const visionData = data.find((item) => item.id === "vision");

  return (
    <Container>
      <section
        id="about"
        className="w-full max-w-[1184px] mx-auto flex flex-col items-stretch mt-[83px] max-md:mt-10"
      >
        <SectionHeader
          title={title || t("aboutshammoutsection.title")}
          description={description || t("aboutshammoutsection.description")}
        />

        <div className="mt-10 flex flex-col md:flex-row gap-5">
          {/* Left Card - Growth & Leadership */}
          <div className="relative flex-1 rounded-xl overflow-hidden">
            <img
              src={growthData?.logo || "/placeholder.jpg"}
              alt="Growth & Leadership"
              className="w-full h-full object-cover aspect-[0.8] sm:aspect-[1.2] rounded-xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-primary p-6 text-white rounded-t-xl">
              <h3 className="text-xl font-bold mb-3">
                {growthData?.title || t("aboutshammoutsection.growth_title")}
              </h3>
              <p className="text-sm leading-relaxed">
                {growthData?.description || t("aboutshammoutsection.growth_description")}
              </p>
            </div>
          </div>

          {/* Right Cards - Mission & Vision */}
          <div className="flex-1 flex flex-col gap-5">
            {/* Mission */}
            <div className="relative h-[300px] rounded-xl overflow-hidden">
              <img
                src={missionData?.logo || "/placeholder.jpg"}
                alt="Our Mission"
                className="absolute w-full h-full object-cover inset-0 rounded-xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-primary text-white px-6 py-5 rounded-t-xl z-10">
                <h3 className="text-lg font-bold">
                  {missionData?.title || t("aboutshammoutsection.mission_title")}
                </h3>
                <p className="text-sm mt-3 leading-relaxed">
                  {missionData?.description || t("aboutshammoutsection.mission_description")}
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="relative h-[300px] rounded-xl overflow-hidden">
              <img
                src={visionData?.logo || "/placeholder.jpg"}
                alt="Our Vision"
                className="absolute w-full h-full object-cover inset-0 rounded-xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-primary text-white px-6 py-5 rounded-t-xl z-10">
                <h3 className="text-lg font-bold">
                  {visionData?.title || t("aboutshammoutsection.vision_title")}
                </h3>
                <p className="text-sm mt-3 leading-relaxed">
                  {visionData?.description || t("aboutshammoutsection.vision_description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};
