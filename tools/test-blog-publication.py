"""Verify the publication boundary: drafts and edited approvals cannot leak."""
import importlib.util, json, tempfile, unittest
from datetime import date
from pathlib import Path

spec=importlib.util.spec_from_file_location('blog',Path(__file__).with_name('build-blog.py'))
blog=importlib.util.module_from_spec(spec);spec.loader.exec_module(blog)

class PublicationTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.reviews=Path(self.tmp.name)
        self.post={'slug':'pricing','status':'published','hash':'approved-hash','published':'2026-10-16'}
    def tearDown(self):self.tmp.cleanup()
    def record(self,**changes):
        data={'contentSha256':'approved-hash','reviewedBy':'Pandush','reference':'Actual approval reference'};data.update(changes)
        (self.reviews/'pricing.json').write_text(json.dumps(data))
    def test_draft_never_public_even_with_record(self):
        self.record();self.post['status']='draft';self.assertFalse(blog.approved(self.post,self.reviews))
    def test_review_never_public_even_with_record(self):
        self.record();self.post['status']='review';self.assertFalse(blog.approved(self.post,self.reviews))
    def test_published_without_approval_fails(self):
        with self.assertRaisesRegex(ValueError,'no recorded'):blog.approved(self.post,self.reviews)
    def test_edited_article_invalidates_approval(self):
        self.record();self.post['hash']='new-unreviewed-content'
        with self.assertRaisesRegex(ValueError,'changed after'):blog.approved(self.post,self.reviews)
    def test_approval_needs_real_reference(self):
        self.record(reference='')
        with self.assertRaisesRegex(ValueError,'actual approval'):blog.approved(self.post,self.reviews)
    def test_approved_current_article_can_publish(self):
        self.record();self.assertTrue(blog.approved(self.post,self.reviews,today=date(2026,10,16)))
    def test_line_endings_do_not_change_approval_hash(self):
        meta={'slug':'pricing','status':'review','author':'team','published':None,'updated':None}
        source='---\n'+json.dumps(meta)+'\n---\nActual source text.\n'
        file=self.reviews/'source.md';file.write_bytes(source.encode());first=blog.read_post(file)['hash']
        file.write_bytes(source.replace('\n','\r\n').encode());self.assertEqual(first,blog.read_post(file)['hash'])
    def test_future_article_is_not_public_early(self):
        self.record();self.assertFalse(blog.approved(self.post,self.reviews,today=date(2026,10,15)))

if __name__=='__main__':unittest.main()
