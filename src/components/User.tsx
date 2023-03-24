import React from "react";
import {IContact} from "../data/contacts";

export const User = (props: IContact) => {
    return (
        <div>
            <h2>{props.id}</h2>
            <h2>{props.name}</h2>
            <h2>{props.phone}</h2>
            <h2>{props.email}</h2>
            <h2>{props.age}</h2>
        </div>
    );
}