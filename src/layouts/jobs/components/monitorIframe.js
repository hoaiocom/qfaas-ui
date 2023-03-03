import Iframe from 'react-iframe'

export default function MonitorIframe() {

    return (
        <Iframe url="https://monitor.qfaas.cloud"
            width="100%"
            height="700px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
        />
    )
}
