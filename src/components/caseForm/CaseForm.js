import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import createFilterOptions from "react-select-fast-filter-options";
import firebase from "../../routes/Config";
import { options, optionsPlace, optionsCod, optionsCategory } from "./Options";
import {
  fillPlace,
  fillCode,
  fillCategory,
  fillDescription
} from "../../actions/index";
import CaseFormC from "./CaseFormC";
import HelpFormC from "./HelpFormC";
import HotActiveCase from "./HotActiveCase";

import "./CaseForm.css";

function CaseForm() {
  const brigadistas = useSelector(state => state.brigada);
  const fillCase = useSelector(state => state.fillCase);
  const [optionsMenu, setOptionsMenu] = useState("Generar");
  const dispatch = useDispatch();
  const selectedBrigade = brigadistas.selectedBrigade.map((brigada, index) => (
    <li key={index} className="listele">
      {brigada.nombre + " " + brigada.apellido}
    </li>
  ));

  const filterOptions1 = createFilterOptions({ options });

  function sendCase() {
    //Botón para enviar notificaciones
    firebase.updateCaseBranch(brigadistas.selectedBrigade, fillCase);
    dispatch(fillPlace(null));
    dispatch(fillCode(null));
    dispatch(fillCategory(null));
    dispatch(fillDescription(""));
    setTimeout(() => notifExpired(), 10000);
    firebase.pushNotification(brigadistas.selectedBrigade);
    firebase.resetSelected();
  }

  function notifExpired() {
    firebase.notifExpired(brigadistas.selectedBrigade);
    firebase.updateRejectedCases(brigadistas.selectedBrigade);
  }

  return (
    <div className="allCaseContainer">
      <div className="caseNav">
        <button
          className="optionsCase"
          style={{
            backgroundColor: optionsMenu === "Generar" && "rgb(184, 184, 184)"
          }}
          onClick={() => setOptionsMenu("Generar")}
        >
          Generar Caso
        </button>
        <button
          className="optionsCase"
          style={{
            backgroundColor: optionsMenu === "Apoyo" && "rgb(184, 184, 184)"
          }}
          onClick={() => setOptionsMenu("Apoyo")}
        >
          Apoyo
        </button>
        <button
          className="optionsCase"
          style={{
            backgroundColor: optionsMenu === "InfoCaso" && "rgb(184, 184, 184)"
          }}
          onClick={() => setOptionsMenu("InfoCaso")}
        >
          Info. Casos
        </button>
      </div>
      {optionsMenu === "Generar" ? (
        <CaseFormC
          selectedBrigade={selectedBrigade}
          options={options}
          optionsPlace={optionsPlace}
          optionsCod={optionsCod}
          optionsCategory={optionsCategory}
          fillCase={fillCase}
          filterOptions1={filterOptions1}
          sendCase={sendCase}
        />
      ) : optionsMenu === "Apoyo" ? (
        <HelpFormC />
      ) : (
        <HotActiveCase />
      )}
    </div>
  );
}

export default CaseForm;
