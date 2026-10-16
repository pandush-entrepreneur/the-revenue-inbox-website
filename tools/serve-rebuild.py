"""Local static preview with Vercel-equivalent clean paths and 301 mappings."""
from http.server import ThreadingHTTPServer,BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import unquote,urlsplit
import json,mimetypes,gzip
ROOT=Path(__file__).resolve().parents[1]
class Handler(BaseHTTPRequestHandler):
 def do_HEAD(self):self.serve(True)
 def do_GET(self):self.serve(False)
 def serve(self,head):
  path=unquote(urlsplit(self.path).path)
  config=json.loads((ROOT/'vercel.json').read_text())
  redirect=next((r for r in config.get('redirects',[]) if r['source']==path),None)
  if redirect:
   self.send_response(redirect['statusCode']);self.send_header('Location',redirect['destination']);self.end_headers();return
  if path=='/':target=ROOT/'index.html'
  else:
   target=(ROOT/path.lstrip('/')).resolve()
   if ROOT not in target.parents:self.send_error(403);return
   if not target.suffix:target=target.with_suffix('.html')
  status=200
  if not target.is_file():target=ROOT/'404.html';status=404
  raw=target.read_bytes();mime=mimetypes.guess_type(str(target))[0] or 'application/octet-stream'
  compress='gzip' in self.headers.get('Accept-Encoding','') and (mime.startswith('text/') or target.suffix in ['.js','.json','.svg','.xml'])
  if compress:raw=gzip.compress(raw,compresslevel=6)
  self.send_response(status);self.send_header('Content-Type',mime+('; charset=utf-8' if mime.startswith('text/') else ''));self.send_header('Content-Length',str(len(raw)));self.send_header('Cache-Control','no-cache')
  if compress:self.send_header('Content-Encoding','gzip')
  self.end_headers()
  if not head:self.wfile.write(raw)
 def log_message(self,*args):pass
print('Preview http://127.0.0.1:4174',flush=True)
ThreadingHTTPServer(('127.0.0.1',4174),Handler).serve_forever()
