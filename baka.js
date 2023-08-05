/// baka.js
/// 
/// # How to use
/// ```js
/// let arr = [1, 2, 3, 4];
/// let root = Div(
///     Div(
///         Id("root"),
///         Class("center"),
///         Div(
///             Class(["bigger", "faster"]),
///             Text("hello")
///         ),
///         Div(Text("world")),
///         List(
///             ListType.Ul,
///             arr,
///             (e) => { return Div(Text(e)); }
///         ),
///         Button(
///             Text("Click Me!"),
///             EventListener(
///                 "click",
///                 () => { console.log("click!"); }
///             )
///         ),
///     )
/// );
///
/// render_to("root", root);
/// ```

//////////////////////////////////////////////////////////////////////////////////////////
// Attributes

///
const ClassTag = class {
    constructor(name) {
        this.name = name;
    }
};

///
const IdTag = class {
    constructor(name) {
        this.name = name;
    }
};

///
const EventListenerTag = class {
    constructor(type, fn) {
        this.type = type;
        this.fn = fn;
    }
};

///
const add_attributes = (html_element, ...attributes) => {
    for (const attribute of attributes) {
        if (attribute instanceof ClassTag) {
            const name = attribute.name;
            if (Array.isArray(name)) {
                for (const n of name) {
                    html_element.classList.add(n);
                }
            } else {
                html_element.classList.add(name);
            }
        } else if (attribute instanceof IdTag) {
            html_element.id = attribute.name;
        } else if (attribute instanceof EventListenerTag) {
            html_element.addEventListener(attribute.type, attribute.fn)
        }
    }
};

///
const Class = (name) => {
    return new ClassTag(name);
};

///
const Id = (name) => {
    const typeof_name = typeof name;
    console.assert(
        (typeof_name == "string"),
        "`name` must be a type of a string"
    );

    return new IdTag(name);
};

///
const EventListener = (type, fn) => {
    const typeof_type = typeof type;
    console.assert(
        (typeof_type == "string"),
        "`type` must be a type of a string"
    );

    return new EventListenerTag(type, fn);
};

//////////////////////////////////////////////////////////////////////////////////////////
// Elements

///
const Div = (...elements) => {
    const div = document.createElement("div");
    for (const element of elements) {
        if (element instanceof HTMLElement) {
            div.appendChild(element);
        }
    }

    add_attributes(div, ...elements);
    return div;
};

///
const Text = (text, ...attributes) => {
    const typeof_text = typeof text;
    console.assert(
        (typeof_text == "string") || (typeof_text == "number"),
        "`text` must be a type of string or number"
    );

    const div = document.createElement("text");
    div.innerText = text;

    add_attributes(div, ...attributes);
    return div;
};

///
const Span = (...elements) => {
    const span = document.createElement("span");
    for (const element of elements) {
        if (element instanceof HTMLElement) {
            span.appendChild(element);
        }
    }

    add_attributes(span, ...elements);
    return span;
};

///
const ListType = {
    Ol: "ol",
    Ul: "ul",
};

///
const List = (type, array, map, ...attributes) => {
    const list_type = (() => {
        switch (type) {
            case ListType.Ol:
                return "ol";
            case ListType.Ul:
                return "ul";
            default: {
                console.assert(true, "Invalid list type");
            }
        }
    })();

    const list = document.createElement(list_type);
    for (const e of array) {
        const map_result = map(e);
        console.assert(
            map_result instanceof HTMLElement,
            "`map_result` must be a type of `HTMLElement`"
        );

        const html_element = Div(map_result);
        list.appendChild(html_element);
    }

    add_attributes(list, ...attributes);
    return list;
};

///
const Button = (child, ...attributes) => {
    console.assert(
        child instanceof HTMLElement,
        "`child` must be a type of `HTMLElement`"
    );

    const button = document.createElement("button");
    button.appendChild(child);

    add_attributes(button, ...attributes);
    return button;
};

//////////////////////////////////////////////////////////////////////////////////////////
// Helper functions

///
const render_to = (id, html_element) => {
    const typeof_id = typeof id;
    console.assert(
        (typeof_id == "string"),
        "`id` must be a type of a string"
    );

    const element = document.getElementById(id);
    console.assert(element !== null, "invalid id");
    element.appendChild(html_element);
}
