// import React, { Component } from "react";



// export default class HelloPage extends Component {
//     render(){
//         return(
//             <h1>Hello!!</h1>
//         )
//     }
// }

import React, { Component } from "react";

import Button from "../../common/Button/Button";


export default class HelloPage extends Component {
    render(){
        return(
            <Button 
                onClick={(e)=>{console.log("it's",e.target)}}
                state="error"
                size="lg"
                variant="outline"
                >
                click me!
            </Button>
        )
    }
}
