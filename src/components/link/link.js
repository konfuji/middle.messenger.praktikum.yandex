import Handlebars from "handlebars";
import template from "./link.tmpl.js"
import "./link.css"

export default (props) => {
    const defaultProps = {
        href: "#",
        classes: "",
        text: "link"
    };
    props = {
        ...defaultProps,
        ...props
    }

    return Handlebars.compile(template)(props);
}
