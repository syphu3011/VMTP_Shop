import AppRoutes from '../../routes/routes';
import React from 'react';
export default class PageContent extends React.Component{
     render(){
          return(
               <div className="pageContent">
                    <AppRoutes/>
               </div>
          )
     }
}