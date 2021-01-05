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

    export interface IToken {
        kind: string;
        value: string;
    }

    function walk(node, kind, tokens: IToken[]) {

        if (node.children) {

            for (const child of node.children) {

                walk(child, child.kind || kind, tokens);
            }
        }

        if (typeof node === "string") {

            tokens.push({ kind, value: node });
        }
    }

    export function javascriptToTokens(text: string) {

        const result = hljs.highlight("javascript", text);

        const root = result.emitter["rootNode"];

        const tokens: IToken[] = [];

        walk(root, root.kind, tokens);

        return tokens;
    }
}