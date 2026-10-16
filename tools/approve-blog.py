"""Record an actual founder approval, then prepare the source for publishing.

This does not deploy or create approvals. Run only after the named founder has
reviewed and explicitly approved this exact draft. Preserve the real reference.
"""
from pathlib import Path
from datetime import date
import argparse, hashlib, json, re

ROOT=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('slug');parser.add_argument('--reviewed-by',required=True,choices=['Pandush','Umair'])
parser.add_argument('--reference',required=True,help='Actual message or document approving the draft')
parser.add_argument('--publish-date',default=date.today().isoformat());args=parser.parse_args()
if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*',args.slug):parser.error('Invalid slug')
date.fromisoformat(args.publish_date)
if not args.reference.strip():parser.error('Approval reference cannot be empty')
path=ROOT/'content'/'blog'/(args.slug+'.md');source=path.read_text(encoding='utf8')
blocks=source.split('---',2);meta=json.loads(blocks[1]);meta['status']='published'
if meta.get('published'):meta['updated']=args.publish_date
else:meta['published']=args.publish_date
meta['author']=args.reviewed_by.lower()
source='---\n'+json.dumps(meta,ensure_ascii=False,indent=2)+'\n---'+blocks[2]
path.write_text(source,encoding='utf8')
folder=ROOT/'content'/'reviews';folder.mkdir(exist_ok=True)
(folder/(args.slug+'.json')).write_text(json.dumps({'contentSha256':hashlib.sha256(source.encode('utf8')).hexdigest(),'reviewedBy':args.reviewed_by,'reference':args.reference.strip(),'recordedOn':date.today().isoformat()},indent=2),encoding='utf8')
print('Recorded supplied approval. Run build-site.py, check the output, then deploy through alive.')
