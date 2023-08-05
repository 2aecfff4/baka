# baka
A very small and simple library written in JS that I use to simplify the creation of Anki cards.

# Example
```js
let arr = [1, 2, 3, 4];
let root = Div(
    Div(
        Id("root"),
        Class("center"),
        Div(
            Class(["bigger", "faster"]),
            Text("hello")
        ),
        Div(Text("world")),
        List(
            ListType.Ul,
            arr,
            (e) => { return Div(Text(e)); }
        ),
        Button(
            Text("Click Me!"),
            EventListener(
                "click",
                () => { console.log("click!"); }
            )
        ),
    )
);

render_to("root", root);
```
