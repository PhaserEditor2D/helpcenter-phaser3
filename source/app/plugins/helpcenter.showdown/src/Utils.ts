namespace helpcenter.showdown {

    const converter = new window.showdown.Converter();

    export function markdownToHtml(text: string) {

        const html = converter.makeHtml(text);

        const parser = new DOMParser();
        const dom = parser.parseFromString(html, "text/html");

        const list = dom.querySelectorAll("code");

        list.forEach(element => {

            const html2 = this.javascriptToHtml(element.innerHTML);

            element.innerHTML = html2;
        });

        return dom.body.innerHTML;
    }

    export function javascriptToHtml(text: string) {

        return hljs.highlight("javascript", text).value;
    }
}