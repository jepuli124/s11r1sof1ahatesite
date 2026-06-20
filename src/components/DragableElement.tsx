import { createDraggable, createScope, utils, type Scope } from 'animejs';
import React, { useEffect, useRef, useState, type ReactNode } from 'react'
import eventBusHandler from '../hooks/EventBus';

interface incomingParams{
    children: ReactNode
    grabFunc ?: () => void,
    dragFunc ?: () => void,
    releaseFunc ?: () => void,
    keyId ?: string,
    messageId ?: string,
    container ?: boolean,
    freeze ?: boolean,
    hide ?: boolean
}

const DragableElement: React.FC<incomingParams> = ({children, grabFunc = () => {}, dragFunc = () => {}, releaseFunc = () => {}, keyId, messageId, container = true, freeze = false, hide}) => {


    const canBeDrop = useRef<boolean>(false)
    const [visible, setVisible] = useState<boolean>(true)

    const readEvent = (message: string) => { // drop box element sends a message when hovered into same KeyIds that it can be dropped there.
        if(message === "can-be-drop"){
            canBeDrop.current = true
        } else {
            canBeDrop.current = false
        } 
        
    }

    useEffect(() => {

        const unsubscribeFunc = keyId ? eventBusHandler.subscribe(keyId, readEvent) : null
        return() => {
            if(unsubscribeFunc){
                unsubscribeFunc()
            }
        }
    }, [])

    const AnimRefPoint = useRef<HTMLDivElement>(null);
    const scope = useRef<Scope>(null);

    useEffect(() => {
    
    scope.current = createScope({ root: AnimRefPoint }).add( self => {
        if(!self){ return }
        const div = createDraggable('.dragDiv', {
            container: container ? [0, 0, 0, 0] : undefined,
            containerFriction: 0,

            onGrab: () => { 
                if(grabFunc){
                    grabFunc()
                }
            } ,      
            onDrag: dragFunc,     
            onRelease: () => {
                releaseFunc()
                if(!container){
                    div.refresh()
                }
                
                if(keyId && canBeDrop.current){
                    eventBusHandler.publish(keyId, "release", keyId, messageId)
                    
                    if(freeze){
                        div.stop()
                        div.disable()
                        utils.remove('.dragDiv')
                    }
                    if(hide){
                        div.stop()
                        div.disable()
                        utils.remove('.dragDiv')
                        setVisible(false)
                    }
                }
                },   
        });
    });
    
    return () => {
        if(scope.current){ scope.current.revert() }
    }
    }, []);
    
    //Remember to add ref={AnimRefPoint} to 
    //Some div to set where the animation can happen.

    return (
    <div ref={AnimRefPoint} style={{opacity: visible ? 1 : 0}}>
        {/* <div className='dragContainer' draggable={true} style={{width: 0, height: 0}}>
        </div> */}
        <div className='dragDiv' draggable={true}>
            {children}
        </div>
    </div>
    )
}

export default DragableElement