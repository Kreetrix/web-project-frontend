const InfoCard = ({ title, lines }) => {
    return (
        <>
            <div className=" dark:bg-gray-600 p-6 rounded-lg shadow-md custom-card">
                <h3 className="text-xl font-bold mb-3 text-red-500    dark:text-yellow-400">{title}</h3>
                {lines.map((line, index) => (
                    <p key={index} className="mb-1">{line}</p>
                ))}
            </div>

        </>
    )
}

export default InfoCard;