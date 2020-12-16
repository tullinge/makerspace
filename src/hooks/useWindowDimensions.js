import React from "react"
import { window } from "browser-monads"

export default () => {
    const [windowDimensions, setWindowDimensions ] = React.useState({
        innerWidth: window.innerWidth, 
        innerHeight: window.innerHeight
    })

    React.useEffect(() => {
        function handleResize() {
            setWindowDimensions({
                innerWidth: window.innerWidth, 
                innerHeight: window.innerHeight
            })
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return windowDimensions
}
