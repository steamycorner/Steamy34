# Steamy34 build: joins src\*.js (in name order) into the one installable file
# Steamy34_v<version>.user.js, named after @version in src\00-header.js.
# Also refreshes local\Steamy34_latest.user.js (the local auto-update copy).
# The previous version moves to backups\ (the 10 newest are kept).
#   powershell -ExecutionPolicy Bypass -File build.ps1
#   ... -Snapshot "2.6: what changed"   -> also saves a snapshot in the history (Git)
# ASCII only (Windows PowerShell 5.1 misreads UTF-8 without BOM in scripts).
param([string]$Snapshot = '')
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$enc = New-Object System.Text.UTF8Encoding($false)
$parts = Get-ChildItem (Join-Path $root 'src') -Filter '*.js' | Sort-Object Name
if (-not $parts) { throw 'No parts in src\' }
$sb = New-Object System.Text.StringBuilder
foreach ($p in $parts) { [void]$sb.Append([IO.File]::ReadAllText($p.FullName, $enc)) }
$text = $sb.ToString()

$m = [regex]::Match($text, '@version\s+(\S+)')
if (-not $m.Success) { throw 'No @version in the header' }
$version = $m.Groups[1].Value
if ($text.Contains([string][char]0x00E2 + [char]0x20AC)) { throw 'Broken special characters (encoding) - check the src files' }

# Tampermonkey knows the script by @name + @namespace. If either changes, an
# update installs as a NEW script with empty storage (viewed, downloaded,
# collections, settings... all gone). So they must never change.
$nm = [regex]::Match($text, '//\s*@name\s+(.+?)\s*\r?\n').Groups[1].Value
$ns = [regex]::Match($text, '//\s*@namespace\s+(\S+)').Groups[1].Value
# Sleazy Fork / Greasy Fork refuse a @description over 500 characters
$desc = [regex]::Match($text, '//\s*@description\s+(.+?)\s*\r?\n').Groups[1].Value
if ($desc.Length -gt 500) { throw "Nothing was built: @description is $($desc.Length) characters - Sleazy Fork allows at most 500. Shorten it in src\00-header.js." }
if ($nm -ne 'Steamy34' -or $ns -ne 'https://linktr.ee/steamycorner') {
    throw "Nothing was built: @name / @namespace changed ('$nm' / '$ns'). They must stay 'Steamy34' / 'https://linktr.ee/steamycorner', or every user loses their saved data on the next update."
}

# Syntax check with Node.js (if installed) BEFORE anything is replaced:
# a broken build never reaches the folder, the backups or the local copy
$node = (Get-Command node -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty Source)
if (-not $node -and (Test-Path 'C:\Program Files\nodejs\node.exe')) { $node = 'C:\Program Files\nodejs\node.exe' }
if ($node) {
    $tmp = Join-Path ([IO.Path]::GetTempPath()) 'steamy34-check.js'
    [IO.File]::WriteAllText($tmp, $text, $enc)
    $ErrorActionPreference = 'Continue'   # Node writes its message to stderr
    $err = (& $node --check $tmp 2>&1 | ForEach-Object { "$_" }) -join "`n"
    $ok = ($LASTEXITCODE -eq 0)
    $ErrorActionPreference = 'Stop'
    Remove-Item $tmp -ErrorAction SilentlyContinue
    if (-not $ok) {
        # Which part (and line in it) the error is in
        $where = ''
        $lm = [regex]::Match($err, [regex]::Escape($tmp) + ':(\d+)')
        if ($lm.Success) {
            $line = [int]$lm.Groups[1].Value; $start = 1
            foreach ($p in $parts) {
                $n = [IO.File]::ReadAllText($p.FullName, $enc).Split("`n").Count - 1
                if ($line -lt $start + $n) { $where = "In src\$($p.Name), line $($line - $start + 1):`n"; break }
                $start += $n
            }
        }
        $msg = ($err -split "`n" | Where-Object { $_ -notmatch '^\s+at |RemoteException' }) -join "`n"
        throw ("Syntax error - nothing was built.`n" + $where + $msg.Replace($tmp, 'built script'))
    }
    'Syntax check (Node.js): OK'
} else {
    'Syntax check skipped (Node.js not found)'
}

$name = "Steamy34_v$version.user.js"
$out = Join-Path $root $name
# Older builds move to backups\ (one installable file stays in the folder,
# named after its version). backups\ keeps the 10 newest versions.
$backups = Join-Path $root 'backups'
$keep = 10
$older = Get-ChildItem $root -Filter 'Steamy34_v*.user.js' | Where-Object { $_.Name -ne $name }
if ($older) {
    New-Item -ItemType Directory -Force $backups | Out-Null
    foreach ($f in $older) { Move-Item $f.FullName (Join-Path $backups $f.Name) -Force }
    "Moved to backups: $(($older | ForEach-Object { $_.Name }) -join ', ')"
}
if (Test-Path $backups) {
    Get-ChildItem $backups -Filter 'Steamy34_v*.user.js' | Sort-Object LastWriteTime -Descending |
        Select-Object -Skip $keep | ForEach-Object { Remove-Item $_.FullName -Confirm:$false; "Removed old backup: $($_.Name)" }
}
[IO.File]::WriteAllText($out, $text, $enc)
$local = Join-Path $root 'local'
if (Test-Path $local) { [IO.File]::WriteAllText((Join-Path $local 'Steamy34_latest.user.js'), $text, $enc) }
"Built $name from $($parts.Count) parts ($([math]::Round($text.Length / 1KB)) KB)"

# Snapshot in the local history (only after a good build; nothing goes online)
if ($Snapshot) {
    $git = (Get-Command git -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty Source)
    if (-not $git -and (Test-Path 'C:\Program Files\Git\cmd\git.exe')) { $git = 'C:\Program Files\Git\cmd\git.exe' }
    if (-not $git) { 'Snapshot skipped (Git not found)' }
    else {
        $ErrorActionPreference = 'Continue'
        & $git -C $root add -A 2>&1 | Out-Null
        $changes = & $git -C $root status --porcelain
        if ($changes) {
            & $git -C $root commit -q -m $Snapshot 2>&1 | Out-Null
            "Snapshot saved: $Snapshot ($(& $git -C $root rev-parse --short HEAD))"
        } else { 'Snapshot: nothing changed since the last one' }
        $ErrorActionPreference = 'Stop'
    }
}
