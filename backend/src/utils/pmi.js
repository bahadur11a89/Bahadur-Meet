import { User } from '../models/user.model.js';

export const generateUniquePMI = async () => {
  let pmi = '';
  let isUnique = false;
  let attempts = 0;

  while (!isUnique && attempts < 10) {
    attempts++;
    const part1 = Math.floor(100 + Math.random() * 900);
    const part2 = Math.floor(100 + Math.random() * 900);
    const part3 = Math.floor(1000 + Math.random() * 9000);
    pmi = `${part1} ${part2} ${part3}`;

    const existing = await User.findOne({ personalMeetingId: pmi });
    if (!existing) {
      isUnique = true;
    }
  }

  return pmi;
};
