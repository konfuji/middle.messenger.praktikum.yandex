import Handlebars from "handlebars";
import template from "./profile.tmpl.js"
import "./profile.css"

import link from "../../components/link/link.js";
import popup from "../../components/popup/popup.js";

export default (props = {}) => {
    props.changePicLink = link({text: "Сменить фото"});
    props.fields = [
        {title: "Почта", value: "konfuji@yandex.ru"},
        {title: "Логин", value: "konfuji"},
        {title: "Имя", value: "Александр"},
        {title: "Фамилия", value: "Привалов"},
        {title: "Имя в чате", value: "Александр П."},
        {title: "Телефон", value: "03"},
    ];
    props.links = [
        link({href: "/profile-edit", text: "Изменить данные"}),
        link({text: "Изменить пароль"}),
        link({href: "/", classes: "link_red", text: "Выйти"}),
    ];

    const popupProps = {
        title: "Профиль",
        body: Handlebars.compile(template)(props)
    };

    return popup(popupProps);
}
