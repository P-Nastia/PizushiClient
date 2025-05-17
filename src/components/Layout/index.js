import Header from '../header';
import {Outlet} from 'react-router-dom';

const Layout = () =>{
    return(
        <div>
            <Header/>
            <main>
                {<Outlet/>  /*всі сторінки зможуть мати меню, вони = children цього файлу*/}

            </main>
        </div>
    )
}

export default Layout;
