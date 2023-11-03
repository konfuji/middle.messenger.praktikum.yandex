import Handlebars from "handlebars";
import template from "./error.tmpl.js"
import "./error.css"

import link from "../../components/link/link.js";

export default (props) => {
    const defaultProps = {
        code: "500",
        title: "Мы уже фиксим"
    };
    props = {
        ...defaultProps,
        ...props
    }

    props.link = link({href: "/chats", text: "Назад к чатам"});

    return Handlebars.compile(template)(props);
}