import re, glob, collections, sys
root = sys.argv[1]
files = sorted(glob.glob(root + "/src-greenn/**/*.html", recursive=True))
snip = collections.defaultdict(set)
def strip(s):
    s = re.sub(r"<script.*?</script>", "", s, flags=re.S)
    s = re.sub(r"<style.*?</style>", "", s, flags=re.S)
    s = re.sub(r"<footer.*?</footer>", "", s, flags=re.S)
    return s
fam = collections.Counter()
for f in files:
    raw = open(f, encoding="utf-8", errors="replace").read()
    s = strip(raw)
    rel = f.replace(root + "/src-greenn/", "")
    hit = False
    # element-level: find smallest tag containing 'sabrina' (text or attr)
    for m in re.finditer(r"<([a-z0-9]+)\b[^>]*>[^<]*sabrina[^<]*|<[a-z0-9]+\b[^>]*sabrina[^>]*>", s, re.I):
        t = re.sub(r"\s+", " ", m.group(0))
        t = re.sub(r"text=[^\"']*", "text=…", t)
        t = re.sub(r'(src|href)="https://s3[^"]*"', r'\1="S3"', t)
        snip[t[:230]].add(rel); hit = True
    if hit: fam[rel.split("/")[0]] += 1
print(fam, len(snip))
for t, fs in sorted(snip.items(), key=lambda x: -len(x[1])):
    kinds = collections.Counter(x.split("/")[0] for x in fs)
    print(len(fs), dict(kinds), "|", t)
