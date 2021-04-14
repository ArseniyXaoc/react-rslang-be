const Word = require('./word.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'word';

const getAll = async conditions => {
  const { group, page } = conditions;

  return Word.find({ group, page });
};

const get = async id => {
  const word = await Word.findOne({ _id: id });
  if (!word) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return word;
};

const search = async sString => {
  const re = new RegExp(sString, 'i');
  const words = await Word.find({
    $or: [{ word: { $regex: re } }, { wordTranslate: { $regex: re } }]
  });
  return words;
};

module.exports = { getAll, get, search };
