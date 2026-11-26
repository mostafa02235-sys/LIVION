"""Turn the web game (index.html) into the offline APK page: local three.js, local fonts, Android bridge."""
import re, sys
src, out = sys.argv[1], sys.argv[2]
h = open(src, encoding='utf-8').read()
CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
assert h.count(CDN) == 1, 'three.js r128 script tag not found'
h = h.replace(CDN, 'three.min.js')
links = re.findall(r'<link[^>]*fonts\.(?:googleapis|gstatic)\.com[^>]*>', h)
for l in links: h = h.replace(l, '')
faces = ("<style>@font-face{font-family:'Anton';src:url(fonts/Anton-Regular.ttf) format('truetype');font-display:swap}"
         "@font-face{font-family:'Oswald';src:url(fonts/Oswald.ttf) format('truetype');font-weight:200 700;font-display:swap}</style>")
assert h.count('</head>') == 1, '</head> not found'
h = h.replace('</head>', faces + '</head>')
assert h.rstrip().endswith('</html>') and h.count('</body>') == 1, '</body> not found'
h = h.replace('</body>', '<script src="android.js"></script></body>')
END = 'requestAnimationFrame(frame);\n}\n</script>'
assert h.count(END) == 1, 'end of game script not found'
HOOK = ("window.__LIVION={get started(){return started},get paused(){return paused},togglePause:()=>togglePause(),"
        "closePhone:()=>Phone.close(),closeMap:()=>wm.close(),get sound(){return Sound},get inCar(){return !!(player&&player.car)}};\n")
h = h.replace(END, HOOK + END)
assert 'googleapis' not in h and 'cdnjs' not in h, 'an online resource is still referenced'
open(out, 'w', encoding='utf-8').write(h)
print('prepared', out, len(h), 'bytes; removed', len(links), 'font links')
