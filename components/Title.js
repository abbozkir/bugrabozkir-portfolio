import wavingAnimationDark from "../styles/waving-lottie-dark.json";
import wavingAnimationLight from "../styles/waving-lottie-light.json";
import React, {useContext} from 'react';
import {useLottie} from "lottie-react";
import {LayoutContext} from "@/layout/context/layoutcontext";

const Title = (props) => {
    const {layoutConfig} = useContext(LayoutContext);

    const style = {
        width: '300px',
        height: '300px',
        marginLeft: '-2rem',
        marginRight: '-1rem'
    };
    const options = {
        animationData: layoutConfig.colorScheme === 'dark' ? wavingAnimationDark : wavingAnimationLight,
        loop: true,
        autoplay: true,
    };

    const {View} = useLottie(options, style);

    return (
        <div className="hi-message w-full flex justify-content-end align-items-center">
            <p style={{maxWidth: '50%', width: 'max-content'}}>Hi, I'm Buğra!</p>
            {View}
        </div>
    );
}

export default Title;
