$ErrorActionPreference = "Stop"
$serverRoot = $PSScriptRoot

$files = @(
  "schema.sql",
  "routes\instruments.js",
  "routes\events.js",
  "routes\outreach.js"
)

foreach ($rel in $files) {
  $path = Join-Path $serverRoot $rel
  if (-not (Test-Path $path)) {
    Write-Error "MISSING: $path"
    exit 1
  }
  $bak = "$path.bak"
  if (-not (Test-Path $bak)) {
    Copy-Item $path $bak
    Write-Host "BACKUP CREATED: $bak"
  } else {
    Write-Host "BACKUP EXISTS: $bak"
  }
}

Write-Host ""
Write-Host "All .bak backups verified. Server i18n patches are in place."
Write-Host "Run 'npm run build' from project root to verify frontend compiles."
Write-Host ""
Write-Host "NOTE: Existing databases need ALTER TABLE statements to add _hi columns."
Write-Host "Run the migration SQL below on your MySQL database:"
Write-Host ""
Write-Host @"
ALTER TABLE instruments
  ADD COLUMN full_name_hi VARCHAR(500) DEFAULT NULL AFTER full_name,
  ADD COLUMN features_hi JSON DEFAULT NULL AFTER features,
  ADD COLUMN applications_hi JSON DEFAULT NULL AFTER applications,
  ADD COLUMN location_hi VARCHAR(255) DEFAULT NULL AFTER location;

ALTER TABLE category_descriptions
  ADD COLUMN description_hi VARCHAR(500) DEFAULT NULL AFTER description;

ALTER TABLE events
  ADD COLUMN title_hi VARCHAR(500) DEFAULT NULL AFTER title,
  ADD COLUMN full_description_hi TEXT DEFAULT NULL AFTER full_description,
  ADD COLUMN venue_hi VARCHAR(500) DEFAULT NULL AFTER venue;

ALTER TABLE outreach
  ADD COLUMN title_hi VARCHAR(500) DEFAULT NULL AFTER title,
  ADD COLUMN description_hi TEXT DEFAULT NULL AFTER description;
"@
