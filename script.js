let quoteContainer = document.querySelector('#quote-container');
let quoteText = document.querySelector('#quote');
let authorText = document.querySelector('#author');
let twitterBtn = document.querySelector('#twitter');
let newQuoteBtn = document.querySelector('#new-quote');
let loader = document.querySelector('#loader')

let apiQuotes = [];

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading 
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
function newQuote() {
    loading()
    // Pick a random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank and replace it with 'Unknown'
    if(!quote.author){
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author;
    }
    // Check quote length to apply  styles
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    // Set quote and hide loader
    quoteText.textContent = quote.text;
    complete()
}
// Get quotes from API
async function getQuotes(){
    loading()
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json(); 
        newQuote()
    } catch(e) {
        console.log(e);
    }
}

// Tweet a quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}
// Event listener
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuotes();