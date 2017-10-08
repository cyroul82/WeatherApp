var getUser = (id, callback) => {
  var user = {
    id: id,
    name: "Cyril"
  };
  setTimeout(() => {
    callback(user);
  }, 3000);
};

getUser(2, (user) => {
  console.log(user);
});
