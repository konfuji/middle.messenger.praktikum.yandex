import Handlebars from "handlebars";
import template from "./button.tmpl.js"
import "./button.css"

export default (props) => {
    const defaultProps = {
        classes: "",
        type: "button",
        text: "Button"
    };
    props = {
        ...defaultProps,
        ...props
    }

    return Handlebars.compile(template)(props);
}
