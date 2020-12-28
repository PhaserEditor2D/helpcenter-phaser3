namespace helpcenter.showdown {

    const converter = new window.showdown.Converter();

    export function markdownToHtml(text: string) {

        const html = converter.makeHtml(text);

        const parser = new DOMParser();
        const dom = parser.parseFromString(html, "text/html");

        const list = dom.querySelectorAll("code");

        list.forEach(element => {

            const result = hljs.highlight("javascript", element.innerHTML);
            element.innerHTML = result.value;
        });

        return dom.body.innerHTML;
    }
}