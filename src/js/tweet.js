const ids = [
  "1189953408805097472",
  "1212236988792942593",
  "1263925997759533056",
  "1255294941653340160",
  "1200568399505625091",
  "1044410535037620225",
  "1189686107597869056",
];
let currentIndex = 0;

function setTweet() {
  d3.select(".twitter-tweet")
    .transition()
    .style("transform", "scale(0.7)")
    .style("opacity", 0);
  document.getElementById("tweet-container").innerHTML = "";
  twttr.widgets
    .createTweet(ids[currentIndex], document.getElementById("tweet-container"))
    .then(() => {
      d3.select(".twitter-tweet")
        .transition()
        .style("transform", "scale(1)")
        .style("opacity", 1);
      currentIndex = (currentIndex + 1) % ids.length;
    });
}

window.onload = () => {
  setTweet();
  d3.select("#tweet-graphic").on("click", setTweet);
};
