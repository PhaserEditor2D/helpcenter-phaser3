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

    export function javascriptToTokens(text: string, compact = true) {

        const result = hljs.highlight("javascript", text);

        const root = result.emitter["rootNode"];

        let tokens: IToken[] = [];

        walk(root, root.kind, tokens);

        if (compact) {

            const compactTokens = [];

            let lastToken: IToken;

            for (const token of tokens) {

                if (lastToken) {

                    if (lastToken.kind === token.kind) {

                        lastToken.value += token.value;

                    } else {

                        compactTokens.push(lastToken = { kind: token.kind, value: token.value });
                    }

                } else {

                    compactTokens.push(lastToken = { kind: token.kind, value: token.value });
                }
            }

            tokens = compactTokens;
        }

        return tokens;
    }
}