import PeopleIcon from '@material-ui/icons/People';
import StorageIcon from '@material-ui/icons/Storage';



export default function MenuItemsService()
{
    let menuItems = [];

    
        menuItems.push({
            label: 'Пользователи',
            to: '/users',
            icon: PeopleIcon
        });
   

    
        menuItems.push({
            label: 'Ресурсы',
            to: '/resourcesList',
            icon: StorageIcon
        });
  

    
        
    

    return menuItems;
}