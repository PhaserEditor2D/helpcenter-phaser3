var helpcenter;
(function (helpcenter) {
    var showdown;
    (function (showdown) {
        const converter = new window.showdown.Converter();
        function markdownToHtml(text) {
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
        showdown.markdownToHtml = markdownToHtml;
        function javascriptToHtml(text) {
            return hljs.highlight("javascript", text).value;
        }
        showdown.javascriptToHtml = javascriptToHtml;
        function walk(node, kind, tokens) {
            if (node.children) {
                for (const child of node.children) {
                    walk(child, child.kind || kind, tokens);
                }
            }
            if (typeof node === "string") {
                tokens.push({ kind, value: node });
            }
        }
        function javascriptToTokens(text, compact = true) {
            const result = hljs.highlight("javascript", text);
            const root = result.emitter["rootNode"];
            let tokens = [];
            walk(root, root.kind, tokens);
            if (compact) {
                const compactTokens = [];
                let lastToken;
                for (const token of tokens) {
                    if (lastToken) {
                        if (lastToken.kind === token.kind) {
                            lastToken.value += token.value;
                        }
                        else {
                            compactTokens.push(lastToken = { kind: token.kind, value: token.value });
                        }
                    }
                    else {
                        compactTokens.push(lastToken = { kind: token.kind, value: token.value });
                    }
                }
                tokens = compactTokens;
            }
            return tokens;
        }
        showdown.javascriptToTokens = javascriptToTokens;
    })(showdown = helpcenter.showdown || (helpcenter.showdown = {}));
})(helpcenter || (helpcenter = {}));
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
// For TS consumers who use Node and don't have dom in their tsconfig lib, import the necessary types here.
/// <reference lib="dom" />
// Type definitions for Showdown 1.9.0
// Project: https://github.com/showdownjs/showdown
// Definitions by: Hamed Baatour <https://github.com/hamedbaatour>,
//                 cbowdon <https://github.com/cbowdon>,
//                 Pei-Tang Huang <https://github.com/tan9>,
//                 Ariel-Saldana <https://github.com/arielsaldana>,
//                 Yisrael Eliav <https://github.com/yisraelx>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
