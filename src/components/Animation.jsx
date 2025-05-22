'use client'
import React from 'react'
import Lottie from 'lottie-react'
import { useEffect, useState } from 'react';

const Animation = () => {
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
      fetch("/aa.json")
        .then((response) => response.json())
        .then((data) => setAnimationData(data));
    }, []);
  
    return (
      <div className="w-64 h-64">
        {animationData && <Lottie animationData={animationData} loop={true} />}
      </div>
    );
}

export default Animation