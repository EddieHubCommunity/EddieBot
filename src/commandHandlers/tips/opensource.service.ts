// TODO: read the data for tips and resources from the DB. The idea is for this data to not be hardcoded, and can be
// modified throughout time, without needing to re-deploy the bot!

export async function getOpenSourceTips(): Promise<string> {
    return `
     - Read projects contribution guidelines (usually on the CONTRIBUTING.md file at the root or inside the folder \`.github\`).
     - Contribute small and often.
     - Fixing typos and adding documentation is valuable! Don't feel the need to make a PR with just code 🙂.
     - Sharing your experience with the project, is as much a contribution as a code contribution! For example, write a blog post about how you use a certain library and what problem it solves for you.
     - If you are a maintainer of a big project, using Saved Replies can be very helpful when you find yourself repeating the same thing over and over 😅. Take a look at [GitHub's blog post](https://github.blog/2016-03-29-saved-replies/).`
}

export async function getOpenSourceResources(): Promise<string> {
    return `
    - Take a look at [firsttimersonly](https://www.firsttimersonly.com/). Some projects have a label for "first timers only", so look for that if you haven't contributed to the project before (e.g. [Spring Boot's repo](https://github.com/spring-projects/spring-boot/issues?q=label%3A%22status%3A+first-timers-only%22+is%3Aclosed))
    - [An (even more) practical guide to open source contribution](https://medium.com/@mbbroberg/an-even-more-practical-guide-to-open-source-contribution-dbdaa6ff1994)
    - [Awesome README](https://github.com/matiassingers/awesome-readme)`
}
