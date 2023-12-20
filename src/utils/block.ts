import { v4 as makeUUID } from 'uuid';
import handlebars from 'handlebars';
import EventBus from './eventBus';

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_RENDER = 'flow:render',
  FLOW_CDU = 'flow:component-did-update'
}

type objectType = Record<string, unknown>;

export default class Block {
  static EVENTS = EVENTS;

  props: objectType;

  children: Record<string, Block>;

  lists: Record<string, []>;

  eventBus: () => EventBus;

  _id = makeUUID();

  _element: HTMLElement | null = null;

  _meta: { tagName: string, props: objectType };

  constructor(tagName = 'div', propsAndChildren: objectType = {}) {
    this._id = makeUUID();

    const { children, props, lists } = this._getChildren(propsAndChildren);
    this.children = this._makePropsProxy(children) as Record<string, Block>;
    this.props = this._makePropsProxy({ ...props, _id: this._id });
    this.lists = this._makePropsProxy(lists) as Record<string, []>;

    this._meta = { tagName, props };

    const eventBus = new EventBus();
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildren(propsAndChildren: objectType) {
    const children: Record<string, Block | Block[]> = {};
    const props: objectType = {};
    const lists: objectType = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, 'init');
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id!);
    return element;
  }

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldState: objectType = {}) {
    const state = {
      props: { ...this.props },
      children: { ...this.children },
      lists: { ...this.lists },
    };

    if (this.componentDidUpdate(state, oldState)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER, { oldProps: oldState.props }, 'componentDidUpdate');
    }
  }

  componentDidUpdate(oldProps: objectType, newProps: objectType) {
    return !this._deepEqual(oldProps, newProps);
  }

  setProps = (newProps: objectType) => {
    if (!newProps) {
      return;
    }

    const oldState = {
      props: { ...this.props },
      children: { ...this.children },
      lists: { ...this.lists },
    };

    const { children, props, lists } = this._getChildren(newProps);

    Object.assign(this.props, props);
    Object.assign(this.children, children);
    Object.assign(this.lists, lists);

    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldState);
  };

  _makePropsProxy(props: objectType) {
    return new Proxy(props, {
      get: (target, prop: string) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop: string, value) => {
        target[prop] = value;
        return true;
      },
    });
  }

  get element() {
    return this._element;
  }

  _render(options: objectType = {}) {
    const block = this.render();

    if (options && options.oldProps) {
      this._removeEvents(options.oldProps);
    }

    this._element!.innerHTML = '';
    if (this.props.className) {
      this._element!.className = this.props.className as string;
    }

    if (this.props.attr) {
      Object.entries(this.props.attr).forEach(([key, value]) => {
        this._element!.setAttribute(key, value);
      });
    }

    this._element!.appendChild(block);

    this._addEvents();
  }

  render() {
    return this.compile('', this.props);
  }

  compile(template: string, props: objectType) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id=list_${key}></div>`;
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      stub!.replaceWith(child.getContent() as Node);
    });

    Object.entries(this.lists).forEach(([key, list]) => {
      const stub = fragment.content.querySelector(`[data-id=list_${key}]`);

      if (!stub) {
        return;
      }

      const listContent = this._createDocumentElement('template') as HTMLTemplateElement;

      list.forEach((item: Block | unknown) => {
        if (item instanceof Block) {
          listContent.content.append(item.getContent() as Node);
        } else {
          listContent.content.append(`${item}`);
        }
      });

      stub!.replaceWith(listContent.content);
    });

    return fragment.content;
  }

  _addEvents() {
    const { events = {} } = this.props as {
      events: Record<string, () => void>;
    };

    Object.keys(events).forEach((eventName) => {
      events[eventName] = events[eventName].bind(this);
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents(oldProps: { events?: {}}) {
    const { events = {} } = oldProps as {
      events: Record<string, () => void>;
    };

    Object.keys(events).forEach((eventName) => {
      this._element!.removeEventListener(eventName, events[eventName]);
    });
  }

  getContent() {
    return this.element;
  }

  show() {
    this.getContent()!.style.display = 'block';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }

  _deepEqual(object1: objectType, object2: objectType) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    let equal = true;
    keys1.forEach((key) => {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = this._isObject(val1) && this._isObject(val2);
      if (
        (areObjects && !this._deepEqual(val1, val2))
        || (!areObjects && val1 !== val2)
      ) {
        equal = false;
      }
    });
    return equal;
  }

  _isObject(value: unknown): value is objectType {
    return value != null && typeof value === 'object';
  }
}
