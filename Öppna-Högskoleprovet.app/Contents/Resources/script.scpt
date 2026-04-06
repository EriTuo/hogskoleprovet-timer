#!/usr/bin/env osascript

tell application "Google Chrome"
    activate
    open location "file://" & (POSIX path of (path to me)) & "/../högskoleprovet.html"
end tell
