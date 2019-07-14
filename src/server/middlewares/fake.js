import faker from "faker";
import User from "../models/User";
import Group from "../models/Group";

export const createInitGroups = async (req, res, next) => {
  const groups = await Group.find();
  const users = await User.aggregate([{ $sample: { size: 10 } }]);
  req.body.usersIds = users.map(item => item._id);

  if (groups.length > 0) return next();

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

export const createMockData = (req, res) => {
  const { usersIds } = req.body;

  const fakeData = [];
  while (fakeData.length < 1000) {
    const theUser = {
      index: faker.random.number(),
      text: faker.hacker.phrase(),
      site: faker.internet.url(),
      friends: usersIds.filter(() => Math.random() > 0.5),
      hobby: { type: Array },
      avatar: faker.image.avatar(),
      age: faker.random.number(),
      personal: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber()
      },
      address: {
        country: faker.address.country(),
        countryCode: faker.address.countryCode(),
        city: faker.address.city(),
        state: faker.address.state()
      },
      experience: [1, 2, 3].map(() => ({
        company: faker.company.companyName(),
        title: faker.name.jobTitle(),
        country: faker.address.country(),
        countryCode: faker.address.countryCode(),
        city: faker.address.city(),
        state: faker.address.state()
      })),
      education: [1, 2].map(() => ({
        school: faker.company.companyName(),
        country: faker.address.country(),
        countryCode: faker.address.countryCode(),
        city: faker.address.city(),
        state: faker.address.state()
      })),
      created: faker.date.past()
    };

    fakeData.push(theUser);
  }

  User.create(fakeData)
    .then(() => res.end())
    .catch(err => res.status(400).json(err));
};
