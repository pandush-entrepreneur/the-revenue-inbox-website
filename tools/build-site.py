"""Build the approved public site and optionally an isolated review preview."""
from pathlib import Path
import argparse, subprocess, sys

ROOT=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser();parser.add_argument('--preview',action='store_true');args=parser.parse_args()
subprocess.run([sys.executable,str(ROOT/'tools'/'build-rebuild.py')],check=True,cwd=ROOT)
subprocess.run([sys.executable,str(ROOT/'tools'/'build-blog.py')]+(['--preview'] if args.preview else []),check=True,cwd=ROOT)
