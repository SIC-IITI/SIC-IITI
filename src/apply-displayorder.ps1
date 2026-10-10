# Run from the project's src folder, e.g.
#   cd "C:\Users\ANAND VIVEK IITI\SIC-IITI\src"
#   powershell -ExecutionPolicy Bypass -File .\apply-displayorder.ps1
# Creates lib\sortInstruments.js and patches 4 existing files (originals saved as *.bak).
$ErrorActionPreference = "Stop"
if (-not (Test-Path ".\hooks\useInstrumentsData.js")) { throw "Run this from the project's src folder." }
$utf8 = New-Object System.Text.UTF8Encoding($false)

# $pairs is a flat list: old1, new1, old2, new2, ...
function Patch-File($path, $pairs) {
  $full = (Resolve-Path $path).Path
  $raw = [IO.File]::ReadAllText($full, $utf8)
  $crlf = $raw.Contains("`r`n")
  $t = $raw.Replace("`r`n", "`n")
  if ($t.Contains("displayOrder")) { Write-Host "SKIP $path (already patched)"; return }
  for ($k = 0; $k -lt $pairs.Count; $k += 2) {
    $old = $pairs[$k]; $new = $pairs[$k + 1]
    $i = $t.IndexOf($old)
    if ($i -lt 0 -or $t.IndexOf($old, $i + 1) -ge 0) { throw "Patch failed in ${path}: expected exactly one match for:`n$old" }
    $t = $t.Substring(0, $i) + $new + $t.Substring($i + $old.Length)
  }
  if ($crlf) { $t = $t.Replace("`n", "`r`n") }
  Copy-Item $full "$full.bak" -Force
  [IO.File]::WriteAllText($full, $t, $utf8)
  Write-Host "patched $path"
}

$sort = @'
// Sorts instruments by their admin-set displayOrder (ascending).
// Instruments with no displayOrder go after the ordered ones, and ties
// (or missing values) keep the order the API returned them in.
export function sortInstruments(list) {
  const rank = (i) => {
    const n = Number(i.displayOrder);
    return i.displayOrder === null || i.displayOrder === undefined || i.displayOrder === "" || Number.isNaN(n)
      ? Infinity
      : n;
  };
  return list
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const ra = rank(a.item);
      const rb = rank(b.item);
      if (ra !== rb) return ra === Infinity ? 1 : rb === Infinity ? -1 : ra - rb;
      return a.index - b.index;
    })
    .map(({ item }) => item);
}
'@
$libDir = (Resolve-Path ".\lib").Path
[IO.File]::WriteAllText((Join-Path $libDir "sortInstruments.js"), $sort + "`n", $utf8)
Write-Host "created lib\sortInstruments.js"


Patch-File ".\hooks\useInstrumentsData.js" @(
@'
import { fetchInstruments } from "../lib/api";
'@, @'
import { fetchInstruments } from "../lib/api";
import { sortInstruments } from "../lib/sortInstruments";
'@,
@'
if (!cancelled) setInstruments(data);
'@, @'
if (!cancelled) setInstruments(sortInstruments(data));
'@
)

Patch-File ".\pages\Admin\InstrumentForm.jsx" @(
@'
  showInStatus: true,
  usageCharges: { academic
'@, @'
  showInStatus: true,
  displayOrder: "",
  usageCharges: { academic
'@,
@'
          showInStatus: data.showInStatus,

'@, @'
          showInStatus: data.showInStatus,
          displayOrder: data.displayOrder ?? "",

'@,
@'
      ...form,
      features:
'@, @'
      ...form,
      displayOrder: form.displayOrder === "" ? null : Number(form.displayOrder),
      features:
'@,
@'
            <label className="mt-1 flex min-h-[44px]
'@, @'
            <FormField label="Display Order">
              <input
                type="number"
                min="1"
                step="1"
                placeholder="1, 2, 3… (blank = last)"
                value={form.displayOrder}
                onChange={(e) => update("displayOrder", e.target.value)}
                className={inputClass}
              />
            </FormField>
            <label className="mt-1 flex min-h-[44px]
'@
)

Patch-File ".\pages\Admin\InstrumentsAdmin.jsx" @(
@'
import { fetchInstruments } from "../../lib/api";
'@, @'
import { fetchInstruments } from "../../lib/api";
import { sortInstruments } from "../../lib/sortInstruments";
'@,
@'
.then(setInstruments)
'@, @'
.then((data) => setInstruments(sortInstruments(data)))
'@,
@'
<th className="px-5 py-3 text-left font-semibold">Name</th>
'@, @'
<th className="px-5 py-3 text-left font-semibold">Order</th>
                  <th className="px-5 py-3 text-left font-semibold">Name</th>
'@,
@'
<SkeletonTableRows rows={6} cols={5} />
'@, @'
<SkeletonTableRows rows={6} cols={6} />
'@,
@'
                      <td className="px-5 py-4">
                        <div className="font-semibold text-gray-900">
'@, @'
                      <td className="px-5 py-4 text-gray-500">{instrument.displayOrder ?? "—"}</td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-gray-900">
'@
)

Patch-File ".\pages\Instruments\InstrumentForms.jsx" @(
@'
        instrumentForms.forEach((form) => {
'@, @'
        const orderOf = (form) => {
            const idx = instrumentsData.findIndex((item) => item.id === form.instrumentId);
            return idx === -1 ? Infinity : idx;
        };
        const orderedForms = [...instrumentForms].sort((a, b) => {
            const oa = orderOf(a);
            const ob = orderOf(b);
            if (oa === ob) return 0;
            return oa === Infinity ? 1 : ob === Infinity ? -1 : oa - ob;
        });
        orderedForms.forEach((form) => {
'@
)

Write-Host "Done. Run: npm run dev"
