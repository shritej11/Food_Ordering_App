import React, { useLayoutEffect } from "react";

class UserClass extends React.Component {
    constructor(props){
         super(props);
        

        this.State = {
            userInfo: {
                name: "default",
                location: "dummy",
            }
        };
    }

    async componentDidMount () {
        //Api Call
        const data = await fetch("https://api.github.com/users/shritej11");
        const json = await data.json();
       
       this.setState({
        userInfo:json
       });
       
       console.log(json);
        

    }

    render(){

        const {name } = this.props;
      
        return(
         <div className="User-card">
            <h2>Name: {name}</h2>
            <h2>Location: </h2>
         </div>   
        );
    }
}

export default UserClass;