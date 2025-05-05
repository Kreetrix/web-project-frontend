import React from 'react';
import '../../styles/RotatingBurger.css';


const RotatingBurger = () => {
    const text = ' PARAS BURGERI SUOMESSA ';
    const radius = 90;

    // Create circular text
    const createCircularText = () => {
        const chars = text.split('');
        const angleStep = (2 * Math.PI) / chars.length;

        return (
            <div className="absolute inset-0">
                {chars.map((char, index) => {
                    const angle = index * angleStep;
                    const x = radius * Math.cos(angle - Math.PI / 2);
                    const y = radius * Math.sin(angle - Math.PI / 2);

                    return (
                        <span
                            key={index}
                            className="absolute left-1/2 top-1/2 text-yellow-500 font-extrabold text-lg"
                            style={{
                                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${(angle * 180) / Math.PI}deg)`,
                                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                            }}
                        >
                            {char}
                        </span>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center my-8">
            <div className="relative w-64 h-64">
                {/* Circular rotating text */}
                <div className="absolute inset-0 animate-spin-slow-reverse">
                    {createCircularText()}
                </div>

                {/* Burger image */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 animate-spin-slow">
                        <img
                            srcSet="/burger.png"
                            sizes="(max-width: 600px) 160px, 512px"
                            alt="Burger"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </div>


        </div>
    );
};


export default RotatingBurger;