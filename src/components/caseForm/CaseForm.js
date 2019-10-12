import React from "react";
import { useSelector } from "react-redux";
import firebase from "../../routes/Config";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";
import './CaseForm.css'
import _ from "lodash";

function CaseForm() {
  const brigadistas = useSelector(state => state.brigada);
  const selectedBrigade = brigadistas.selectedBrigade.map((brigada,index) =>
  <li key={index} className="listele">{brigada.Email}</li>
  )
  let fetch = require("node-fetch"); // Para hacer el http request

  return (
   
    <div className="bod">
      <ul className ="list">
          {selectedBrigade}
      </ul>
      <button className ="but" onClick={sendCase}>Send Case</button>
    </div>
    
  );

  
  function resetSelected() {
    // Para al refrescar la página deseleccionar todos los marcadores
    return app
      .database()
      .ref("/Users")
      .once("value", snapshot => {
        const fireData = _.toArray(snapshot.val());
        fireData.forEach(child => {
          app
            .database()
            .ref("/Users/" + child.UID)
            .update({
              selected: false
            });
        });
      });
  }

  function sendCase() {
    //Botón para enviar notificaciones
    const PUSH_ENDPOINT = "https://exp.host/--/api/v2/push/send";
    let data = {
      to: brigadistas.selectedBrigade.map(brigada => brigada.Expotoken),
      title: "Carlos es un bollito",
      body: "Vale",
      sound: "default",
      data: {
        name: "Mañe",
        ape: "Towers"
      },
      priority: "high"
    };

    fetch(PUSH_ENDPOINT, {
      mode: "no-cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).catch(err =>
      alert("No ha seleccionado un brigadista o no hay conexión a internet.")
    );
    resetSelected();
  }




}

export default CaseForm;
