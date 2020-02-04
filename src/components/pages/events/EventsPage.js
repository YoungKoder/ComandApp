import React, { Component,Fragment,useState} from "react"
import Navbar from "../../layout/navbar/Navbar";
import Sidebar from "../../layout/sidebar/Sidebar";
import EventsAdding from "./EventsAdding";
import EventsList from "./EventsList";
import classes from "./NewsPage.module.css";
//import "./EventsPage.css";




export default function EventsPage (){
    
    
        return (
         <>
            
            <Navbar/>
            <div className={classes.content}>

                <Sidebar/>
                <main >       
    
                  <EventsAdding/>
                  <EventsList/>
                </main>
                
            </div>
        
        </>
        )
      
}