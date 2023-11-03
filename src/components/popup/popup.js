import Handlebars from "handlebars";
import template from "./popup.tmpl.js"
import "./popup.css"

export default (props) => {
    const defaultProps = {
        title: "",
        body: "button"
    };
    props = {
        ...defaultProps,
        ...props
    }

    return Handlebars.compile(template)(props);
}
