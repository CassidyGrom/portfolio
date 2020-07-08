import "./cover";
import "./gallery";
import "./tweet";
import lottie from "lottie-web";

lottie
  .loadAnimation({
    container: d3.select("#down-arrow").node(),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "./assets/data/animation.json",
  })
  .setSpeed(0.8);

d3.select("h1")
  .html(
    d3
      .select("h1")
      .html()
      .split("<hr>")
      .reduce(
        (full, frag) => `${full} <span class="title-word">${frag}</span>`,
        ""
      )
  )
  .style("opacity", 1);

d3.selectAll(".title-word")
  .transition()
  .delay((d, i) => 3500 + i * 500)
  .duration(2000)
  .style("opacity", 1);
d3.select("h2").transition().delay(6000).duration(2000).style("opacity", 1);
d3.select("#down-arrow").transition().delay(7000).duration(2000).style("opacity", 1);