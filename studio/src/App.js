import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Components/Home";
import Album from "./Components/Album";
import Booking from "./Components/Booking";
import BookingDetails from "./Components/BookingDetails";
import Order from "./Components/DecorativeItems";
import PhotoEdit from "./Components/PhotoEdit";
import LogoDesign from "./Components/LogoDesign";
import DecorativeItems from "./Components/DecorativeItems";
import PersonalizedItems from "./Components/PersonalizedItems";
import ProductDetails from "./Components/ProductDetails";
import Token from "./Components/Token";
import Cart from "./Components/Cart";
import CheckOut from "./Components/CheckOut";
import ClientOrderDetails from "./Components/ClientOrderDetails";
import GraphicDesignerDetails from "./Components/GraphicDesignerDetails";
import Search from "./Components/Search";
import Comments from "./Components/Comments";

// For admin
import Dashboard from "./Components/Admin/Dashboard";
import Employees from "./Components/Admin/Employee/Employees";
import AddEmployees from "./Components/Admin/Employee/AddEmployee";
import EmployeeDetails from "./Components/Admin/Employee/EmployeeDetails";
import Orders from "./Components/Admin/Orders/Orders";
import OrderDetails from "./Components/Admin/Orders/OrderDetails";
import Events from "./Components/Admin/Events/Events";
import EventDetails from "./Components/Admin/Events/EventDetails";
import Items from "./Components/Admin/Items/Items";
import AddItem from "./Components/Admin/Items/AddItem";
import ItemDetails from "./Components/Admin/Items/ItemDetails";
import Albums from "./Components/Admin/Album/Albums";
import AlbumDetails from "./Components/Admin/Album/AlbumDetails";
import AddAlbum from "./Components/Admin/Album/AddAlbum";
import Graphics from "./Components/Admin/Graphics/Graphics";
import GraphicDetails from "./Components/Admin/Graphics/GraphicDetails";
import DeliveryManagement from "./Components/Admin/Delivery/DeliveryManagement";
import DeliveryDetails from "./Components/Admin/Delivery/DeliveryDetails";
import Login from "./Components/Admin/Login";
import Tokens from "./Components/Admin/Token/Tokens";
import TokenDetails from "./Components/Admin/Token/TokenDetails";
import ViewComments from "./Components/Admin/Album/ViewComments";

// For delivery
import Deliveries from "./Components/Admin/Delivery/Deliveries";
import Details from "./Components/Admin/Delivery/Details";

// For graphics design
import GraphicsDesign from "./Components/Admin/Graphics/GraphicsDesign";
import GraphicsDesignDetails from "./Components/Admin/Graphics/GraphicsDesignDetails";

// For photography and videography
import EventAssign from "./Components/Admin/Events/EventAssign";
import EventAssignDetails from "./Components/Admin/Events/EventAssignDetails";

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>

          {/* Routes for client side */}
          <Route exact path='/' component={Home} />
          <Route exact path='/Album' component={Album} />
          <Route exact path='/Album/Comment' component={Comments} />
          <Route exact path='/Booking' component={Booking} />
          <Route exact path='/Booking/Details' component={BookingDetails} />
          <Route exact path='/Order' component={Order} />
          <Route exact path='/Order/Details' component={ClientOrderDetails} />
          <Route exact path='/GraphicDesigner/PhotoEdit' component={PhotoEdit} />
          <Route exact path='/GraphicDesigner/LogoDesign' component={LogoDesign} />
          <Route exact path='/GraphicDesigner/GraphicDesignerDetails' component={GraphicDesignerDetails} />
          <Route exact path='/Order/DecorativeItems' component={DecorativeItems} />
          <Route exact path='/Order/PersonalizedItems' component={PersonalizedItems} />
          <Route exact path='/Order/ProductDetails' component={ProductDetails} />
          <Route exact path='/Token' component={Token} />
          <Route exact path='/Cart' component={Cart} />
          <Route exact path='/CheckOut' component={CheckOut} />
          <Route exact path='/Search' component={Search} />

          {/* Routes for admin side */}
          <Route exact path='/Login' component={Login} />
          <Route exact path='/Admin' component={Dashboard} />
          <Route exact path='/Admin/Employees' component={Employees} />
          <Route exact path='/Admin/Employees/AddEmployee' component={AddEmployees} />
          <Route exact path='/Admin/Employees/EmployeeDetails' component={EmployeeDetails} />
          <Route exact path='/Admin/Orders' component={Orders} />
          <Route exact path='/Admin/Orders/OrderDetails' component={OrderDetails} />
          <Route exact path='/Admin/Events' component={Events} />
          <Route exact path='/Admin/Events/EventDetails' component={EventDetails} />
          <Route exact path='/Admin/Items' component={Items} />
          <Route exact path='/Admin/Items/AddItem' component={AddItem} />
          <Route exact path='/Admin/Items/ItemDetails' component={ItemDetails} />
          <Route exact path='/Admin/Albums' component={Albums} />
          <Route exact path='/Admin/Albums/AddAlbum' component={AddAlbum} />
          <Route exact path='/Admin/Albums/AlbumDetails' component={AlbumDetails} />
          <Route exact path='/Admin/Albums/ViewComments' component={ViewComments} />
          <Route exact path='/Admin/Graphics' component={Graphics} />
          <Route exact path='/Admin/Graphics/GraphicDetails' component={GraphicDetails} />
          <Route exact path='/Admin/Delivery' component={DeliveryManagement} />
          <Route exact path='/Admin/Delivery/DeliveryDetails' component={DeliveryDetails} />
          <Route exact path='/Admin/Token' component={Tokens} />
          <Route exact path='/Admin/Token/TokenDetails' component={TokenDetails} />

          {/* Routes for delivery persons */}
          <Route exact path='/Delivery' component={Deliveries} />
          <Route exact path='/Delivery/Details' component={Details} />

          {/* Routes for graphic designers */}
          <Route exact path='/GraphicsDesign' component={GraphicsDesign} />
          <Route exact path='/GraphicsDesign/GraphicsDesignDetails' component={GraphicsDesignDetails} />

          {/* Routes for photography and videography */}
          <Route exact path='/EventAssign' component={EventAssign} />
          <Route exact path='/EventAssign/EventAssignDetails' component={EventAssignDetails} />


        </Switch>
      </div>
    </Router>
  );
}

export default App;