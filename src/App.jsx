import React, { lazy, Suspense } from "react";
const RemoteApp = lazy( () => import('remote/App') ); 

const App = () => {
    return(<div>
        <h1> XD.</h1>
        <Suspense>
            <RemoteApp />
        </Suspense>
    </div>)
}

export default App; 