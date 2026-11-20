# Steamy34 test server - a fake rule34.xxx on http://localhost:8735/
#   powershell -ExecutionPolicy Bypass -File tests\server.ps1
# Serves:
#   /s.js            the newest Steamy34_v*.user.js in the folder above
#   /phonemock.js    builds a fake posts page and runs the script with fake GM_* functions
#   /index.php?...s=view   a fake post page (Size 1920x1080, comments, child posts)
#   /thumbnails/*    1x1 pictures
#   id=666           a fake Cloudflare check (503)
# Stop it with Ctrl+C (or by closing the window).
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Split-Path -Parent $here

function Get-NewestScript {
    Get-ChildItem $root -Filter 'Steamy34_v*.user.js' |
        Sort-Object { [version](($_.Name -replace '^Steamy34_v', '' -replace '(-beta)?\.user\.js$', '') + '.0') } |
        Select-Object -Last 1
}

$post = @'
<html><head><title>post</title></head><body><div class="sidebar"><div id="stats"><ul>
<li>Id: 101</li><li>Posted: 2025-03-04 10:20:30<br>by <a href="index.php?page=account&s=profile&uname=bob">bob</a></li>
<li>Size: 1920x1080</li><li>Source: <a href="https://twitter.com/someartist/status/123456789" rel="nofollow">https://twitter.com/someartist/status/123456789</a></li>
<li>Rating: Explicit</li><li><a href="https://wimg.rule34.xxx//images/1234/0123456789abcdef0123456789abcdef.jpeg">Original image</a></li><li>Score: <span id="psc101">42</span> (vote <a href="#" onclick="post_vote('101', 'up'); return false;">up</a>)</li></ul></div>
<ul id="tag-sidebar"><li class="tag-type-artist tag"><a href="index.php?page=post&s=list&tags=someartist">someartist</a> <span>12</span></li></ul></div>
<div id="content"><div class="status-notice">This post has <a href="index.php?page=post&s=list&tags=parent:101">child posts</a>. Child posts are often minor variations of the parent post.</div>
<img id="image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></div><div id="comment-list">
<div id="c9001"><div class="col1"><a href="index.php?page=account&s=profile&id=5">nightowl</a><br><b>Posted on 2025-11-10 21:14:03</b><br>Score: <span id="sc9001">7</span> (vote <a href="#" onclick="return false;">up</a>)</div><div class="col2" id="cbody9001"><p>The lighting on this is unreal.<br>Source is on https://twitter.com/someartist/status/123456789 btw</p></div></div>
<div id="c9002"><div class="col1"><a href="index.php?page=account&s=profile&id=6">pixelpusher</a><br><b>Posted on 2025-11-16 08:02:11</b><br>Score: <span id="sc9002">0</span></div><div class="col2" id="cbody9002"><p>needs a part 2</p></div></div>
</div></body></html>
'@

$l = New-Object System.Net.HttpListener
$l.Prefixes.Add('http://localhost:8735/')
$l.Start()
Write-Host "Steamy34 test server on http://localhost:8735/ - serving $((Get-NewestScript).Name)"
while ($l.IsListening) {
    $c = $l.GetContext()
    $p = $c.Request.Url.PathAndQuery
    $path = $c.Request.Url.AbsolutePath
    $c.Response.Headers.Add('Cache-Control', 'no-store')
    if ($path -eq '/s.js') { $b = [IO.File]::ReadAllBytes((Get-NewestScript).FullName); $c.Response.ContentType = 'text/plain; charset=utf-8' }
    elseif ($path -match '^/(phonemock|checks|contrast|show)\.js$') { $b = [IO.File]::ReadAllBytes((Join-Path $here ($path.TrimStart('/')))); $c.Response.ContentType = 'text/javascript; charset=utf-8' }
    elseif ($path -like '/thumbnails/*') { $b = [Convert]::FromBase64String('R0lGODlhAQABAIAAAP8AAP///yH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='); $c.Response.ContentType = 'image/gif' }
    elseif ($p -like '*id=666*') { $b = [Text.Encoding]::UTF8.GetBytes('<html><head><title>Just a moment...</title></head><body>cf-chl</body></html>'); $c.Response.StatusCode = 503; $c.Response.ContentType = 'text/html' }
    elseif ($p -like '*s=view*') { $b = [Text.Encoding]::UTF8.GetBytes($post); $c.Response.ContentType = 'text/html; charset=utf-8' }
    elseif ($p -like '*s=list*' -and ([uri]::UnescapeDataString($p) -match '~|feedtest')) {
        # A followed-artists search ( a ~ b ): posts 306 ... 301, newest first
        # (306, 305 by "feedtest", 304 ... 301 by "someartist")
        $th = (306..301 | ForEach-Object { $art = if ($_ -ge 305) { 'feedtest' } else { 'someartist' }; "<span id=`"s$_`" class=`"thumb`"><a id=`"p$_`" href=`"index.php?page=post&amp;s=view&amp;id=$_`"><img src=`"/thumbnails/1/thumbnail_f$_.jpg`" title=`" $art 1girl score:10 rating:explicit`" class=`"preview `"></a></span>" }) -join ''
        $b = [Text.Encoding]::UTF8.GetBytes("<html><head><meta charset=`"utf-8`"></head><body><div class=`"image-list`">$th</div></body></html>"); $c.Response.ContentType = 'text/html; charset=utf-8'
    }
    else { $b = [Text.Encoding]::UTF8.GetBytes('<html><head><meta charset="utf-8"></head><body>ok</body></html>'); $c.Response.ContentType = 'text/html; charset=utf-8' }
    try { $c.Response.OutputStream.Write($b, 0, $b.Length) } catch {}
    $c.Response.Close()
}
