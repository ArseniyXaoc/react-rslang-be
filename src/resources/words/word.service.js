const wordRepo = require('./word.db.repository');

const getAll = async conditions => wordRepo.getAll(conditions);

const get = async wordId => {
  const word = await wordRepo.get(wordId);

  return word;
};

const search = async sString => {
  const word = await wordRepo.search(sString);
  return word;
};

module.exports = { getAll, get, search };
