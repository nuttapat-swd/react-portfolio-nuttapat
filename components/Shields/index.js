import React from "react";

const Shields = ({data}) => {
    return (
        <div className="flex flex-wrap space-x-1 mob:flex-nowrap">
            {data.map((skill) => (
            <img src={skill.link}></img>
            ))}
      </div>
    );
};

export default Shields;
