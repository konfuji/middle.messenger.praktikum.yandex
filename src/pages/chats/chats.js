import Handlebars from "handlebars";
import template from "./chats.tmpl.js"
import "./chats.css"

import input from "../../components/input/input.js";
import chat from "../../components/chat/chat.js";

export default (props = {}) => {
    props.inputSearch = input({name: "search", placeholder: "Поиск"});

    props.chats = [
        chat({title: "Яндекс Плюс", timestamp: "16:52", lastMessage: "Баллы Плюса — это кешбэк баллами, который вы получаете в сервисах Яндекса за поездки, покупки, заказы и развлечения", unreadCount: 2}),
        chat({title: "Яндекс Директ", timestamp: "14:30", lastMessage: "Здравствуйте! \nЗдесь вы можете задать свой вопрос по Директу."}),
        chat({title: "Андрей", timestamp: "09:21", lastMessage: "Изображение"}),
        chat({title: "Илья", timestamp: "Вт", lastMessage: "Друзья, у меня для вас особенный выпуск новостей!", unreadCount: 4}),
        chat({title: "Вадим", timestamp: "Сб", lastMessage: "Круто!"}),
        chat({title: "1. 2. 3", timestamp: "24.10.23", lastMessage: "Миллионы россиян ежедневно проводят десятки часов свое..."}),
        chat({title: "Design Destroyer", timestamp: "19.10.23", lastMessage: "В 2008 году художник Jon Rafman начал собирать..."}),
        chat({title: "Day.", timestamp: "13.10.23", lastMessage: "Так увлёкся работой по курсу, что совсем забыл его анонсир..."}),
        chat({title: "Стас Рогозин", timestamp: "01.10.23", lastMessage: "Можно или сегодня или завтра вечером."}),
    ];

    return Handlebars.compile(template)(props);
}
