import React, { useEffect, useRef, useState } from "react";
import style from "./index.module.scss";
import useMousePosition from "./useMousePosition";

type CustomCursorProps = {
    color?:string
    isShow?:boolean
};


const CustomCursor = ({ color,isShow }: CustomCursorProps) => {
    const { clientX, clientY } = useMousePosition();

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                pointerEvents: "none",
            }}
        >
            <div
                className={`${style.cursor} ${isShow ? style.showCursor:""} ${color === "white"? style.white : ""}`}
                style={{
                    left: clientX,
                    top: clientY,
                }}
            >
                <span className={`${style.cursorText} ${color === "white"? style.white : ""}`}>
                    Drag
                </span>
            </div>
        </div>
    );
};

export default CustomCursor;
