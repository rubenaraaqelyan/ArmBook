import React from "react";
import {useHistory} from "react-router";

export default function Redirect(url) {
    const history = useHistory();
    history.push(`${url}`)
}
