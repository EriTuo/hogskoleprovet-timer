#!/bin/bash

# Högskoleprovet-timer - Öppna i Chrome
# Detta skript öppnar appen direkt i Google Chrome

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
open -a "Google Chrome" "file://$DIR/högskoleprovet.html"
