const handleApi = (req, res) => {
  res.send("this is also working");
};

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db("musers")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("Unable to update"));
};

module.exports = {
  handleImage: handleImage,
  handleApi: handleApi,
};
