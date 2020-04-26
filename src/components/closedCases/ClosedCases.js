import Navigation from "../navigation/Navigation";
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";
import "./ClosedCases.css";
import ClipLoader from "react-spinners/ClipLoader";
import SideDrawer from "../sideDrawer/SideDrawer";
import Backdrop from "../backdrop/Backdrop";
import TableC from "../tableC/TableC";
import { css } from "@emotion/core";
import FilterC from "../filterC/filterC";

function ClosedCases(props) {
    const brigadistas = useSelector(state => state.brigada);
    const allCases = useSelector(state => state.casos);
    console.log(allCases);
    const counter = useRef(0);
    const [loading, setLoading] = useState(false);
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
    const [filterName, setFilterName] = useState("");
    const [showName, setShowName] = useState(false);
    const [filterPlace, setFilterPlace] = useState("");
    const [showPlace, setShowPlace] = useState(false);
    const [filterCategory, setFilterCategory] = useState("");
    const [showCategory, setShowCategory] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const [filterDate, setFilterDate] = useState("");
    const [lowerDateRange, setLowerDateRange] = useState(0);
    const [upperDateRange, setUpperDateRange] = useState(0);
    const [heightHandler, setHeightHandler] = useState(false);
    const [indexShow, setIndexShow] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [field, setField] = useState(null);
    const [option, setOption] = useState(null);

    const drawerToggleClickHandler = () => {
        setSideDrawerOpen(!sideDrawerOpen);
    };
    const override = loading
        ? css`
              display: block;
              margin: 0 auto;
              border-color: red;
              margin-top: 30vh;
          `
        : css`
              display: none;
          `;
    /*
    app.auth().onAuthStateChanged(user => {
        // Para llevarlo a login window si no está conectado
        if (
            !user ||
            brigadistas.currentBrigadeRole === "Brigadista" ||
            brigadistas.currentBrigadeRole === ""
        ) {
            props.history.push("/");
        }
    });
    */
    const allCasesOrganized =
        allCases.length > 0 &&
        allCases.sort(
            (a, b) =>
                new Date(b.inicioFecha).getTime() -
                new Date(a.inicioFecha).getTime()
        );
    console.log(allCasesOrganized);
    const photoLoader = length => {
        counter.current += 1;

        if (counter.current >= length * 2) {
            setLoading(false);
        }
    };

    const handleCalendarHeight = () => {
        setHeightHandler(true);
    };
    const secondHandler = () => {
        setHeightHandler(false);
    };

    const dateOutput = date => {
        console.log(date);
        setLowerDateRange(new Date(date[0]).getTime());
        setUpperDateRange(new Date(date[1]).getTime());
    };

    useEffect(() => {
        if (filterDate) {
            filterNow(field, option, true);
        }
        if (filterCategory) {
            filterNow(field, option, true);
        }
        if (filterName) {
            filterNow(field, option, true);
        }
        if (filterPlace) {
            filterNow(field, option, true);
        }
    }, [indexShow]);
    const indexChangerUp = length => {
        if (currentPage < Math.ceil(length / 10)) {
            setIndexShow(indexShow + 10);
            setCurrentPage(currentPage + 1);
        }
    };

    const indexChangerDown = () => {
        if (indexShow >= 10) {
            setIndexShow(indexShow - 10);
            setCurrentPage(currentPage - 1);
        }
    };

    const filterNow = (field, option, bool) => {
        setField(field);
        setOption(option);
        if (!bool) {
            setCurrentPage(1);
            setIndexShow(0);
        }

        if (option.label === "Nombre") {
            setShowPlace(false);
            setShowCategory(false);
            setShowName(true);
            setShowDate(false);
            setFilterName(
                allCases
                    .filter(
                        data =>
                            data.active === false &&
                            data.nombre + " " + data.apellido === field.label
                    )
                    .map((item, index) => {
                        const length = allCases.filter(
                            data =>
                                data.active === false &&
                                data.nombre + " " + data.apellido ===
                                    field.label
                        ).length;

                        if (0 + indexShow <= index && index <= indexShow + 10) {
                            return (
                                <TableC
                                    index={index}
                                    photoLoader={photoLoader}
                                    item={item}
                                    length={length}
                                />
                            );
                        }
                    })
            );
        } else if (option.label === "Lugar") {
            setShowPlace(true);
            setShowCategory(false);
            setShowName(false);
            setShowDate(false);
            setFilterPlace(
                allCases
                    .filter(
                        data =>
                            data.active === false && data.lugar === field.label
                    )
                    .map((item, index) => {
                        const length = allCases.filter(
                            data =>
                                data.active === false &&
                                data.lugar === field.label
                        ).length;
                        if (0 + indexShow <= index && index <= indexShow + 10) {
                            return (
                                <TableC
                                    index={index}
                                    photoLoader={photoLoader}
                                    item={item}
                                    length={length}
                                />
                            );
                        }
                    })
            );
        } else if (option.label === "Categoría") {
            setShowPlace(false); // Acuerda de agregar nuevas cosas y cambiar estados
            setShowCategory(true);
            setShowName(false);
            setShowDate(false);
            setFilterCategory(
                allCases
                    .filter(
                        data =>
                            data.active === false &&
                            data.categoria === field.label
                    )
                    .map((item, index) => {
                        const length = allCases.filter(
                            data =>
                                data.active === false &&
                                data.categoria === field.label
                        ).length;
                        if (0 + indexShow <= index && index <= indexShow + 10) {
                            return (
                                <TableC
                                    index={index}
                                    photoLoader={photoLoader}
                                    item={item}
                                    length={length}
                                />
                            );
                        }
                    })
            );
        } else if (option.label === "Fecha") {
            console.log("Filtered by date");
            setShowPlace(false);
            setShowCategory(false);
            setShowName(false);
            setShowDate(true);
            console.log();
            setFilterDate(
                allCases
                    .filter(
                        data =>
                            data.active === false &&
                            lowerDateRange <=
                                new Date(
                                    data.inicioFecha.split(" ", 1)
                                ).getTime() &&
                            upperDateRange >=
                                new Date(
                                    data.inicioFecha.split(" ", 1)
                                ).getTime()
                    )
                    .map((item, index) => {
                        const length = allCases.filter(
                            data =>
                                data.active === false &&
                                lowerDateRange <=
                                    new Date(
                                        data.inicioFecha.split(" ", 1)
                                    ).getTime() &&
                                upperDateRange >=
                                    new Date(
                                        data.inicioFecha.split(" ", 1)
                                    ).getTime()
                        ).length;
                        if (0 + indexShow <= index && index <= indexShow + 10) {
                            return (
                                <TableC
                                    index={index}
                                    photoLoader={photoLoader}
                                    item={item}
                                    length={length}
                                />
                            );
                        }
                    })
            );
        }
    };

    useEffect(() => {
        console.log(indexShow);
        console.log(filterPlace.length);
    }, [filterPlace]);

    let showArray =
        allCases.length > 0 &&
        allCases
            .filter(data => data.active === false)
            .map((item, index) => {
                const length = allCases.filter(data => data.active === false)
                    .length;
                if (0 + indexShow <= index && index <= indexShow + 10) {
                    return (
                        <TableC
                            index={index}
                            photoLoader={photoLoader}
                            item={item}
                            length={length}
                        />
                    );
                }
            });

    return (
        <div style={{ overflow: "hidden", height: "100vh", width: "100vw" }}>
            <Navigation sideFunction={drawerToggleClickHandler} />
            {sideDrawerOpen && <Backdrop click={drawerToggleClickHandler} />}
            <SideDrawer
                shown={sideDrawerOpen}
                click={drawerToggleClickHandler}
            />
            <ClipLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={"#123abc"}
                loading={loading}
            />

            <div
                style={{
                    overflow: "auto",
                    width: "100%",
                    height: "87%",
                    display: loading ? "none" : "block"
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: heightHandler ? "60%" : "20%"
                    }}
                >
                    <FilterC
                        filterNow={filterNow}
                        dateOutput={dateOutput}
                        handleCalendarHeight={handleCalendarHeight}
                        secondHandler={secondHandler}
                    />
                </div>
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
                    {allCases.length > 0 && showName === true
                        ? filterName
                        : showCategory === true
                        ? filterCategory
                        : showPlace === true
                        ? filterPlace
                        : showDate === true
                        ? filterDate
                        : showArray.length > 0 && showArray}
                </table>
                <div
                    style={{
                        width: "100%",
                        height: "3vh",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "1vh"
                    }}
                >
                    <button onClick={() => indexChangerDown()}>Anterior</button>
                    <div style={{ marginLeft: "1vw", marginRight: "1vw" }}>
                        {currentPage} /{" "}
                        {showName === true
                            ? Math.ceil(filterName.length / 10)
                            : showCategory === true
                            ? Math.ceil(filterCategory.length / 10)
                            : showPlace === true
                            ? Math.ceil(filterPlace.length / 10)
                            : showDate === true
                            ? Math.ceil(filterDate.length / 10)
                            : showArray.length > 0 &&
                              Math.ceil(showArray.length / 10)}
                    </div>
                    <button
                        onClick={() =>
                            indexChangerUp(
                                showName === true
                                    ? filterName.length
                                    : showCategory === true
                                    ? filterCategory.length
                                    : showPlace === true
                                    ? filterPlace.length
                                    : showDate === true
                                    ? filterDate.length
                                    : showArray.length > 0 && showArray.length
                            )
                        }
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ClosedCases;
