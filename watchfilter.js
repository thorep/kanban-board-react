const myFilter = (f, stat) => {
  console.log("running filter");
  console.log(f);
  // return true;
  return stat.isFile();
  return stat.isFile() && !f.includes("lib");
};

module.exports = myFilter;
