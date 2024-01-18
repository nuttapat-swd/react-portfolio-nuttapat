import React from "react";
import Image from "next/image"

const Shields = ({data}) => {
    return (
        <div className='flex flex-wrap space-x-2 tablet:flex-nowrap'>
            {data.map((skill) => (
                <div key={skill.id} >
                    <Image src={skill.link} height="10" width={skill.name.length * 8}/>
                </div>
            ))}
        </div>
    );
};

export default Shields;
