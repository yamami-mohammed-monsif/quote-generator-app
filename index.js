const container = document.getElementById("container");
const quoteText = document.getElementById("quote-text");
const author = document.getElementById("author");
const tweeterBtn = document.getElementById("tweeter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// show loading spinner
function loading() {
  loader.hidden = false;
  container.hidden = true;
}

// hide loading spinner
function completeLoading() {
  if (!loader.hidden) {
    loader.hidden = true;
    container.hidden = false;
  }
}

async function getData() {
  loading();
  const response = await fetch(
    "https://api.scraperapi.com?api_key=9e20154350a06dcb50888f1483e51eaa&url=http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data;
}

function newQuote() {
  getData()
    .then((data) => {
      quoteText.textContent = data.quoteText;
      if (data.quoteAuthor === "") {
        author.textContent = "Unknown";
      }
      author.textContent = data.quoteAuthor;
      completeLoading();
    })
    .catch(() => {
      newQuote();
    });
}

function tweetQuote() {
  const tweeterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
  window.open(tweeterURL, "_blank");
}

newQuoteBtn.addEventListener("click", newQuote);
tweeterBtn.addEventListener("click", tweetQuote);

newQuote();
