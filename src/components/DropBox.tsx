import React, { useCallback, useEffect } from 'react'
import eventBusHandler from '../hooks/EventBus'

interface incomingParams{
    children ?: React.ReactNode
    keyId: string | string[]
}

const dropFunc = (state: string, eventKeyId: string, additionalMessage: string) => {
        if(state == "release"){ // happens when a correct item is dropped here
            eventBusHandler.publish(eventKeyId, "catch", additionalMessage)
        }
    }

const DropBox: React.FC<incomingParams> = ({children, keyId}) => {
    useEffect(() => {
        if(typeof keyId === "string"){
            const unsubscribeFunc = eventBusHandler.subscribe(keyId, dropFunc)
            return() => {
                if(unsubscribeFunc){
                    unsubscribeFunc()
                }
            }
        } else if (Array.isArray(keyId)) {
            const unsubscribeList:  (() => void)[] = []
            keyId.forEach(element => {
                unsubscribeList.push(eventBusHandler.subscribe(element, dropFunc))
            });
            return () => {
                unsubscribeList.forEach(element => {
                    element()
                })
            }
        }
    }, [])

    const canbedropInfo = useCallback((message: string) => {
        if(typeof keyId === "string"){
            eventBusHandler.publish(keyId, message)
        } else if (Array.isArray(keyId)) {
            keyId.forEach(element => {
                eventBusHandler.publish(element, message)
            });
        }
    }, [keyId])

    return (
    <div onMouseEnter={() => {
        canbedropInfo("can-be-drop")
        }}
        onMouseLeave={() => {
        canbedropInfo("cant-be-drop")
        }}
        >
        {children}
    </div>
    )
}

export default DropBox