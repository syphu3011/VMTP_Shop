import MenuRight from "./menuRight";
import MenuLeft from "./menuLeft";
import React from "react";
interface HeaderProps {
     isLogin: boolean;
   }
class Header extends React.Component<HeaderProps> {
     state = {
          prevScrollPos: window.screenY,
          isVisible: true,
          isLogin: false
        };
      
        componentDidMount() {
          window.addEventListener("scroll", this.handleScroll);
        }
      
        componentWillUnmount() {
          window.removeEventListener("scroll", this.handleScroll);
        }
      
        handleScroll = () => {
          const { prevScrollPos } = this.state;
          const currentScrollPos = window.scrollY;
          const isVisible = prevScrollPos > currentScrollPos || currentScrollPos === 0;
          this.setState({
            prevScrollPos: currentScrollPos,
            isVisible,
            isLogin: this.state.isLogin
          });
        };
     render(){
          const { isVisible } = this.state;
          return(
               <div className="appHeader">
                    <div className="promotionHeader">
                         <p>Giảm giá lên đến <h3>57%</h3> cho khách hàng VIP</p>
                    </div>
                    <div className={`menuHeader ${isVisible ? "visible" : "hidden"}`}>
                         <div className ="menu" >
                              <MenuLeft />
                              <MenuRight isLogin={this.props.isLogin}/>
                         </div>
                         
                    </div>
                    
               </div>
               
               
          )
     }
}
export default Header;