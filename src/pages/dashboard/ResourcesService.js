import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import MainLayout from "../layout/MainLayout";
import MenuItemsService from "../../services/MenuItemsService";
import DashboardCard from "../../components/cards/DashboardCard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflowX: "hidden",
  },
  
  resources: {
    marginTop: '180px',
    marginLeft: "90px",
  },

}));

export default function ResourcesService() {
  const classes = useStyles();
  const menuItems = MenuItemsService();
  

  return (
    <div className={classes.root}>
      <MainLayout />
      <div className={classes.resources}>
        {menuItems.map((menuItem) => {
          return <DashboardCard
            icon={menuItem.icon}
            to={menuItem.to}
            key={menuItem.label}
            label={menuItem.label}
        />
        })}
        </div>    
  </div>
  );
};