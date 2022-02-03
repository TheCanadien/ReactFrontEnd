import React from 'react';
import Form from './Form';


const FormFormat = ({isSearch, isLogin, isRegister}) =>{


if(isSearch){
    return(  
     <div >
         <Form className="search"/>
     </div>
    )
}
 if (isLogin){
    return(
     <div>
         <Form/>
         <Form/>
     </div>
    )
}
 if(isRegister){
    return(
     <div>
         <Form/>
         <Form/>
         <Form/>
     </div>
    );
};

return(
 <div></div>   
)

}

export default FormFormat;