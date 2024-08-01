import "../Style/Navbar.css"
import { Button } from "@mui/material";

const Navbar = () => {
  return ( 
    <div className="navbar-container">
      <header>
        <img src="pandas-icon.png" alt="" />
        <h1>Pandas UI</h1>
      </header>
      <Button variant="text">Data Analysis</Button>
      <Button variant="text">Graphs</Button>
      <Button variant="text">Machine learning</Button>
      <Button variant="text">Predictions</Button>
    </div>
   );
}
 
export default Navbar;