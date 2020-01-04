import React, { useEffect, useState } from "react";
import Navigation from "../navigation/Navigation";
import { useSelector, useDispatch } from "react-redux";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";
import "./ClosedCases.css";
function ClosedCases(props) {
    const allCases = useSelector(state => state.casos);

    let closedCases = allCases.filter(data => data.active === false);
    console.log(closedCases);
    app.auth().onAuthStateChanged(user => {
        // Para llevarlo a login window si no está conectado
        if (!user) {
            props.history.push("/");
        }
    });

    let displayClosedCases = closedCases.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.nombre + " " + item.apellido}</td>

                <td>
                    <div style={{ flexDirection: "column" }}>
                        <div>Lugar: {item.lugar}</div>
                        <div>Código: {item.codigo}</div>
                        <div>Categoría: {item.categoria}</div>
                        <div>Comienzo: {item.inicioFecha}</div>
                        <div>Fin: {item.finalFecha}</div>
                        <div>Tiempo Total: {item.formatTime}</div>
                    </div>
                </td>
                <td>
                    <div>{item.descripcion}</div>
                </td>
                <td>
                    <div style={{ flexDirection: "column", display: "flex" }}>
                        {item.bombero && <div>Bombero</div>}
                        {item.ambulancia && <div>Ambulancia</div>}
                        {item.camilla && <div>Camilla</div>}
                        {item.extintor && <div>Extintor</div>}
                        {item.policia && <div>Policía</div>}
                        {item.apoyo && <div>Apoyo</div>}
                    </div>
                </td>
                <td>
                    <div>No disponible por el momento.</div>
                </td>
                <td>{item.descBrigadista}</td>
                <td>
                    <a href={item.image1} target="_blank">
                        <img src={item.image1} height="100" width="100" />
                    </a>
                    <a href={item.image2} target="_blank">
                        <img src={item.image2} height="100" width="100" />
                    </a>
                </td>
            </tr>
        );
    });
    return (
        <div style={{ overflow: "hidden", height: "100vh", width: "100vw" }}>
            <Navigation />
            <div style={{ overflow: "auto", width: "100%", height: "87%" }}>
                <table className="tableClosed">
                    <tr>
                        <th>Brigadista</th>
                        <th>Detalles</th>
                        <th>Descripción</th>
                        <th>Apoyos</th>
                        <th>Otros Brigadistas</th>
                        <th>Proceder</th>
                        <th>Fotos</th>
                    </tr>
                    {displayClosedCases}
                </table>
            </div>
        </div>
    );
}

export default ClosedCases;
