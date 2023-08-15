const express = require('express');
const User = require('./models/user'); // Adjust the path accordingly
const CreditCard = require('./models/creditCard'); // Adjust the path accordingly

const app = express();
const PORT = 5000;

app.use(express.json());

app.post('/api/link-credit-card', async (req, res) => {
  const { username, cardNumber, nameOnCard, expiryDate, cvv } = req.body;

  try {
    const user = await User.findOne({ username });
    const creditCard = await CreditCard.findOne({ cardNumber });

    if (!user || !creditCard) {
      return res.status(404).json({ message: 'User or credit card not found' });
    }

    user.creditCard = creditCard._id;
    await user.save();

    // Update credit card details
    creditCard.nameOnCard = nameOnCard;
    creditCard.expiryDate = expiryDate;
    creditCard.cvv = cvv;
    await creditCard.save();

    res.status(200).json({ message: 'Credit card linked successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error linking credit card' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});