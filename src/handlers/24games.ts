import Answer from '../DB/answer';

// read
const cache = new Map<string, any>();

const getAnswers = async (number: string) => {
  try {
    if (!number) throw new Error('Number parameter is required');
    
    if (cache.has(number)) {
      return cache.get(number);
    }

    const answers = await Answer.find({ number });
    
    cache.set(number, answers);
    // console.log(cache);
    return answers;
  } catch (err) {
    console.error('Error fetching answers:', err);
    throw err;
  }
};

// add 
const addAnswer = async (number: string, answers: string) => {
  try {
    const newAnswer = new Answer({ number, answers });
    await newAnswer.save();
    return newAnswer;
  } catch (err) {
    console.error('Error adding answer:', err);
    throw err;
  }
};

  // delete 
const updateAnswer = async (id: string, updates: Partial<{ number: string; answers: string[] }>) => {
  try {
    const updatedAnswer = await Answer.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedAnswer) {
      throw new Error('Answer not found');
    }
    return updatedAnswer;
  } catch (err) {
    console.error('Error updating answer:', err);
    throw err;
  }
};

// ฟังก์ชันสำหรับลบข้อมูลตาม ID
const deleteAnswerById = async (id: string) => {
  try {
    const deletedAnswer = await Answer.findByIdAndDelete(id);
    if (!deletedAnswer) {
      throw new Error('Answer not found');
    }
    return deletedAnswer;
  } catch (err) {
    console.error('Error deleting answer:', err);
    throw err;
  }
};

export { getAnswers, addAnswer, updateAnswer, deleteAnswerById };
