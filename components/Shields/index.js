import React from "react";
import Image from 'next/image'


const Shields = ({data}) => {
    return (
        <div className="flex flex-wrap space-x-1 mob:flex-nowrap">
            {data.map((skill) => (
            <Image key={skill.id} src={skill.link}/>
            ))}
      </div>
    );
};

export default Shields;
