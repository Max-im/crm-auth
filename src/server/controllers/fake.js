import faker from "faker";
import User from "../models/User";
import Group from "../models/Group";

export const createInitGroups = async (req, res, next) => {
  const groupNum = await Group.find().countDocuments();
  if (groupNum > 0) return next();

  // generate fake groups
  const fakeGroups = [];
  const titles = [];
  while (fakeGroups.length < 10) {
    const title = faker.commerce.department();
    const description = faker.hacker.phrase();
    if (!titles.includes(title)) {
      titles.push(title);
      fakeGroups.push({ title, description });
    }
  }

  // save fake groups
  Group.create(fakeGroups)
    .then(() => next())
    .catch(err => res.status(400).json(err));
};

export const createMockData = async (req, res) => {
  const fakeData = [];
  while (fakeData.length < 100) {
    const index = faker.random.number();
    const text = faker.hacker.phrase();
    const avatar = faker.image.avatar();
    const groupData = await Group.aggregate([{ $sample: { size: 1 } }]);
    const group = groupData[0]._id;
    const created = faker.date.past();
    const personal = {
      name: faker.name.findName()
    };

    fakeData.push({ index, text, group, avatar, created, personal });
  }

  User.create(fakeData)
    .then(data => res.end("Created " + data.length))
    .catch(err => res.status(400).json(err));
};
