import { Hono } from 'hono';
import { signupUser } from '../handlers/signupHandler';
import { signinUser } from '../handlers/signinHandler';
import { signoutUser } from '../handlers/signoutHandler';
import { getpPofile } from '../handlers/getprofile';
import { getAnswers, addAnswer, updateAnswer, deleteAnswerById } from '../handlers/24games';

const router = new Hono();

router.post('/signup', signupUser);
router.post('/signin', signinUser);
router.post('/signout', signoutUser);
router.get('/getpofile', getpPofile);



// read
router.get('/answers', async (c) => {
  try {
    const number = c.req.query('number');
    if (!number) {
      return c.json({ message: 'Number parameter is required' }, 400);
    }

    // แปลงเลขและเรียง
    const numbersArray = number.split('').map(Number).sort();
    const sortedNumberString = numbersArray.join('');
    const answers = await getAnswers(sortedNumberString);

    return c.json(answers);
  } catch (err) {
    console.error('Error in /answers route:', err);
    return c.json({ message: 'Error fetching answers' }, 500);
  }
});

// add 
router.post('/addanswers', async (c) => {
  try {
    const { number, answers } = await c.req.json();
    if (!number || !answers) {
      return c.json({ message: 'number and answer are required' }, 400);
    }
    const numbersArray = number.split('').map(Number).sort();
    const sortedNumberString = numbersArray.join('');
    const newAnswer = await addAnswer(sortedNumberString, answers);

    return c.json(newAnswer, 201);
  } catch (err) {
    console.error('Error in /answers route:', err);
    return c.json({ message: 'Error adding answer' }, 500);
  }
});

// edit
router.patch('/edtanswers/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    const numberUpdated = updates.number;
    if (numberUpdated) {
      const numbersArray = numberUpdated.split('').map(Number).sort();
      const sortedNumberString = numbersArray.join('');
      updates.number = sortedNumberString; 
    }

    const updatedAnswer = await updateAnswer(id, updates);
    return c.json(updatedAnswer);
  } catch (err) {
    console.error('Error in /edtanswers/:id route:', err);
    return c.json({ message: 'Error updating answer' }, 500);
  }
});

// delete 
router.delete('/deleteanswers/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const deletedAnswer = await deleteAnswerById(id);
    return c.json({ message: 'Answer deleted', deletedAnswer });
  } catch (err) {
    console.error('Error in DELETE /answers/:id route:', err);
    return c.json({ message: 'Error deleting answer' }, 500);
  }
});

export default router;
