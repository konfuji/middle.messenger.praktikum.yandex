import Handlebars from "handlebars";
import template from "./input.tmpl.js"
import "./input.css"

export default (props) => {
    const defaultProps = {
        type: "text",
        name: "",
        value: "",
        placeholder: "Placeholder",
        classes: ""
    };
    props = {
        ...defaultProps,
        ...props
    }

    return Handlebars.compile(template)(props);
}
