import Typography from '@material-ui/core/Typography';
import commerceLogo from '../../assets/Logo__Standard_RGB.png';
import { Link } from 'react-router-dom';

function Copyright() {
    return (
      <footer id="copyrightFooter">
        <img src={commerceLogo} alt="WA Commerce Department logo"/>
        <Typography variant="body2" color="textSecondary" align="left">
          {/* {'Copyright © '} {' '} 
          {new Date().getFullYear()}
          {'.'}*/}
          
          Designed and developed by <Link color="inherit" href="https://ischool.uw.edu/capstone">Team kala</Link> for a WA Dept. Commerce + UW project. 
          
        </Typography>
      </footer>
    );
  }

  export default Copyright;