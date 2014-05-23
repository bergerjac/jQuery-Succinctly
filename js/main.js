String.prototype.format = String.prototype.f = function()
{
    var s = this,
        i = arguments.length;

    while (i--)
    {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

var body = $('body');
body
    .append('<span class="last-updated">{0}</span>'
                .format(new Date().toLocaleTimeString('en-US', { hour12: false }))
    );

var nLogs = 0;
var newestLogFirst = false;
var log = function()
{
    function internalLog(text)
    {
        if (text === undefined || text === "")
        {// NO text or empty -> do nothing
            return;
        }

        var logList = $('.log-list');
        if (!logList.length)
        {// NO logs -> create
            // ,
            var logs = $('<div class="logs"></div>');
            logList = $('<dl class="log-list"></dl>');// <ul> is common jq selector
            logs.append(logList);
            body.append(logs);
        }

        nLogs += 1;
        jqob = $('<dt class="log">' +
                 '<span class="log-console" data-log="{0}">&gt;</span>'.format(nLogs) +
                 '<code class="log-output">{0}</code>'.format(text) +
                 '</dt>');
        if (newestLogFirst)
        {
            logList.prepend(jqob);
        }
        else
        {
            logList.append(jqob);
        }
    }

    for (var i = 0; i < arguments.length; i++)
    {
        internalLog(arguments[i]);
    }
};
