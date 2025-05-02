import InfoCard from "./InfoCards";
import { useTranslation } from "../I18nProvider";
const InfoSection = () => {
  const { t } = useTranslation();
  const cardsData = [
    {
      title: t("app.home.info.hours"),
      lines: [
        `${t("app.home.info.mofri")}: 10:30-22:00`,
        `${t("app.home.info.saturday")}: 11:00-23:00`,
        `${t("app.home.info.sunday")}: 12:00-21:00`,
      ],
    },
    {
      title: t("app.home.info.price"),
      lines: [
        "Perusburger: 9,90€",
        "Juustoburger: 11,90€",
        "Specialburger: 14,90€",
      ],
    },
    {
      title: t("app.home.info.delivery.title"),
      lines: [
        t("app.home.info.delivery.info1"),
        t("app.home.info.delivery.info2"),
      ],
    },
  ];

  return (
    <section className="grid md:grid-cols-3 gap-8 mb-12">
      {cardsData.map((card, index) => (
        <InfoCard key={index} title={card.title} lines={card.lines} />
      ))}
    </section>
  );
};

export default InfoSection;
