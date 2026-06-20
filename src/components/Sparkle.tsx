import { animate, createScope, type Scope } from 'animejs';
import React, { useEffect, useRef } from 'react'

interface incomingParams{
    lifetime?: number,
    size?: number
    done?: () => void
    colors: string[]
    location?: {x: number, y: number}
}

const Sparkle: React.FC<incomingParams> = ({lifetime = 1000, size = 1, done = () => {}, colors = [], location = {x: 0, y: 0}}) => {
    const AnimRefPoint = useRef<HTMLDivElement>(null);
    const scope = useRef<Scope>(null);
    const defaultSize = useRef<number>((Math.random()+0.5)*size);
    const vw = window.innerWidth;

    function generateRandomHexColor() {
        const hexChars = "0123456789ABCDEF";
        let hexColor = "#";
        for (let i = 0; i < 6; i++) {
            hexColor += hexChars[Math.floor(Math.random()*16)];
        }

        return hexColor;
        }

    const randomColor = () => {
        if(colors.length != 0){
            return colors[Math.floor(Math.random()*colors.length)]
        }
        return generateRandomHexColor()
    }

    const color = useRef<string>(randomColor())
    
    useEffect(() => {
    
    scope.current = createScope({ root: AnimRefPoint }).add( self => {
        if(!self){ return }
    

        animate('.sparkle', {
            opacity: {from: 1, to: 0},
            x: {from: location.x - (vw * (defaultSize.current/100))/2, to: 200 * (Math.random() - 0.5) + location.x},
            y: {from: location.y - (vw * (defaultSize.current/100))/2, to: 200 * (Math.random() - 0.5) + location.y},
            ease: 'outCirc',
            duration: lifetime,
            onComplete: () => {done()}
        });

    }); 
    
    return () => {
        
        if(scope.current){ scope.current.revert() }
    }
    }, []);
    
    return (
    <div ref={AnimRefPoint} >
        <div
        className='sparkle'
        style={{
            opacity: 0,
            position: 'absolute',
        }}
        >
        <svg width={defaultSize.current + "vw"} height={defaultSize.current + "vw"} viewBox="0 0 100 100">
            <polygon
            points="50,0 65,35 100,50 65,65 50,100 35,65 0,50 35,35"
            fill={color.current}
            />
        </svg>
        </div>
        
    </div>
    )
}

export default Sparkle