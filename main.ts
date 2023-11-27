import * as Twitter from 'twitter-lite';
import axios from 'axios';

// Twitter API configuration
const twitterClient = new Twitter({
  consumer_key: 'YOUR_CONSUMER_KEY',
  consumer_secret: 'YOUR_CONSUMER_SECRET',
  access_token_key: 'YOUR_ACCESS_TOKEN_KEY',
  access_token_secret: 'YOUR_ACCESS_TOKEN_SECRET',
});

// Function to fetch average Bitcoin price
async function getAverageBitcoinPrice(): Promise<number> {
  // Use a cryptocurrency API or other source to get historical Bitcoin prices
  const response = await axios.get('https://api.coindesk.com/v1/bpi/historical/close.json');
  const historicalPrices = response.data.bpi;

  // Extract prices and calculate average
  const prices = Object.values(historicalPrices);
  const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;

  return averagePrice;
}

// Function to post on Twitter
async function postOnTwitter(message: string): Promise<void> {
  try {
    await twitterClient.post('statuses/update', { status: message });
    console.log('Tweet posted successfully!');
  } catch (error) {
    console.error('Error posting tweet:', error);
  }
}

// Main function
async function main() {
  try {
    // Get the average Bitcoin price
    const averagePrice = await getAverageBitcoinPrice();

    // Create a message with the average price
    const message = `The average price of Bitcoin for the next week is $${averagePrice.toFixed(2)}. #Bitcoin #Crypto`;

    // Post the message on Twitter
    await postOnTwitter(message);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the main function
main();
