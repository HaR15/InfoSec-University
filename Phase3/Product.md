<h3>Product Highlights:</h3>

* Infosec University is a website focused on teaching computer security for developers. The idea is to have an organized and good looking website that contains several courses about security, such as SQL Injection, Cryptography, etc. However, Infosec doesn’t focus only in understanding the problem, it also teaches the user how to exploit vulnerabilities and prevent such exploits in their own products.

<h3>The major product decisions that differentiate our project from others include:</h3>

* A well planned design, differentiated from similar implementations that did not have a UI friendly towards new users
* Proper content organization. We separated exercises and tutorials into specific security topics. For example, we put all SQL Injection related exercises under the SQL Injection category. Using this structure of content organization, we can determine exercise difficulty based on how difficult it is for this specific topic. Other implementations classify exercises only in terms of difficulty, which can result in incorrect comparisons of difficulty (what makes an SQL Injection exercise more difficult than a Cross Site Scripting exercise?)
* Accessibility. While our product covers a large range of security topics, it has a wide range of difficulty for exercises. For example, with the cryptography topic, we start off with simple cipher related exercises such as substitution cipher, leading up to password cracking passwords stored in etc/passwd. 

<h3>Features that we focused on:</h3>

* The design of our project was a big part of it, so that new users of the product could navigate the site and begin tutorials/exercises without assistance
* The tutorials is a important part of the project, our focus is not only to teach the user how to use an exploit, but also to help them understand why it works and how to prevent such exploits.
* The exercises we implemented needed to be varied, and cover a wide range of common security topics so that users can learn more about computer security as well as test their knowledge of the covered topic. 

<h3>Features that we postponed:</h3>

* We postponed the chat for future releases since we did not have time to get this functionality working as expected and it is not a critical feature for this product.
* We also postponed the challenges, since we just completed our main content for the product and the challenges would combine content from multiple topics to form a scenario for users to complete (for example, using SQL Injection and Cross Site Scripting to log into a site and deface it).

<h3>Typical uses of the product :</h3>

* A web developer hears about web applications being exploited in the news, but is not familiar with computer security. The developer now wishes to learn more about computer security topics related to web applications so that they can better protect their own application against such attacks. The developer can register an account on our product then begin reviewing the SQL Injection and Cross Site Scripting tutorials. Once the developer feels that have a good understanding of these topics, they can test their knowledge using the exercises under these tutorials.

* A few freshmen in Computer Science hear about computer security from fellow classmates and wish to become familiar with this field. The freshmen can register accounts on the product and begin reviewing tutorials for the available topics, starting with the Basic Security topic. The freshmen can then compare their progress against each other by viewing each others profiles and see how many exercises each of them have successfully completed in each topic
