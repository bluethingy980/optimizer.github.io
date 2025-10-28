const SyntaxHighlighter = ({ code, className = '' }) => {
    const highlight = (code) => {
        if (!code) {
            return <pre></pre>;
        }

        // More comprehensive regex for better highlighting
        const tokens = {
            comment: /^(?:#.*$)/,
            string: /^(?:"[^"\\]*(?:\\.[^"\\]*)*")/,
            keyword: /^\b(?:Set-ItemProperty|Disable-MMAgent|reg|add|Set-Service|Remove-ItemProperty|Remove-Item|Get-ItemProperty|Get-ChildItem|ForEach-Object)\b/i,
            parameter: /^(?:-[A-Za-z0-9]+(?:[:])?)\b/,
            variable: /^(?:\$(true|false|null))\b/i,
        };

        // The order is important: comments and strings first.
        const combinedRegex = new RegExp(`(${tokens.comment.source}|${tokens.string.source}|${tokens.keyword.source}|${tokens.parameter.source}|${tokens.variable.source})`, 'gi');

        const lines = code.split('\n').map((line, i) => {
            if (line.trim() === '') {
                return (
                    <div key={i} className="flex">
                        <span className="text-right pr-4 text-gray-500 select-none">{i + 1}</span>
                        <div className="flex-1">&nbsp;</div>
                    </div>
                );
            }

            const parts = line.split(combinedRegex).filter(part => part);

            return (
                <div key={i} className="flex">
                    <span className="text-right pr-4 text-gray-500 select-none">{i + 1}</span>
                    <div className="flex-1">{parts.map((part, j) => {
                        if (tokens.comment.test(part)) {
                            return <span key={j} className="text-green-400">{part}</span>;
                        } else if (tokens.string.test(part)) {
                            return <span key={j} className="text-yellow-400">{part}</span>;
                        } else if (tokens.keyword.test(part)) {
                            return <span key={j} className="text-blue-400">{part}</span>;
                        } else if (tokens.parameter.test(part)) {
                            return <span key={j} className="text-cyan-400">{part}</span>;
                        } else if (tokens.variable.test(part)) {
                            return <span key={j} className="text-purple-400">{part}</span>;
                        } else {
                            return part;
                        }
                    })}</div>
                </div>
            );
        });

        return <pre className={`w-full h-full bg-gray-900 text-white p-4 rounded whitespace-pre-wrap overflow-auto ${className}`}>{lines}</pre>;
    };

    return highlight(code);
};
