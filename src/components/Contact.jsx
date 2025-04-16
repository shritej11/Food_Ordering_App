import linkedinImg from '/Images/linkedin.png';
import InstaImg from '/Images/instagram.png';
import GithubImg from '/Images/github.png';
import { Link } from 'react-router-dom';

const Contact = () => {
return (
    <div className=" justify-center flex p-3 m-3 ">
       <div> 
        <button className="transition-transform ease-out duration-300 hover:scale-120"
         onClick={() => 
               window.open("https://www.linkedin.com/in/shritej-dhere/", "_blank")
            }>
                <img  className="w-30 p-3" src={ linkedinImg } alt=""/>
        </button>
       </div>

       <div>
       <button className="transition-transform ease-out duration-300 hover:scale-120"
       onClick={() => 
               window.open("https://github.com/shritej11", "_blank")
            }>
                <img className="w-30 p-3" src={GithubImg } alt="" />
        </button>
        
       </div>

       <div>
       <button className="transition-transform ease-out duration-300 hover:scale-120"
       onClick={() => 
               window.open("https://www.instagram.com/shritej.dhere/", "_blank")
            }>
                <img className="w-30 p-3" src={InstaImg} alt="" />
        </button>
        
       </div>
       <div>

        <img src="" alt="" />
       </div>

       <div>
        <img src="" alt="" />
       </div>
    </div>
)
}
export default Contact;