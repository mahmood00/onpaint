
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.class = function(req, res){
  res.render('class/class.html', { id: '' });
};
exports.uploads = function(req, res){
  res.render('class/uploads.html', { id: '' });
};
