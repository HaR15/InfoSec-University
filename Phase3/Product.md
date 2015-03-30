<h3>Product Highlights:</h3>

* Infosec University is a website for teaching computer security to developers. The website contains several courses on security, such as SQL Injection, Cryptography, etc. Infosec doesn’t focus only in understanding the problem, it also teaches the user how to exploit vulnerabilities and prevent such exploits in their own products.


<h3>Major Differentiating Product Decisions:</h3>

* <b>A well executed design</b>, superior to similar implementations that did not have a friendly UI for users.
* <b>Effective and intuitive content organization</b>. We separate exercises and tutorials into relevant security topics. For example, we group SQL Injection related content under the SQL Injection category. Using this structure of content organization, we can determine exercise difficulty based on how difficult it is for this specific topic. Other implementations classify exercises only in terms of difficulty, which can result in incorrect comparisons of difficulty (what makes an SQL Injection exercise more difficult than a Cross Site Scripting exercise?)
* <b>Scaling difficulty</b>. Our product has a wide range of difficulties for exercises. With cryptography, we start off with simple cipher exercises such as substitution cipher, leading up to password cracking passwords stored in etc/passwd. 

<h3>Features we focused on:</h3>

* <b>Layout design</b>, new users of the product should be able to navigate the site and begin tutorials/exercises quickly
* <b>Tutorials</b> are an important part of the product, our focus is not only to teach the user how to use an exploit, but also to help them understand why it works and how to prevent such exploits.
* <b>Broad range of excercises</b> to test common security topics, allowing the user to practice a broader set of skills.

<h3>Postponed Features:</h3>

* We postponed chat for future releases since we did not have time to get this functionality working as expected and it is not a critical feature for this product.
* We also postponed the challenges, since we just completed our main content for the product and the challenges would combine content from multiple topics to form a scenario for users to complete (for example, using SQL Injection and Cross Site Scripting to log into a site and deface it).

<h3>Typical uses of the product :</h3>

* <b>Primary use example</b>: A developer registers an account on the website then begins reviewing SQL Injection and Cross Site Scripting tutorials. They can then test their knowledge using the exercises for these tutorials, they also have the option of skipping the tutorial if they feel they already know the content.

* <b>Secondary use example</b>: A user likes to stay informed about security topics so they visit our news section. When an article interests them they can click on it and read the full article. This could also motivate them to begin learning security topics.
