import Handlebars from "handlebars";
import template from "./chat.tmpl.js";
import "./chat.css";

Handlebars.registerHelper("breaklines", function(text) {
    text = Handlebars.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, "<br>");
    return new Handlebars.SafeString(text);
});

export default (props) => {
    const defaultProps = {
        title: "chatTitle",
        timestamp: "timestamp",
        lastMessage: "lastMessage",
        unreadCount: 0
    };
    props = {
        ...defaultProps,
        ...props
    }

    return Handlebars.compile(template)(props);
}
