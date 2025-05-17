import NavBar from '../navBar';
import {Outlet} from 'react-router-dom';

const Layout = () =>{
    return(
        <div>
            <NavBar/>
            <main>
                {<Outlet/>  /*всі сторінки зможуть мати меню, вони = children цього файлу*/}

            </main>
        </div>
    )
}

export default Layout;
