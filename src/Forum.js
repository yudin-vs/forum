import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const axios = require("axios").default;



export function Forum(props) {
  // const navigate = useNavigate();
  const apiUrl = "http://forum.zyranov.ru/web/api";
  const [topics, setTopics] = useState([]);

  let token = sessionStorage.getItem("token");
  token = JSON.parse(token);
  console.log(token);
  axios
    .get(`${apiUrl}/topics`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    .then(function(response) {
      console.log(response);
      setTopics(response.data);
      
    })
    .catch(function(err) {
      console.log(err);
    });

        const rows = topics.map((topic,index) => {
         return <tr key={index}>
         <td>{topic.id}</td>
         <td>{topic.title}</td>
         <td>{topic.user}</td>
         <td>{topic.created}</td>
        </tr>
       });
         return <div>
           <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
           <table>
           <thead>
             <tr>
               <td>id</td>
               <td>title</td>
               <td>user</td>
               <td>created</td>
             </tr>
           </thead>
           <tbody>
             {rows}
           </tbody>
         </table>
         </div>
     
     
      
    };

    
  

