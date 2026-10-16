"""Reproduce the selected project skills through Codex's system installer."""
from pathlib import Path
import argparse, hashlib, json, subprocess, sys

ROOT=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser();parser.add_argument('--installer',type=Path,default=Path.home()/'.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py');args=parser.parse_args()
if not args.installer.is_file():parser.error('Supply the local system skill-installer script with --installer')
manifest=json.loads((ROOT/'project-skills.json').read_text())
for skill in manifest['skills']:
    target=ROOT/'.agents'/'skills'/skill['name']
    if not target.exists():
        subprocess.run([sys.executable,str(args.installer),'--repo',skill['repo'],'--path',skill['path'],'--ref',skill['observedCommit'],'--dest',str(ROOT/'.agents'/'skills')],check=True)
    digest=hashlib.sha256((target/'SKILL.md').read_bytes()).hexdigest()
    if digest!=skill['skillSha256']:raise SystemExit(skill['name']+': installed skill differs from the reviewed manifest; inspect instead of overwriting')
    print('Verified '+skill['name'])
