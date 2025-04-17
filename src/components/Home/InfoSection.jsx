import InfoCard from './InfoCards';

const InfoSection = () => {
    const cardsData = [
        {
            title: "Aukioloajat",
            lines: ["Ma-Pe: 10:30-22:00", "La: 11:00-23:00", "Su: 12:00-21:00"]
        },
        {
            title: "Hinnasto",
            lines: ["Perusburger: 9,90€", "Juustoburger: 11,90€", "Specialburger: 14,90€"]
        },
        {
            title: "Toimitus",
            lines: [
                "Toimitus 5€ alle 20€ tilauksille",
                "Ilmainen toimitus yli 20€ tilauksista!"
            ]
        }
    ];

    return (
        <section className="grid md:grid-cols-3 gap-8 mb-12">
            {cardsData.map((card, index) => (
                <InfoCard key={index} title={card.title} lines={card.lines} />
            ))}
        </section>

    )
};

export default InfoSection;