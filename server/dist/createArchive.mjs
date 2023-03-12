import targz from 'tar.gz';
var compress = new targz().compress('./dist', './store.tar.gz', function (err) {
  if (err) console.log(err);
  console.log('The compression has ended!');
});
