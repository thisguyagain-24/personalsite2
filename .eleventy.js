module.exports = function(eleventyConfig) {

    eleventyConfig.addWatchTarget("./_src/sass/");
    eleventyConfig.addWatchTarget("./_src/img/");
    eleventyConfig.addPassthroughCopy("./_src/img/");
    eleventyConfig.addWatchTarget("./_src/js/");
    eleventyConfig.addPassthroughCopy("./_src/js/")

   return {
        dir: {
             input: "_src"
        }
   }
}