import React from "react";
import Loader from "./Loader";

const LoadingScreen = (props)=>{

    return <div className="w-screen h-screen flex justify-center items-center">
        <Loader/>
    </div>
}

export default LoadingScreen;