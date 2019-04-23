const handleQuery = function(next, err, result) {
  if (err) {
    console.error(err);
    return;
  }
  next(result);
};

module.exports = { handleQuery };
