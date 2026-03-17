package site

import (
	"embed"
	"io/fs"
)

//go:embed all:dist
var distFS embed.FS

var DistDirFS, _ = fs.Sub(distFS, "dist")
